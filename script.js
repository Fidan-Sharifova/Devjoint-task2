
let tasks = JSON.parse(localStorage.getItem('kanbanTasks')) || [];


const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.querySelector('.modal__close');
const taskModal = document.querySelector('.modal');
const taskForm = document.querySelector('.task-form');

const titleInput = document.getElementById('task-title');
const descInput = document.getElementById('task-desc');
const priorityInput = document.getElementById('task-priority');
const statusInput = document.getElementById('task-status');


function openModal() {
  taskModal.style.display = 'flex';
}

function closeModal() {
  taskModal.style.display = 'none';
  taskForm.reset(); 
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

  localStorage.setItem('kanbanTasks', JSON.stringify(tasks));

  closeModal(); 
  
  console.log("Hazırkı Tapşırıqlar:", tasks); 
  
});