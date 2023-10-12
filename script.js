const apiKey = "410a3aaea3d2338594010b4728ffa5e6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();

        console.log(data);
        let windDirection = degToCardinal(data.wind.deg);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".hi-lo").innerHTML = Math.round(data.main.temp_max) + "°" + " / " + Math.round(data.main.temp_min) + "°";
        document.querySelector(".feels-like").innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°";
        document.querySelector(".humidity").innerHTML = data.main.humidity;
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
        document.querySelector(".wind-dir").innerHTML = "🧭" + windDirection;

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "rain.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "mist.png"
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

function degToCardinal(deg) {
    if (deg > 337.5 || deg <= 22.5) return "N";
    if (deg > 22.5 && deg <= 67.5) return "NE";
    if (deg > 67.5 && deg <= 112.5) return "E";
    if (deg > 112.5 && deg <= 157.5) return "SE";
    if (deg > 157.5 && deg <= 202.5) return "S";
    if (deg > 202.5 && deg <= 247.5) return "SW";
    if (deg > 247.5 && deg <= 292.5) return "W";
    if (deg > 292.5 && deg <= 337.5) return "NW";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
