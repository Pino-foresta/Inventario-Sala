let products = [];
let activityLog = [];
const adminPassword = "admin123";
const userPassword = "user123";
let userRole = "";
let generatedBarcode = "";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("password").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            login();
        }
    });
    document.getElementById("login-button").addEventListener("click", login);
});

function login() {
    const password = document.getElementById("password").value;
    if (password === adminPassword) {
        userRole = "admin";
        showApp();
        document.querySelectorAll("button, #admin-section").forEach(el => el.style.display = "block");
    } else if (password === userPassword) {
        userRole = "user";
        showApp();
        document.getElementById("admin-section").style.display = "none";
        document.getElementById("generate-barcode-btn").style.display = "none";
        document.getElementById("add-product-btn").style.display = "none";
        document.getElementById("show-inventory-btn").style.display = "none";
        document.getElementById("show-log-btn").style.display = "none";
        document.getElementById("scanner-btn").style.display = "block";
    } else {
        alert("Password errata! Riprova.");
        document.getElementById("password").value = "";
    }
}
function showApp() {
    document.getElementById("app").style.display = "block";
    document.getElementById("login-container").style.display = "none";
}

function generateBarcode() {
    generatedBarcode = generateRandomBarcode();
    let barcodeElement = document.getElementById("barcode");
    barcodeElement.innerHTML = "";
    let img = document.createElement("img");
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${generatedBarcode}`;
    img.alt = "QR Code";
    barcodeElement.appendChild(img);
    
    let downloadButton = document.createElement("button");
    downloadButton.textContent = "Scarica Codice";
    downloadButton.addEventListener("click", function() {
        fetch(img.src)
            .then(response => response.blob())
            .then(blob => {
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "codice_barre.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            })
            .catch(error => console.error("Errore nel download dell'immagine", error));
    });
    barcodeElement.appendChild(downloadButton);
}

function showInventory() {
    let inventoryWindow = window.open("", "_blank");
    inventoryWindow.document.write("<html><head><title>Deposito Prodotti</title></head><body>");
    inventoryWindow.document.write("<h2>Deposito Prodotti</h2>");
    if (products.length === 0) {
        inventoryWindow.document.write("<p>Nessun prodotto memorizzato.</p>");
    } else {
        inventoryWindow.document.write("<table border='1'><tr><th>Nome</th><th>Descrizione</th><th>Quantità</th><th>Codice</th></tr>");
        products.forEach(prod => {
            inventoryWindow.document.write(`<tr><td>${prod.name}</td><td>${prod.desc}</td><td>${prod.qty}</td><td><img src='https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${prod.barcode}' alt='QR Code'></td></tr>`);
        });
        inventoryWindow.document.write("</table>");
    }
    inventoryWindow.document.write("<br><button onclick='window.print()'>Stampa / Salva PDF</button>");
    inventoryWindow.document.write("</body></html>");
    inventoryWindow.document.close();
}

function showLog() {
    let logWindow = window.open("", "_blank");
    logWindow.document.write("<html><head><title>Registro Attività</title></head><body>");
    logWindow.document.write("<h2>Registro Attività</h2>");
    if (activityLog.length === 0) {
        logWindow.document.write("<p>Nessuna attività registrata.</p>");
    } else {
        logWindow.document.write("<ul>");
        activityLog.forEach(entry => {
            logWindow.document.write(`<li>${entry}</li>`);
        });
        logWindow.document.write("</ul>");
    }
    logWindow.document.write("<br><button onclick='window.print()'>Stampa / Salva PDF</button>");
    logWindow.document.write("</body></html>");
    logWindow.document.close();
}
function generateRandomBarcode() {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}
function addManualProduct() {
    if (!generatedBarcode) {
        alert("Devi prima generare un codice a barre per il prodotto!");
        return;
    }
    const name = document.getElementById("manual-name").value.trim();
    const desc = document.getElementById("manual-description").value.trim();
    const qty = document.getElementById("manual-quantity").value;

    if (name && desc && qty > 0) {
        products.push({ name, desc, qty: parseInt(qty), barcode: generatedBarcode });
        activityLog.push(`Aggiunto manualmente: ${name} (${qty}) con codice a barre ${generatedBarcode}`);
        alert(`Prodotto aggiunto con successo! Codice a barre: ${generatedBarcode}`);
        generatedBarcode = "";
        clearForm();
    } else {
        alert("Compila tutti i campi correttamente!");
    }
}
function startScanner() {
    let video = document.getElementById("scanner-video");
    video.style.display = "block";
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            alert("Errore nell'accesso alla fotocamera: " + err);
        });
}

function handleScannedProduct(scannedCode) {
    let product = products.find(p => p.barcode === scannedCode);
    if (product) {
        let qtyChange;
        if (userRole === "admin") {
            qtyChange = parseInt(prompt(`Prodotto trovato: ${product.name} (Quantità: ${product.qty})\nInserisci il numero di unità da aggiungere o rimuovere:`));
        } else {
            qtyChange = parseInt(prompt(`Prodotto trovato: ${product.name} (Quantità: ${product.qty})\nInserisci il numero di unità da rimuovere (usa numeri negativi per rimuovere):`));
            if (qtyChange >= 0) {
                alert("Quantità non valida! Devi inserire un numero negativo per rimuovere unità.");
                return;
            }
        }

        if (!isNaN(qtyChange)) {
            product.qty += qtyChange;
            activityLog.push(`Modificato ${product.name}: ${qtyChange > 0 ? "aggiunte" : "rimosse"} ${Math.abs(qtyChange)} unità.`);
            alert(`Quantità aggiornata: ${product.qty}`);
        } else {
            alert("Quantità non valida!");
        }
    } else {
        alert("Codice non riconosciuto. Nessun prodotto trovato.");
    }
}


