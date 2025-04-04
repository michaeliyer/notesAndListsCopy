// ✅ storage.js — Handles localStorage operations

console.log("✅ storage.js loaded");

// Import sections from sections.js
import { sections } from "./sections.js";

// Save sections to localStorage
export function saveSections() {
  console.log("Saving sections:", sections);
  localStorage.setItem("allSectionsLocalCopy", JSON.stringify(sections));
}

// Export all sections as JSON
export function exportAllSections() {
  const sections =
    JSON.parse(localStorage.getItem("allSectionsLocalCopy")) || {};
  const data = JSON.stringify(sections, null, 2);

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "sections.json";
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import all sections from JSON
export function importAllSections(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      localStorage.setItem("allSectionsLocalCopy", JSON.stringify(data));
      window.location.reload();
    } catch (error) {
      console.error("Error importing sections:", error);
      alert("Error importing sections. Please check the file format.");
    }
  };
  reader.readAsText(file);
}

// Export a single section as JSON
export function exportSection(sectionName) {
  const sections =
    JSON.parse(localStorage.getItem("allSectionsLocalCopy")) || {};
  const section = sections[sectionName];

  if (!section) return;

  const data = JSON.stringify(section, null, 2);

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${sectionName}.json`;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import a single section from JSON
export function importSection(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      const sectionName = prompt(
        "Enter section name:",
        file.name.replace(".json", "")
      );

      if (sectionName) {
        const sections =
          JSON.parse(localStorage.getItem("allSectionsLocalCopy")) || {};
        sections[sectionName] = data;
        localStorage.setItem("allSectionsLocalCopy", JSON.stringify(sections));
        window.location.reload();
      }
    } catch (error) {
      console.error("Error importing section:", error);
      alert("Error importing section. Please check the file format.");
    }
  };
  reader.readAsText(file);
}
