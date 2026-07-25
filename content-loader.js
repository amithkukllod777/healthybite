import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { firebaseConfig, firebaseReady } from "./firebase-config.js";

if (firebaseReady) {
  const db = getFirestore(initializeApp(firebaseConfig));
  const snapshot = await getDoc(doc(db, "public", "siteMedia"));
  if (snapshot.exists()) applyMedia(snapshot.data());
  const reviews = await getDocs(collection(db, "publishedReviews"));
  applyReviews(reviews.docs.map((item) => item.data()));
}

function applyReviews(reviews) {
  const wrap = document.querySelector("#reviews .quotes");
  if (!wrap || !reviews.length) return;
  const published = reviews.sort((a,b)=>(b.publishedAt?.seconds||0)-(a.publishedAt?.seconds||0)).slice(0,6);
  published.reverse().forEach((review) => {
    const figure = document.createElement("figure"); figure.className="quote customer-review";
    const rating = Math.max(1, Math.min(5, Number(review.rating)||1));
    figure.innerHTML=`<div class="review-stars" aria-label="${rating} out of 5 stars">${"★".repeat(rating)}${"☆".repeat(5-rating)}</div><blockquote></blockquote><figcaption></figcaption>`;
    figure.querySelector("blockquote").textContent=`“${review.review || ""}”`;
    figure.querySelector("figcaption").textContent=`— ${review.name || "Customer"}, ${review.city || "India"}${review.flavour ? ` · ${review.flavour}` : ""}${review.verifiedPurchase ? " · Verified purchase" : ""}`;
    wrap.prepend(figure);
  });
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
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?enablejsapi=1&playsinline=1&origin=${encodeURIComponent(location.origin)}`;
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
      const instagramEmbed = post.mediaType === "instagram" ? instagramEmbedUrl(post.url) : "";
      const media = instagramEmbed
        ? `<div class="social-instagram-embed ${/\/reels?\//i.test(post.url || "") ? "is-reel" : ""}"><iframe src="${instagramEmbed}" title="${escapeHtml(post.title || "Mr. Healthybite Instagram post")}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`
        : imageUrl
        ? `<img src="${imageUrl}" alt="${escapeHtml(post.title || "Mr. Healthybite social post")}" loading="lazy">`
        : `<div class="social-media-placeholder" aria-hidden="true"><span>◎</span><strong>@mr.healthybites</strong></div>`;
      return `<article class="social-card">${media}<div><h3>${escapeHtml(post.title || "From Mr. Healthybite")}</h3><p>${escapeHtml(post.caption || "View this post on Instagram")}</p><a href="${safeUrl(post.url)}" target="_blank" rel="noopener noreferrer">View post →</a></div></article>`;
    }).join("");
    socialGrid.querySelectorAll("img").forEach((img) => img.addEventListener("error", () => {
      const fallback = document.createElement("div");
      fallback.className = "social-media-placeholder";
      fallback.setAttribute("aria-hidden", "true");
      fallback.innerHTML = "<span>◎</span><strong>@mr.healthybites</strong>";
      img.replaceWith(fallback);
    }, { once: true }));
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

function instagramEmbedUrl(value = "") {
  try {
    const url = new URL(value);
    if (!/(^|\.)instagram\.com$/i.test(url.hostname)) return "";
    const match = url.pathname.match(/^\/(p|reel|reels|tv)\/([\w-]+)/i);
    return match ? `https://www.instagram.com/${match[1]}/${match[2]}/embed/` : "";
  } catch { return ""; }
}

function escapeHtml(value = "") {
  const node = document.createElement("div"); node.textContent = value; return node.innerHTML;
}
