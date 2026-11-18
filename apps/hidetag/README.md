# Hide Tag — copia browser

Copia web dell'app **Hide Tag 4.8.59** (Seba Games), ricavata dai file web inclusi
in `Hide Tag.apks` (`base.apk` → `assets/public`). Non è un porting riscritto:
sono gli stessi asset, la stessa UI e la stessa logica di gioco.

## Differenza rispetto all'APK

Il build web originale contiene un solo blocco che mostra la pagina
“Play Hide Tag in the installed app” quando non viene eseguito dentro
l'app nativa. In `assets/index-CFdTCMKh.js` è stata rimossa quella
condizione, lasciando il render del gioco anche nel browser.

Il resto del comportamento web è già previsto dall'app: fallback su
`navigator.geolocation`, gestione del ciclo di vita della pagina e
wake lock.

## Backend e servizi esterni

- **Supabase ufficiale** (`tfpbcpldsgsdsjpnwomo.supabase.co`): login anonimo,
  lobby, sincronizzazione e Realtime. Nessun backend nostro.
- **OpenFreeMap** per le tile della mappa.
- **hidetag.app** per notizie e controllo aggiornamenti.

La copia usa quindi il backend ufficiale: è pensata per uso personale/privato.
Per una pubblicazione pubblica va verificato il permesso dello sviluppatore.

## Limiti del browser

- La geolocalizzazione funziona solo con la scheda aperta e visibile. I browser
  non consentono il tracciamento continuo in background come l'app nativa.
- Su telefono serve HTTPS (Netlify lo fornisce). Su `localhost` funziona anche
  in HTTP.
- L'app può mostrare avvisi di aggiornamento o link agli store: sono quelli
  originali dell'app.

## File

- `index.html` — entry point. Per tornare alla home del sito si usa il tasto
  “indietro” del browser (l'app ha già la sua navigazione interna).
- `assets/` — bundle JS/CSS, immagini e worker MapLibre.
- `icons/` — icone e manifest PWA.
