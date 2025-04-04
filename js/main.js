// js/main.js
import { initNotepad } from "./notepad.js";
import { initNotepadStyles } from "./notepadStyle.js";
import { initSections } from "./sections.js";
import { initListControls } from "./listControls.js";
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
  console.log("🚀 Initializing application...");

  try {
    // Initialize all components
    console.log("Initializing components...");
    initNotepad();
    initNotepadStyles();
    initSections();
    initModals();

    // Initialize list controls last to ensure other components are ready
    console.log("Initializing list controls...");
    initListControls();

    // Set up notepad toggle buttons
    const toggleNotepadBtn = document.getElementById("toggleNotepadBtn");
    const toggleNotepadControlsBtn = document.getElementById(
      "toggleNotepadControlsBtn"
    );
    const notepadControls = document.getElementById("notepadControls");
    const notepad = document.getElementById("notepad");

    console.log("Setting up notepad toggles...");

    // 📝 Toggle Notepad
    if (toggleNotepadBtn && notepad) {
      toggleNotepadBtn.addEventListener("click", () => {
        notepad.classList.toggle("hidden");
        const isHidden = notepad.classList.contains("hidden");
        toggleNotepadBtn.textContent = isHidden
          ? "📝 Show Notepad"
          : "📝 Hide Notepad";
      });
    }

    // 🧰 Toggle Notepad Controls
    if (toggleNotepadControlsBtn && notepadControls) {
      toggleNotepadControlsBtn.addEventListener("click", () => {
        notepadControls.classList.toggle("hidden");
        const isHidden = notepadControls.classList.contains("hidden");
        toggleNotepadControlsBtn.textContent = isHidden
          ? "🧰 Show Notepad Controls"
          : "🧹 Hide Notepad Controls";
      });
    }

    console.log("✨ Application initialized successfully!");
  } catch (error) {
    console.error("❌ Error during initialization:", error);
  }
});
