// HealthyBite — landing page interactions

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// YouTube embeds: paste only the video ID into data-youtube-id in index.html.
document.querySelectorAll(".video-embed[data-youtube-id]").forEach((holder) => {
  const videoId = holder.dataset.youtubeId.trim();
  if (!videoId) return;

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`;
  iframe.title = holder.dataset.title || "Kuddle Super Meal video";
  iframe.loading = "lazy";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;
  holder.replaceChildren(iframe);
});

// Signup form (demo — no backend)
const form = document.getElementById("signup-form");
const note = document.getElementById("form-note");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = /** @type {HTMLInputElement} */ (document.getElementById("email"));
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    if (!valid) {
      note.textContent = "Please enter a valid email address.";
      email.focus();
      return;
    }
    note.textContent = "🎉 You're in! Check your inbox for your 40% discount.";
    form.reset();
  });
}
