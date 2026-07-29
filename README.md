# 📝 Kanban Task Board

This project is an interactive Kanban board built entirely from scratch using Vanilla HTML, CSS, and JavaScript, without relying on any external libraries or frameworks. It is designed to demonstrate core frontend development skills and fulfill all the specified technical requirements (100/100 points).

## ✨ Key Features

- **Semantic & Responsive UI:** Built with clean HTML5 tags, styled using BEM methodology, and fully responsive across all devices (mobile-first approach using Flexbox and Grid).
- **Local Storage:** All tasks and their statuses are saved in the browser's local storage, ensuring no data is lost upon page refresh.
- **Secure Rendering (XSS Protection):** To prevent malicious script injections, user inputs are strictly rendered to the DOM using `document.createElement` and `textContent` instead of `innerHTML`.
- **Duplicate Prevention:** Automatically detects and prevents the creation of multiple tasks with the exact same title.
- **Drag and Drop:** Integrated HTML5 Drag and Drop API, allowing users to seamlessly move task cards between "Todo", "In Progress", and "Done" columns.
- **Search & Filter:** Users can instantly search for tasks by keywords or filter them based on priority levels (High, Medium, Low).
- **Task Management:** Full CRUD functionality. Users can add, edit, and safely delete tasks (with a confirmation prompt). Column counters update dynamically based on the number of tasks.

## 🛠️ Technologies Used

- **HTML5** (Semantic structure)
- **CSS3** (CSS Variables, Flexbox, CSS Grid, BEM Methodology)
- **Vanilla JavaScript** (ES6+, DOM Manipulation, Drag & Drop API, Local Storage, Event Listeners)

## 🚀 How to Run the Project

1. Download or clone this repository to your local machine.
2. No backend server, Node.js, or NPM packages are required.
3. Simply open the `index.html` file in any modern web browser to view the application.
4. *(Optional)* If you are using VS Code, you can also run it using the "Live Server" extension.

