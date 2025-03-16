const apiKey = 'eb0fc639832d4faa911202712221902'; // Replace with your WeatherAPI key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city === '') return alert('Please enter a city name');
    
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    .then(response => response.json())
    .then(data => {
        const weatherHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
            <p>Temperature: ${data.current.temp_c}°C</p>
            <p>Weather: ${data.current.condition.text}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind Speed: ${data.current.wind_kph} KM/h</p>
        `;
        weatherResult.innerHTML = weatherHTML;
    })
    .catch(error => alert('City not found!'));
});