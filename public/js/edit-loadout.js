const form = document.querySelector(".edit-loadout");
let unsavedChanges = false;

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