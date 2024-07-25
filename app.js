document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskCategorySelect = document.getElementById('task-category'); // Dropdown for categories
    const tasksList = document.getElementById('tasks-list');
  
    const userForm = document.getElementById('user-form');
    const userNameInput = document.getElementById('user-name');
    const usersList = document.getElementById('users-list');
  
    const categoryForm = document.getElementById('category-form');
    const categoryNameInput = document.getElementById('category-name');
    const categoriesList = document.getElementById('categories-list');
  
    const loadTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tasks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const tasks = await response.json();
        tasksList.innerHTML = tasks.map(task => `
          <li>
            ${task.title} ${task.category ? `(${task.category.name})` : ''}
            ${task.completed ? '(Completed)' : ''}
            <button onclick="deleteTask('${task._id}')">Delete</button>
          </li>
        `).join('');
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };
  
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = taskTitleInput.value;
      const category = taskCategorySelect.value;
      await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category })
      });
      taskTitleInput.value = '';
      taskCategorySelect.value = '';
      loadTasks();
    });
  
    window.deleteTask = async (id) => {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE'
      });
      loadTasks();
    };
  
    const loadUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const users = await response.json();
        usersList.innerHTML = users.map(user => `
          <li>
            ${user.name}
            <button onclick="deleteUser('${user._id}')">Delete</button>
          </li>
        `).join('');
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    };
  
    userForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = userNameInput.value;
      await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      userNameInput.value = '';
      loadUsers();
    });
  
    window.deleteUser = async (id) => {
      await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE'
      });
      loadUsers();
    };
  
    const loadCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const categories = await response.json();
        categoriesList.innerHTML = categories.map(category => `
          <li>
            ${category.name}
            <button onclick="deleteCategory('${category._id}')">Delete</button>
          </li>
        `).join('');
        taskCategorySelect.innerHTML = '<option value="">Select Category</option>'; 
        categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category._id;
          option.textContent = category.name;
          taskCategorySelect.appendChild(option);
        });
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
  
    categoryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = categoryNameInput.value;
      await fetch('http://localhost:3000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      categoryNameInput.value = '';
      loadCategories();
    });
  
    window.deleteCategory = async (id) => {
      await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: 'DELETE'
      });
      loadCategories();
    };
  
    loadTasks();
    loadUsers();
    loadCategories();
  });
  