function addTask() {
  const taskInput = document.getElementById('inputTask');
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const newTask = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const span = document.createElement('span');
  span.textContent = taskText;

  checkbox.addEventListener('change', function () {
    span.style.textDecoration = this.checked ? 'line-through' : 'none';
  });

  newTask.appendChild(checkbox);
  newTask.appendChild(span);

  addEditButton(newTask, span);
  deleteTask(newTask);

  const taskList = document.getElementById('taskList');
  taskList.appendChild(newTask);

  taskInput.value = "";
}

function deleteTask(newTask) {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.onclick = function () {
    newTask.remove();
  };

  newTask.appendChild(deleteBtn);
}

function addEditButton(taskItem, span) {
  const editBtn = document.createElement('button');
  editBtn.textContent = "Edit";
  editBtn.style.marginLeft = "10px";

  editBtn.onclick = function () {
    const currentText = span.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.marginRight = "8px";

    taskItem.replaceChild(input, span);
    editBtn.textContent = "Save";

    editBtn.onclick = function () {
      const updatedText = input.value.trim();
      if (updatedText !== "") {
        span.textContent = updatedText;
        taskItem.replaceChild(span, input);
        editBtn.textContent = "Edit";
        editBtn.onclick = arguments.callee;
      }
    };
  };

  taskItem.appendChild(editBtn);
}
