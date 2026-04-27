// ########################
//
// allora
//
//
// godo funziona cristo
//
//
// da fare: 
//
//  - fare in modo che con l'aumentare delle bombe aumenta la vincita per ogni casella scoperta
//
// ########################



var numeroCaselle = 25
var gameStarted = false;
var credito = 500;
var maxBombe = 24;
var minBombe = 1;
var numeroDiMerda = 1.138646884;
var caselleScoperte;

document.getElementById('bombeInput').addEventListener('input', (event) => {
	if (campo.value < minBombe) {
		campo.value = 1
	} else if (campo.value > maxBombe) {
		campo.value = 24
	}
})

document.getElementById('creditoDisplay').textContent = credito + "€";
document.getElementById('vincitaDisplay').textContent = 0;

function generaGriglia() {

      for (let i = 0; i < numeroCaselle; i++) {
            let casella = document.createElement('div');
            casella.classList.add('casella');
            document.querySelector('.container-grid').appendChild(casella)
      }

}


var boom = document.getElementById('boom');
var bell = document.getElementById('bell');

function playsound(sound) {
      sound.currentTime = 0;
      sound.play()
}


generaGriglia();

const puntaBtn = document.getElementById('punta');
const cashoutBtn = document.getElementById('cashout');
const caselle = document.querySelectorAll('.casella');


reset();

var puntata = 0;
var vincita;
puntaBtn.addEventListener('click', function() {

      if (credito <= 0) {
            alert("CREDITO INSUFFICIENTE, RICARICA!");
            return;
      } else if (document.getElementById('puntataInput').value > credito) {
            alert("NON PUOI PUNTARE PIÙ DI QUANTO HAI!");
            return;
      }

      reset();

      gameStarted = true;
      
      puntata = document.getElementById('puntataInput').value;
      console.log("puntata:" + puntata);
      
      credito -= puntata;
      document.getElementById('creditoDisplay').textContent = credito + "€";

      let numeroBombe = document.getElementById('bombeInput').value;
      var moltiplicatore = 1 + (numeroBombe * 0.06);

      console.log("moltiplicatore: " + moltiplicatore);

      puntaBtn.disabled = true;
      cashoutBtn.disabled = false;
      inputFunction(true)
      
      // scelta delle bombe

      bombe = [];
      for (let i = 0; i < numeroBombe; i++) {
            let bomba = Math.floor(Math.random() * numeroCaselle);
            while (bombe.includes(bomba)) {
                  bomba = Math.floor(Math.random() * numeroCaselle);
            }
            bombe.push(bomba);
      }
      console.log("bombe: " + bombe);

      
      caselle.forEach(casella => {
            casella.classList.add('attiva');
            casella.addEventListener('click', function() {
                  if (gameStarted == false || casella.classList.contains('libera')) {
                        return;
                  } else {
                        console.log("casella cliccata");

                        // se viene premuta una bomba

                        if (bombe.includes(Array.from(caselle).indexOf(casella))) {


                              
                              vincita = 0;
                              
                              inputFunction(false);
                              scopriTutto(bombe);
                              playsound(boom);

                        } else {

                              caselleScoperte++;
                              console.log(caselleScoperte);

                              // se la casella è libera

                              casella.classList.remove('attiva');
                              casella.classList.add('libera');
                              casella.classList.add('liberaAnimazione');
                              casella.textContent = "💎";

                              // calcolo della vincita

                              vincita = parseInt((((caselleScoperte)**numeroDiMerda) / (numeroCaselle - numeroBombe)) * numeroBombe * puntata);

                              document.getElementById('vincitaDisplay').textContent = vincita + "€";
                              playsound(bell)
                        }
                  }
            })
      });
})
cashoutBtn.addEventListener('click', function() {
      if (!gameStarted) {
            return;
      } else {
            alert("HAI INCASSATO " + document.getElementById('vincitaDisplay').textContent);
            credito += vincita;
            document.getElementById('creditoDisplay').textContent = credito + "€";
            scopriTutto(bombe);
      }
})
function reset() {

      caselle.forEach(casella => {
            casella.classList.remove('attiva');
            casella.classList.remove('libera');
            casella.classList.remove('bomba');
            casella.textContent = "";
      });
      puntaBtn.disabled = false;
      cashoutBtn.disabled = true;
      document.getElementById('vincitaDisplay').textContent = 0;
      inputFunction(false);

      gameStarted = false;
      var bombe = [];
      caselleScoperte = 0;
}
function scopriTutto(bombe) {

      caselle.forEach(casella => {
            if (bombe.includes(Array.from(caselle).indexOf(casella))) {
                  casella.classList.remove('attiva');
                  casella.classList.remove('libera');
                  casella.classList.add('bomba');
                  casella.textContent = "💣";
            } else {
            casella.classList.add('libera');
            }
            casella.classList.remove('attiva');
      })
      puntaBtn.disabled = false;
      cashoutBtn.disabled = true;
      gameStarted = false;
      document.getElementById('creditoDisplay').textContent = credito;
      document.getElementById('vincitaDisplay').textContent = 0;
      inputFunction(false);
}
function inputFunction(veroOfalso) {
      document.querySelectorAll('input').forEach(input => {
            input.disabled = veroOfalso;
      })
}