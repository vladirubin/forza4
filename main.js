let giocatore1 = true;
let giocatore2 = false;
let turnoAttuale = giocatore1;
let board = [];
let box
let i1, j1
let mosseGiocatore1 = mosseGiocatore2 = 0;
let tempo = 0;
let tempoG1 = 0;
let tempoG2 = 0;
let intervallo1;
let intervallo2;

for (let i = 0; i < 6; i++) {
    let currentRow = []
    for (let j = 0; j < 7; j++) {
        box = document.createElement("div");
        box.style.backgroundColor = "white";
        box.className = "boxes"
        box.id = i.toString() + "-" + j.toString();
        box.addEventListener("click", nonloso)
        document.getElementById("container").append(box)
        currentRow.push(box);
    }
    board.push(currentRow);
}
console.log(board)

function nonloso() {
    let tile = this;
    if (tile.style.backgroundColor === "red" || tile.style.backgroundColor === "yellow") {
        return;
    }
    if (giocatore1) {
        clearInterval(intervallo1)
        clearInterval(intervallo2);
        document.getElementById("body").style.background = "linear-gradient(to right, #e6e989, #dff728)"
        intervallo2 = setInterval(() => {
            tempoG2++
            console.log(tempoG2)
        }, 1000)
        mosseGiocatore1++;
        tile.style.backgroundColor = "red";
        [i1, j1] = tile.id.split("-").map(Number)
        board[i1][j1].style.backgroundColor = "red";
        controlloVer("red", "giocatore1");
        controlloOr("red", "giocatore1");
        controlloDia("red", "giocatore1");
        giocatore2 = true
        giocatore1 = false
    }
    else {
        document.getElementById("body").style.background = "linear-gradient(to left, #ce6e6e, #cb1c1c)"
        clearInterval(intervallo2);
        intervallo1 = setInterval(() => {
            tempoG1++
            console.log(tempoG1)
        }, 1000)
        mosseGiocatore2++;
        tile.style.backgroundColor = "yellow";
        [i1, j1] = tile.id.split("-").map(Number)
        board[i1][j1].style.backgroundColor = "yellow";
        controlloVer("yellow", "giocatore2");
        controlloOr("yellow", "giocatore2");
        controlloDia("yellow", "giocatore2");
        giocatore2 = false
        giocatore1 = true;
    }
    controlloPar()
}
setTimeout(function () {
    let overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.innerHTML = `
        Regole di gioco 
        <div>● Il gioco sarà giocabile da due giocatori che si alterneranno a inserire i dischi nel tabellone.</div>
        <div>● Il primo giocatore a ottenere quattro dischi in fila (orizzontale, verticale o diagonale) vince.</div>
        <button id='btn' onclick='togli(event)'>OK</button>
    `;
    document.body.appendChild(overlay);
    overlay.style.display = 'block';
    document.body.classList.add('pointer-overlay')
}, 1000);

function togli(event) {
    document.getElementById("body").style.background = "linear-gradient(to left, #ce6e6e, #cb1c1c)"
    let div = event.target.parentElement;
    div.remove();
    document.body.classList.remove('pointer-overlay');
    intervallo = setInterval(() => {
        tempo++;
    }, 1000);
    if (giocatore1) {
        intervallo1 = setInterval(() => {
            tempoG1++
            console.log(tempoG1)
        }, 1000)
    }
    else {
        intervallo2 = setInterval(() => {
            tempoG2++
            console.log(tempoG2)
        })
    }
}
let intervallo

function controlloVer(colore, giocatore) {
    let contatore = 1;
    for (let i = 1; i1 - i >= 0; i++) {
        if (board[i1 - i][j1].style.backgroundColor === colore) {
            contatore++;
        } else {
            break;
        }
    }
    for (let i = 1; i1 + i < 6; i++) {
        if (board[i1 + i][j1].style.backgroundColor === colore) {
            contatore++;
        } else {
            break;
        }
    }
    if (contatore >= 4) {
        fermaCro()
        alert(giocatore + " ha vinto con una linea verticale!");
        salvaStats(giocatore, "verticale");
        restarGame()
    }
}
function controlloOr(colore, giocatore) {
    let contatore = 1;
    for (let i = 1; j1 - i >= 0; i++) {
        if (board[i1][j1 - i].style.backgroundColor === colore) {
            contatore++;
        } else {
            break;
        }
    }
    for (let i = 1; j1 + i < 6; i++) {
        if (board[i1][j1 + i].style.backgroundColor === colore) {
            contatore++;
        } else {
            break;
        }
    }
    if (contatore >= 4) {
        fermaCro()
        alert(giocatore + " ha vinto con una linea orizzontale!");
        salvaStats(giocatore, "orizzontale");
        restarGame()
    }
}

function togli2(event, giocatore) {
    if (giocatore === "giocatore1") {
        document.getElementById("body").style.background = "linear-gradient(to left, #ce6e6e, #cb1c1c)"
    }
    else {
        document.getElementById("body").style.background = "linear-gradient(to right, #e6e989, #dff728)"
    }
    let div = event.target.parentElement;
    div.remove();
    document.body.classList.remove('pointer-overlay');
}
function controlloDia(colore, giocatore) {
    let contatore = 1;
    for (let i = 1; i1 - i >= 0 && j1 - i >= 0; i++) {
        if (board[i1 - i][j1 - i].style.backgroundColor === colore) {
            contatore++;
        } else {
            break;
        }
    }
    for (let i = 1; i1 + i < 6 && j1 + i < 6; i++) {
        if (board[i1 + i][j1 + i].style.backgroundColor === colore) {
            contatore++;
        } else {
            break;
        }
    }
    if (contatore >= 4) {
        fermaCro()
        alert(giocatore + " ha vinto con una linea diagonale!");
        salvaStats(giocatore, "diagonale");
        restarGame()
    }
}

function controlloPar() {
    let counter = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (document.getElementById(i + "-" + j).style.backgroundColor === "white") {
                counter++
            }
        }
    }
    if (counter == 0) {
        fermaCro()
        alert("Pareggio");
        //salvo pareggio
        if (localStorage.getItem("pareggio")) {
            let pareggio = localStorage.getItem("pareggio")
            pareggio++;
            localStorage.setItem("pareggio", pareggio)
        }
        else {
            let pareggio = 1;
            localStorage.setItem("pareggio", pareggio);
        }
        salvaStats(giocatore, "pareggio");
        restarGame();
    }
}

function fermaCro() {
    clearInterval(intervallo)
}

function restarGame() {
    mosseGiocatore1 = mosseGiocatore2 = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            document.getElementById(i + "-" + j).style.backgroundColor = "white";
        }
    }
    tempo = 0;
    intervallo = setInterval(() => {
        tempo++;
    }, 1000)
    tempoG1 = tempoG2 = 0;
}

function salvaStats(giocatore, fila) {
    let giocatoreOpp;
    if (giocatore === "giocatore1") {
        giocatoreOpp = "giocatore2";
    }
    else {
        giocatoreOpp = "giocatore1"
    }
    if (fila !== "pareggio") {
        if (localStorage.getItem("vittorie" + giocatore) && localStorage.getItem("sconfitte" + giocatoreOpp)) {
            let vittorie = parseInt(localStorage.getItem("vittorie" + giocatore));
            vittorie++;
            localStorage.setItem("vittorie" + giocatore, vittorie);
            let sconfitte = parseInt(localStorage.getItem("sconfitte" + giocatoreOpp));
            sconfitte++;
            localStorage.setItem("sconfitte" + giocatoreOpp, sconfitte)
        }
        else {
            let vittorie = 1;
            localStorage.setItem("vittorie" + giocatore, vittorie)
            let sconfitte = 1;
            localStorage.setItem("sconfitte" + giocatoreOpp, sconfitte)
        }
    }
    if (localStorage.getItem("partitegiocate")) {
        let partitegiocate = parseInt(localStorage.getItem("partitegiocate"))
        partitegiocate++;
        localStorage.setItem("partitegiocate", partitegiocate);
    }
    else {
        let partitegiocate = 1;
        localStorage.setItem("partitegiocate", partitegiocate);
    }
    //file
    if (giocatore !== "pareggio") {
        if (localStorage.getItem(fila + giocatore)) {
            let tipo = parseInt(localStorage.getItem(fila + giocatore))
            tipo++
            localStorage.setItem(fila + giocatore, tipo);
        }
        else {
            localStorage.setItem(fila + giocatore, "1");
        }
    }
    //vittorie consecutive
    if (localStorage.getItem("status")) {
        let stati = localStorage.getItem("status").split(", ");
        let statusgiocatore1 = stati[0] === "true"
        let statusgiocatore2 = stati[1] === "true"
        if (localStorage.getItem("vittorieCon" + giocatore)) {
            if (status + giocatore) {
                let vittCons = parseInt(localStorage.getItem("vittorieCon" + giocatore))
                vittCons++
                localStorage.setItem("vittorieCon" + giocatore, vittCons)
                localStorage.setItem("vittorieCon" + giocatoreOpp, "0")
            }
        }
        else {
            localStorage.setItem("vittorieCon" + giocatore, "1")
        }
        if (giocatore === "giocatore1") {
            statusgiocatore1 = true;
            statusgiocatore2 = false
        }
        else {
            statusgiocatore2 = true;
            statusgiocatore1 = false;
        }
        localStorage.setItem("status", statusgiocatore1 + ", " + statusgiocatore2)
    }
    else {
        localStorage.setItem("status", "false, false")
    }
    if (fila !== "pareggio") {
        if (localStorage.getItem("vittorieConMax" + giocatore)) {
            let vittConMax = parseInt(localStorage.getItem("vittorieConMax" + giocatore))
            if (vittConMax < parseInt(localStorage.getItem("vittorieCon" + giocatore))) {
                localStorage.setItem("vittorieConMax" + giocatore, parseInt(localStorage.getItem("vittorieCon" + giocatore)))
            }
        }
        else {
            localStorage.setItem("vittorieConMax" + giocatore, "1")
        }
    }
    //mosse media per partita
    if (giocatore === "giocatore1") {
        if (localStorage.getItem("mosseMedgiocatore1")) {
            let mosse = (parseFloat(localStorage.getItem("mosseMedgiocatore1")) * (parseInt(localStorage.getItem("vittoriegiocatore1")) - 1) + mosseGiocatore1) / parseInt(localStorage.getItem("vittoriegiocatore1"))
            localStorage.setItem("mosseMedgiocatore1", mosse)
        }
        else {
            localStorage.setItem("mosseMedgiocatore1", mosseGiocatore1)
        }
    }
    else {
        if (localStorage.getItem("mosseMedgiocatore2")) {
            let mosse = (parseFloat(localStorage.getItem("mosseMedgiocatore2")) * (parseInt(localStorage.getItem("vittoriegiocatore2")) - 1) + mosseGiocatore1) / parseInt(localStorage.getItem("vittoriegiocatore2"))
            localStorage.setItem("mosseMedgiocatore2", mosse)
        }
        else {
            localStorage.setItem("mosseMedgiocatore2", mosseGiocatore2)
        }
    }
    if (fila !== "pareggio") {
        //tasso vittoria
        let tassoVitt1 = parseInt(localStorage.getItem("vittoriegiocatore1")) / parseInt(localStorage.getItem("partitegiocate")) * 100
        let tassoVitt2 = 100 - tassoVitt1;
        localStorage.setItem("tassoVitt1", tassoVitt1)
        localStorage.setItem("tassoVitt2", tassoVitt2)
    }
    //tempo di gioco
    if (localStorage.getItem("tempoGioco")) {
        let tempoGioco = parseInt(localStorage.getItem("tempoGioco"))
        tempoGioco += tempo
        localStorage.setItem("tempoGioco", tempoGioco)
    }
    else {
        localStorage.setItem("tempoGioco", tempo)
    }
    //tempo del turno
    if (localStorage.getItem("tempoTurno1")) {
        let tempoMed = (parseInt(localStorage.getItem("tempoTurno1")) * (parseInt(localStorage.getItem("partitegiocate")) - 1) + tempoG1) / parseInt(localStorage.getItem("partitegiocate"))
        localStorage.setItem("tempoTurno1", tempoMed)
    }
    else {
        localStorage.setItem("tempoTurno1", tempoG1)
    }
    if (localStorage.getItem("tempoTurno2")) {
        let tempoMed = (parseInt(localStorage.getItem("tempoTurno2")) * (parseInt(localStorage.getItem("partitegiocate")) - 1) + tempoG2) / parseInt(localStorage.getItem("partitegiocate"))
        localStorage.setItem("tempoTurno2", tempoMed)
    }
    else {
        localStorage.setItem("tempoTurno2", tempoG1)
    }
    //tempo medio per partita

    let tempoPar = parseInt(localStorage.getItem("tempoGioco")) / parseInt(localStorage.getItem("partitegiocate"))
    localStorage.setItem("tempoPar", tempoPar)


}

function apriStat() {
    window.location.href = "stats.html"
}