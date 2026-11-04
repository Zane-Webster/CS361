const itemList = document.getElementById("item-list");

itemList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        event.target.closest("li").remove();
    }
});

function addItem(id, listId, inputName, existingName = null) {
    const dropdown = document.getElementById(id);

    // If item is already selected, find existing name
    const selectedOption = existingName
        ? Array.from(dropdown.options).find(opt => opt.value === existingName)
        : dropdown.options[dropdown.selectedIndex];

    if (!selectedOption) return;

    const itemName = selectedOption.value;

    if (!itemName) return;

    const existing_items = Array.from(
        itemList.querySelectorAll('input[name="item-list[]"]')
    );

    if (existing_items.length >= 20) {
        alert("You cannot have more than 20 items!");
        return;
    }

    // Create a new list item
    const li = document.createElement("li");
    li.textContent = selectedOption.textContent;

    // Create a remove button
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.className = "remove-item";

    li.appendChild(removeButton);

    // Hidden input for submitting category and item name
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "item-list[]";
    input.value = `${inputName}|${itemName}`;

    li.appendChild(input);

    // Add item to the list
    itemList.appendChild(li);

    // Reset dropdown after adding
    dropdown.selectedIndex = 0;
}