const express = require("express");
const { engine } = require("express-handlebars");
const zmq = require("zeromq");

const app = express();
const PORT = 3000;

const sendRequest = require('./utils/zmq');
const groupByRole = require('./utils/utils');
const startMicroservices = require('./utils/start_microservices');

const itemData = require("./data/items");

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
    res.render("loadouts", {
        title: "Loadouts"
    });
});

app.get("/loadouts", (req, res) => {
    res.render("loadouts", {
        title: "Loadouts"
    });
});

app.get("/loadouts/edit", (req, res) => {
    res.render("edit-loadout", {
        title: "Edit Loadout",
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

/*=======================
    POST ROUTES
=======================*/

app.post("/loadouts", async (req, res) => {
    try {
        

        const reply = await sendRequest(JSON.stringify(message), "receiver");
    } catch (error) {
        console.log(error);
    }
});

/*=======================
    START SERVER
=======================*/
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});