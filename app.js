const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const PORT = 3000;

const itemData = require("./data/items");

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helper functions

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

// Routes
app.get("/", (req, res) => {
    res.render("home", {
        title: "Home"
    });
});

app.get("/loadouts", (req, res) => {
    res.render("loadouts", {
        title: "Loadouts"
    });
});

app.get("/loadouts/add", (req, res) => {
    res.render("add-loadout", {
        title: "Add Loadout",
        primaryWeaponGroups: groupByRole(itemData.primaryWeapons),
        secondaryWeaponGroups: groupByRole(itemData.secondaryWeapons),
        equipmentGroups: groupByRole(itemData.equipment),
        vehicleGroups: groupByRole(itemData.vehicles),

        parachutes: itemData.parachutes,
        helmets: itemData.helmets,
        armor: itemData.armor,
        vests: itemData.vests,
        backpacks: itemData.backpacks
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});