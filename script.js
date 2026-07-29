let tasks = JSON.parse(localStorage.getItem('kanbanTasks')) || [];
let editingTaskId = null;

const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.querySelector('.modal__close');
const taskModal = document.querySelector('.modal');
const taskForm = document.querySelector('.task-form');

const titleInput = document.getElementById('task-title');
const descInput = document.getElementById('task-desc');
const priorityInput = document.getElementById('task-priority');
const statusInput = document.getElementById('task-status');

const todoColumn = document.querySelector('.kanban-column[data-status="todo"] .kanban-column__tasks');
const progressColumn = document.querySelector('.kanban-column[data-status="in-progress"] .kanban-column__tasks');
const doneColumn = document.querySelector('.kanban-column[data-status="done"] .kanban-column__tasks');

const countTodo = document.getElementById('count-todo');
const countProgress = document.getElementById('count-in-progress');
const countDone = document.getElementById('count-done');

function openModal() {
  taskModal.style.display = 'flex';
}

function closeModal() {
  taskModal.style.display = 'none';
  taskForm.reset();
  editingTaskId = null;
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

taskModal.addEventListener('click', function(e) {
  if (e.target === taskModal) {
    closeModal();
  }
});

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const titleValue = titleInput.value.trim();
  const descValue = descInput.value.trim();

  if (editingTaskId === null) {
    const isDuplicate = tasks.some(task => task.title.toLowerCase() === titleValue.toLowerCase());
    if (isDuplicate) {
      alert('Bu adda tapşırıq artıq mövcuddur! Fərqli başlıq yazın.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: titleValue,
      description: descValue,
      priority: priorityInput.value,
      status: statusInput.value,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
  } else {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === editingTaskId) {
        tasks[i].title = titleValue;
        tasks[i].description = descValue;
        tasks[i].priority = priorityInput.value;
        tasks[i].status = statusInput.value;
      }
    }
  }

  localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  closeModal();
  renderTasks();
});

function deleteTask(id) {
  let cavab = confirm('Bu tapşırığı silmək istədiyinizə əminsiniz?');
  if (cavab === true) {
    tasks = tasks.filter(function(task) {
      return task.id !== id;
    });
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    renderTasks();
  }
}

function editTask(id) {
  let tapilanTask = tasks.find(function(task) {
    return task.id === id;
  });

  if (tapilanTask) {
    titleInput.value = tapilanTask.title;
    descInput.value = tapilanTask.description;
    priorityInput.value = tapilanTask.priority;
    statusInput.value = tapilanTask.status;
    editingTaskId = id;
    openModal();
  }
}

function renderTasks() {
  todoColumn.innerHTML = '';
  progressColumn.innerHTML = '';
  doneColumn.innerHTML = '';

  let todoNum = 0;
  let progressNum = 0;
  let doneNum = 0;

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let card = document.createElement('div');
    card.className = 'task-card';
    card.setAttribute('data-id', task.id);
    card.setAttribute('data-priority', task.priority);
    card.setAttribute('draggable', 'true');

    let prioritySpan = document.createElement('span');
    prioritySpan.className = 'task-card__priority task-card__priority--' + task.priority;
    prioritySpan.textContent = task.priority;

    let titleH3 = document.createElement('h3');
    titleH3.className = 'task-card__title';
    titleH3.textContent = task.title;

    let descP = document.createElement('p');
    descP.className = 'task-card__desc';
    descP.textContent = task.description;

    let footerDiv = document.createElement('div');
    footerDiv.className = 'task-card__footer';
    footerDiv.innerHTML = `
      <span class="task-card__date">${task.createdAt.split('T')[0]}</span>
      <div class="task-card__actions">
        <button class="edit" title="Redaktə et">✏️</button>
        <button class="delete" title="Sil">🗑️</button>
      </div>
    `;

    let editBtn = footerDiv.querySelector('.edit');
    let deleteBtn = footerDiv.querySelector('.delete');

    editBtn.addEventListener('click', function() {
      editTask(task.id);
    });

    deleteBtn.addEventListener('click', function() {
      deleteTask(task.id);
    });

    card.appendChild(prioritySpan);
    card.appendChild(titleH3);
    card.appendChild(descP);
    card.appendChild(footerDiv);

    if (task.status === 'todo') {
      todoColumn.appendChild(card);
      todoNum = todoNum + 1;
    } else if (task.status === 'in-progress') {
      progressColumn.appendChild(card);
      progressNum = progressNum + 1;
    } else if (task.status === 'done') {
      doneColumn.appendChild(card);
      doneNum = doneNum + 1;
    }
  }

  if (countTodo) countTodo.textContent = todoNum;
  if (countProgress) countProgress.textContent = progressNum;
  if (countDone) countDone.textContent = doneNum;
}

renderTasks();