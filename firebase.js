// Assicurati che Firebase sia caricato prima di usare il database
document.addEventListener("DOMContentLoaded", function() {
    // Configurazione Firebase (sostituisci con i tuoi dati)
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

    // Rendi le funzioni globali
    window.salvaDati = function() {
        db.ref('inventario/prodotto1').set({
            nome: "Laptop",
            prezzo: 1000
        }).then(() => {
            alert("Dati salvati!");
        }).catch((error) => {
            alert("Errore: " + error);
        });
    };

    window.leggiDati = function() {
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
