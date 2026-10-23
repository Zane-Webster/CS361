const express = require("express");
const { engine } = require("express-handlebars");
const zmq = require("zeromq");

const app = express();
const PORT = 3000;

const sendRequest = require('./utils/zmq');
const groupByRole = require('./utils/utils');
const startMicroservices = require('./utils/start_microservices');

const itemData = require("./data/items");

// Start Microservices
startMicroservices();

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
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

app.post("/send-message", async (req, res) => {
    try {
        const message = "This is a message from CS361";

        const reply = await sendRequest(JSON.stringify(message), "receiver");

        res.render("loadouts", {
            message: message,
            reply: reply.toString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Microservice error");
    }
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


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});