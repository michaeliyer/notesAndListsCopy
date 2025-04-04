// js/main.js
import { initNotepad } from "./notepad.js";
import { initNotepadStyles } from "./notepadStyle.js";
import { initSections } from "./sections.js";
import "./sectionStyle.js";
import "./modals.js";
import "./storage.js";
import "../assets/fonts.js";

console.log("✅ main.js loaded");

// Add error handling for module loading
window.addEventListener("error", function (event) {
  console.error(
    "JavaScript error:",
    event.message,
    "at",
    event.filename,
    ":",
    event.lineno
  );
});

// Initialize the application when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing application...");

  // Initialize all components
  initNotepad();
  initNotepadStyles();
  initSections();
  initModals();

  // Set up toggle buttons
  const toggleNotepadBtn = document.getElementById("toggleNotepadControlsBtn");
  const toggleListControlsBtn = document.getElementById(
    "toggleListControlsBtn"
  );
  const notepadControls = document.getElementById("notepadControls");
  const listControls = document.getElementById("listControls");

  const toggleListBtn = document.getElementById("toggleListBtn");
  const sectionsContainer = document.getElementById("sectionsContainer");

  // 📝 Toggle Notepad Controls
  if (toggleNotepadBtn && notepadControls) {
    toggleNotepadBtn.addEventListener("click", () => {
      notepadControls.classList.toggle("hidden");
      const isHidden = notepadControls.classList.contains("hidden");
      toggleNotepadBtn.textContent = isHidden
        ? "🧰 Show Notepad Controls"
        : "🧹 Hide Notepad Controls";
    });
  }

  // 🗂 Toggle List Controls
  if (toggleListBtn && listControls) {
    toggleListBtn.addEventListener("click", () => {
      listControls.classList.toggle("hidden");
      const isHidden = listControls.classList.contains("hidden");
      toggleListBtn.textContent = isHidden
        ? "🧺 Show List Controls"
        : "📦 Hide List Controls";
    });
  }

  console.log("Application initialized successfully!");
});


document.addEventListener("DOMContentLoaded", () => {
  const toggleListBtn = document.getElementById("toggleListBtn");
  const sectionsContainer = document.getElementById("sectionsContainer");

  if (toggleListBtn && sectionsContainer) {
    console.log("🔁 Toggling list display");
    toggleListBtn.addEventListener("click", () => {
      sectionsContainer.classList.toggle("hidden");
      const isHidden = sectionsContainer.classList.contains("hidden");
      toggleListBtn.textContent = isHidden ? "🗂 Show List" : "📋 Hide List";
    });
  } else {
    console.warn("⚠️ Missing toggleListBtn or sectionsContainer in DOM");
  }
});
