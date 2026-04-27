let cadeau = document.querySelector(".nombreCadeau");
let parseCadeau = parseFloat(cadeau.innerHTML);
let intervalBonhomme = null;
let intervalRenne = null;
let intervalPereNoel = null;
let clickPower = 1;

let conteneurCadeauImage = document.querySelector(".conteneurCadeauImage");


function incrementCadeau(event) {
    parseCadeau += clickPower;
    cadeau.innerHTML = Math.floor(parseCadeau);
    verifierDeblocage();

    const x = event.offsetX;
    const y = event.offsetY;

    const div = document.createElement('div');
    div.innerHTML = "+" + Math.round(clickPower);
    div.style.cssText = `color:white ; position:absolute; top: ${y}px ; left: ${x}px ; font-size: 30px ; pointer-events:none ; `
    conteneurCadeauImage.appendChild(div);
    div.classList.add("fadeUP");

    const toRemoved = document.querySelectorAll(".fadeUP");

    toRemoved.forEach(function (div) {
        div.addEventListener("animationend", function () {
            div.remove();
            console.log("removed");
        });
    });
}

function verifierDeblocage() {
    document.querySelectorAll(".upgrade[data-unlock]").forEach(div => {
        if (parseCadeau >= parseFloat(div.dataset.unlock)) {
            div.removeAttribute("data-unlock");
        }
    });
}

function achat(div, fonctionAchat) {

    let cout = parseFloat(div.dataset.cout);
    let lvl = parseFloat(div.dataset.lvl);
    let cps = parseFloat(div.dataset.cps);
    let clickpower = parseFloat(div.dataset.clickpower);

    if (parseCadeau >= cout) {
        let nouveau = fonctionAchat(cout, lvl, cps, clickpower);
        parseCadeau -= cout;
        cadeau.innerHTML = Math.floor(parseCadeau);

        if (div.dataset.cout != nouveau.cout) { div.dataset.cout = nouveau.cout };
        if (div.dataset.lvl != nouveau.lvl) { div.dataset.lvl = nouveau.lvl };
        if (div.dataset.cps != nouveau.cps) { div.dataset.cps = nouveau.cps };
        if (div.dataset.clickpower != nouveau.clickpower) { div.dataset.clickpower = nouveau.clickpower };

        if (div.querySelector(".cout")) { div.querySelector(".cout").innerHTML = nouveau.cout; }
        if (div.querySelector(".lvl")) { div.querySelector(".lvl").innerHTML = nouveau.lvl; }
        if (div.querySelector(".cps")) { div.querySelector(".cps").innerHTML = nouveau.cps; }
        if (div.querySelector(".clickpower")) {
            div.querySelector(".clickpower").innerHTML = nouveau.clickpower;
            clickPower = nouveau.clickpower;
        }

    } else { console.log("achat raté") }
}

function achatCliqueur(cout, lvl, cps, clickpower) {
    console.log("achatCliqueur appelé")
    return { cout: Math.round(cout * 1.12), lvl: lvl + 1, cps: cps, clickpower: clickpower + 1 };
}


function achatMrNeige(cout, lvl, cps, clickpower) {
    console.log("achat Mr Neige appelé")
    if (intervalBonhomme === null) {
        console.log("interval lancé" + intervalBonhomme);
        intervalBonhomme = setInterval(mrNeigeBoucle, 100);
    }
    return { cout: cout + 10, lvl: lvl + 1, cps: cps + 0.5, clickpower: clickpower };
}

function mrNeigeBoucle() {
    let cpsMrNeige = parseFloat(document.querySelector(".cpsMrNeige").innerHTML)
    parseCadeau += cpsMrNeige;
    cadeau.innerHTML = Math.round(parseCadeau);
    console.log("ajoute = ", cpsMrNeige);
}



function achatRenne(cout, lvl, cps, clickpower) {
    console.log("achat Renne appelé")
    if (intervalRenne === null) {
        console.log("interval lancé" + intervalBonhomme);
        intervalRenne = setInterval(renneBoucle, 100);
    }
    return { cout: cout + 20, lvl: lvl + 1, cps: cps + 1.5, clickpower: clickpower };
}

function renneBoucle() {
    let cpsRenne = parseFloat(document.querySelector(".cpsRenne").innerHTML)
    parseCadeau += cpsRenne;
    cadeau.innerHTML = Math.round(parseCadeau);
    console.log("ajoute = ", cpsRenne);
}



function achatPereNoel(cout, lvl, cps, clickpower) {
    console.log("achat PereNoel appelé")
    if (intervalPereNoel === null) {
        console.log("interval lancé" + intervalBonhomme);
        intervalPereNoel = setInterval(PereNoelBoucle, 100);
    }
    return { cout: cout + 1000, lvl: lvl + 1, cps: cps + 100, clickpower: clickpower };
}

function PereNoelBoucle() {
    let cpsPereNoel = parseFloat(document.querySelector(".cpsPereNoel").innerHTML)
    parseCadeau += cpsPereNoel;
    cadeau.innerHTML = Math.round(parseCadeau);
    console.log("ajoute = ", cpsPereNoel);
}



