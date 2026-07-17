import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { firebaseConfig, firebaseReady } from "./firebase-config.js";

const form = document.getElementById("review-form");
const status = document.getElementById("review-status");

if (form && firebaseReady) {
  const app = getApps()[0] || initializeApp(firebaseConfig);
  const db = getFirestore(app);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const review = String(data.get("review") || "").trim();
    if (review.length < 20) { status.textContent = "Please write at least 20 characters."; return; }
    const button = form.querySelector("button[type=submit]");
    button.disabled = true; status.textContent = "Submitting…";
    try {
      await addDoc(collection(db, "reviewSubmissions"), {
        name: String(data.get("name") || "").trim(), city: String(data.get("city") || "").trim(),
        flavour: String(data.get("flavour") || ""), orderNumber: String(data.get("orderNumber") || "").trim(),
        rating: Number(data.get("rating")), review, consent: data.get("consent") === "on",
        status: "pending", createdAt: serverTimestamp()
      });
      form.reset(); status.textContent = "Thank you. Your review was submitted for moderation.";
    } catch { status.textContent = "Review could not be submitted. Please try again."; }
    finally { button.disabled = false; }
  });
}

