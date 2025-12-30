// mobile menu
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");

if (menuBtn && drawer) {
  menuBtn.addEventListener("click", () => {
    const open = drawer.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  drawer.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    drawer.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
}

// smooth scroll
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;

  const id = a.getAttribute("href");
  if (!id || id === "#") return;

  const el = document.querySelector(id);
  if (!el) return;

  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
});

// works filter
const chips = Array.from(document.querySelectorAll(".chip"));
const works = Array.from(document.querySelectorAll(".work"));

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;
    works.forEach((w) => {
      const t = w.dataset.type;
      const show = (filter === "all") || (t === filter);
      w.classList.toggle("is-hidden", !show);
    });
  });
});

// year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
