// Aspetta che Firebase venga caricato prima di inizializzare
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Firebase.js caricato correttamente!");

    // Controlla se Firebase è stato caricato
    if (typeof firebase === "undefined") {
        console.error("❌ ERRORE: Firebase non è stato caricato correttamente! Controlla la versione nel tuo index.html.");
        return;
    }

    // Configurazione Firebase (Sostituisci con i tuoi dati reali)
    const firebaseConfig = {
        apiKey: "AIzaSyBgMtqvZYT4_IpL3Og7y_weXaQbFLQVXZc",
  authDomain: "inventario-sala.firebaseapp.com",
  databaseURL: "https://inventario-sala-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "inventario-sala",
  storageBucket: "inventario-sala.firebasestorage.app",
  messagingSenderId: "927791055578",
  appId: "1:927791055578:web:54c7988af98f1cc80fdbe3"
    };

    // Inizializza Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    console.log("✅ Firebase inizializzato correttamente!");

    // Funzione per salvare dati
    window.salvaDati = function () {
        db.ref('inventario/prodotto1').set({
            nome: "Laptop",
            prezzo: 1000
        }).then(() => {
            alert("✅ Dati salvati!");
        }).catch((error) => {
            alert("❌ Errore: " + error);
        });
    };

    // Funzione per leggere dati
    window.leggiDati = function () {
    db.ref('inventario').once('value', function(snapshot) {
        if (snapshot.exists()) {
            console.log("📥 Dati recuperati da Firebase:", snapshot.val());

            let inventario = snapshot.val();
            let productList = document.getElementById("product-list");

            // Svuota la lista prima di aggiungere nuovi elementi
            productList.innerHTML = "";

            for (let key in inventario) {
                let prodotto = inventario[key];

                let prodottoDiv = document.createElement("div");
                prodottoDiv.innerHTML = `<strong>${prodotto.nome}</strong> - Prezzo: €${prodotto.prezzo}`;
                productList.appendChild(prodottoDiv);
            }
        } else {
            console.log("⚠️ Nessun dato trovato in Firebase.");
            alert("⚠️ Nessun prodotto inserito.");
        }
    }, function(error) {
        console.error("❌ Errore nella lettura dei dati:", error);
    });
};
});
