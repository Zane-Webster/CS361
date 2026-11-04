const categoryMap = {
    primaryWeapon: "primaryWeapons",
    primaryWeapons: "primaryWeapons",
    secondaryWeapon: "secondaryWeapons",
    secondaryWeapons: "secondaryWeapons",
    equipment: "equipment",
    parachutes: "parachutes",
    helmets: "helmets",
    armor: "armor",
    vests: "vests",
    backpacks: "backpacks",
    vehicles: "vehicles"
};

// Calculates the total cost of all items
function calculateCost(items, itemData) {
    let totalCost = 0;
    
    for (const item of items) {
        const categoryItems = itemData[categoryMap[item.category]];

        console.log("Item:", item);
        console.log("Mapped category:", categoryMap[item.category]);
        console.log("Category data:", categoryItems);

        // Find the item based on the name
        const matchingItem = categoryItems.find(dataItem => dataItem.name === item.name);

        // Add the cost to the total
        totalCost += Number(matchingItem.cost) || 0;
    }

    return totalCost;
}

// Takes items and builds into JSON
function buildLoadout(body, id, itemData) {
    const items = [].concat(body["item-list"] || []).map(item => {
        const [category, ...nameParts] = item.split("|");

        return {
            category: category,
            name: nameParts.join("|")
        };
    });

    const cost = calculateCost(items, itemData);

    const loadout = {
        id: id,
        name: body.name,
        tags: [].concat(body.tags || []),
        items: items,
        performance: {
            kills: Number(body.kills) || 0,
            assists: Number(body.assists) || 0,
            downs: Number(body.downs) || 0,
            revives: Number(body.revives) || 0,
            moneyEarned: Number(body["money-earned"]) || 0,
            minutesSurvived: Number(body["mins-survived"]) || 0
        },
        cost: cost,
        profit: 0
    };

    loadout.profit = loadout.performance.moneyEarned - loadout.cost;

    return loadout;
}

module.exports = buildLoadout