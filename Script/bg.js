const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
    const bgImage = new Image();
    bgImage.src = `Image/${imgNumber + 1}.jpg`;
    bgImage.classList.add("bgImage");

    body.appendChild(bgImage);
}

function genRandom(){
    const number = Math.floor(Math.random() * 3);
    return number;
}

function init(){
    const randomNumber = genRandom();

    console.log(randomNumber);

    paintImage(randomNumber);
}

init();