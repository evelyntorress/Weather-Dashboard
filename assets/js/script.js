
   
//  current day and time using moment.js

// var today = moment();
// $("#currentDay").text(today.format("MMM Do, YYYY"));

var cityName = document.getElementById("cityName");
var citySearch = document.getElementById("citySearch");
var displayCity = document.getElementById("displayCity");
var cityTemp = document.getElementById("cityTemp");
var cityWind = document.getElementById("cityWind");
var cityHumidity = document.getElementById("cityHumidity");
var cityUVindex = document.getElementById("cityUVindex");
var cardDeckEl = document.getElementById('card-deck');


// Function to get city accordign search, temperature, wind, humidity
function getApi(requestUrl, currentCityname) {
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
    })
    .then(function (data){
      var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&units=metric&appid=d1d93dfb4797fd38a2dfd1ffdf5b1f7a`
      fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function(data){
        console.log(data);
        displayCity.textContent=currentCityname;
        cityTemp.textContent= 'Temperature: ' + data.current.temp + ' °C';
        cityWind.textContent= 'Wind: ' + data.current.temp + ' MPH';
        cityHumidity.textContent='Humidity: ' + data.current.humidity + '%';
        cityUVindex.textContent='UV Index: ' + data.current.uvi;  
// for loop to get forecast for 5 days
        for(let i = 0; i < 5; i++){
          getForecast(data.daily[i]);
        }
    }) 
    })
  }
  
// Search button
citySearch.addEventListener("click", function(){
 console.log(cityName.value);

// Button to store the history of cities
 const newButton = document.createElement("button");
 newButton.innerText=cityName.value;
 document.getElementById("newbutton").append(newButton);

// Call the function to get the weather
 getApi('https://api.openweathermap.org/data/2.5/weather?q='+cityName.value+'&units=metric&appid=d1d93dfb4797fd38a2dfd1ffdf5b1f7a' , cityName.value)
})

// function to get forecast
function getForecast(forecast){
  console.log(forecast);

// Putting icon in the browser
  var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

// Card with the info 
  let weatherCard = `<div class="card border-primary mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div><img src="${iconUrl}" width= "50px" alt="icon">
  <div class="card-body text-primary">
    <h5 class="card-title">Primary card title</h5>
    <p class="card-text">humidity: ${forecast.humidity}.</p>
  </div>
</div>`

console.log(cardDeckEl);
cardDeckEl.innerHTML += weatherCard;

}




