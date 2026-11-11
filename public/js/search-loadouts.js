const searchBar = document.getElementById("loadout-search");
const loadouts = document.querySelectorAll(".loadout-details");
const noResults = document.getElementById("no-results");

searchBar.addEventListener("input", () => {
    const search = searchBar.value.toLowerCase().trim();
    let matches = 0;

    loadouts.forEach(loadout => {
        const name = loadout.dataset.name.toLowerCase();
        
        if (name.includes(search)) {
            loadout.style.display = "";
            matches++;
        } else {
            loadout.style.display = "none";
        }
    });

    if (matches === 0) {
        noResults.style.display = "";
    } else {
        noResults.style.display = "none";
    }
});