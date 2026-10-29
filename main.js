const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("brewBloomTheme");
if (savedTheme === "dark") root.dataset.theme = "dark";
updateThemeButton();

function updateThemeButton() {
  if (!themeToggle) return;
  const dark = root.dataset.theme === "dark";
  themeToggle.textContent = dark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    if (root.dataset.theme === "dark") delete root.dataset.theme;
    else root.dataset.theme = "dark";
    localStorage.setItem("brewBloomTheme", root.dataset.theme || "light");
    updateThemeButton();
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "×" : "☰";
  });
}
document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

const dateInput = document.getElementById("date");
if (dateInput) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = localDate;
}

const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const name = formData.get("fullName").trim();
    const date = formData.get("date");
    const guests = formData.get("guests");
    const message = document.getElementById("formMessage");
    const readableDate = new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    message.textContent = `Thanks, ${name}! Your demo request for ${guests} guest(s) on ${readableDate} is ready. This is a sample confirmation, not a real booking.`;
    bookingForm.reset();
    if (dateInput) dateInput.min = new Date().toISOString().slice(0, 10);
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
if (lightbox && lightboxImage) {
  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      lightboxImage.src = item.dataset.full;
      lightboxImage.alt = item.querySelector("img").alt;
      lightbox.showModal();
    });
  });
  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) lightbox.close();
  });
}
