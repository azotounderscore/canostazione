const buchi = document.querySelectorAll('#container > div');

let punti = 0;

function aggiornaPunti() {

      document.querySelector('body > p > span').textContent = punti;

}

buchi.forEach(buco => {

      setInterval(() => {

            if (buco.classList.contains('attivo') == false && buco.classList.contains('bomba') == false) {

                  let intervallo = 1000 + Math.floor(Math.random() * 500); 

                  setTimeout(() => {

                        let x = Math.floor(Math.random() * 50) + 1;

                        if (x < 10) {

                              buco.classList.add('attivo');

                              setTimeout(() => {

                                    buco.classList.remove('attivo');

                              }, 2000)

                        } else if (x > 48) {

                              buco.classList.add('bomba');

                              setTimeout(() => {

                                    buco.classList.remove('bomba');

                              }, 3000)
                        }

                  }, intervallo)

            }
      }, 1000)

      buco.addEventListener('click', () => {
            if (buco.classList.contains('attivo')) {
                  buco.classList.remove('attivo');
                  punti++;
                  aggiornaPunti();
            } else if (buco.classList.contains('bomba')) {
                  buco.classList.remove('bomba');
                  punti = 0;
                  aggiornaPunti();
            }
      })
});