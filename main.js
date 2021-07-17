let cityInput = document.querySelector('.city');
let day = document.querySelector('.day');
let datum = document.querySelector('.datum');
let time = document.querySelector('.time');
let temperature = document.querySelector('.temperature');
let maxTemp = document.querySelector('.maxtemp');
let minTemp = document.querySelector('.mintemp');
let windSpeed = document.querySelector('.windspeed');
let humidity = document.querySelector('.humidity');
let pressure = document.querySelector('.pressure');
let sunriseTime = document.querySelector('.sunrisetime');
let sunsetTime = document.querySelector('.sunsettime');
let weatherStatus = document.querySelector('.weatherstatus');
let image = document.querySelector('.image');

cityInput.addEventListener('keyup', showWeather);

function showWeather(e) {
    if(e.keyCode === 13 ){
        let city = cityInput.value;
        let xml = new XMLHttpRequest();
        xml.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=65a961bc1bf6f42654bc807569689f24&units=metric`);
        xml.onreadystatechange = function () {
            if(xml.readyState === 4 && xml.status === 200){
                displayResult(JSON.parse(xml.responseText))
            }
        }
        xml.send();
    }
}

function displayResult(data) {

    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset()*60000;
    let utc = localTime + localOffset;
    let utcTime = utc + (1000 * data.timezone);
    let newCity = new Date(utcTime);


    let msunrise = new Date(data.sys.sunrise * 1000).getMinutes();
    let msunset = new Date(data.sys.sunset * 1000).getMinutes();
    let hsunrise = new Date(data.sys.sunrise * 1000).getHours();
    let hsunset = new Date(data.sys.sunset * 1000).getHours();

    (hsunrise < 10) ? hsunrise = `0${hsunrise}` : hsunrise=hsunrise;
    (hsunset < 10) ? hsunset = `0${hsunset}` : hsunset=hsunset;
    (msunrise < 10) ? msunrise = `0${msunrise}` : msunrise=msunrise;
    (msunset < 10) ? msunset = `0${msunset}` : msunset=msunset;

    let cityHour = newCity.getHours();
    let cityMinute = newCity.getMinutes();
    (cityHour < 10) ? cityHour = `0${cityHour}` : cityHour=cityHour;
    (cityMinute < 10) ? cityMinute = `0${cityMinute}` : cityMinute=cityMinute;

    temperature.innerHTML = `${Math.round(data.main.temp)} °C`;
    maxTemp.innerHTML = `Max: ${Math.round(data.main.temp_max)} °C`;
    minTemp.innerHTML = `Min: ${Math.round(data.main.temp_min)} °C`;
    windSpeed.innerHTML = `${data.wind.speed} Km/h`;
    humidity.innerHTML = `${data.main.humidity} %`;
    pressure.innerHTML = `${data.main.pressure} hPa`
    sunriseTime.innerHTML = `${hsunrise}:${msunrise} h`;
    sunsetTime.innerHTML = `${hsunset}:${msunset} h`;
    weatherStatus.innerHTML = `Weather Status: ${data.weather[0].description}`;

    if(data.weather[0].description == 'rain' || data.weather[0].description == 'moderate rain') {
        image.setAttribute('src', 'images/rain.png'); 
    } else if (data.weather[0].description == 'scattered clouds' || data.weather[0].description == 'few clouds' || data.weather[0].description == 'broken clouds') {
        image.setAttribute('src', 'images/clouds.png');
    } else if (data.weather[0].description == 'sun') {
        image.setAttribute('src', 'images/sunny2.png');
    } 
    else {
        image.setAttribute('src', 'images/clearsky.png');
    }

    let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    day.innerHTML = days[newCity.getDay()];
    datum.innerHTML = `${months[newCity.getMonth()]} ${newCity.getUTCDate()}, ${newCity.getFullYear()}`;
    time.innerHTML = `${cityHour}:${cityMinute} h`;


}
