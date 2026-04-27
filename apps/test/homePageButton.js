const homePageButton = document.createElement('a');

homePageButton.href = '../../index.html';
homePageButton.style.cssText = "border: 1px solid lightgray;border-radius: 10px;width: 40px;height: 40px;position: fixed;top: 10px;left: 10px;z-index: 9999;line-height: 40px;text-align: center;cursor: pointer;transition: all 0.1s ease-out;color: black;background: rgba( 255, 255, 255, 0.25 );backdrop-filter: blur( 4px );-webkit-backdrop-filter: blur( 4px );border-radius: 10px;";
homePageButton.innerHTML = "<i class='fa-solid fa-house'></i>";

document.body.appendChild(homePageButton);