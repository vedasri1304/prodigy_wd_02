const input = document.querySelector('input');
const button = document.querySelector('#btn');
const temperatureSpan = document.querySelector('#temperature');
const windSpan = document.querySelector('#wind');
const humiditySpan = document.querySelector('#humidity');
const rainSpan = document.querySelector('#rain');
const snowSpan = document.querySelector('#snow');
const cloudSpan = document.querySelector('#cloud');
const loadingSpinner = document.querySelector('#loading-spinner');

const fetchData = async () => {
    let loc = input.value.trim();

    if (loc === '') {
        alert('Enter location first');
        input.style.border = '2px solid red';
        return; // Exit function if location is not provided
    } else {
        input.style.border = '';
    }

    loadingSpinner.style.display = 'inline-block'; // Show loading spinner

    const apiKey = 'BikZ8ocSwCMLDgyA4YwrUjfAowjEV5MM';
    const customUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${loc}&apikey=${apiKey}`;

    try {
        let response = await fetch(customUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        let jsonData = await response.json(); // Wait for JSON parsing

        console.log(jsonData); // Log the entire JSON response to check its structure

        const data = jsonData.data.values;
        const { humidity, temperature, windSpeed, rainIntensity, snowIntensity, cloudCover } = data;

        temperatureSpan.innerText = temperature ? `${temperature} °C` : 'N/A';
        windSpan.innerText = windSpeed ? `${windSpeed} km/h` : 'N/A';
        humiditySpan.innerText = humidity ? `${humidity} %` : 'N/A';
        rainSpan.innerText = rainIntensity ? `${rainIntensity} mm` : '0 mm';
        snowSpan.innerText = snowIntensity ? `${snowIntensity} inch` : '0 inch';
        cloudSpan.innerText = cloudCover ? `${cloudCover} %` : '0 %';

    } catch (error) {
        console.error('Error fetching data:', error);
        // Display error message to the user
        temperatureSpan.innerText = 'Error fetching data';
        windSpan.innerText = 'Error fetching data';
        humiditySpan.innerText = 'Error fetching data';
        rainSpan.innerText = 'Error fetching data';
        snowSpan.innerText = 'Error fetching data';
        cloudSpan.innerText = 'Error fetching data';
    } finally {
        loadingSpinner.style.display = 'none'; // Hide loading spinner after data is fetched
    }
};

button.addEventListener('click', fetchData);
