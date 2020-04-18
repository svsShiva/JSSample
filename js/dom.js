// Global variable declarations
var taskCount;
var taskList = [] // Array to store all tasks in an array


// var taskCount = 1;
// var taskList = [ {id:1, value: "some", type: "do"}]
// StoreList(taskCount);

// Call function after window is loaded (Access a built‐in property for the window object)
window.onload = function () {
    (
        // Immediately Invoked Function Expression to initialize and pre populate all tasks
        function InitTasks() {
            taskCount = GetTaskCount();
            taskList = GetList();
            // Check if any tasks are stored in browser local storage (if - else)
            if (taskCount && taskList) {
                // Iterating over tasks using for loop
                for (var index = 0; index < taskList.length; index++) {
                    let task = taskList[index];
                    CreateTask(task);
                }
            }
            // Initialize tasks array if no tasks found in browser local storage
            else {
                taskCount = 0;
                taskList = [];
                StoreList(taskCount);
            }
        }
    )();
}

// Create DOM elements for new task
function CreateTask(task) {
    // Get task element based on task type (using types property of task - dot notation)
    var node = GetTaskType(task.type);

    if (node) {
        // Create DOM element for task (using createElement)
        var wrapper = document.createElement("div");
        var card = document.createElement("div");
        var body = document.createElement("div");
        var title = document.createElement("h6");

        // Create text node with task name using createTextNode
        var content = document.createTextNode(task.value);

        // Set class attribute to element
        title.setAttribute("class", "card-title");

        // Append text element to content element
        title.appendChild(content);

        // set class attribute to cardbocy, card and wrapper element
        body.setAttribute("class", "card-body");
        card.setAttribute("class", "card my-2");
        card.style.width = "20rem";
        wrapper.setAttribute("class", "d-flex justify-content-center");
        wrapper.setAttribute("draggable", "true");
        wrapper.setAttribute("ondragstart", "drag(event)");
        wrapper.id = task.id;
        wrapper.style.cursor = "grab"

        // append title to cardbody, cardbody to card, card to wrapper and wrapper to node element
        body.appendChild(title);
        card.appendChild(body);
        wrapper.appendChild(card);
        node.appendChild(wrapper);
    }
}

// Add new task
function AddTask() {
    // Get input elements
    var inputTask = document.getElementById("inputTask");
    var inputTaskType = document.getElementsByTagName("SELECT")[0]; // Get selected task type using getElementsByTagName()
    var type = inputTaskType.options[inputTaskType.selectedIndex].value;

    // Validate if input task contains more than one character
    if (inputTask.value.length > 0) {
        if (type) {
            // Create a task object
            let task = {
                id: GetTaskID(),
                value: inputTask.value,
                type: type
            }
            // Store task object in an task array
            taskList.push(task);
            console.log(task.id)
            // Create required DOM nodes for the new task (using task object as parameter)
            CreateTask(task);
            StoreList(taskCount)
        }
        ShowError(false);
    }
    else {
        ShowError(true);
    }
    inputTask.value = "";
    inputTaskType.selectedIndex = 0
}


// Remove a task
function RemoveTask(id) {
    // Get last index of the tasks array (Access a built‐in property length of string object)
    let index = taskList.length;

    // Iterate over array to remove element from array(using while loop)
    while (index--) {
        if (taskList[index].id && taskList[index].id == id) {
            taskList.splice(index, 1);
            break;
        }
    }
    // Update task array to browser local storage
    StoreList(taskCount);
}

// Update task type when dragged from one task to another
function UpdateTask(id, type) {
    taskList.find(t => t.id == id).type = type;

    // Update task array to browser local storage
    StoreList(taskCount);
}

function GetTaskType(value) {
    // return the task element based on task type (using switch)
    switch (value) {
        case 'do':
            return document.getElementById("do");
        case 'doing':
            return document.getElementById("doing");
        case 'done':
            return document.getElementById("done");
        default:
            alert("Select the task type");
            return undefined;
    }
}


// Generate and return id for new tasks
function GetTaskID() {
    return ++taskCount;
}

// Prompt invalid task alert
function ShowError(isError) {
    // Get task error alert (using getElementsByClassName())
    var x = document.getElementsByClassName("error")[0];
    if (!isError) {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// Drop event
function allowDrop(ev) {
    ev.preventDefault();
    // Prevent Drop event to propagate to outer element
    ev.stopPropagation();
}

// Set source element id to drag event
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

// Allow drop event to drop task into only task elements 
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //  Check if target id is one of the task elements (using logical OR)
    if (ev.target.id == "do" || ev.target.id == "doing" || ev.target.id == "done") {
        ev.target.appendChild(document.getElementById(data));
        UpdateTask(data, ev.target.id)
    }
    else if (ev.target.id == "delete") {
        var task = document.getElementById(data);
        task.remove();
        RemoveTask(data);
    }
}
function StoreList(count) {
    // Store array of tasks and count in browser local storage
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("taskCount", count);
}

function GetList() {
    // Get the count of tasks stored in browser local storage
    return JSON.parse(localStorage.getItem("tasks"));
}

function GetTaskCount() {
    // Get the count of tasks stored in browser local storage
    return localStorage.getItem("taskCount");
}