function addItem(id, listId, inputName) {
    const dropdown = document.getElementById(id);
    const itemList = document.getElementById("item-list");

    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const itemName = selectedOption.value;

    if (!itemName) return;

    const existing_items = Array.from(
        itemList.querySelectorAll('input[type="hidden"]')
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

    removeButton.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(removeButton);

    // Hidden input for submitting the selected item
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = inputName + "[]";
    input.value = itemName;

    li.appendChild(input);

    // Add item to the list
    itemList.appendChild(li);

    // Reset dropdown after adding
    dropdown.selectedIndex = 0;
}
