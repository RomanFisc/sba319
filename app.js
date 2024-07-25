document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskTitleInput = document.getElementById('task-title');
  const taskCategorySelect = document.getElementById('task-category');
  const taskDueDateInput = document.getElementById('task-due-date');
  const taskPriorityInput = document.getElementById('task-priority');
  const tasksList = document.getElementById('tasks-list');

  const categoryForm = document.getElementById('category-form');
  const categoryNameInput = document.getElementById('category-name');
  const categoriesList = document.getElementById('categories-list');

  // Load tasks from the server
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
          ${task.dueDate ? ` - Due: ${new Date(task.dueDate).toLocaleDateString()}` : ''} 
          ${task.priority ? ` - Priority: ${task.priority}` : ''}
          ${task.completed ? '(Completed)' : ''}
          <button onclick="deleteTask('${task._id}')">Delete</button>
        </li>
      `).join('');
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  // Handle task form submission
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskTitleInput.value;
    const category = taskCategorySelect.value;
    const dueDate = taskDueDateInput.value;
    const priority = taskPriorityInput.value;
    await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, dueDate, priority })
    });
    taskTitleInput.value = '';
    taskCategorySelect.value = '';
    taskDueDateInput.value = '';
    taskPriorityInput.value = 'Medium'; // Reset to default value
    loadTasks();
  });

  // Function to delete a task
  window.deleteTask = async (id) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'DELETE'
    });
    loadTasks();
  };

  // Load categories from the server
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

  // Handle category form submission
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

  // Function to delete a category
  window.deleteCategory = async (id) => {
    await fetch(`http://localhost:3000/api/categories/${id}`, {
      method: 'DELETE'
    });
    loadCategories();
  };

  // Initial load
  loadTasks();
  loadCategories();
});
