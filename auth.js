import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged,
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbEX3WU-ojAyc9VrWagDaIt2_gBnPfcj4",
  authDomain: "personal-budget-1cbbe.firebaseapp.com",
  databaseURL: "https://personal-budget-1cbbe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "personal-budget-1cbbe",
  storageBucket: "personal-budget-1cbbe.firebasestorage.app",
  messagingSenderId: "133591748262",
  appId: "1:133591748262:web:2c0846f03f5f56aeb1ee67"
};

const ADMIN_UID = "7Viwom2PvuOh3l8nOGhIg8rOvj52";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* 🔒 Protect Secure Pages */
export function protectPage() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    if (user.uid !== ADMIN_UID) {
      alert("Access Denied");
      signOut(auth);
      window.location.href = "index.html";
      return;
    }

    // Show page after verification
    document.body.style.display = "flex";
  });
}

/* 🔁 Redirect if already logged in */
export function redirectIfLoggedIn() {
  onAuthStateChanged(auth, (user) => {
    if (user && user.uid === ADMIN_UID) {
      window.location.href = "index.html";
    }
  });
}

/* 🚪 Logout Function */
export function logout() {
 signOut(auth).then(() => {
 window.location.href = "main.html";
 });
}
export { auth };

