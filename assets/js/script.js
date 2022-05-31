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
        alert(" Error Try Again");
      }
    })
    .then(function (data) {
      console.log(data);
      removeOldEvents();
      displayEvents(data);
    });
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
  var locationEl = document.createElement("p");
  dateEl.innerHTML =
    "Date: " + data.events[iterator].datetime_local.substring(0, 11);
  timeEl.innerHTML =
    "Time: " + data.events[iterator].datetime_local.substring(12);
  locationEl.innerHTML = "Location: " + data.events[iterator].venue.name;
  descriptionEl.append(dateEl, timeEl, locationEl);
  imageContainerEl.append(eventImageEl, titleEl);
  cardEl.appendChild(imageContainerEl);
  cardEl.appendChild(titleEl);
  cardEl.appendChild(descriptionEl);
}
