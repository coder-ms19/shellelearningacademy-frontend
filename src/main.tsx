import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";



// // Clear localStorage only once with detailed console logs
// if (localStorage.getItem("hasCleared")) {
//   console.group("LocalStorage Cleanup");

//   if (localStorage.length === 0) {
//     console.log("No localStorage data found.");
//   } else {
//     console.log("Removing the following keys:");
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       console.log(`🗑 Removed: ${key} =`, localStorage.getItem(key));
//     }
//   }

//   console.groupEnd();

//   localStorage.clear();
//   localStorage.setItem("hasCleared", "false");

//   console.log("✅ localStorage cleared for the first time only.");
// }



const APP_VERSION = "1";    // <-- change this to "2", "3", "4"... whenever you want a reset

if (localStorage.getItem("appVersion") !== APP_VERSION) {

  console.group("LocalStorage Cleanup (First time OR version changed)");

  // Save version BEFORE clearing
  localStorage.setItem("appVersion", APP_VERSION);

  // Clear all other keys
  Object.keys(localStorage).forEach(key => {
    if (key !== "appVersion") {
      localStorage.removeItem(key);
    }
  });

  console.groupEnd();

  console.log("✅ Storage cleared because version changed.");
}


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
