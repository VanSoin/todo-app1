document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const priorityInput = document.getElementById('priority-input');
  const dateInput = document.getElementById('date-input');
  const list = document.getElementById('todo-list');

  function createTodoElement(text, priority = 'medium', dueDate = ''){
    const li = document.createElement('li');
    li.className = 'todo-item';

    const label = document.createElement('label');
    label.className = 'todo-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.setAttribute('aria-label', 'Mark todo completed');

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'todo-content';

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;

    const priorityBadge = document.createElement('span');
    priorityBadge.className = `priority-badge priority-${priority}`;
    priorityBadge.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);

    contentWrapper.appendChild(span);
    contentWrapper.appendChild(priorityBadge);

    if(dueDate){
      const dateSpan = document.createElement('span');
      dateSpan.className = 'due-date';
      dateSpan.textContent = new Date(dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
      contentWrapper.appendChild(dateSpan);
    }

    label.appendChild(checkbox);
    label.appendChild(contentWrapper);

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

  function addTodo(text, priority, dueDate){
    if(!text || !text.trim()) return;
    const el = createTodoElement(text.trim(), priority, dueDate);
    list.appendChild(el);
    input.value = '';
    priorityInput.value = 'medium';
    dateInput.value = '';
    input.focus();
  }

  document.getElementById('add-btn').addEventListener('click', () => {
    addTodo(input.value, priorityInput.value, dateInput.value);
  });

  input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') addTodo(input.value, priorityInput.value, dateInput.value);
  });

  // theme toggle logic
  const themeToggle = document.getElementById('theme-toggle');
  function applyTheme(theme){
    if(theme === 'dark'){
      document.body.classList.add('dark');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-label','Switch to light theme');
    } else {
      document.body.classList.remove('dark');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-label','Switch to dark theme');
    }
  }

  // load saved preference
  const saved = localStorage.getItem('theme');
  if(saved === 'dark' || saved === 'light'){
    applyTheme(saved);
  } else {
    // default to light
    applyTheme('light');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });

  // event delegation for delete buttons
  list.addEventListener('click', (e) => {
    if(e.target && e.target.classList.contains('delete-btn')){
      const li = e.target.closest('li');
      if(li) li.remove();
    }
  });
});
