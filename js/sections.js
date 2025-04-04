// ✅ sections.js — Handles all list section rendering and logic

console.log("✅ sections.js loaded");

import { openStyleModal, openCompletedStyleModal } from "./modals.js";
import {
  saveSections,
  exportAllSections,
  importAllSections,
  exportSection,
  importSection,
} from "./storage.js";
import {
  addTask,
  checkAllTasks,
  uncheckAllTasks,
  deleteSection,
  editSectionName,
  toggleContent,
  renderTasks,
} from "./tasks.js";

// 🔐 LocalStorage Key
const SECTIONS_KEY = "allSectionsLocalCopy";

// 📦 Sections Data
let sections = JSON.parse(localStorage.getItem(SECTIONS_KEY)) || {};

// 🎯 Selected Section
let selectedSection = null;

// 🔁 DOM reference
const container = document.getElementById("sectionsContainer");

// ✅ Initialize Sections (called from main.js)
export function initSections() {
  console.log("✅ Initializing sections");

  // Add event listeners for list controls
  const addSectionBtn = document.getElementById("addSectionBtn");
  const exportDataBtn = document.getElementById("exportDataBtn");
  const importFile = document.getElementById("importFile");

  if (addSectionBtn) {
    addSectionBtn.addEventListener("click", () => {
      const sectionName = prompt("Enter section name:");
      if (sectionName) {
        addNewSection(sectionName);
      }
    });
  } else {
    console.error("Add section button not found");
  }

  if (exportDataBtn) {
    exportDataBtn.addEventListener("click", exportAllSections);
  } else {
    console.error("Export button not found");
  }

  if (importFile) {
    importFile.addEventListener("change", importAllSections);
  } else {
    console.error("Import file input not found");
  }

  // Initial render
  renderSections();
}

// 🧱 Render all sections
function renderSections() {
  container.innerHTML = "";

  Object.keys(sections).forEach((sectionName) => {
    const sectionData = sections[sectionName];
    const sectionId = `section-${sectionName.replace(/\s+/g, "")}`;

    // Create section wrapper
    const section = document.createElement("div");
    section.className = "section";
    section.id = sectionId;

    // ✨ Apply styling
    Object.assign(section.style, {
      fontFamily: sectionData.fontFamily || "Arial",
      fontSize: sectionData.fontSize ? `${sectionData.fontSize}px` : "16px",
      color: sectionData.color || "#000000",
      backgroundColor: sectionData.backgroundColor || "#ffffff",
      display: "none",
    });

    // 🏷 Title
    const title = document.createElement("span");
    title.className = "section-title";
    title.textContent = sectionName;
    title.addEventListener("click", () => editSectionName(sectionName));

    // 🍔 Hamburger + Dropdown
    const menuBtn = document.createElement("button");
    menuBtn.textContent = "☰";
    menuBtn.className = "menu-btn";

    const dropdown = document.createElement("div");
    dropdown.className = "dropdown-menu";

    const controls = [
      ["✔️ Check All", () => checkAllTasks(sectionName)],
      ["❌ Uncheck All", () => uncheckAllTasks(sectionName)],
      ["🎯 Completed Style", () => openCompletedStyleModal(sectionName)],
      ["🎨 Style", () => openStyleModal(sectionName)],
      ["👁 Hide/Show", () => toggleContent(section, toggleBtn)],
      ["🗑 Delete", () => deleteSection(sectionName)],
    ];

    controls.forEach(([label, handler]) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.addEventListener("click", handler);
      dropdown.appendChild(btn);
    });

    // ➕ Add Task Input
    const showInputBtn = document.createElement("button");
    showInputBtn.textContent = "➕ Add Task";

    const inputContainer = document.createElement("div");
    inputContainer.className = "task-input-container";
    inputContainer.style.display = "none";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Add task...";
    input.id = `${sectionName.replace(/\s+/g, "")}Task`;

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", () => addTask(sectionName));

    inputContainer.appendChild(input);
    inputContainer.appendChild(addBtn);

    showInputBtn.addEventListener("click", () => {
      inputContainer.style.display =
        inputContainer.style.display === "flex" ? "none" : "flex";
    });

    dropdown.appendChild(showInputBtn);

    // 📤 Export Section
    const exportBtn = document.createElement("button");
    exportBtn.textContent = "📤 Export Section";
    exportBtn.addEventListener("click", () => exportSection(sectionName));
    dropdown.appendChild(exportBtn);

    // 📥 Import Section
    const importBtn = document.createElement("button");
    importBtn.textContent = "📥 Import Section";
    importBtn.addEventListener("click", () => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
      fileInput.addEventListener("change", importSection);
      fileInput.click();
    });
    dropdown.appendChild(importBtn);

    menuBtn.addEventListener("click", () => {
      dropdown.style.display =
        dropdown.style.display === "flex" ? "none" : "flex";
    });

    // 📝 Section Content Area
    const content = document.createElement("div");
    content.className = "section-content";

    const list = document.createElement("ul");
    list.id = `${sectionName.replace(/\s+/g, "")}List`;

    content.appendChild(list);
    content.appendChild(inputContainer);

    if (sectionData.hidden) {
      content.style.display = "none";
    }

    // 🔧 Assemble
    section.appendChild(title);
    section.appendChild(menuBtn);
    section.appendChild(dropdown);
    section.appendChild(content);

    container.appendChild(section);
    renderTasks(sectionName);
  });

  saveSections();
}

// 🔁 Export if needed
export { renderSections, sections };




