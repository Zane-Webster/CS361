const form = document.querySelector(".edit-loadout");
let unsavedChanges = false;

const categoryToDropdown = {
    primaryWeapon: "primaryWeapon",
    primaryWeapons: "primaryWeapon",
    secondaryWeapon: "secondaryWeapon",
    secondaryWeapons: "secondaryWeapon",
    equipment: "equipment",
    parachutes: "parachute",
    helmets: "helmet",
    armor: "armor",
    vests: "vest",
    backpacks: "backpack",
    vehicles: "vehicle"
};

const dataElement = document.getElementById("loadout-data");

if (dataElement && dataElement.textContent.trim()) {
    const loadout = JSON.parse(dataElement.textContent);

    // Populate tags
    loadout.tags.forEach(tag => {
        addTag(tag);
    });

    // Populate selected items
    loadout.items.forEach(item => {
        const dropdownId = categoryToDropdown[item.category];
        
        addItem(dropdownId, null, item.category, item.name);
    });
}

form.addEventListener("input", () => {
    unsavedChanges = true;
});

window.addEventListener("beforeunload", (event) => {
    if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = "";
    }
});

form.addEventListener("submit", () => {
    unsavedChanges = false;
});