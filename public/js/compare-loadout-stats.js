// Compares each value and gives the better one the "selected" class
document.querySelectorAll(".compare-stat").forEach(stat => {
    const [value1, value2] = stat.querySelectorAll(".compare-value");

    // Get rid of $ and m
    const num1 = Number(value1.textContent.replace(/[$m]/g, ""));
    const num2 = Number(value2.textContent.replace(/[$m]/g, ""))

    const better = stat.getAttribute("better");

    if (num1 === num2) {
        value1.classList.add("selected");
        value2.classList.add("selected");
    } else if (better == "higher") {
        if (num1 > num2) value1.classList.add("selected");
        else value2.classList.add("selected");
    } else {
        if (num1 < num2) value1.classList.add("selected");
        else value2.classList.add("selected");
    }
});