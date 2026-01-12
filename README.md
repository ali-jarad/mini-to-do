<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini To-Do </title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <h1>Mini To-Do</h1>
        <form id="todo-form" class="row">
            <input type="text" id="todo-input" placeholder="add a task...."  autocomplete="off">
            <button type="submit">Add </button>
        </form>
        <div class="filters">
  <button type="button" class="filter-btn" data-filter="all">All</button>
  <button type="button" class="filter-btn" data-filter="active">Active</button>
  <button type="button" class="filter-btn" data-filter="completed">Completed</button>
  <button type="button" class="clear-btn" id="clearCompleted">Clear Completed</button>
</div>

        <ul id="todo-list" class="list"></ul>

       
    </main>
    <script src="script.js"></script>

</body>

</html>
