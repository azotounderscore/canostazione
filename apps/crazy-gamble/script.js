const playButton = document.getElementById('playButton');

const displayX = document.getElementById('displayX');       // identificati i display
const displayY = document.getElementById('displayY');       // per visualizzare i numeri
const displayZ = document.getElementById('displayZ');       //

const colonnaX = document.getElementById('colonnaX');       // identificate le colonne
const colonnaY = document.getElementById('colonnaY');       // per modificare gli stili
const colonnaZ = document.getElementById('colonnaZ');       //

const displaySoldi = document.getElementById('displaySoldi'); // identificato il display per i crediti

const winBox = document.getElementById('winBox');
const winDisplay = document.getElementById('winDisplay');
const winDisplayText = document.getElementById('winDisplayText');

const jackpotAudio = document.getElementById('jackpotAudio');
const basicAudio = document.getElementById('basicAudio');
const clickAudio = document.getElementById('clickAudio');

const simboli = ["🍒", "🍊", "💎", "🍇", "7️⃣", "💰", "🔔", "⭐"]
const listaMessaggiBase =[
      "MERAVIGLIOSO!",
      "INCREDIBILE!",
      "GRANDIOSO!",
      "STREPITOSO!",
      "STRAORDINARIO!",
      "SENSAZIONALE!",
      "FORMIDABILE!",
      "FAVOLOSO!",
      "SBALORDITIVO!",
      "SPETTACOLARE!"
];

let soldi = 100;


function updateSoldi() {
      displaySoldi.textContent = soldi;
}



playButton.addEventListener('click', () => {

      if (soldi >0) {

            clickAudio.play();

            // prima di tutto paga

            soldi -= 10;
            updateSoldi()

            //blocca il pulsante

            playButton.disabled = true;

            //cancella i simboli precedenti e ricolora le colonne

            displayX.textContent = ' ';
            displayY.textContent = ' ';
            displayZ.textContent = ' ';

            colonnaX.style.backgroundColor = 'white';
            colonnaY.style.backgroundColor = 'white';
            colonnaZ.style.backgroundColor = 'white';

            //pesca un simbolo a caso dalla lista per ogni colonna

            const simboloX = simboli[Math.floor(Math.random() * simboli.length)];
            const simboloY = simboli[Math.floor(Math.random() * simboli.length)];
            const simboloZ = simboli[Math.floor(Math.random() * simboli.length)];

            let win;
            let winMessage;
            let winAudio;
            let winWait = 1000;


            function checkResults() {


                  if (simboloX === simboloY && simboloX != simboloZ) {

                        win = 20;
                        winMessage = listaMessaggiBase[Math.floor(Math.random() * 10)];
                        console.log(winMessage);
                        winAudio = basicAudio;
                        winWait = 2000;

                        soldi += win;
            
                        colonnaX.style.backgroundColor = 'lime';
                        colonnaY.style.backgroundColor = 'lime';

                        winBoxAlert()
            
                  } else if (simboloX === simboloZ && simboloX != simboloY) {

                        win = 20;
                        winMessage = listaMessaggiBase[Math.floor(Math.random() * 10)];
                        console.log(winMessage);
                        winAudio = basicAudio;
                        winWait = 2000;

                        soldi += win;
            
                        colonnaX.style.backgroundColor = 'lime';
                        colonnaZ.style.backgroundColor = 'lime';

                        winBoxAlert()
            
                  } else if (simboloZ === simboloY && simboloZ != simboloX) {

                        win = 20;
                        winMessage = listaMessaggiBase[Math.floor(Math.random() * 10)];
                        console.log(winMessage);
                        winAudio = basicAudio;
                        winWait = 2000;

                        soldi += win;
            
                        colonnaZ.style.backgroundColor = 'lime';
                        colonnaY.style.backgroundColor = 'lime';

                        winBoxAlert()
            
                  } else if (simboloX === simboloY && simboloX === simboloZ){

                        win = 100;
                        winMessage = '🤯ASSURDO🤑';
                        winAudio = jackpotAudio;
                        winWait = 5000;

                        soldi += win;
            
                        colonnaX.style.backgroundColor = 'lime';
                        colonnaY.style.backgroundColor = 'lime';
                        colonnaZ.style.backgroundColor = 'lime';

                        winBoxAlert();

                  }
            
            }
            function winBoxAlert() {

                  setTimeout(() => {
                        
                        winBox.style.display = 'flex';
                        
                        winAudio.play();
                        
                        winDisplay.textContent = win;
                        winDisplayText.textContent = winMessage;
                        
                        updateSoldi();
                        
                        setTimeout(() => {
                              
                              winBox.style.display = 'none';
                              
                        }, winWait);
                  }, 300);
            }




            setTimeout(() => {
                  
                  displayX.textContent = simboloX;

                  setTimeout(() => {
                        
                        displayY.textContent = simboloY;

                        setTimeout(() => {
                              
                              displayZ.textContent = simboloZ;

                              checkResults();

                              //sblocca il pulsante

                              playButton.disabled = false;
                              
                        }, 300);

                  }, 300);

            }, 300);



      } else {
            alert('Non hai abbastanza soldi 👎')
      }
})



updateSoldi();