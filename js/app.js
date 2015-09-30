// Problem: User interaction doesn't provide desired results
// Solution: Add interactivity, so the user can manage daily tasks.

// < -------------- Plan -------------- >

var taskInput = document.getElementById("new-task"); // new-task
var addButton = document.getElementsByTagName("button")[0]; // first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); // #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); // #completed-tasks


// New Task List Item
var createNewTaskElement = function(taskString) {

  // Create List Item
  var listItem = document.createElement("li");

  // input (checkbox)
  var checkBox = document.createElement("input"); // Type is checkbox

  // label
  var label = document.createElement("label");

  // input (text)
  var editInput = document.createElement("input");

  // button with a class and the text of edit
  var editButton = document.createElement("button");

  // button with a class and the text of delete
  var deleteButton = document.createElement("button");

  // Each element needs modifying
  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerHTML = "Edit";
  editButton.className = "edit";
  deleteButton.innerHTML = "Delete";
  deleteButton.className = "delete";

  label.innerHTML = taskString;


  // Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}


/* When the user clicks on the add task button: it will createNewTaskElement with all of the complexity in the fuction, then return that item back into the variable listItem in the addtask function then append it to the incompleteTasksHolder */

// Add a new task
var addTask = function() {
  console.log("Add task...");
  // Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  // Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

// Edit an existing task
var editTask = function() {
  console.log("Edit task...");

  var listItem = this.parentNode;
  var editButton = listItem.querySelector("button.edit");
  var editInput = listItem.querySelector("input[type=text");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");

  // If the class of the parent (li) is editMode,
  if (containsClass) {
    // Switch from .editMode and make the label text
    // become the inputs' value
    editButton.innerHTML = "Edit";
    label.innerHTML = editInput.value;
   }
   else {
     // switch to .editMode
     // and the input value becomes the label's text
     editButton.innerHTML ="Save";
     editInput.value = label.innerHTML;
   }

    // Toggle .editMode on the parent (li)
  listItem.classList.toggle("editMode");

}


// Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  // Remove the parent (li) from the unordered list
  ul.removeChild(listItem);

}

// Mark a task as complete
var taskCompleted  = function() {
  console.log("Task completed...");

  //Append the task (li) to the #complete-tasks id
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}

// Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task incomplete...");

  // Append the task (li) to the #incomplete-tasks id
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

}


// < -------------- Perform -------------- >

  // Function that will bind the task events and select the li

  var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item evevnts");

    //select taskListItem's children (child of ul = li)
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    // bind editTask to edit button
    editButton.onclick = editTask;

    // bind the deleteTask to the delete checkBox
    deleteButton.onclick = deleteTask;

    // bind the checkBoxEventHandler to the checkbox
    checkBox.onchange = checkBoxEventHandler;
  }

  var ajaxRequest = function() {
     console.log("AJAX Request");
  }

// Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// cycle over the incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  // bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}



// cycle over the completeTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
// bind events to list item's children (taskIncomplete)addButton
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
