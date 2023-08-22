

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

if (submitted == true) {
    window.location.replace("https://iltisgraph.github.io/juwortgoe-2023-2024/submitted.html")
}

document.getElementById("submit").onclick = function() {
    let submitted_word = document.getElementById("word").value;

    submitted_word = submitted_word.trim()

    console.log("[DEBUG]: Got word: " + submitted_word);

    get(child(ref(db), "words")).then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val()
            // console.log(data)
            let k = Object.keys(data);
            let in_db = false;
            console.log(k);
            for (let key of k) {
                if (key === submitted_word) {
                    console.log("[DEBUG]: Word already in DB!");
                    in_db = true;
                    let counted = data[key]
                    console.log(data);
                    // console.log(counted)
                    // TODO: increase counter
                    set(ref(db, "words/"+key), {
                        count: counted["count"] + 1
                    });
                    
                }
            }

            if (in_db == false) {
                set(ref(db, "words/"+submitted_word), {
                    count: 1
                });
            }
            document.getElementById("texter").innerText = "Wort " + submitted_word + " erfolgreich eingereicht!";
            localStorage.setItem("submitted", true);

        } else {
            console.log("Bruh Moment rn");
        }
    });

}