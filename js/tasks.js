// ✅ tasks.js — Handles task-related functions

console.log("✅ tasks.js loaded");

// Add a new task to a section
export function addTask(sectionName) {
  const input = document.getElementById(
    `${sectionName.replace(/\s+/g, "")}Task`
  );
  const taskText = input.value.trim();

  if (taskText) {
    const sections =
      JSON.parse(localStorage.getItem("allSectionsLocalCopy")) || {};

    if (!sections[sectionName]) {
      sections[sectionName] = { tasks: [], hidden: false };
    }

    sections[sectionName].tasks.push({
      text: taskText,
      completed: false,
      id: Date.now(),
    });

    localStorage.setItem("allSectionsLocalCopy", JSON.stringify(sections));
    input.value = "";
    renderTasks(sectionName);
  }
}

// Check all tasks in a section
export function checkAllTasks(sectionName) {
  const sections =
    JSON.parse(localStorage.getItem("allSectionsLocalCopy")) || {};

  if (sections[sectionName]) {
    sections[sectionName].tasks.forEach((task) => {
      task.completed = true;
    });

    localStorage.setItem("allSectionsLocalCopy", JSON.stringify(sections));
    renderTasks(sectionName);
  }
}

// Uncheck all tasks in a section
export function uncheckAllTasks(sectionName) {
  const sections =
    JSON.parse(localStorage.getItem("allSectionsLocalCopy")) || {};

  if (sections[sectionName]) {
    sections[sectionName].tasks.forEach((task) => {
      task.completed = false;
    });

    localStorage.setItem("allSectionsLocalCopy", JSON.stringify(sections));
    renderTasks(sectionName);
  }
}

// Delete a section
export function deleteSection(sectionName) {
  if (confirm(`Are you sure you want to delete "${sectionName}"?`)) {
    const sections =
      JSON.parse(localStorage.getItem("allSectionsLocalCopy")) || {};
    delete sections[sectionName];
    localStorage.setItem("allSectionsLocalCopy", JSON.stringify(sections));
    renderSections();
  }
}

// Edit a section name
export function editSectionName(oldName) {
  const newName = prompt("Enter new section name:", oldName);

  if (newName && newName !== oldName) {
    const sections =
      JSON.parse(localStorage.getItem("allSectionsLocalCopy")) || {};

    if (sections[oldName]) {
      sections[newName] = sections[oldName];
      delete sections[oldName];
      localStorage.setItem("allSectionsLocalCopy", JSON.stringify(sections));
      renderSections();
    }
  }
}

// Toggle section content visibility
export function toggleContent(section, toggleBtn) {
  const content = section.querySelector(".section-content");
  const sections =
    JSON.parse(localStorage.getItem("allSectionsLocalCopy")) || {};
  const sectionName = section.querySelector(".section-title").textContent;

  if (content) {
    const isHidden = content.style.display === "none";
    content.style.display = isHidden ? "block" : "none";
    toggleBtn.textContent = isHidden ? "👁 Hide" : "👁 Show";

    if (sections[sectionName]) {
      sections[sectionName].hidden = !isHidden;
      localStorage.setItem("allSectionsLocalCopy", JSON.stringify(sections));
    }
  }
}

// Render tasks for a section
export function renderTasks(sectionName) {
  const list = document.getElementById(
    `${sectionName.replace(/\s+/g, "")}List`
  );
  if (!list) return;

  const sections =
    JSON.parse(localStorage.getItem("allSectionsLocalCopy")) || {};
  const section = sections[sectionName];

  if (!section) return;

  list.innerHTML = "";

  section.tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(sectionName, task.id));

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", () => deleteTask(sectionName, task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Toggle task completion
function toggleTask(sectionName, taskId) {
  const sections =
    JSON.parse(localStorage.getItem("allSectionsLocalCopy")) || {};

  if (sections[sectionName]) {
    const task = sections[sectionName].tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      localStorage.setItem("allSectionsLocalCopy", JSON.stringify(sections));
      renderTasks(sectionName);
    }
  }
}

// Delete a task
function deleteTask(sectionName, taskId) {
  const sections =
    JSON.parse(localStorage.getItem("allSectionsLocalCopy")) || {};

  if (sections[sectionName]) {
    sections[sectionName].tasks = sections[sectionName].tasks.filter(
      (t) => t.id !== taskId
    );
    localStorage.setItem("allSectionsLocalCopy", JSON.stringify(sections));
    renderTasks(sectionName);
  }
}
