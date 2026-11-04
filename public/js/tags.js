const tag_input = document.getElementById("tag-input");
const add_tag_button = document.getElementById("add-tag");
const tag_list = document.getElementById("tag-list");

tag_list.addEventListener("click", (event) => {
    if (event.target.id === "remove-tag") {
        event.target.closest("li").remove();
    }
});

function addTag(value = tag_input.value) {
    const tag = value.trim();

    // Dont add empty or duplicate tags
    if (tag == "") {
        alert("Tag cannot be empty!");
        return;
    }

    if (tag.length > 35) {
        alert("Tag is too long (max 35 chars)!");
        return;
    }

    const existing_tags = Array.from(
        tag_list.querySelectorAll('input[name="tags[]"]')
    );

    if (existing_tags.length == 3) {
        alert("You cannot have more than 3 tags!");
        return;
    }

    if (existing_tags.some(input => input.value === tag)) {
        alert("Tag cannot be a duplicate of another tag!");
        return;
    }

    // Create list item
    const list_item = document.createElement("li");

    // Create hidden input for form submission
    const hidden_input = document.createElement("input");
    hidden_input.type = "hidden";
    hidden_input.name = "tags[]";
    hidden_input.value = tag;

    // Create visible tag text
    const tag_text = document.createElement("span");
    tag_text.textContent = tag;

    // Create remove button
    const remove_button = document.createElement("button");
    remove_button.type = "button";
    remove_button.textContent = "Remove";
    remove_button.id = "remove-tag"

    list_item.appendChild(hidden_input);
    list_item.appendChild(tag_text);
    list_item.appendChild(remove_button);

    tag_list.appendChild(list_item);

    // Reset input
    tag_input.value = "";
    tag_input.focus();
}

add_tag_button.addEventListener("click", () => addTag());