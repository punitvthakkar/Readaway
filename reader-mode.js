// reader-mode.js
const body = document.body;
const contentArea = document.querySelector('.content-area');
const modeToggle = document.getElementById('mode-toggle');
const fontSelector = document.getElementById('font-selector');
const downloadPdfButton = document.getElementById('download-pdf');
let isDarkMode = false;

modeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  modeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
});

fontSelector.addEventListener('change', (e) => {
  contentArea.style.fontFamily = e.target.value;
});

downloadPdfButton.addEventListener('click', () => {
  window.print();
}); 
