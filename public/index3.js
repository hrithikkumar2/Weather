document.addEventListener("DOMContentLoaded", function() {
  const weatherImage = document.getElementById("weather-image");
  const body = document.body;

  // Function to check if it's night
  function isNight() {
      const now = new Date();
      const hours = now.getHours();
      return hours < 6 || hours  >18; // Assuming 6 AM to 6 PM as day
  }

  // Update class based on day or night
  function updateDayNightClass() {
      const isNightTime = isNight();
      if (isNightTime) {
          body.classList.add("is-night");
      } else {
          body.classList.remove("is-night");
      }
  }

  // Call the function on page load
  updateDayNightClass();

  $("#search-icon").click(function() {
      $(".nav").toggleClass("search");
      $(".nav").toggleClass("no-search");
      $(".search-input").toggleClass("search-active");
  });

  $('.menu-toggle').click(function(){
      $(".nav").toggleClass("mobile-nav");
      $(this).toggleClass("is-active");
  });

  const successCallback = (position) => {
      console.log(position);
  };

  const errorCallback = (error) => {
      console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      });
  } else {
      console.log("Geolocation is not supported by this browser.");
  }
});
