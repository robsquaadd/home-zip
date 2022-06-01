//clientSecret b340483a7a27e88d5f194b3ecaff1d876de82fb6f8ad348d9ea12020a1b129cf
// clientID MjIzNjI4MTd8MTY1MzUyMjkzMS42NzQ0ODU

let filpCard = document.querySelector(".flip");
let searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", fetchEventData);
let searchInput = document.querySelector("#search");
const cardSection = document.getElementById("card-parent");

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

/*
async function retrieveHotelData() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
      "X-RapidAPI-Key": "d84de6e21amsha8ee7921306ee3fp1316c8jsne853c68ba923",
    },
  };
  const response = await fetch(
    "https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=2022-10-01&units=metric&dest_id=-553173&dest_type=city&locale=en-gb&adults_number=2&order_by=popularity&filter_by_currency=AED&checkin_date=2022-09-30&room_number=1&children_number=2&page_number=0&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&include_adjacency=true",
    options
  );
  const data = response.json();
}
*/

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

function generateCards(data, iterator) {
  var cardEl = document.createElement("div");
  cardEl.classList = "col s4 card";
  var titleEl = document.createElement("span");
  titleEl.classList = "card-title";
  titleEl.innerHTML = data.events[iterator].title;
  cardSection.appendChild(cardEl);
  var imageContainerEl = document.createElement("div");
  var eventImageEl = document.createElement("img");
  if (data.events[i].performers[0].image != null) {
    eventImageEl.setAttribute("src", data.events[iterator].performers[0].image);
  } else {
    eventImageEl.setAttribute("src", "./assets/images/images.png");
  }
  eventImageEl.classList = "card-image";
  var descriptionEl = document.createElement("div");
  var dateEl = document.createElement("p");
  var timeEl = document.createElement("p");
  var locationNameEl = document.createElement("p");
  var addressEl = document.createElement("p");
  var modalButtonEl = document.createElement("a");
  modalButtonEl.classList = "waves-effect waves-light btn modal-trigger";
  modalButtonEl.setAttribute("href", "#modal1");
  addressEl.innerHTML = "Adress: " + data.events[iterator].venue.address;
  dateEl.innerHTML =
    "Date: " + data.events[iterator].datetime_local.substring(0, 10);
  timeEl.innerHTML =
    "Time: " + data.events[iterator].datetime_local.substring(11);
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
  modalButtonEl.addEventListener("click", () => {
    hotelApi(data);
  });
}

function displayHotels() {
  console.log("hello world");
}

// modal trigger
$(document).ready(function () {
  $(".modal").modal();
});
