export const firebaseConfig = {
  apiKey: "AIzaSyA2kL4dfWf1VzUWfdyXRFbtwAxsDVZhuK4",
  authDomain: "foodondoor-113a3.firebaseapp.com",
  projectId: "foodondoor-113a3",
  storageBucket: "foodondoor-113a3.firebasestorage.app",
  messagingSenderId: "328574858114",
  appId: "1:328574858114:web:085f30881ec66d1013559b",
  measurementId: "G-K4M2LGQQG6"
};

export const firebaseReady = !Object.values(firebaseConfig).some((value) => value.includes("REPLACE_ME"));
