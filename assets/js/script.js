//clientSecret b340483a7a27e88d5f194b3ecaff1d876de82fb6f8ad348d9ea12020a1b129cf
// clientID MjIzNjI4MTd8MTY1MzUyMjkzMS42NzQ0ODU

let filpCard = document.querySelector(".flip");
let searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", fetchEventData);
let searchInput = document.querySelector("#search");
const cardSection = document.getElementById("card-parent");

// API #1 Seat Geek api - Calls for events
function fetchEventData(e) {
  e.preventDefault();
  let apiKey = "MjIzNjI4MTd8MTY1MzUyMjkzMS42NzQ0ODU";
  let apiUrl = `https://api.seatgeek.com/2/events?client_id=${apiKey}&q=${searchInput.value}&per_page=12`;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert("Error Try Again");
      }
    })
    .then(function (data) {
      console.log(data);
      removeOldEvents();
      displayEvents(data);
    });
}

// API #3 hotel price aggregator - Calls for hotel information
function modalHotelApi(eventData) {
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Host": "hotel-price-aggregator.p.rapidapi.com",
  //     "X-RapidAPI-Key": "e5eb4ef180mshbf601c540e61cb2p1b592bjsnf529ab523414",
  //   },
  // };

  // fetch(
  //   `https://hotel-price-aggregator.p.rapidapi.com/search?q=${searchInput.value}`, options
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data[0].shortName);
  //     displayHotels(data, eventData);


  //   })
  //   .catch((err) => console.error(err));
}


// API #2 hotel price aggregator - Calls for hotel information
function hotelApi(eventData) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotel-price-aggregator.p.rapidapi.com",
      "X-RapidAPI-Key": "e5eb4ef180mshbf601c540e61cb2p1b592bjsnf529ab523414",
    },
  };

  fetch(
    "https://hotel-price-aggregator.p.rapidapi.com/search?q=300%2016th%20st",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].address);
      displayHotels(data, eventData);
    })
    .catch((err) => console.error(err));
}








function removeOldEvents() {
  var eventsArray = document.querySelectorAll(".card");
  for (i = 0; i < eventsArray.length; i++) {
    cardSection.removeChild(eventsArray[i]);
  }
}

function displayEvents(data) {
  for (i = 0; i < data.events.length; i++) {
    generateCards(data, i);
  }
  filpCard.classList.remove("hide");
}

// Function that appeneds cards to webpage. Also Checks to see if we get an image from Seatgeek API
function generateCards(data, iterator) {
  var cardEl = document.createElement("div");
  cardEl.classList = "col s4 card";

  var titleEl = document.createElement("span");
  titleEl.classList = "card-title";

  titleEl.innerHTML = data.events[iterator].title;
  cardSection.appendChild(cardEl);

  // Creating the image contaniers / validating if image is present
  var imageContainerEl = document.createElement("div");
  var eventImageEl = document.createElement("img");


  if (data.events[i].performers[0].image != null) {
    eventImageEl.setAttribute("src", data.events[iterator].performers[0].image);
  } else {
    eventImageEl.setAttribute("src", "./assets/images/images.png");
  }

  // Event Detail Information  - Displays events info on flip card
  eventImageEl.classList = "card-image";
  var descriptionEl = document.createElement("div");
  var dateEl = document.createElement("p");
  var timeEl = document.createElement("p");
  var locationNameEl = document.createElement("p");
  var addressEl = document.createElement("p");
  var modalButtonEl = document.createElement("a");  // Button that displays modal when clicked


  modalButtonEl.classList = "waves-effect waves-light btn modal-trigger";
  modalButtonEl.setAttribute("href", "#modal1");

  // Dynamically appeneding Addess, Date & time to display flip card
  addressEl.innerHTML = "Adress: " + data.events[iterator].venue.address;
  dateEl.innerHTML = "Date: " + data.events[iterator].datetime_local.substring(0, 10);
  timeEl.innerHTML = "Time: " + data.events[iterator].datetime_local.substring(11);
  locationNameEl.innerHTML = "Location: " + data.events[iterator].venue.name;

  descriptionEl.append(
    dateEl,
    timeEl,
    locationNameEl,
    addressEl,
    modalButtonEl
  );

  imageContainerEl.append(eventImageEl, titleEl);
  cardEl.appendChild(imageContainerEl);
  cardEl.appendChild(titleEl);
  cardEl.appendChild(descriptionEl);



  modalButtonEl.addEventListener("click", displayHotels)


}

// modal trigger
$(document).ready(function () {
  $(".modal").modal();
});




function displayHotels() {
  console.log("hello world");

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'hotel-price-aggregator.p.rapidapi.com',
      'X-RapidAPI-Key': 'e5eb4ef180mshbf601c540e61cb2p1b592bjsnf529ab523414'
    }
  };

  fetch('https://hotel-price-aggregator.p.rapidapi.com/search?q=300%2016th%20st', options)
    .then((response) => response.json())
    .then((data) => {


      let hotelName = document.querySelectorAll("#hotel-name")
      console.log(hotelName)
      for (let i = 0; i < hotelName.length; i++) {
        hotelName.innerHTML = data[i].shortName
        console.log(data[i].shortName)
      }

    })
    .catch((err) => console.error(err));



}




