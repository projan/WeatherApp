const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details =document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) =>{
    // const cityDets = data.cityDets;
    // const weather = data.weather;

        //same as above ^
        //destructure properties
        const { cityDets, weather } = data;


    //update details templates
    details.innerHTML = `
   
                    <h5 class="my-3">${cityDets.EnglishName}</h5>
                    <div class="my-3">${weather.WeatherText}</div>
                    <div class="display-4 my-4">${weather.Temperature.Metric.Value}
                    <span>&deg;C</span>
                    </div>
               `;


        // update the day/night  and icon images
        const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSrc);

        let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
        


        //same as above ^
        // let timeSrc = null;
        // if(weather.IsDayTime){
        //     timeSrc ='img/day.svg';
        // }else{
        //     timeSrc = 'img/day.svg';
        // }
        time.setAttribute('src', timeSrc);


        //remove the d-none class if present
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }
};

const updateCity = async (city) =>{
    

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    return { cityDets, weather };


};

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

//update the ui with new city
updateCity(city)
     .then(data => updateUI(data))
     .catch(err=> console.log(err));
    
});

const key = 'dOjQvmCOEs0VrkGBeeZAgidgy6RqqLvk';

//get weather information
const getWeather = async(id)=>{
    
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];

};


//get city information
const getCity = async(city)=>{
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return (data[0]);

};

// getCity()
// .then(data => {
//     //getting response data with key value
//     return getWeather(data.Key);
//     //callback function 
// }).then(data =>{
//     console.log(data);
// })
// .catch(err => console.log(err));

