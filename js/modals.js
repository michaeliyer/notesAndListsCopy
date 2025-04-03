// ✅ modals.js — Handles modal operations

console.log("✅ modals.js loaded");

// Open the style modal
export function openStyleModal() {
  const modal = document.getElementById("styleModal");
  if (modal) {
    modal.style.display = "block";
  }
}

// Close the style modal
export function closeStyleModal() {
  const modal = document.getElementById("styleModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Open the completed style modal
export function openCompletedStyleModal() {
  const modal = document.getElementById("completedStyleModal");
  if (modal) {
    modal.style.display = "block";
  }
}

// Close the completed style modal
export function closeCompletedStyleModal() {
  const modal = document.getElementById("completedStyleModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Initialize modal event listeners
export function initModals() {
  // Close modals when clicking outside
  window.onclick = (event) => {
    const styleModal = document.getElementById("styleModal");
    const completedStyleModal = document.getElementById("completedStyleModal");

    if (event.target === styleModal) {
      closeStyleModal();
    }
    if (event.target === completedStyleModal) {
      closeCompletedStyleModal();
    }
  };

  // Close buttons
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach((button) => {
    button.onclick = () => {
      const modal = button.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    };
  });
}
