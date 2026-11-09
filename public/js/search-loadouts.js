const searchBar = document.getElementById("loadout-search");
const loadouts = document.querySelectorAll(".loadout-details");

searchBar.addEventListener("input", () => {
    const search = searchBar.value.toLowerCase().trim();

    loadouts.forEach(loadout => {
        const name = loadout.dataset.name.toLowerCase();

        loadout.style.display = name.includes(search) ? "" : "none";
    });
});