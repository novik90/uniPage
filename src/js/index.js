let courses = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

const filterFrom = document.getElementById("filter-from");
const filterTo = document.getElementById("filter-to");
const coursesList = document.getElementById("courses-list");
const errorMessage = document.querySelector(".error");
const clearFilters = document.querySelector("button");

console.log(errorMessage)

clearFilters.addEventListener("click", () => {
    filterFrom.value = "";
    filterTo.value = "";
    validate();
    draw(courses);
});

function validate() {
    if (!!filterTo.value && +filterTo.value < +filterFrom.value) {
        filterTo.classList.add("warning");
        errorMessage.classList.remove("display-none")
        draw([])
        return false;
    } else {
        filterTo.classList.remove("warning");
        errorMessage.classList.add("display-none")
        return true;
    }
}

function minMaxValue(values) {
    let [min, max] = values;
    if (!min) {
        min = 0;
    }
    if (!max) {
        max = Number.MAX_SAFE_INTEGER;
    }
    return [min, max];
}

function removeChild() {
    let elements = document.querySelectorAll("#courses-list li");
    for (let i = 0; i < elements.length; i++) {
        coursesList.removeChild(elements[i]);
    }
}

function draw(items) {
    removeChild();
    if (items) {
        items.map((i) => {
            let item = document.createElement("li");
            let itemPrice = document.createElement("span");

            itemPrice.classList.add("courses__item-price");

            let priceText =
                "От " + i.prices[0] + "$ " + "До " + i.prices[1] + "$";

            if (i.prices[0] === null) {
                priceText = "До " + i.prices[1] + "$";
            }

            if (i.prices[1] === null) {
                priceText = "От " + i.prices[0] + "$";
            }

            if (i.prices[0] === null && i.prices[1] === null) {
                priceText = "See more...";
            }

            itemPrice.innerText = priceText;
            item.classList.add("courses__item");
            item.innerText = i.name + "    ";
            item.appendChild(itemPrice);

            coursesList.appendChild(item);
        });
    }
}

filterFrom.addEventListener("input", function (event) {
    let newArr = [];
    let v = event.target.value;
    for (const item of courses) {
        let max = minMaxValue(item.prices)[1];
        v <= max ? newArr.push(item) : null;
    }
    if (validate() && v) {
        draw(newArr);
    } else {
        draw([]);
    }
});

filterTo.addEventListener("input", function (event) {
    let newArr = [];
    let v = event.target.value;
    for (const item of courses) {
        let min = minMaxValue(item.prices)[0];
        v >= min ? newArr.push(item) : null;
    }
    if (validate() && v) {
        draw(newArr);
    } else {
        draw([]);
    }
});

draw(courses);
