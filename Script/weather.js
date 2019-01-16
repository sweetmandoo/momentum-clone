const weather = document.querySelector(".js-weather");

const API_KEY = "47d1b356e05837fcf16c93cb94448bc9";
const COORDS_LS = "coords";


function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            console.log(json);
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    console.log(position);

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const coordsObj = {
        latitude: lat,
        longitude: lng
    }
    saveCoords(coordsObj);
    getWeather(lat, lng);
}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
     navigator.geolocation.getCurrentPosition(
         handleGeoSuccess,
         handleGeoError
     )
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS_LS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const coordsData = JSON.parse(loadedCoords);
        console.log(coordsData);

        getWeather(coordsData.latitude, coordsData.longitude);
    }

}

function init(){
    loadCoords();
}

init();