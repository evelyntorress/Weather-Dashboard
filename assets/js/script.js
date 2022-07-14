
   
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
        cardDeckEl.innerHTML=""
        displayCity.textContent=currentCityname;
        cityTemp.textContent= 'Temperature: ' + data.current.temp + ' °C';
        cityWind.textContent= 'Wind: ' + data.current.temp + ' MPH';
        cityHumidity.textContent='Humidity: ' + data.current.humidity + '%';
        cityUVindex.textContent='UV Index: ' + data.current.uvi;  
      

        for(let i = 0; i < 5; i++){
          getForecast(data.daily[i]);
        }
    }) 
    })
  }
  
// Button for search city
citySearch.addEventListener("click", function(){
 console.log(cityName.value);

//  Button storing search
 const newButton = document.createElement("button");
 newButton.innerText=cityName.value;
 document.getElementById("newbutton").append(newButton);


 getApi('https://api.openweathermap.org/data/2.5/weather?q='+cityName.value+'&units=metric&appid=d1d93dfb4797fd38a2dfd1ffdf5b1f7a' , cityName.value)
})


function getForecast(forecast){
  console.log(forecast);

  // var to get the icon
  var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

// displaying the values in the 5 cards
  let weatherCard = `<div class="card border-primary mb-3" style="max-width: 18rem;">
  <div class="card-header">${cityName.value}</div><img src="${iconUrl}" width= "50px" alt="icon">
  <div class="card-body text-primary">
    <p class="card-text">Temperature: ${forecast.temp.day}</p>
    <p class="card-text">Humidity: ${forecast.humidity} %</p>
    <p class="card-text">UV Index: ${forecast.uvi}</p>
  </div>
</div>`

console.log(cardDeckEl);
cardDeckEl.innerHTML += weatherCard;

}


// let otherCards = 
// `<div class="main-card">
// <div class="card w-75">
// <div class="card-body">
//  <h3 class="card-title" id="${iconUrl}">City</h3>
//  <p class="card-text" id="cityTemp">Temperature</p>
//  <p class="card-text" id="cityWind">Wind</p>
//  <p class="card-text" id="cityHumidity">Humidity</p>
//  <p class="card-text" id="cityUVindex">UV Index</p><a href="#" class="btn btn-primary">Button</a>
// </div>
// </div>
// </div>`


// console.log(cityName);
// cityName.innerHTML += otherCards;

