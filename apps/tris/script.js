const mainBtn = document.querySelector('button');

const caselle = document.querySelectorAll('#container > div');


let isGameOver = false;

let currentPlayer = 'X';
console.log("currentPlayer: " + currentPlayer);
table = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
];




caselle.forEach((casella) => {

      casella.addEventListener('click', function() {
            
            if (casella.innerHTML == '' && !isGameOver) {
                  


                  const index = Array.from(caselle).indexOf(casella);   // Array.from(caselle) converte la NodeList (lista di div, credo) in un vero e proprio array e indexOf(casella) ti dice che numero è 'casella' nella lista appena convertita
                  const riga = Math.floor(index / 3);                   // Calcola la riga in cui si trova la casella
                  const colonna = index % 3;                            // Calcola la colonna in cui si trova la casella
                  
                  table[riga][colonna] = currentPlayer;
                  console.log(table);


      
                  placeSymbol(casella);
                  
                  console.log("currentPlayer: " + currentPlayer);

            }
      })
})




function placeSymbol(casella) {

      if (currentPlayer == 'X') {
            casella.innerHTML = '<i class="fa-solid fa-x"></i>';
            casella.style.color = 'red';
            currentPlayer = 'O';
      } else {
            casella.innerHTML = '<i class="fa-regular fa-circle"></i>';
            casella.style.color = 'blue';
            currentPlayer = 'X';
      }

      casella.querySelector('i').classList.add('animazione');

      checkWinner();

}






const winConditions = [
      // righe
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // colonne
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonali
      [0, 4, 8],
      [2, 4, 6]
];

function checkWinner() {

      // controlla le righe
      for (let i = 0; i < 3; i++) {

            if (table[i][0] === table[i][1] && table[i][1] === table[i][2] && table[i][0] !== '') {
                  console.log("Vincitore: " + table[i][0]);
                  evidenziaVincitore([i * 3, i * 3 + 1, i * 3 + 2]);
                  isGameOver = true;
                  return;
            }
      }
      // controlla le colonne
      for (let i = 0; i < 3; i++) {
	      if (table[0][i] === table[1][i] && table[1][i] === table[2][i] && table[0][i] !== '') {
	            console.log("Vincitore: " + table[i][0]);
                  evidenziaVincitore([i, i + 3, i + 6]);
                  isGameOver = true;
                  return;
            }
      }
      // controlla le diagonali
      if ( table[0][0] === table[1][1] && table[1][1] === table [2][2] && table[0][0] !== '') {
            console.log("Vincitore: " + table[0][0]);
            evidenziaVincitore([0, 4, 8]);
            isGameOver = true;
            return;
      }
      if (table[0][2] === table[1][1] && table[1][1] === table[2][0] && table[0][2] !== '') {
            console.log("Vincitore: " + table[0][2]);
            evidenziaVincitore([2, 4, 6]);
            isGameOver = true;
            return;
      }
}
function evidenziaVincitore(indici) {

      indici.forEach(indice => {
            caselle[indice].querySelector('i').classList.add('vincitore');
      })
}







// RESETTA IL GIOCO

mainBtn.addEventListener('click', function() {

      isGameOver = false;

      caselle.forEach((casella) => {
            casella.innerHTML = '';
      })

      currentPlayer = 'X';
      table = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
      ];

      console.log(table);
      console.log("currentPlayer: " + currentPlayer);

})