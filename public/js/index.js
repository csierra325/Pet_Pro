// Get references to page elements
var $todoText = $("#todo-text");
var $todoDueDate = $("#todo-due-date");
var $submitBtn = $("#submit");
var $todosList = $("#todos-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveTodo: function(todo) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/todos",
      data: JSON.stringify(todo)
    });
  },
  getTodos: function() {
    return $.ajax({
      url: "/api/todos",
      type: "GET"
    });
  },
  deleteTodo: function(id) {
    return $.ajax({
      url: "/api/todos/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshTodos = function() {
  return location.replace("/members");
  API.getTodos().then(function(data) {
    var $Todos = data.map(function(todo) {
      var $span = $("<span>").html(todo.todo + "<br>" + todo.dueDate);
      // .attr("href", "/Todos/" + todo.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": todo.id
        })
        .append($span);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $todosList.empty();
    $todosList.append($Todos);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("ive been clicked!");
  var todo = {
    todo: $todoText.val().trim(),
    dueDate: $todoDueDate.val().trim()
  };

  if (!(todo.todo && todo.dueDate)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveTodo(todo).then(function() {
    refreshTodos();
  });

  $todoText.val("");
  $todoDueDate.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteTodo(idToDelete).then(function() {
    refreshTodos();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$todosList.on("click", ".delete", handleDeleteBtnClick);
