# Day 04: JavaScript Fundamentals and DOM Manipulation

**ApexLark Full Stack Development Internship Program**

An interactive landing page for a fictional startup, Orbit Desk. It uses plain HTML, CSS and ES6 JavaScript with no libraries.

## Project structure

```
Day-04-JavaScript/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── screenshots/
└── README.md
```

## How to run

1. Download or clone the repository.
2. Open `index.html` in Google Chrome (or right-click it in VS Code and choose Open with Live Server).
3. No build step or install is needed.

## Features

| Feature | How it works |
|---|---|
| Dark / light theme toggle | Toggles a `dark` class on `<body>`; CSS variables change colours. The choice is saved in `localStorage`. |
| Digital clock and time greeting | `setInterval` updates the time every second; the greeting changes by hour. |
| Responsive navigation menu | Hamburger button opens and closes the menu on screens under 760px. Escape closes it. |
| Feature cards | `mouseover` / `mouseleave` highlight, `click` expands, `dblclick` marks as favourite. |
| Random quote generator | Picks a random object from an array and never repeats the last one. |
| Character counter | The `input` event updates the count; `keypress` detects Enter. |
| Registration form validation | Checks required fields, email format, phone format, password of 8 or more characters, and matching passwords. Errors show live and on `submit` without a reload. |

## JavaScript concepts used

- Variables with `const` and `let`
- Arrow functions and template literals
- Arrays (`forEach`, `map`, `every`) and objects
- Loops (`forEach`, `do...while`)
- Conditionals and ternary operators
- Regular expressions for email and phone checks
- DOM selection, `classList`, `textContent`, creating elements, showing and hiding elements
- Events: click, dblclick, mouseover, mouseleave, keypress, input, submit

## Validation rules

- Full name: required, at least 3 characters
- Email: must match `name@domain.tld`
- Phone: 10 digits starting with 6 to 9
- Password: at least 8 characters
- Confirm password: must match password

## Screenshots

Add your screenshots to `assets/screenshots/` and link them here:

```
![Home, light theme](assets/screenshots/home-light.png)
![Home, dark theme](assets/screenshots/home-dark.png)
![Form validation errors](assets/screenshots/form-errors.png)
![Mobile menu](assets/screenshots/mobile-menu.png)
```
