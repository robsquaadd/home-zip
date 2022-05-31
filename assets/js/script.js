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
  let apiUrl = `https://api.seatgeek.com/2/events?client_id=${apiKey}&q=${searchInput.value}`;
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
  imageContainerEl.append(eventImageEl, titleEl);
  cardEl.appendChild(imageContainerEl);
  cardEl.appendChild(titleEl);
}
