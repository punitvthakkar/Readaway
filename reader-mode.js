const body = document.body;
const modeToggle = document.getElementById('mode-toggle');
let isDarkMode = false;

modeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  modeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
});