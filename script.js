const apiKey = '9b75bd53dc1505445e87f3fe18035966';

const searchForm = document.querySelector('#search-form');
const cityInput = document.querySelector('#city-input');
const weatherInfoContainer = document.querySelector('#weather-info-container');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const cityName = cityInput.value.trim();

    if (cityName) {
        getWeather(cityName);
    } else {
        alert('กรุณาป้อนชื่อเมือง');
    }
});
async function getWeather(city) {
    weatherInfoContainer.innerHTML = `<p>กำลังโหลดข้อมูล...</p>`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=th`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('ไม่พบข้อมูลเมืองนี้');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfoContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
}
function displayWeather(data) {
    const { name, main, weather } = data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];

    const weatherHtml = `
        <h2 class="text-2xl font-bold">${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p class="temp">${temp.toFixed(1)}°C</p>
        <p>${description}</p>
        <p>ความชื้น: ${humidity}%</p>
    `;
    weatherInfoContainer.innerHTML = weatherHtml;

    changeBackgroundByWeather(temp, description);
}
function changeBackgroundByWeather(temp, description) {
    const body = document.body;

    if (description.includes('ฝน') || description.includes('เมฆ')) {
        body.style.backgroundImage = "url('https://www.alstesting.co.th/wp-content/uploads/2024/10/pexels-pixabay-314726-1-scaled.jpg')";
    } else if (temp >= 30) {
        body.style.backgroundImage = "url('https://www.alstesting.co.th/wp-content/uploads/2024/10/pexels-pixabay-314726-1-scaled.jpg')";
    } else if (temp <= 20) {
        body.style.backgroundImage = "url('https://www.akita-gt.org/assets/images/movie/snow/snow1.jpg')";
    } else {
        body.style.backgroundImage = "url('https://www.alstesting.co.th/wp-content/uploads/2024/10/pexels-pixabay-314726-1-scaled.jpg')";
    }

    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.transition = 'background-image 0.8s ease-in-out';
}

localStorage.setItem('จังหวัดล่าสุด', city);

window.addEventListener('DOMContentLoaded', () => {
    const lastCity = localStorage.getItem('จังหวัดล่าสุด');
    if (lastCity) {
        getWeather(lastCity);
    }
});