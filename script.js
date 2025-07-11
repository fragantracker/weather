const apiKey = 'eb0fc639832d4faa911202712221902'; 
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

// Function to display weather data
function displayWeather(data) {
    const weatherHTML = `
        <div class="weather-info">
            <div class="weather-main">
                <h2>${data.location.name}, ${data.location.country}</h2>
                <img class="weather-icon" src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
                <div class="weather-temp">${data.current.temp_c}°C</div>
                <div class="weather-desc">${data.current.condition.text}</div>
            </div>
            <div class="weather-details">
                <div class="detail-item">
                    <i class="fas fa-temperature-low"></i>
                    <span>Feels like: ${data.current.feelslike_c}°C</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-tint"></i>
                    <span>Humidity: ${data.current.humidity}%</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-wind"></i>
                    <span>Wind: ${data.current.wind_kph} km/h</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-compass"></i>
                    <span>Wind direction: ${data.current.wind_dir}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-eye"></i>
                    <span>Visibility: ${data.current.vis_km} km</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-cloud-rain"></i>
                    <span>Precipitation: ${data.current.precip_mm} mm</span>
                </div>
            </div>
        </div>
    `;
    weatherResult.innerHTML = weatherHTML;
    weatherResult.classList.add('has-weather');
}

// Search button click event
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === '') {
        showAlert('Please enter a city name');
        return;
    }
    
    fetchWeather(city);
});

// Enter key event
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city === '') {
            showAlert('Please enter a city name');
            return;
        }
        fetchWeather(city);
    }
});

// Fetch weather function
function fetchWeather(city) {
    // Show loading state
    weatherResult.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading weather data...</div>';
    
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            showAlert(error.message);
            weatherResult.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>${error.message}</h3>
                    <p>Please try another location</p>
                </div>
            `;
        });
}

// Show alert function
function showAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 300);
    }, 3000);
}

// Initial welcome message
function showWelcomeMessage() {
    weatherResult.innerHTML = `
        <div class="welcome-message">
            <i class="fas fa-globe-europe"></i>
            <h2>Search for a city to see the weather</h2>
            <p>Try "London", "New York", or "Tokyo"</p>
        </div>
    `;
}

// Initialize
showWelcomeMessage();
