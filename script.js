let weather = {
  // Add your WeatherAPI.com API key here
  apikey: "0e88060b03064c3ab73204407231207",

  //Create a fetch function to gather the URL
  fetchWeather: function (city) {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${this.apikey}&q=${city}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  //to display the weather using this function and fetching the data
  displayWeather: function (data) {
    const { location, current } = data;
    const { name } = location;
    const { condition, temp_c, humidity, wind_kph } = current;

    document.querySelector(".city").innerText = "Weather in " + name;
    //fetching the weather icon from the open Weather map
    document.querySelector(".icon").src = condition.icon;
   //Display output on the website
    document.querySelector(".description").innerText = condition.text;
    document.querySelector(".temp").innerText = temp_c + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + wind_kph + " km/h";
  },
  // create a function which gets the content from the search bar
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

//create a function which takes on the user action which is click to search the weather
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

//create a function for event listener which takes the event 'Enter' which runs the weather search function
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

// Default weather display for New York
weather.fetchWeather("New York");
