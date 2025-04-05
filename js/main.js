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

// Global variables for direct access
window.appElements = {};

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

// Global toggle function for debugging
window.toggleNotepad = function () {
  const notepad = document.getElementById("notepad");
  const toggleBtn = document.getElementById("toggleNotepadBtn");

  if (notepad) {
    console.log(
      "Manual toggle - Before:",
      notepad.classList.contains("hidden")
    );

    // Remove and add hidden class separately instead of toggle
    if (notepad.classList.contains("hidden")) {
      notepad.classList.remove("hidden");
    } else {
      notepad.classList.add("hidden");
    }

    console.log("Manual toggle - After:", notepad.classList.contains("hidden"));

    // Update button text
    if (toggleBtn) {
      const isHidden = notepad.classList.contains("hidden");
      toggleBtn.textContent = isHidden ? "📝 Show Notepad" : "📝 Hide Notepad";
    }
  } else {
    console.error("Notepad element not found");
  }
};

// Helper functions to force show/hide
window.showNotepad = function () {
  const notepad = document.getElementById("notepad");
  const toggleBtn = document.getElementById("toggleNotepadBtn");

  if (notepad) {
    console.log("Forcing notepad to show");
    notepad.classList.remove("hidden");

    if (toggleBtn) {
      toggleBtn.textContent = "📝 Hide Notepad";
    }
  }
};

window.hideNotepad = function () {
  const notepad = document.getElementById("notepad");
  const toggleBtn = document.getElementById("toggleNotepadBtn");

  if (notepad) {
    console.log("Forcing notepad to hide");
    notepad.classList.add("hidden");

    if (toggleBtn) {
      toggleBtn.textContent = "📝 Show Notepad";
    }
  }
};

// Initialize the application when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Initializing application...");

  try {
    // Get all UI elements first
    const toggleNotepadBtn = document.getElementById("toggleNotepadBtn");
    const toggleNotepadControlsBtn = document.getElementById(
      "toggleNotepadControlsBtn"
    );
    const toggleListBtn = document.getElementById("toggleListBtn");
    const toggleListControlsBtn = document.getElementById(
      "toggleListControlsBtn"
    );

    const notepadControls = document.getElementById("notepadControls");
    const notepad = document.getElementById("notepad");
    const sectionsContainer = document.getElementById("sectionsContainer");
    const listControls = document.getElementById("listControls");

    // Store elements globally for debugging
    window.appElements = {
      toggleNotepadBtn,
      toggleNotepadControlsBtn,
      toggleListBtn,
      toggleListControlsBtn,
      notepadControls,
      notepad,
      sectionsContainer,
      listControls,
    };

    // Hide notepad by default
    if (notepad) {
      console.log("Hiding notepad by default");
      notepad.classList.add("hidden");
    }

    // Initialize all components
    console.log("Initializing components...");
    initNotepad();
    initNotepadStyles();
    initSections();
    initModals();

    // Initialize list controls last to ensure other components are ready
    console.log("Initializing list controls...");
    initListControls();

    // Set initial button text based on element visibility
    if (toggleNotepadBtn && notepad) {
      const isHidden = notepad.classList.contains("hidden");
      toggleNotepadBtn.textContent = isHidden
        ? "📝 Show Notepad"
        : "📝 Hide Notepad";
    }

    if (toggleNotepadControlsBtn && notepadControls) {
      const isHidden = notepadControls.classList.contains("hidden");
      toggleNotepadControlsBtn.textContent = isHidden
        ? "🧰 Show Notepad Controls"
        : "🧹 Hide Notepad Controls";
    }

    if (toggleListBtn && sectionsContainer) {
      const isHidden = sectionsContainer.classList.contains("hidden");
      toggleListBtn.textContent = isHidden ? "🗂 Show List" : "🗂 Hide List";
    }

    if (toggleListControlsBtn && listControls) {
      const isHidden = listControls.classList.contains("hidden");
      toggleListControlsBtn.textContent = isHidden
        ? "🧺 Show List Controls"
        : "🧺 Hide List Controls";
    }

    console.log("Setting up notepad toggles...");

    // 📝 Toggle Notepad
    if (toggleNotepadBtn && notepad) {
      toggleNotepadBtn.addEventListener("click", function (event) {
        console.log("Toggle Notepad button clicked");
        console.log(
          "Before toggle - notepad hidden:",
          notepad.classList.contains("hidden")
        );

        // Instead of using toggle, explicitly add or remove the class
        if (notepad.classList.contains("hidden")) {
          console.log("Removing hidden class");
          notepad.classList.remove("hidden");
        } else {
          console.log("Adding hidden class");
          notepad.classList.add("hidden");
        }

        // Check new state
        const isHidden = notepad.classList.contains("hidden");
        console.log("After toggle - notepad hidden:", isHidden);

        // Update button text
        toggleNotepadBtn.textContent = isHidden
          ? "📝 Show Notepad"
          : "📝 Hide Notepad";

        console.log("Button text updated to:", toggleNotepadBtn.textContent);
      });

      // Log initial state
      console.log(
        "Initial notepad state - hidden:",
        notepad.classList.contains("hidden")
      );
      console.log("Initial button text:", toggleNotepadBtn.textContent);
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
