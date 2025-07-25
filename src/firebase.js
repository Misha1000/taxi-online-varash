// src/firebase.js

// 1) Імпортуємо функції з Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// 2) Це конфіг, який ти скопіюєш з консолі Firebase.
// ЗАМІНИ всі значення на свої з консолі Firebase!
const firebaseConfig = {
  apiKey: "AIzaSyAWIfAP4Q-XkKuz8qGzISk2nHRC37NuM8w",
  authDomain: "taxi-online-varash.firebaseapp.com",
  projectId: "taxi-online-varash",
  storageBucket: "taxi-online-varash.firebasestorage.app",
  messagingSenderId: "1003046715952",
  appId: "1:1003046715952:web:31c45185adb0406ba1a3f5",
  measurementId: "G-JK3GKWEH5M"
};

// 3) Ініціалізуємо Firebase ДОДАТОК
const app = initializeApp(firebaseConfig);

// 4) Створюємо інстанс авторизації (для входу по телефону)
const auth = getAuth(app);

// 5) Експортуємо все, що нам потрібно в інших файлах
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
