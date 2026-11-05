/* ==========================================================
   Orbit Desk - Day 4 JavaScript Project
   Sections:
   1. Data (arrays and objects)
   2. Helpers
   3. Theme toggle
   4. Clock and greeting
   5. Navigation menu
   6. Feature cards (click, dblclick, mouseover, mouseleave)
   7. Quote generator
   8. Character counter (input, keypress)
   9. Form validation (input, submit)
   10. Init
   ========================================================== */
"use strict";

/* ---------- 1. Data ---------- */
const features = [
  { title: "Shared task board", text: "Plan the week with your team.", more: "Drag tasks between columns and see updates instantly." },
  { title: "Quick check-ins", text: "Replace status meetings with a short note.", more: "Everyone answers three questions in under a minute." },
  { title: "Team notes", text: "Keep decisions where people can find them.", more: "Notes are searchable and linked to the tasks they came from." },
  { title: "Focus timer", text: "Block out time for deep work.", more: "Your teammates see when you are heads down." }
];

const quotes = [
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Programs must be written for people to read.", author: "Harold Abelson" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" }
];

/* ---------- 2. Helpers ---------- */
const $ = (selector) => document.querySelector(selector);
const pad = (n) => String(n).padStart(2, "0");
const logEvent = (message) => { $("#eventLog").textContent = `Event log: ${message}`; };

/* ---------- 3. Theme toggle ---------- */
function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  $("#themeToggle").textContent = isDark ? "Light mode" : "Dark mode";
  try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch (e) { /* storage unavailable */ }
}

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* ignore */ }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved ? saved === "dark" : prefersDark);
  $("#themeToggle").addEventListener("click", () => {
    applyTheme(!document.body.classList.contains("dark"));
  });
}

/* ---------- 4. Clock and greeting ---------- */
const getGreeting = (hour) => {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
};

function updateClock() {
  const now = new Date();
  $("#clock").textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  $("#date").textContent = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  $("#greeting").textContent = `${getGreeting(now.getHours())}, welcome to Orbit Desk`;
}

function initClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

/* ---------- 5. Navigation menu ---------- */
function initNav() {
  const btn = $("#menuBtn");
  const nav = $("#nav");
  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  };
  btn.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

/* ---------- 6. Feature cards ---------- */
function renderFeatures() {
  const grid = $("#featureGrid");
  features.forEach((f) => {
    const card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;
    card.innerHTML = `<h3>${f.title}</h3><p>${f.text}</p><p class="more hidden">${f.more}</p>`;

    card.addEventListener("mouseover", () => { card.classList.add("hovered"); logEvent(`mouseover on "${f.title}"`); });
    card.addEventListener("mouseleave", () => { card.classList.remove("hovered"); logEvent(`mouseleave from "${f.title}"`); });
    card.addEventListener("click", () => {
      card.querySelector(".more").classList.toggle("hidden");
      logEvent(`click on "${f.title}"`);
    });
    card.addEventListener("dblclick", () => {
      const fav = card.classList.toggle("favourite");
      logEvent(`dblclick: "${f.title}" ${fav ? "added to" : "removed from"} favourites`);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") card.click();
    });
    grid.appendChild(card);
  });
}

/* ---------- 7. Quote generator ---------- */
let lastQuote = -1;
function showRandomQuote() {
  let i;
  do { i = Math.floor(Math.random() * quotes.length); } while (i === lastQuote && quotes.length > 1);
  lastQuote = i;
  $("#quoteText").textContent = `"${quotes[i].text}"`;
  $("#quoteAuthor").textContent = quotes[i].author;
}

function initQuotes() {
  $("#quoteBtn").addEventListener("click", showRandomQuote);
  showRandomQuote();
}

/* ---------- 8. Character counter ---------- */
function initCounter() {
  const box = $("#feedbackText");
  const count = $("#charCount");
  const max = Number(box.getAttribute("maxlength"));

  box.addEventListener("input", () => {
    const len = box.value.length;
    count.textContent = `${len} / ${max}`;
    count.classList.toggle("warn", len >= max - 20);
  });
  box.addEventListener("keypress", (e) => {
    if (e.key === "Enter") $("#keyHint").textContent = "keypress detected: Enter";
  });
}

/* ---------- 9. Form validation ---------- */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[6-9]\d{9}$/; // 10-digit Indian mobile number

// Each validator returns an error message, or "" when the value is valid.
const validators = {
  fullName: (v) => (!v.trim() ? "Enter your full name." : v.trim().length < 3 ? "Name must be at least 3 characters." : ""),
  email: (v) => (!v.trim() ? "Enter your email address." : !emailPattern.test(v.trim()) ? "Enter a valid email, like name@example.com." : ""),
  phone: (v) => (!v.trim() ? "Enter your phone number." : !phonePattern.test(v.trim()) ? "Enter a 10-digit number starting with 6, 7, 8 or 9." : ""),
  password: (v) => (!v ? "Enter a password." : v.length < 8 ? "Password must be at least 8 characters." : ""),
  confirmPassword: (v) => (!v ? "Confirm your password." : v !== $("#password").value ? "Passwords do not match." : "")
};

function validateField(id) {
  const input = $(`#${id}`);
  const message = validators[id](input.value);
  const wrapper = input.closest(".field");
  $(`#${id}Error`).textContent = message;
  wrapper.classList.toggle("invalid", Boolean(message));
  wrapper.classList.toggle("valid", !message);
  return !message;
}

function initForm() {
  const form = $("#regForm");
  const ids = Object.keys(validators);

  ids.forEach((id) => {
    $(`#${id}`).addEventListener("input", () => {
      validateField(id);
      // Keep the confirm field in sync while the password changes
      if (id === "password" && $("#confirmPassword").value) validateField("confirmPassword");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // no page reload
    const results = ids.map(validateField); // validate every field so all errors show
    const success = $("#formSuccess");
    if (results.every(Boolean)) {
      success.textContent = `Thanks, ${$("#fullName").value.trim()}. Your account has been created.`;
      success.classList.remove("hidden");
      form.reset();
      form.querySelectorAll(".field").forEach((f) => f.classList.remove("valid", "invalid"));
    } else {
      success.classList.add("hidden");
      form.querySelector(".invalid input").focus();
    }
  });
}

/* ---------- 10. Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initClock();
  initNav();
  renderFeatures();
  initQuotes();
  initCounter();
  initForm();
});
