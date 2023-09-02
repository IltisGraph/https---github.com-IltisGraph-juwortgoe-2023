import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC1atInNimzJImRCvjoXYFstiYAkM1R61U",
    authDomain: "juwortgoe-2023.firebaseapp.com",
    projectId: "juwortgoe-2023",
    storageBucket: "juwortgoe-2023.appspot.com",
    messagingSenderId: "1076478840073",
    appId: "1:1076478840073:web:282fcc05a3c2a872a017d8",
    databaseURL: " https://juwortgoe-2023-default-rtdb.europe-west1.firebasedatabase.app",
    measurementId: "G-43GT04N7DD"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();


let submitted = localStorage.getItem("submitted")


if (submitted === "true2") {
    window.location.replace("./submitted.html");
}

function inc_counter(key) {
    get(child(ref(db), "words/" + key)).then((snapshot) => {
        let data = snapshot.val();
        let cur_count = data["count"];
        console.debug("got data from DB: " + cur_count);


        set(ref(db, "words/"+key), {
            count: cur_count + 1
        });
        console.debug("set data to db");

        localStorage.setItem("submitted", "true2");
        window.location.replace("./submitted.html");
    });
}

let names = ["npc", "yolo", "darf_er_so", "geringverdoener", "auf_lock", "kusch_dich"];
let dbNames = ["NPC", "Yolo", "Darf er so", "Geringverdöner", "Auf lock", "Kusch dich"]

for (let i = 0; i < names.length; i++) {
    document.getElementById(names[i]).onclick = function() {
        inc_counter(dbNames[i]);
    }
}