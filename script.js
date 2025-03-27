const apiKey = '03489d453cb0ed71b0ca24e89219a457'; 

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert(`Error: ${data.message}`);
            return;
        }

        document.getElementById("city-name").innerText = data.name;
        document.getElementById("temperature").innerText = `🌡️ ${data.main.temp}°C`;
        document.getElementById("description").innerText = `🌥 ${data.weather[0].description}`;
        document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").innerText = `🌬 Wind Speed: ${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}.png`;
        document.getElementById("weather-icon").style.display = "block";

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong. Please try again.");
    }
}

document.getElementById("city").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});