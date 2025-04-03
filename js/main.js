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
  const toggleNotepadBtn = document.getElementById("toggleNotepadBtn");
  const toggleListBtn = document.getElementById("toggleListControlsBtn");
  const notepadControls = document.getElementById("notepadControls");
  const listControls = document.getElementById("listControls");

  if (toggleNotepadBtn && notepadControls) {
    toggleNotepadBtn.addEventListener("click", () => {
      notepadControls.classList.toggle("hidden");
    });
  }

  if (toggleListBtn && listControls) {
    toggleListBtn.addEventListener("click", () => {
      listControls.classList.toggle("hidden");
    });
  }

  console.log("Application initialized successfully!");
});
