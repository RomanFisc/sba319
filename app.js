document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskTitleInput = document.getElementById('task-title');
  const taskCategorySelect = document.getElementById('task-category');
  const taskTagsSelect = document.getElementById('task-tags');
  const taskDueDateInput = document.getElementById('task-due-date');
  const taskPriorityInput = document.getElementById('task-priority');
  const tasksList = document.getElementById('tasks-list');

  const categoryForm = document.getElementById('category-form');
  const categoryNameInput = document.getElementById('category-name');
  const categoriesList = document.getElementById('categories-list');

  const tagForm = document.getElementById('tag-form');
  const tagNameInput = document.getElementById('tag-name');
  const tagsList = document.getElementById('tags-list');

  // Load Tasks
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
          ${task.tags ? ` - Tags: ${task.tags.map(tag => tag.name).join(', ')}` : ''}
          <button onclick="deleteTask('${task._id}')">Delete</button>
        </li>
      `).join('');
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  // Load Categories
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

  // Load Tags
  const loadTags = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tags');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const tags = await response.json();
      tagsList.innerHTML = tags.map(tag => `
        <li>
          ${tag.name}
          <button onclick="deleteTag('${tag._id}')">Delete</button>
        </li>
      `).join('');
      taskTagsSelect.innerHTML = '<option value="">Select Tags</option>'; 
      tags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag._id;
        option.textContent = tag.name;
        taskTagsSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Failed to load tags:', error);
    }
  };

  // Add Task
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskTitleInput.value;
    const category = taskCategorySelect.value;
    const tags = Array.from(taskTagsSelect.selectedOptions).map(option => option.value);
    const dueDate = taskDueDateInput.value;
    const priority = taskPriorityInput.value;
    await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, tags, dueDate, priority })
    });
    taskTitleInput.value = '';
    taskCategorySelect.value = '';
    taskTagsSelect.value = '';
    taskDueDateInput.value = '';
    taskPriorityInput.value = 'Medium';
    loadTasks();
  });

  window.deleteTask = async (id) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'DELETE'
    });
    loadTasks();
  };

  // Add Category
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

  // Add Tag
  tagForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = tagNameInput.value;
    await fetch('http://localhost:3000/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    tagNameInput.value = '';
    loadTags();
  });

  window.deleteTag = async (id) => {
    await fetch(`http://localhost:3000/api/tags/${id}`, {
      method: 'DELETE'
    });
    loadTags();
  };

  // Initial load
  loadTasks();
  loadCategories();
  loadTags();
});
