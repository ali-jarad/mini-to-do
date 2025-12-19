const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

function createTodoItem(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => li.remove());

    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    list.appendChild(createTodoItem(text));
    input.value = '';
    input.focus();
});
