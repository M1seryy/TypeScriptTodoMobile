import { v4 as uuidV4 } from 'uuid';
const list = document.querySelector<HTMLUListElement>('.tasks');
const input = document.querySelector<HTMLInputElement>('#input');
const form = document.querySelector<HTMLFormElement>('.new-task-form') || null;
let index: number = 0;

type TaskType = {
  id: string;
  title: string;
  complete: boolean;
  createdAt: Date;
};
const tasks: TaskType[] = createMarkup();

tasks.forEach(createTask);
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input?.value == '' || input?.value == null) {
    return;
  }
  const task: TaskType = {
    id: uuidV4(),
    title: input.value,
    complete: false,
    createdAt: new Date(),
  };
  createTask(task);
  input.value = '';
  tasks.push(task);
  saveTasks();
});

function createTask(task: TaskType) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  index += 1;
  label.className = 'label-' + index;
  const textTag = document.createElement('h2');
  textTag.textContent = task.title;
  const checkBox = document.createElement('input');
  checkBox.id = 'label-' + index;
  label.htmlFor = checkBox.id;
  checkBox.type = 'checkbox';
  checkBox.checked = task.complete;
  label.append(textTag);
  item.append(checkBox, label);
  list?.append(item);
}
function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function createMarkup(): TaskType[] {
  const jsonTask = localStorage.getItem('TASKS');
  if (jsonTask == null) {
    return [];
  }
  return JSON.parse(jsonTask);
}
const clearBtn = document.getElementById('clear') as HTMLButtonElement;
clearBtn.addEventListener('click', clearAllTaks);
function clearAllTaks() {
  list?.remove()
  localStorage.clear();
}
