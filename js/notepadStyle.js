// 🎨 notepadStyle.js
console.log("🎨 notepadStyle.js loaded");

import { fonts } from "../assets/fonts.js";

const styleKey = "notepadStyleCopy";

// Initialize everything related to notepad styling
export function initNotepadStyles() {
  const notepad = document.getElementById("notepad");
  const modal = document.getElementById("notepadStyleModal");
  const fontSelect = document.getElementById("notepadFontFamily");
  const fontSizeInput = document.getElementById("notepadFontSize");
  const textColorInput = document.getElementById("notepadTextColor");
  const bgColorInput = document.getElementById("notepadBgColor");
  const applyBtn = document.getElementById("applyNotepadStyle");
  const closeBtn = document.getElementById("closeNotepadStyle");

  if (
    !notepad ||
    !modal ||
    !fontSelect ||
    !fontSizeInput ||
    !textColorInput ||
    !bgColorInput
  ) {
    console.error("❌ Notepad style modal or input elements not found.");
    return;
  }

  // 🟢 Populate font dropdown
  fonts.forEach((font) => {
    const option = document.createElement("option");
    option.value = font;
    option.textContent = font;
    fontSelect.appendChild(option);
  });

  // 🟢 Load saved styles from localStorage
  const saved = JSON.parse(localStorage.getItem(styleKey));
  if (saved) applyStyles(saved);

  // 🟢 Apply styles to notepad
  function applyStyles(styles) {
    notepad.style.fontFamily = styles.fontFamily;
    notepad.style.fontSize = `${styles.fontSize}px`;
    notepad.style.color = styles.textColor;
    notepad.style.backgroundColor = styles.bgColor;
  }

  // 🟢 Apply style button
  applyBtn.addEventListener("click", () => {
    const styles = {
      fontFamily: fontSelect.value,
      fontSize: parseInt(fontSizeInput.value),
      textColor: textColorInput.value,
      bgColor: bgColorInput.value,
    };
    applyStyles(styles);
    localStorage.setItem(styleKey, JSON.stringify(styles));
    modal.classList.add("hidden");
  });

  // 🟢 Close modal button
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // 🟢 Open modal function
  window.openNotepadStyle = function () {
    const currentStyle = window.getComputedStyle(notepad);
    fontSelect.value = normalizeFont(currentStyle.fontFamily);
    fontSizeInput.value = parseInt(currentStyle.fontSize);
    textColorInput.value = rgbToHex(currentStyle.color);
    bgColorInput.value = rgbToHex(currentStyle.backgroundColor);
    modal.classList.remove("hidden");
  };

  // Normalize font string (strip quotes and fallbacks)
  function normalizeFont(font) {
    return font.split(",")[0].replace(/['"]/g, "").trim();
  }

  // Convert rgb/rgba to hex
  function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result) return "#000000";
    return (
      "#" +
      result
        .slice(0, 3)
        .map((val) => parseInt(val).toString(16).padStart(2, "0"))
        .join("")
    );
  }
}

// Export the openNotepadStyle function
export function openNotepadStyle() {
  console.log("Opening notepad style modal");
  if (window.openNotepadStyle) {
    window.openNotepadStyle();
  } else {
    console.error("openNotepadStyle function not found");
  }
}
