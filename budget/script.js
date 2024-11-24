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

// Voeg deze regel toe om bij het laden de juiste velden te tonen
window.addEventListener('load', function() {
    loadData();
    toggleBeschrijvingInput();
});

// ... Rest van de code blijft ongewijzigd ...