# Week 5: DOM Manipulation — Interactive To-Do List

## Author
- **Name:** Add your full name
- **GitHub:** [@idayamwanzo-hue](https://github.com/idayamwanzo-hue)
- **Date:** November 10, 2026

## Project Description
A responsive to-do list built with vanilla HTML, CSS, and JavaScript. Tasks can be added, completed, edited, filtered, and deleted; the list is stored in the browser.

## Technologies Used
- HTML5
- CSS3
- JavaScript (DOM APIs, events, and localStorage)

## Features
- Add tasks by clicking the button or pressing Enter; blank tasks are rejected.
- Complete and undo tasks, delete individual tasks, and clear all completed tasks.
- Filter the list by all, active, or completed tasks.
- Double-click a task to edit it; Enter saves and Escape cancels.
- Uses one delegated click listener for the task list and `textContent` for task text.
- Saves tasks in localStorage so they remain after reloading the page.
- Includes Lessons 9–10 DOM practice and five daily challenge pages.

## How to Run
Open `index.html` in a browser. No build step or dependencies are required.

## Lessons Learned
- Event delegation lets tasks added later respond to the same list listener without adding new listeners to each task.
- `textContent` safely displays user-provided text, including strings such as `<b>hi</b>`, instead of parsing it as markup.
- Keeping tasks in an array of objects makes filters and redraws consistent with the application state.
- `preventDefault()` prevents a form submission from reloading the page.

## Challenges Faced
- Keeping list state and the visible filtered list in sync. I solved this by updating the task array first and then rendering the current filter from that array.
- Making task editing work with Enter and Escape while retaining normal click-to-complete behavior.

## Live Demo
After enabling GitHub Pages from the `main` branch and `/ (root)`, add the deployed URL here:

[View Live Demo](https://idayamwanzo-hue.github.io/iyf-s12-week-05-idayamwanzo-hue/)

## Project Layout
- `index.html`, `styles.css`, `app.js` — root to-do app
- `dom-practice.html`, `dom.js` — Lesson 9 and 10 practice
- `daily-challenges/` — five standalone daily challenges
