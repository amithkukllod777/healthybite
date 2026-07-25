import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";
import { firebaseConfig, firebaseReady } from "./firebase-config.js";

const $ = (selector) => document.querySelector(selector);
const defaults = { videos: Array.from({length:3},()=>({url:"",title:"",description:"",visible:true})), social: [], gallery: Array.from({length:6},()=>({url:"",alt:""})) };
let state = structuredClone(defaults), auth, db, storage;

if (!firebaseReady) { $("#setup-warning").hidden=false; $("#login-form button").disabled=true; }
else {
  const app=initializeApp(firebaseConfig); auth=getAuth(app); db=getFirestore(app); storage=getStorage(app);
  onAuthStateChanged(auth, async(user)=>{
    if (user) {
      const access = await getDoc(doc(db,"admins",user.uid));
      if (!access.exists()) { await signOut(auth); $("#login-status").textContent="This account does not have admin access."; return; }
    }
    $("#login-panel").hidden=!!user; $("#editor").hidden=!user; $("#logout").hidden=!user; if(user) { await load(); await loadReviews(); }
  });
}

$("#login-form").addEventListener("submit",async(e)=>{e.preventDefault();try{$("#login-status").textContent="Signing in…";await signInWithEmailAndPassword(auth,$("#email").value,$("#password").value);$("#login-status").textContent=""}catch(err){$("#login-status").textContent="Login failed. Check credentials and admin access."}});
$("#logout").addEventListener("click",()=>signOut(auth));
document.querySelectorAll(".tab").forEach(button=>button.addEventListener("click",()=>{document.querySelectorAll(".tab,.editor-panel").forEach(x=>x.classList.remove("active"));button.classList.add("active");$("#"+button.dataset.panel).classList.add("active")}));
$(".add-item").addEventListener("click",()=>{state.social.push({url:"",imageUrl:"",mediaType:"image",title:"",caption:"",visible:true});render()});
$("#refresh-reviews").addEventListener("click",loadReviews);

async function load(){const snap=await getDoc(doc(db,"public","siteMedia"));if(snap.exists())state={...structuredClone(defaults),...snap.data()};render()}
function render(){renderVideos();renderSocial();renderGallery()}
function renderVideos(){$("#video-fields").innerHTML=state.videos.slice(0,3).map((v,i)=>item(`Video ${i+1}`,`<div class="grid"><label>YouTube URL<input data-path="videos.${i}.url" value="${esc(v.url)}" placeholder="https://youtube.com/watch?v=..."></label><label>Title<input data-path="videos.${i}.title" value="${esc(v.title)}"></label></div><label>Description<textarea data-path="videos.${i}.description">${esc(v.description)}</textarea></label><label class="check"><input type="checkbox" data-path="videos.${i}.visible" ${v.visible!==false?"checked":""}> Show on website</label>`)).join("")}
function renderSocial(){$("#social-fields").innerHTML=state.social.map((v,i)=>item(`Social post ${i+1}`,`<button type="button" class="remove" data-remove="${i}">Remove</button><div class="grid"><label>Display type<select data-path="social.${i}.mediaType"><option value="image" ${v.mediaType!=="instagram"?"selected":""}>Image card</option><option value="instagram" ${v.mediaType==="instagram"?"selected":""}>Playable Instagram post / Reel</option></select></label><label>Instagram post or Reel URL<input data-path="social.${i}.url" value="${esc(v.url)}" placeholder="https://www.instagram.com/reel/..."></label><label>Display image URL<input data-path="social.${i}.imageUrl" value="${esc(v.imageUrl)}"></label><label>Title<input data-path="social.${i}.title" value="${esc(v.title)}"></label><label>Caption<input data-path="social.${i}.caption" value="${esc(v.caption)}"></label></div><label>Or upload image <span>(used for Image card)</span><input type="file" accept="image/*" data-upload="social.${i}.imageUrl"></label><label class="check"><input type="checkbox" data-path="social.${i}.visible" ${v.visible!==false?"checked":""}> Show on website</label>`)).join("");document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{state.social.splice(+b.dataset.remove,1);render()})}
function renderGallery(){$("#gallery-fields").innerHTML=state.gallery.slice(0,6).map((v,i)=>item(`Gallery image ${i+1}`,`<div class="grid"><label>Image URL<input data-path="gallery.${i}.url" value="${esc(v.url)}"></label><label>Alternative text<input data-path="gallery.${i}.alt" value="${esc(v.alt)}"></label></div><label>Or upload replacement<input type="file" accept="image/*" data-upload="gallery.${i}.url"></label>`)).join("")}
function item(title,body){return `<article class="media-item"><h3>${title}</h3>${body}</article>`}
function esc(v=""){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}

$("#media-form").addEventListener("change",async(e)=>{const el=e.target;if(el.dataset.path)setPath(el.dataset.path,el.type==="checkbox"?el.checked:el.value);if(el.dataset.upload&&el.files?.[0]){const status=$("#save-status");try{status.textContent="Uploading image…";const file=el.files[0];if(file.size>5*1024*1024)throw new Error("Image must be under 5 MB");const path=`site-media/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,"-")}`;await uploadBytes(ref(storage,path),file,{contentType:file.type});const url=await getDownloadURL(ref(storage,path));const targetPath=el.dataset.upload;setPath(targetPath,url);const urlInput=document.querySelector(`[data-path="${targetPath}"]`);if(urlInput)urlInput.value=url;status.textContent="Image uploaded. Save changes to publish."}catch(err){status.textContent=err.message}}});
$("#media-form").addEventListener("submit",async(e)=>{e.preventDefault();document.querySelectorAll("[data-path]").forEach(el=>setPath(el.dataset.path,el.type==="checkbox"?el.checked:el.value));try{$("#save-status").textContent="Saving…";await setDoc(doc(db,"public","siteMedia"),state);$("#save-status").textContent="Changes published."}catch{$("#save-status").textContent="Save failed. Check admin permissions."}});
function setPath(path,value){const parts=path.split(".");let target=state;parts.slice(0,-1).forEach(k=>target=target[k]);target[parts.at(-1)]=value}

async function loadReviews(){
  const wrap=$("#review-fields"); wrap.innerHTML="<p>Loading reviews…</p>";
  try {
    const snap=await getDocs(collection(db,"reviewSubmissions"));
    const reviews=snap.docs.map(d=>({id:d.id,...d.data()})).filter(r=>r.status==="pending").sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
    if(!reviews.length){wrap.innerHTML="<p>No pending reviews.</p>";return}
    wrap.innerHTML=reviews.map(r=>`<article class="media-item review-admin-card" data-review-id="${r.id}"><h3>${stars(r.rating)} <span>${esc(r.flavour||"")}</span></h3><blockquote>${esc(r.review||"")}</blockquote><p><strong>${esc(r.name||"")}</strong> · ${esc(r.city||"")}</p><p class="review-order">Order: ${esc(r.orderNumber||"Not provided")}</p><div class="review-actions"><button type="button" data-approve="${r.id}">Approve</button>${r.orderNumber?`<button type="button" class="secondary" data-verify="${r.id}">Verify &amp; approve</button>`:""}<button type="button" class="remove" data-reject="${r.id}">Reject</button></div></article>`).join("");
    wrap.querySelectorAll("[data-approve]").forEach(b=>b.onclick=()=>moderate(b.dataset.approve,true,reviews.find(r=>r.id===b.dataset.approve),false));
    wrap.querySelectorAll("[data-verify]").forEach(b=>b.onclick=()=>moderate(b.dataset.verify,true,reviews.find(r=>r.id===b.dataset.verify),true));
    wrap.querySelectorAll("[data-reject]").forEach(b=>b.onclick=()=>moderate(b.dataset.reject,false));
  } catch { wrap.innerHTML="<p>Could not load reviews. Check Firestore rules.</p>"; }
}
async function moderate(id,approve,review,verifiedPurchase=false){
  const status=$("#save-status"); status.textContent=approve?"Publishing review…":"Rejecting review…";
  try {
    if(approve) await setDoc(doc(db,"publishedReviews",id),{name:review.name,city:review.city,flavour:review.flavour,rating:review.rating,review:review.review,verifiedPurchase,publishedAt:serverTimestamp()});
    await deleteDoc(doc(db,"reviewSubmissions",id)); status.textContent=approve?"Review published.":"Review rejected."; await loadReviews();
  } catch { status.textContent="Action failed. Check Firestore permissions."; }
}
function stars(value){return "★".repeat(Math.max(1,Math.min(5,Number(value)||1)))+"☆".repeat(5-Math.max(1,Math.min(5,Number(value)||1)))}
