const express = require("express");
const { engine } = require("express-handlebars");
const zmq = require("zeromq");
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const sendRequest = require('./utils/zmq');
const groupByRole = require('./utils/group_by_role');
const buildLoadout = require('./utils/build_loadout');
const startMicroservices = require('./utils/start_microservices');

const itemData = require("./data/items");
var loadoutsData = require('./data/loadouts.json');
const loadoutsPath = path.join(__dirname, 'data', 'loadouts.json');

/*=======================
    FORMAT LOADOUT FORM DATA
=======================*/
const loadoutFormData = {
    primaryWeaponGroups: groupByRole(itemData.primaryWeapons),
    secondaryWeaponGroups: groupByRole(itemData.secondaryWeapons),
    equipmentGroups: groupByRole(itemData.equipment),
    vehicleGroups: groupByRole(itemData.vehicles),

    parachutes: itemData.parachutes,
    helmets: itemData.helmets,
    armor: itemData.armor,
    vests: itemData.vests,
    backpacks: itemData.backpacks
};

/*=======================
    START MICROSERVICES
=======================*/
startMicroservices();

/*=======================
    HANDLEBARS
=======================*/
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

/*=======================
    MIDDLEWARE
=======================*/
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*=======================
    GET ROUTES
=======================*/
app.get("/", (req, res) => {
    var json = fs.readFileSync('./data/loadouts.json', 'utf8');
    loadoutsData = JSON.parse(json);

    res.render("loadouts", {
        title: "Loadouts",
        db: loadoutsData
    });
});

app.get("/loadouts", (req, res) => {
    var json = fs.readFileSync('./data/loadouts.json', 'utf8');
    loadoutsData = JSON.parse(json);

    res.render("loadouts", {
        title: "Loadouts",
        db: loadoutsData
    });
});

app.get("/loadouts/add", (req, res) => {
    res.render("edit-loadout", {
        title: "Add Loadout",
        ...loadoutFormData,
        isEditing: false
    });
});

app.get("/loadouts/:id/edit", (req, res) => {
    const json = fs.readFileSync('./data/loadouts.json', 'utf8');
    const loadouts = JSON.parse(json);

    // Find loadout of matching id
    const loadout = loadouts.find(l => l.id === req.params.id);

    if (!loadout) {
        return res.status(404).send("Loadout not found");
    }

    res.render("edit-loadout", {
        title: "Edit Loadout",
        ...loadoutFormData,
        isEditing: true,
        loadout: loadout,
        loadoutJson: JSON.stringify(loadout).replace(/</g, "\\u003c")
    });
});

/*=======================
    POST ROUTES
=======================*/

// If you added a new loadout
app.post("/loadouts", (req, res) => {
    const loadouts = JSON.parse(
        fs.readFileSync('./data/loadouts.json', 'utf8')
    );

    // New id is adding one to the last id
    const id = String(
        Math.max(0, ...loadouts.map(l => Number(l.id))) + 1
    );

    loadouts.push(buildLoadout(req.body, id, itemData));

    // Write data
    fs.writeFileSync(
        './data/loadouts.json',
        JSON.stringify(loadouts, null, 4)
    );

    res.redirect("/loadouts");
});

// If you edited an existing loadout
app.post("/loadouts/:id/edit", (req, res) => {
    const loadouts = JSON.parse(
        fs.readFileSync('./data/loadouts.json', 'utf8')
    );

    // Find id
    const index = loadouts.findIndex(l => l.id === req.params.id);

    if (index === -1) {
        return res.status(404).send("Loadout not found");
    }

    loadouts[index] = buildLoadout(req.body, req.params.id, itemData);

    // Write data
    fs.writeFileSync(
        './data/loadouts.json',
        JSON.stringify(loadouts, null, 4)
    );

    res.redirect("/loadouts");
});

app.post("/loadouts/:id/delete", (req, res) => {
    const json = fs.readFileSync('./data/loadouts.json', 'utf8');
    const loadouts = JSON.parse(json);

    // Remove the loadout with the matching ID
    const updatedLoadouts = loadouts.filter(
        loadout => loadout.id !== req.params.id
    );

    // Check if the loadout existed
    if (updatedLoadouts.length === loadouts.length) {
        return res.status(404).send("Loadout not found");
    }

    // Save updated JSON
    fs.writeFileSync(
        './data/loadouts.json',
        JSON.stringify(updatedLoadouts, null, 4),
        'utf8'
    );

    res.redirect("/loadouts");
});

/*=======================
    START SERVER
=======================*/
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});