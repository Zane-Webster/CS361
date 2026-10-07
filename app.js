const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const PORT = 3000;

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
        title: "Add Loadout"
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});