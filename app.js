const express = require("express");
const { engine } = require("express-handlebars");
const zmq = require("zeromq");

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

async function sendMessage(text) {
    const socket = new zmq.Request();

    socket.connect("tcp://127.0.0.1:5555");

    try {
        await socket.send(text);

        console.log("Sent:", text);

        const [reply] = await socket.receive();

        return reply.toString();
    } finally {
        socket.close();
    }
}

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

        const reply = await sendMessage(message);

        res.render("loadouts", {
            message: message,
            reply: reply
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Microservice error");
    }
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