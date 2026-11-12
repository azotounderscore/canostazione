// 1. Prendo i riferimenti agli elementi della pagina
const lista = document.getElementById('lista');
const stato = document.getElementById('stato');

// 2. Chiedo il file JSON al server
fetch('links.json')
  .then(risposta => {
    // Se il server risponde con errore (404, 500…) lancio un errore
    if (!risposta.ok) throw new Error('File non trovato');
    return risposta.json(); // converte il testo JSON in array JS
  })
  .then(dati => {
    // 3. Nessun link? Mostro "lista vuota"
    if (dati.length === 0) {
      stato.textContent = 'La lista è vuota.';
      return;
    }

    // 4. Per ogni oggetto del JSON creo un <li><a>…</a></li>
    dati.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');

      a.href = item.url;          // imposto il link
      a.textContent = item.titolo; // imposto il testo (sicuro, niente HTML)
      a.target = '_blank';         // apre in nuova scheda (opzionale)
      a.rel = 'noopener noreferrer';

      li.appendChild(a);
      lista.appendChild(li);
    });

    // 5. Tolgo il messaggio di caricamento
    stato.textContent = '';
  })
  .catch(errore => {
    // 6. Qualcosa è andato storto (rete, JSON invalido, 404…)
    stato.textContent = 'Errore nel caricamento della lista.';
    console.error(errore);
  });