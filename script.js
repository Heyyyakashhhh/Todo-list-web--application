const todoText = document.getElementById("todo-text");
const listContainer = document.getElementById("list-container");
const completed = document.getElementById("completed");
const cleared = document.getElementById("cleared");
const leftTask = document.getElementById("leftTask");

let counter = 0;

const updateCounter = () => {
    leftTask.innerHTML = `${counter >= 0 ? counter : 0} Left tasks`;
};

const addTask = () => {
    if (todoText.value !== "") {
        const newList = document.createElement("li");
        newList.innerHTML = `${todoText.value} <i class="fa-regular fa-trash-can"></i>`;
        listContainer.appendChild(newList);

        const del = newList.querySelector(".fa-trash-can");
        del.addEventListener("click", () => {
            if (!newList.classList.contains("cheaked")) {
                counter--;
                updateCounter();
            }
            newList.remove();
            saveData();
        });

        counter++;
        updateCounter();
        saveData();
    } else {
        alert("Add some Task");
    }
    todoText.value = "";
};

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("cheaked");
        if (e.target.classList.contains("cheaked")) {
            counter--;
        } else {
            counter++;
        }
        updateCounter();
        saveData();
    }
    if (e.target.classList.contains("fa-trash-can")) {
        if (!e.target.parentElement.classList.contains("cheaked")) {
            counter--;
            updateCounter();
        }
        e.target.parentElement.remove();
        saveData();
    }
}, false);

completed.addEventListener("click", () => {
    const tasks = listContainer.querySelectorAll("li");
    tasks.forEach((task) => {
        task.classList.add("cheaked");
        counter = 0;
        updateCounter();
        saveData();
    });
});

cleared.addEventListener("click", () => {
    const completedTasks = listContainer.querySelectorAll(".cheaked");
    completedTasks.forEach((completedTask) => {
        completedTask.remove();
        saveData();
    });
    counter = listContainer.querySelectorAll("li").length;
    updateCounter();
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    counter = listContainer.querySelectorAll("li").length;
    updateCounter();
}
showTask();
