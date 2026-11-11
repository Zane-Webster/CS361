// If two loadouts are selected for comparison, redirect to comparison page and pass id's

let firstLoadout = null;
let firstButton = null;

function compareLoadouts(id, button) {
    if (firstLoadout === null) {
        firstLoadout = id;
        firstButton = button;

        button.classList.add("selected");
    // If the button is already selected, toggle it off
    } else if (firstLoadout === id) {
        firstLoadout = null;
        firstButton = null;
        
        button.classList.remove("selected");
    } else {
        window.location.href = `/loadouts/${firstLoadout}/${id}/compare`;
    }
}