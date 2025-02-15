// Aspetta che la pagina sia completamente caricata prima di eseguire il codice
document.addEventListener("DOMContentLoaded", function () {
    console.log("Firebase.js caricato correttamente!");

    // Controlla se Firebase è stato caricato
    if (typeof firebase === "undefined") {
        console.error("Errore: Firebase non è stato caricato correttamente!");
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

    console.log("Firebase inizializzato correttamente!");

    // RENDI LE FUNZIONI GLOBALI (così i bottoni onclick possono trovarle)
    window.salvaDati = function () {
        db.ref('inventario/prodotto1').set({
            nome: "Laptop",
            prezzo: 1000
        }).then(() => {
            alert("Dati salvati!");
        }).catch((error) => {
            alert("Errore: " + error);
        });
    };

    window.leggiDati = function () {
        db.ref('inventario/prodotto1').get().then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                alert("Dati letti: " + JSON.stringify(snapshot.val()));
            } else {
                console.log("Nessun dato trovato");
                alert("Nessun dato trovato");
            }
        }).catch((error) => {
            console.error("Errore: ", error);
        });
    };
});


