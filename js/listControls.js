// 📋 listControls.js — Handles list visibility and controls
console.log("📋 listControls.js loaded");

// Initialize as soon as the module loads
const initializeControls = () => {
  console.log("🔄 Attempting direct initialization of list controls");

  // Get DOM elements
  const toggleListBtn = document.querySelector("#toggleListBtn");
  const toggleListControlsBtn = document.querySelector(
    "#toggleListControlsBtn"
  );
  const sectionsContainer = document.querySelector("#sectionsContainer");
  const listControls = document.querySelector("#listControls");

  console.log("List Controls Elements:", {
    toggleListBtn,
    toggleListControlsBtn,
    sectionsContainer,
    listControls,
  });

  // 🗂 Toggle List Visibility
  const handleListToggle = () => {
    console.log("Toggle List clicked");
    if (sectionsContainer) {
      sectionsContainer.classList.toggle("hidden");
      const isHidden = sectionsContainer.classList.contains("hidden");
      if (toggleListBtn) {
        toggleListBtn.textContent = isHidden ? "🗂 Show List" : "🗂 Hide List";
      }
    }
  };

  // 🧺 Toggle List Controls
  const handleListControlsToggle = () => {
    console.log("Toggle List Controls clicked");
    if (listControls) {
      listControls.classList.toggle("hidden");
      const isHidden = listControls.classList.contains("hidden");
      if (toggleListControlsBtn) {
        toggleListControlsBtn.textContent = isHidden
          ? "🧺 Show List Controls"
          : "🧺 Hide List Controls";
      }
    }
  };

  // Set up event listeners
  if (toggleListBtn) {
    console.log("Setting up list toggle button");
    toggleListBtn.addEventListener("click", handleListToggle);

    // Set initial button text based on list visibility
    if (sectionsContainer) {
      const isHidden = sectionsContainer.classList.contains("hidden");
      toggleListBtn.textContent = isHidden ? "🗂 Show List" : "🗂 Hide List";
    }
  }

  if (toggleListControlsBtn) {
    console.log("Setting up list controls toggle button");
    toggleListControlsBtn.addEventListener("click", handleListControlsToggle);
  }

  // Keep sections container hidden by default (respecting the HTML)
  // Do not remove the hidden class

  // Ensure list controls are hidden by default
  if (listControls) {
    console.log("Ensuring list controls are hidden by default");
    listControls.classList.add("hidden");
  }
};

// Try to initialize immediately if document is already loaded
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  console.log("Document already loaded, initializing immediately");
  initializeControls();
} else {
  // Otherwise wait for DOMContentLoaded
  console.log("Waiting for DOMContentLoaded");
  document.addEventListener("DOMContentLoaded", initializeControls);
}

// Also export the initialization function for main.js
export function initListControls() {
  console.log("initListControls called from main.js");
  initializeControls();
}
