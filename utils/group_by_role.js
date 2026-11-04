function groupByRole(items) {
    const groups = {};

    for (const item of items) {
        if (!groups[item.role]) {
            groups[item.role] = [];
        }

        groups[item.role].push(item);
    }

    return Object.entries(groups).map(([role, items]) => {
        return {
            role: role,
            items: items
        };
    });
}

function buildLoadout(body, id) {
    const items = [].concat(body["item-list"] || []).map(item => {
        const [category, ...nameParts] = item.split("|");

        return {
            category: category,
            name: nameParts.join("|")
        };
    });

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
        cost: 0,
        profit: 0
    };

    loadout.profit = loadout.performance.moneyEarned - loadout.cost;

    return loadout;
}

module.exports = groupByRole, buildLoadout;