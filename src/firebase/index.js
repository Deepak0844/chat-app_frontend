import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYwcjAa8gEKFQBaskTu3OQKPAi84oKH7k",
  authDomain: "chat-app-ad6a5.firebaseapp.com",
  projectId: "chat-app-ad6a5",
  storageBucket: "chat-app-ad6a5.appspot.com",
  messagingSenderId: "797643958339",
  appId: "1:797643958339:web:beb6fcd73abe07c5eb8cf6",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
