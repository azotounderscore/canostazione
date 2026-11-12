const lista = document.getElementById('lista');
const stato = document.getElementById('stato');

// Trasforma l'URL in una versione più compatta da mostrare sotto il titolo
function urlBreve(url) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

fetch('links.json')
  .then(risposta => {
    if (!risposta.ok) throw new Error('File non trovato');
    return risposta.json();
  })
  .then(dati => {
    if (dati.length === 0) {
      stato.textContent = 'Nessun link salvato.';
      return;
    }

    dati.forEach(item => {
      const li = document.createElement('li');

      const a = document.createElement('a');
      a.className = 'voce';
      a.href = item.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';

      const titolo = document.createElement('span');
      titolo.className = 'titolo';
      titolo.textContent = item.titolo;

      const url = document.createElement('span');
      url.className = 'url';
      url.textContent = urlBreve(item.url);

      a.append(titolo, url);
      li.append(a);
      lista.append(li);
    });

    stato.textContent = `${dati.length} link`;
  })
  .catch(errore => {
    stato.textContent = 'Impossibile caricare la lista.';
    console.error(errore);
  });
