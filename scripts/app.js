const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

	//destructure properties
	const { cityDetes, weather} = data;

	//update details template
	details.innerHTML = `
		<h5 class="my-3">${cityDetes.EnglishName}</h5>
		<div class="my-3">${weather.WeatherText}</div>
		<div class="display-4 my-4">
			<span>${weather.Temperature.Metric.Value}</span>
			<span>&deg;C</span>
		</div>
	`;

	// update the night/day & icon images
	const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
	icon.setAttribute('src', iconSrc);

	const timeSrc = weather.IsDayTime? 'img/day.svg' :'img/night.svg';
	time.setAttribute('src', timeSrc);

	// remove the d-none class if present
	if (card.classList.contains('d-none')){
		card.classList.remove('d-none');
	}
};

const updateCity = async (city) =>{

	const cityDetes = await getCity(city);
	const weather = await getWeather(cityDetes.Key);
	return { cityDetes, weather };
};

cityForm.addEventListener('submit', e =>{

	// prevent default action
	e.preventDefault();

	const city = cityForm.city.value.trim();
	cityForm.reset();

	//update the ui with new city
	updateCity(city).then(data => updateUI(data))
		.catch(err => console.log(err));

	// set local srorag
	localStorage.setItem('city', city);
})

if(localStorage.getItem('city'))
{
	updateCity(localStorage.getItem('city'))
		.then(data => updateUI(data))
		.catch(err => console.log(err));
}