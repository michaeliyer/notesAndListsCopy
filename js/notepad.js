// 📒 notepad.js — Manages Notepad content, import/export, and visibility
console.log("📒 notepad.js loaded");

import { openNotepadStyle } from "./notepadStyle.js";

// 🔐 LocalStorage Key
const NOTEPAD_KEY = "notepadContentCopy";

// 📝 Default Content
let notepadContent =
  localStorage.getItem(NOTEPAD_KEY) ||
  "Start writing your journal, poetry, dreams...";

// ✅ Initialize Notepad (called from main.js)
function initNotepad() {
  console.log("✅ Initializing notepad");

  const notepad = document.getElementById("notepad");
  const notepadControls = document.getElementById("notepadControls");
  const toggleNotepadBtn = document.getElementById("toggleNotepadControlsBtn");

  // 🛑 Fail-safe check
  if (!notepad) {
    console.error("❌ Notepad element not found");
    return;
  }

  // 📌 Set initial content
  notepad.textContent = notepadContent;

  // 💾 Save content on input
  notepad.addEventListener("input", () => {
    notepadContent = notepad.textContent;
    localStorage.setItem(NOTEPAD_KEY, notepadContent);
  });

  // 🔀 Toggle Notepad Controls
  if (toggleNotepadBtn && notepadControls) {
    toggleNotepadBtn.addEventListener("click", () => {
      notepadControls.classList.toggle("hidden");
      toggleNotepadBtn.textContent = notepadControls.classList.contains(
        "hidden"
      )
        ? "🧰 Show Notepad Controls"
        : "🧹 Hide Notepad Controls";
    });
  }

  // 🧩 Control Buttons
  const clearBtn = document.getElementById("clearNotepadBtn");
  const downloadBtn = document.getElementById("downloadNotepadBtn");
  const styleBtn = document.getElementById("openNotepadStyleBtn");
  const importInput = document.getElementById("notepadImport");

  if (clearBtn) clearBtn.addEventListener("click", clearNotepad);
  if (downloadBtn) downloadBtn.addEventListener("click", downloadNotepad);
  if (styleBtn) {
    console.log("Style button found, adding event listener");
    styleBtn.addEventListener("click", () => {
      console.log("Style button clicked");
      openNotepadStyle();
    });
  } else {
    console.error("Style button not found");
  }
  if (importInput) importInput.addEventListener("change", importNotepad);
}

// 🧹 Clear the notepad content
function clearNotepad() {
  const notepad = document.getElementById("notepad");
  if (!notepad) return;

  // Show confirmation dialog
  if (
    confirm(
      "⚠️ Are you sure you want to clear the notepad? This action cannot be undone."
    )
  ) {
    notepad.textContent = "";
    notepadContent = "";
    localStorage.setItem(NOTEPAD_KEY, "");
  }
}

// 📤 Download current content as .txt
function downloadNotepad() {
  const content = document.getElementById("notepad")?.textContent || "";
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "notepad-content.txt";
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 📥 Import .txt or .json into the notepad
function importNotepad(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    const notepad = document.getElementById("notepad");
    if (notepad) {
      notepad.textContent = content;
      notepadContent = content;
      localStorage.setItem(NOTEPAD_KEY, content);
    }
  };
  reader.readAsText(file);
}

// ✅ Export everything needed by main.js
export { initNotepad, clearNotepad, downloadNotepad, importNotepad };
