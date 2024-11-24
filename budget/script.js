// Arrays om gegevens op te slaan
let inkomsten = [];
let vasteLasten = [];
let variabeleUitgaven = [];

// Elementen selecteren
const inkomenForm = document.getElementById('inkomenForm');
const vasteLastForm = document.getElementById('vasteLastForm');
const variabeleUitgaveForm = document.getElementById('variabeleUitgaveForm');

const inkomenTabel = document.getElementById('inkomenTabel').getElementsByTagName('tbody')[0];
const vasteLastTabel = document.getElementById('vasteLastTabel').getElementsByTagName('tbody')[0];
const variabeleUitgaveTabel = document.getElementById('variabeleUitgaveTabel').getElementsByTagName('tbody')[0];

const totaalInkomenEl = document.getElementById('totaalInkomen');
const totaalUitgavenEl = document.getElementById('totaalUitgaven');
const saldoEl = document.getElementById('saldo');

// Nieuw: Elementen voor beschrijving opties
const customBeschrijvingOption = document.getElementById('customBeschrijvingOption');
const standardBeschrijvingOption = document.getElementById('standardBeschrijvingOption');
const inkomenBeschrijving = document.getElementById('inkomenBeschrijving');
const inkomenBeschrijvingDropdown = document.getElementById('inkomenBeschrijvingDropdown');

// Event listener voor de keuze tussen invulveld en dropdownmenu
customBeschrijvingOption.addEventListener('change', toggleBeschrijvingInput);
standardBeschrijvingOption.addEventListener('change', toggleBeschrijvingInput);

function toggleBeschrijvingInput() {
    if (customBeschrijvingOption.checked) {
        inkomenBeschrijving.style.display = 'block';
        inkomenBeschrijvingDropdown.style.display = 'none';
    } else {
        inkomenBeschrijving.style.display = 'none';
        inkomenBeschrijvingDropdown.style.display = 'block';
    }
}

// Event listener voor Inkomen Formulier
inkomenForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let beschrijving = '';
    if (customBeschrijvingOption.checked) {
        beschrijving = inkomenBeschrijving.value.trim();
        if (!beschrijving) {
            alert('Vul alstublieft een beschrijving in.');
            return;
        }
    } else if (standardBeschrijvingOption.checked) {
        beschrijving = inkomenBeschrijvingDropdown.value;
        if (!beschrijving) {
            alert('Selecteer alstublieft een beschrijving uit de lijst.');
            return;
        }
    }

    const bedrag = parseFloat(document.getElementById('inkomenBedrag').value);
    if (isNaN(bedrag)) {
        alert('Vul alstublieft een geldig bedrag in.');
        return;
    }
    const frequentie = document.getElementById('inkomenFrequentie').value;

    const jaarbedrag = berekenJaarbedrag(bedrag, frequentie);

    const inkomen = {
        beschrijving,
        bedrag,
        frequentie,
        jaarbedrag
    };

    inkomsten.push(inkomen);
    updateInkomenTabel();
    updateTotalen();
    saveData();
    inkomenForm.reset();

    // Reset de keuze naar standaard (eigen beschrijving)
    customBeschrijvingOption.checked = true;
    toggleBeschrijvingInput();
});

// Event listener voor Vaste Lasten Formulier
vasteLastForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const beschrijving = document.getElementById('vasteLastBeschrijving').value.trim();
    if (!beschrijving) {
        alert('Vul alstublieft een beschrijving in.');
        return;
    }
    const bedrag = parseFloat(document.getElementById('vasteLastBedrag').value);
    if (isNaN(bedrag)) {
        alert('Vul alstublieft een geldig bedrag in.');
        return;
    }
    const frequentie = document.getElementById('vasteLastFrequentie').value;

    const jaarbedrag = berekenJaarbedrag(bedrag, frequentie);

    const vasteLast = {
        beschrijving,
        bedrag,
        frequentie,
        jaarbedrag
    };

    vasteLasten.push(vasteLast);
    updateVasteLastTabel();
    updateTotalen();
    saveData();
    vasteLastForm.reset();
});

// Event listener voor Variabele Uitgaven Formulier
variabeleUitgaveForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const beschrijving = document.getElementById('variabeleUitgaveBeschrijving').value.trim();
    if (!beschrijving) {
        alert('Vul alstublieft een beschrijving in.');
        return;
    }
    const bedrag = parseFloat(document.getElementById('variabeleUitgaveBedrag').value);
    if (isNaN(bedrag)) {
        alert('Vul alstublieft een geldig bedrag in.');
        return;
    }

    const jaarbedrag = bedrag * 12;

    const variabeleUitgave = {
        beschrijving,
        bedrag,
        jaarbedrag
    };

    variabeleUitgaven.push(variabeleUitgave);
    updateVariabeleUitgaveTabel();
    updateTotalen();
    saveData();
    variabeleUitgaveForm.reset();
});

// Functie om jaarbedrag te berekenen
function berekenJaarbedrag(bedrag, frequentie) {
    switch (frequentie) {
        case 'Maandelijks':
            return bedrag * 12;
        case 'Per kwartaal':
            return bedrag * 4;
        case 'Jaarlijks':
            return bedrag;
        default:
            return 0;
    }
}

// Functies om tabellen te updaten
function updateInkomenTabel() {
    inkomenTabel.innerHTML = '';
    inkomsten.forEach(function(inkomen, index) {
        const row = inkomenTabel.insertRow();

        row.insertCell(0).textContent = inkomen.beschrijving;
        row.insertCell(1).textContent = inkomen.bedrag.toFixed(2);
        row.insertCell(2).textContent = inkomen.frequentie;
        row.insertCell(3).textContent = inkomen.jaarbedrag.toFixed(2);

        // Verwijderknop toevoegen
        const verwijderCell = row.insertCell(4);
        const verwijderButton = document.createElement('button');
        verwijderButton.textContent = 'Verwijderen';
        verwijderButton.className = 'btn btn-danger btn-sm';
        verwijderButton.addEventListener('click', function() {
            inkomsten.splice(index, 1);
            updateInkomenTabel();
            updateTotalen();
            saveData();
        });
        verwijderCell.appendChild(verwijderButton);
    });
}

function updateVasteLastTabel() {
    vasteLastTabel.innerHTML = '';
    vasteLasten.forEach(function(vasteLast, index) {
        const row = vasteLastTabel.insertRow();

        row.insertCell(0).textContent = vasteLast.beschrijving;
        row.insertCell(1).textContent = vasteLast.bedrag.toFixed(2);
        row.insertCell(2).textContent = vasteLast.frequentie;
        row.insertCell(3).textContent = vasteLast.jaarbedrag.toFixed(2);

        // Verwijderknop toevoegen
        const verwijderCell = row.insertCell(4);
        const verwijderButton = document.createElement('button');
        verwijderButton.textContent = 'Verwijderen';
        verwijderButton.className = 'btn btn-danger btn-sm';
        verwijderButton.addEventListener('click', function() {
            vasteLasten.splice(index, 1);
            updateVasteLastTabel();
            updateTotalen();
            saveData();
        });
        verwijderCell.appendChild(verwijderButton);
    });
}

function updateVariabeleUitgaveTabel() {
    variabeleUitgaveTabel.innerHTML = '';
    variabeleUitgaven.forEach(function(uitgave, index) {
        const row = variabeleUitgaveTabel.insertRow();

        row.insertCell(0).textContent = uitgave.beschrijving;
        row.insertCell(1).textContent = uitgave.bedrag.toFixed(2);
        row.insertCell(2).textContent = uitgave.jaarbedrag.toFixed(2);

        // Verwijderknop toevoegen
        const verwijderCell = row.insertCell(3);
        const verwijderButton = document.createElement('button');
        verwijderButton.textContent = 'Verwijderen';
        verwijderButton.className = 'btn btn-danger btn-sm';
        verwijderButton.addEventListener('click', function() {
            variabeleUitgaven.splice(index, 1);
            updateVariabeleUitgaveTabel();
            updateTotalen();
            saveData();
        });
        verwijderCell.appendChild(verwijderButton);
    });
}

// Functie om totalen te updaten
function updateTotalen() {
    const totaalInkomen = inkomsten.reduce((sum, inkomen) => sum + inkomen.jaarbedrag, 0);
    const totaalVasteLasten = vasteLasten.reduce((sum, last) => sum + last.jaarbedrag, 0);
    const totaalVariabeleUitgaven = variabeleUitgaven.reduce((sum, uitgave) => sum + uitgave.jaarbedrag, 0);
    const totaalUitgaven = totaalVasteLasten + totaalVariabeleUitgaven;

    const saldo = totaalInkomen - totaalUitgaven;

    totaalInkomenEl.textContent = totaalInkomen.toFixed(2);
    totaalUitgavenEl.textContent = totaalUitgaven.toFixed(2);
    saldoEl.textContent = saldo.toFixed(2);

    updateGrafiek();
}

// Functie om gegevens op te slaan in LocalStorage
function saveData() {
    localStorage.setItem('inkomsten', JSON.stringify(inkomsten));
    localStorage.setItem('vasteLasten', JSON.stringify(vasteLasten));
    localStorage.setItem('variabeleUitgaven', JSON.stringify(variabeleUitgaven));
}

// Functie om gegevens te laden uit LocalStorage
function loadData() {
    const inkomstenData = localStorage.getItem('inkomsten');
    const vasteLastenData = localStorage.getItem('vasteLasten');
    const variabeleUitgavenData = localStorage.getItem('variabeleUitgaven');

    if (inkomstenData) {
        inkomsten = JSON.parse(inkomstenData);
        updateInkomenTabel();
    }

    if (vasteLastenData) {
        vasteLasten = JSON.parse(vasteLastenData);
        updateVasteLastTabel();
    }

    if (variabeleUitgavenData) {
        variabeleUitgaven = JSON.parse(variabeleUitgavenData);
        updateVariabeleUitgaveTabel();
    }

    updateTotalen();
}

// Variabele voor de grafiek
let myPieChart;

// Functie om de uitgavengrafiek te updaten
function updateGrafiek() {
    // Controleer of de grafiek al bestaat en vernietig deze
    if (myPieChart) {
        myPieChart.destroy();
    }

    const categorieUitgaven = {};

    vasteLasten.forEach(function(last) {
        if (categorieUitgaven[last.beschrijving]) {
            categorieUitgaven[last.beschrijving] += last.jaarbedrag;
        } else {
            categorieUitgaven[last.beschrijving] = last.jaarbedrag;
        }
    });

    variabeleUitgaven.forEach(function(uitgave) {
        if (categorieUitgaven[uitgave.beschrijving]) {
            categorieUitgaven[uitgave.beschrijving] += uitgave.jaarbedrag;
        } else {
            categorieUitgaven[uitgave.beschrijving] = uitgave.jaarbedrag;
        }
    });

    const data = {
        labels: Object.keys(categorieUitgaven),
        datasets: [{
            data: Object.values(categorieUitgaven),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#E7E9ED',
                '#8A2BE2',
                '#00FF7F',
                '#DC143C',
                '#FFD700',
                '#7FFF00',
                '#00CED1',
                '#FF1493',
                '#ADFF2F',
                '#FF69B4',
                '#CD5C5C'
            ]
        }]
    };

    const config = {
        type: 'pie',
        data: data,
    };

    const ctx = document.getElementById('uitgavenGrafiek').getContext('2d');
    myPieChart = new Chart(ctx, config);
}

// Gegevens laden bij het opstarten
window.addEventListener('load', function() {
    loadData();
    toggleBeschrijvingInput();
});