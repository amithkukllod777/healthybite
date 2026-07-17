import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { firebaseConfig, firebaseReady } from "./firebase-config.js";

if (firebaseReady) {
  const db = getFirestore(initializeApp(firebaseConfig));
  const snapshot = await getDoc(doc(db, "public", "siteMedia"));
  if (snapshot.exists()) applyMedia(snapshot.data());
}

function youtubeId(value = "") {
  const match = value.trim().match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  return match?.[1] || (/^[\w-]{6,}$/.test(value.trim()) ? value.trim() : "");
}

function applyMedia(data) {
  (data.videos || []).slice(0, 3).forEach((video, index) => {
    const card = document.querySelector(`[data-video-slot="${index}"]`);
    if (!card) return;
    card.hidden = video.visible === false;
    const id = youtubeId(video.url);
    const holder = card.querySelector(".video-embed");
    holder.classList.toggle("is-short", /youtube\.com\/shorts\//i.test(video.url || ""));
    if (id) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
      iframe.title = video.title || "Kuddle Super Meal video";
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      holder.replaceChildren(iframe);
    }
    card.querySelector("h3").textContent = video.title || "Kuddle video";
    card.querySelector(".video-copy p").textContent = video.description || "";
  });

  const socialGrid = document.getElementById("social-grid");
  const social = (data.social || []).filter((post) => post.visible !== false).slice(0, 6);
  if (socialGrid && social.length) {
    socialGrid.innerHTML = social.map((post) => {
      const imageUrl = safeUrl(post.imageUrl);
      const media = imageUrl
        ? `<img src="${imageUrl}" alt="${escapeHtml(post.title || "Mr. Healthybite social post")}" loading="lazy">`
        : `<div class="social-media-placeholder" aria-hidden="true"><span>◎</span><strong>@mr.healthybites</strong></div>`;
      return `<a class="social-card" href="${safeUrl(post.url)}" target="_blank" rel="noopener noreferrer">${media}<div><h3>${escapeHtml(post.title || "From Mr. Healthybite")}</h3><p>${escapeHtml(post.caption || "View this post on Instagram")}</p><span>View post →</span></div></a>`;
    }).join("");
  }

  (data.gallery || []).slice(0, 6).forEach((item, index) => {
    const image = document.querySelector(`[data-gallery-slot="${index}"] img`);
    if (!image || !item.url) return;
    image.src = safeUrl(item.url);
    image.alt = item.alt || "Kuddle Super Meal";
  });
}

function safeUrl(value = "") {
  try { const url = new URL(value, location.origin); return ["http:", "https:"].includes(url.protocol) ? url.href : ""; }
  catch { return ""; }
}

function escapeHtml(value = "") {
  const node = document.createElement("div"); node.textContent = value; return node.innerHTML;
}
