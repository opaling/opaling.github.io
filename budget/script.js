// Gegevensopslag
let inkomsten = [];
let vasteLasten = [];
let variabeleUitgaven = [];

// Elementen selecteren
const inkomstenSectie = document.getElementById('inkomstenSectie');
const vasteLastenSectie = document.getElementById('vasteLastenSectie');
const variabeleUitgavenSectie = document.getElementById('variabeleUitgavenSectie');
const overzichtSectie = document.getElementById('overzichtSectie');

const inkomstenBtn = document.getElementById('inkomstenBtn');
const vasteLastenBtn = document.getElementById('vasteLastenBtn');
const variabeleUitgavenBtn = document.getElementById('variabeleUitgavenBtn');
const overzichtBtn = document.getElementById('overzichtBtn');

// Navigatie Event Listeners
inkomstenBtn.addEventListener('click', () => showSectie('inkomsten'));
vasteLastenBtn.addEventListener('click', () => showSectie('vasteLasten'));
variabeleUitgavenBtn.addEventListener('click', () => showSectie('variabeleUitgaven'));
overzichtBtn.addEventListener('click', () => {
    showSectie('overzicht');
    updateOverzicht();
});

// Functie om secties te tonen/verbergen
function showSectie(sectie) {
    inkomstenSectie.classList.add('hidden');
    vasteLastenSectie.classList.add('hidden');
    variabeleUitgavenSectie.classList.add('hidden');
    overzichtSectie.classList.add('hidden');

    switch (sectie) {
        case 'inkomsten':
            inkomstenSectie.classList.remove('hidden');
            break;
        case 'vasteLasten':
            vasteLastenSectie.classList.remove('hidden');
            break;
        case 'variabeleUitgaven':
            variabeleUitgavenSectie.classList.remove('hidden');
            break;
        case 'overzicht':
            overzichtSectie.classList.remove('hidden');
            break;
    }
}

// Inkomsten Functionaliteit
const inkomstenForm = document.getElementById('inkomstenForm');
const inkomstenTabel = document.getElementById('inkomstenTabel').getElementsByTagName('tbody')[0];

inkomstenForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const omschrijving = document.getElementById('inkomenOmschrijving').value;
    const bedrag = parseFloat(document.getElementById('inkomenBedrag').value);
    const frequentie = document.getElementById('inkomenFrequentie').value;

    const jaarbedrag = berekenJaarbedrag(bedrag, frequentie);

    const inkomen = {
        omschrijving,
        bedrag,
        frequentie,
        jaarbedrag
    };

    inkomsten.push(inkomen);
    updateInkomstenTabel();
    saveData();
    inkomstenForm.reset();
});

function updateInkomstenTabel() {
    inkomstenTabel.innerHTML = '';

    inkomsten.forEach(function(inkomen, index) {
        const row = inkomstenTabel.insertRow();

        row.insertCell(0).textContent = inkomen.omschrijving;
        row.insertCell(1).textContent = inkomen.bedrag.toFixed(2);
        row.insertCell(2).textContent = inkomen.frequentie;
        row.insertCell(3).textContent = inkomen.jaarbedrag.toFixed(2);

        // Optioneel: Voeg een verwijderknop toe
        const verwijderCell = row.insertCell(4);
        const verwijderBtn = document.createElement('button');
        verwijderBtn.textContent = 'Verwijderen';
        verwijderBtn.addEventListener('click', () => {
            inkomsten.splice(index, 1);
            updateInkomstenTabel();
            saveData();
        });
        verwijderCell.appendChild(verwijderBtn);
    });
}

// Vaste Lasten Functionaliteit
const vasteLastenForm = document.getElementById('vasteLastenForm');
const vasteLastenTabel = document.getElementById('vasteLastenTabel').getElementsByTagName('tbody')[0];

vasteLastenForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const omschrijving = document.getElementById('vasteLastOmschrijving').value;
    const bedrag = parseFloat(document.getElementById('vasteLastBedrag').value);
    const frequentie = document.getElementById('vasteLastFrequentie').value;

    const jaarbedrag = berekenJaarbedrag(bedrag, frequentie);

    const vasteLast = {
        omschrijving,
        bedrag,
        frequentie,
        jaarbedrag
    };

    vasteLasten.push(vasteLast);
    updateVasteLastenTabel();
    saveData();
    vasteLastenForm.reset();
});

function updateVasteLastenTabel() {
    vasteLastenTabel.innerHTML = '';

    vasteLasten.forEach(function(vasteLast, index) {
        const row = vasteLastenTabel.insertRow();

        row.insertCell(0).textContent = vasteLast.omschrijving;
        row.insertCell(1).textContent = vasteLast.bedrag.toFixed(2);
        row.insertCell(2).textContent = vasteLast.frequentie;
        row.insertCell(3).textContent = vasteLast.jaarbedrag.toFixed(2);

        // Optioneel: Voeg een verwijderknop toe
        const verwijderCell = row.insertCell(4);
        const verwijderBtn = document.createElement('button');
        verwijderBtn.textContent = 'Verwijderen';
        verwijderBtn.addEventListener('click', () => {
            vasteLasten.splice(index, 1);
            updateVasteLastenTabel();
            saveData();
        });
        verwijderCell.appendChild(verwijderBtn);
    });
}

// Variabele Uitgaven Functionaliteit
const variabeleUitgavenForm = document.getElementById('variabeleUitgavenForm');
const variabeleUitgavenTabel = document.getElementById('variabeleUitgavenTabel').getElementsByTagName('tbody')[0];

variabeleUitgavenForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const omschrijving = document.getElementById('variabeleUitgaveOmschrijving').value;
    const maandbedrag = parseFloat(document.getElementById('variabeleUitgaveBedrag').value);
    const jaarbedrag = maandbedrag * 12;

    const variabeleUitgave = {
        omschrijving,
        maandbedrag,
        jaarbedrag
    };

    variabeleUitgaven.push(variabeleUitgave);
    updateVariabeleUitgavenTabel();
    saveData();
    variabeleUitgavenForm.reset();
});

function updateVariabeleUitgavenTabel() {
    variabeleUitgavenTabel.innerHTML = '';

    variabeleUitgaven.forEach(function(variabeleUitgave, index) {
        const row = variabeleUitgavenTabel.insertRow();

        row.insertCell(0).textContent = variabeleUitgave.omschrijving;
        row.insertCell(1).textContent = variabeleUitgave.maandbedrag.toFixed(2);
        row.insertCell(2).textContent = variabeleUitgave.jaarbedrag.toFixed(2);

        // Optioneel: Voeg een verwijderknop toe
        const verwijderCell = row.insertCell(3);
        const verwijderBtn = document.createElement('button');
        verwijderBtn.textContent = 'Verwijderen';
        verwijderBtn.addEventListener('click', () => {
            variabeleUitgaven.splice(index, 1);
            updateVariabeleUitgavenTabel();
            saveData();
        });
        verwijderCell.appendChild(verwijderBtn);
    });
}

// Functie om jaarbedrag te berekenen
function berekenJaarbedrag(bedrag, frequentie) {
    switch (frequentie) {
        case 'maandelijks':
            return bedrag * 12;
        case 'per kwartaal':
            return bedrag * 4;
        case 'jaarlijks':
            return bedrag;
        default:
            return 0;
    }
}

// Overzicht updaten
function updateOverzicht() {
    const totaalInkomen = inkomsten.reduce((sum, inkomen) => sum + inkomen.jaarbedrag, 0);
    const totaalVasteLasten = vasteLasten.reduce((sum, vasteLast) => sum + vasteLast.jaarbedrag, 0);
    const totaalVariabeleUitgaven = variabeleUitgaven.reduce((sum, variabeleUitgave) => sum + variabeleUitgave.jaarbedrag, 0);
    const saldo = totaalInkomen - (totaalVasteLasten + totaalVariabeleUitgaven);

    document.getElementById('totaalInkomen').textContent = totaalInkomen.toFixed(2);
    document.getElementById('totaalVasteLasten').textContent = totaalVasteLasten.toFixed(2);
    document.getElementById('totaalVariabeleUitgaven').textContent = totaalVariabeleUitgaven.toFixed(2);
    document.getElementById('saldo').textContent = saldo.toFixed(2);

    updateGrafiek();
}

// Grafiek updaten met Chart.js
function updateGrafiek() {
    const ctx = document.getElementById('uitgavenGrafiek').getContext('2d');

    // Controleer of er al een grafiek bestaat en vernietig deze om overlappende grafieken te voorkomen
    if (window.bar != undefined) 
        window.bar.destroy(); 

    window.bar = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Vaste Lasten', 'Variabele Uitgaven'],
            datasets: [{
                data: [
                    vasteLasten.reduce((sum, vasteLast) => sum + vasteLast.jaarbedrag, 0),
                    variabeleUitgaven.reduce((sum, variabeleUitgave) => sum + variabeleUitgave.jaarbedrag, 0)
                ],
                backgroundColor: ['#36A2EB', '#FF6384'],
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Uitgavenverdeling'
            }
        }
    });
}

// Gegevens opslaan in LocalStorage
function saveData() {
    localStorage.setItem('inkomsten', JSON.stringify(inkomsten));
    localStorage.setItem('vasteLasten', JSON.stringify(vasteLasten));
    localStorage.setItem('variabeleUitgaven', JSON.stringify(variabeleUitgaven));
}

// Gegevens laden uit LocalStorage
function loadData() {
    const inkomstenData = localStorage.getItem('inkomsten');
    const vasteLastenData = localStorage.getItem('vasteLasten');
    const variabeleUitgavenData = localStorage.getItem('variabeleUitgaven');

    if (inkomstenData) {
        inkomsten = JSON.parse(inkomstenData);
        updateInkomstenTabel();
    }

    if (vasteLastenData) {
        vasteLasten = JSON.parse(vasteLastenData);
        updateVasteLastenTabel();
    }

    if (variabeleUitgavenData) {
        variabeleUitgaven = JSON.parse(variabeleUitgavenData);
        updateVariabeleUitgavenTabel();
    }
}

// Applicatie initialiseren
window.addEventListener('load', function() {
    loadData();
    showSectie('inkomsten');
});