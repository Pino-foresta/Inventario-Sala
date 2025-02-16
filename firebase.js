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
    window.salvaDati = function () {
    let nomeProdotto = document.getElementById("manual-name").value;
    let descrizioneProdotto = document.getElementById("manual-description").value;
    let quantitaProdotto = document.getElementById("manual-quantity").value;
    let codiceProdotto = Date.now().toString(); // Genera un ID univoco

    if (!nomeProdotto || !quantitaProdotto) {
        alert("❌ Devi inserire almeno il nome e la quantità del prodotto.");
        return;
    }

    let nuovoProdotto = {
        nome: nomeProdotto,
        descrizione: descrizioneProdotto,
        quantita: quantitaProdotto,
        codice: codiceProdotto
    };

    let nuovoID = db.ref('inventario').push().key; // Genera un nuovo ID nel database
    db.ref('inventario/' + nuovoID).set(nuovoProdotto)
        .then(() => {
            alert("✅ Prodotto salvato con successo!");
            document.getElementById("manual-name").value = "";
            document.getElementById("manual-description").value = "";
            document.getElementById("manual-quantity").value = "";
        })
        .catch((error) => {
            alert("❌ Errore nel salvataggio: " + error);
        });
};

});
