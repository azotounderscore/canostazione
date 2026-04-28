const container = document.querySelector('main');

const apps = [

      banchi = {
            display: "Banchi",
            id: "banchi",
      },
      musso_shop = {
            display: "Musso Shop",
            id: "mussoShop"
      },
      crazy_gamble = {
            display: "Crazy Gamble",
            id: "crazy-gamble",
      },
      mine = {
            display: "Campo Minato",
            id: "mine",
      },
      {
            display: "Calendario",
            id: "calendario",
      },
      {
            display: "canoChat",
            id: "live-chat",
      },
      tris = {
            display: "Tris",
            id: "tris",
      },
      indovina_il_numero = {
            display: "Indovina il Numero",
            id: "indovina-il-numero",
      },
      talpe = {
            display: "Talpe",
            id: "talpe",
      },
      cursori = {
            display: "Cursori",
            id: "cursori",
      },
      calcolatore_nether = {
            display: "Calcolatore Nether",
            id: "calcolatore-nether",
      },
      snake = {
            display: "Snake",
            id: "snake"
      }
      
]

apps.forEach(app => {

      const appButton = document.createElement('a');
      appButton.classList.add('app');

      const appButtonSpan = document.createElement('a');
      appButton.appendChild(appButtonSpan);
      appButtonSpan.textContent = app.display;

      appButton.style.backgroundImage = "url(apps/" + app.id + "/cover.png)";
      
      appButton.href = "apps/" + app.id + "/index.html";
      
      container.appendChild(appButton);
})

const title = document.querySelector('.title-container')
window.onscroll = function() {headerAnim()}
headerAnim()
function headerAnim() {
      var k = window.scrollY / 200;
      if (k >= 0 && k < 0.4) {
            title.style.transform = 'scale(' + (1 - k) + ')'
            title.style.opacity = (1 - k)
      }
}

window.scrollTo(0, 0);
