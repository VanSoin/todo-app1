document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  function createTodoElement(text){
    const li = document.createElement('li');
    li.className = 'todo-item';

    const label = document.createElement('label');
    label.className = 'todo-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.setAttribute('aria-label', 'Mark todo completed');

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;

    label.appendChild(checkbox);
    label.appendChild(span);

    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.type = 'button';
    del.textContent = 'Delete';

    // toggle completed class when checkbox changes
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed', checkbox.checked);
    });

    li.appendChild(label);
    li.appendChild(del);
    return li;
  }

  function addTodo(text){
    if(!text || !text.trim()) return;
    const el = createTodoElement(text.trim());
    list.appendChild(el);
    input.value = '';
    input.focus();
  }

  document.getElementById('add-btn').addEventListener('click', () => addTodo(input.value));

  input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') addTodo(input.value);
  });

  // event delegation for delete buttons
  list.addEventListener('click', (e) => {
    if(e.target && e.target.classList.contains('delete-btn')){
      const li = e.target.closest('li');
      if(li) li.remove();
    }
  });
});
