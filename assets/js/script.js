//clientSecret b340483a7a27e88d5f194b3ecaff1d876de82fb6f8ad348d9ea12020a1b129cf
// clientID MjIzNjI4MTd8MTY1MzUyMjkzMS42NzQ0ODU

let filpCard = document.querySelector(".flip");
let searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", fetchEventData);
let searchInput = document.querySelector("#search");
const cardSection = document.getElementById("card-parent");
const searchHistoryEl = document.getElementById("search-history");
const clearSearchHistoryEl = document.getElementById("clear-history");

function fetchEventData(e) {
  console.log(e.target);
  e.preventDefault();
  let apiKey = "MjIzNjI4MTd8MTY1MzUyMjkzMS42NzQ0ODU";
  if (e.target === searchBtn) {
    var apiUrl = `https://api.seatgeek.com/2/events?client_id=${apiKey}&q=${searchInput.value}&per_page=12`;
  } else {
    console.log(e.target.textContent);
    var apiUrl = `https://api.seatgeek.com/2/events?client_id=${apiKey}&q=${e.target.textContent}&per_page=12`;
  }
  console.log(apiUrl);
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
      addToSearchHistory(e);
      pageScroll();
    });
}

function addToSearchHistory(e) {
  var searchHistoryArray = JSON.parse(localStorage.getItem("searchHistory"));
  console.log(e.target);
  if (!searchHistoryArray && e.target === searchBtn) {
    searchHistoryArray = [searchInput.value];
  } else if (!searchHistoryArray) {
    searchHistoryArray = [e.target.textContent];
  } else if (searchHistoryArray && e.target === searchBtn) {
    searchHistoryArray.push(searchInput.value);
  } else {
    searchHistoryArray.push(e.target.textContent);
  }
  localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray));
}

async function retrieveHotelData(locationData, eventData, iterator) {
  var checkOutDate = determineCheckoutDate(eventData, iterator);
  console.log(checkOutDate);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
      "X-RapidAPI-Key": "d84de6e21amsha8ee7921306ee3fp1316c8jsne853c68ba923",
    },
  };
  const hotelAPIURL = `https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=${checkOutDate}&units=imperial&dest_id=${
    locationData[0].dest_id
  }&dest_type=${locationData[0].dest_type}&locale=en-${eventData.events[
    iterator
  ].venue.country.toLowerCase()}&adults_number=2&order_by=popularity&filter_by_currency=USD&checkin_date=${eventData.events[
    iterator
  ].datetime_local.substring(0, 10)}&room_number=1`;
  const response = await fetch(hotelAPIURL, options);
  const data = await response.json();
  return data;
}

function determineCheckoutDate(eventData, iterator) {
  var date = eventData.events[iterator].datetime_local.substring(0, 10);
  var unixDate = Date.parse(date);
  var newUnixDate = parseFloat(unixDate) + 86400000 * 2;
  var newDate = new Date(newUnixDate);
  var momentDate = moment(newDate).format("YYYY-MM-DD");
  return momentDate;
}

async function retrieveLocationData(eventData, iterator) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
      "X-RapidAPI-Key": "d84de6e21amsha8ee7921306ee3fp1316c8jsne853c68ba923",
    },
  };
  locationAPIURL = `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-${eventData.events[
    iterator
  ].venue.country.toLowerCase()}&name=${eventData.events[iterator].venue.city}`;
  const response = await fetch(locationAPIURL, options);
  const data = await response.json();
  console.log(data);
  return data;
}

/*function hotelApi(eventData, iterator) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotel-price-aggregator.p.rapidapi.com",
      "X-RapidAPI-Key": "e5eb4ef180mshbf601c540e61cb2p1b592bjsnf529ab523414",
    },
  };
  fetch(
    `https://hotel-price-aggregator.p.rapidapi.com/search?q=${eventData.events[iterator].venue.city}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayHotels(data, eventData);
    })
    .catch((err) => console.error(err));
}
*/
function removeOldEvents() {
  var eventsArray = document.querySelectorAll(".event-card");
  if (eventsArray) {
    for (i = 0; i < eventsArray.length; i++) {
      cardSection.removeChild(eventsArray[i]);
    }
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
  cardEl.classList = "col s12 m6 l4 card event-card hoverable";
  var titleEl = document.createElement("span");
  titleEl.classList = "card-title";
  titleEl.innerHTML = data.events[iterator].title;
  cardSection.appendChild(cardEl);
  var imageContainerEl = document.createElement("div");
  imageContainerEl.classList = "card-image";
  var eventImageEl = document.createElement("img");
  if (data.events[i].performers[0].image != null) {
    eventImageEl.setAttribute("src", data.events[iterator].performers[0].image);
  } else {
    eventImageEl.setAttribute("src", "./assets/images/images.png");
  }
  eventImageEl.classList = "card-image";
  var descriptionEl = document.createElement("div");
  descriptionEl.classList = "event-description";
  var dateEl = document.createElement("p");
  var timeEl = document.createElement("p");
  var locationNameEl = document.createElement("p");
  var addressEl = document.createElement("p");
  var modalButtonEl = document.createElement("a");
  modalButtonEl.classList =
    "waves-effect waves-light btn hotels-button modal-trigger";
  modalButtonEl.setAttribute("href", "#modal1");
  modalButtonEl.textContent = "HOTELS";
  var ticketsButtonEl = document.createElement("a");
  ticketsButtonEl.classList =
    "waves-effect waves-light btn hotels-button modal-trigger red";
  ticketsButtonEl.textContent = "TICKETS";
  ticketsButtonEl.setAttribute("href", data.events[iterator].url);
  var buttonsContainerEl = document.createElement("div");
  buttonsContainerEl.classList = "buttons-container container valign-wrapper";
  buttonsContainerEl.append(modalButtonEl, ticketsButtonEl);
  addressEl.innerHTML =
    "Adress: " +
    data.events[iterator].venue.address +
    " " +
    data.events[iterator].venue.city +
    ", " +
    data.events[iterator].venue.state;
  dateEl.innerHTML =
    "Date: " + data.events[iterator].datetime_local.substring(0, 10);
  timeEl.innerHTML =
    "Time: " + data.events[iterator].datetime_local.substring(11);
  locationNameEl.innerHTML = "Location: " + data.events[iterator].venue.name;
  descriptionEl.append(dateEl, timeEl, locationNameEl, addressEl);
  imageContainerEl.append(eventImageEl, titleEl);
  cardEl.append(imageContainerEl, titleEl, descriptionEl, buttonsContainerEl);
  modalButtonEl.addEventListener("click", async () => {
    removeOldHotels();
    var locationData = await retrieveLocationData(data, iterator);
    var hotelData = await retrieveHotelData(locationData, data, iterator);
    displayHotels(hotelData);
  });
}

function displayHotels(hotelData) {
  var modalEl = document.getElementById("modal1");
  for (i = 0; i < hotelData.result.length; i++) {
    var hotelCardEl = document.createElement("div");
    hotelCardEl.classList = "card row hotel-card";
    var hotelImageEl = document.createElement("img");
    hotelImageEl.setAttribute("src", hotelData.result[i].max_1440_photo_url);
    hotelImageEl.classList = "col s4";
    var hotelInfoEl = document.createElement("div");
    hotelInfoEl.classList = "col s5";
    var hotelNameEl = document.createElement("h5");
    hotelNameEl.innerHTML = hotelData.result[i].hotel_name;
    var hotelAddressEl = document.createElement("p");
    hotelAddressEl.innerHTML = hotelData.result[i].address;
    var toBookingCom = document.createElement("div");
    toBookingCom.classList = "center-align row col s3";
    var hotelPriceEl = document.createElement("p");
    hotelPriceEl.innerHTML =
      "$" +
      hotelData.result[i].price_breakdown.all_inclusive_price +
      " per night!";
    hotelPriceEl.classList = "col s12";
    toBookingComButtonEl = document.createElement("a");
    toBookingComButtonEl.classList = "waves-effect waves-light btn col s12";
    toBookingComButtonEl.textContent = "BOOK NOW";
    toBookingComButtonEl.setAttribute("href", hotelData.result[i].url);
    toBookingCom.append(hotelPriceEl, toBookingComButtonEl);
    hotelInfoEl.append(hotelNameEl, hotelAddressEl);
    hotelCardEl.append(hotelImageEl, hotelInfoEl, toBookingCom);
    modalEl.append(hotelCardEl);
  }
}

// modal trigger
$(document).ready(function () {
  $(".modal").modal();
});

searchHistoryEl.addEventListener("click", () => {
  var historyModal = document.getElementById("history-modal");
  var formerSearchHistory = document.querySelectorAll(".search-history-button");
  for (i = 0; i < formerSearchHistory.length; i++) {
    historyModal.removeChild(formerSearchHistory[i]);
  }
  var searchHistoryArray = JSON.parse(localStorage.getItem("searchHistory"));
  if (searchHistoryArray) {
    for (i = searchHistoryArray.length - 1; i >= 0; i--) {
      var historyButtonEl = document.createElement("a");
      historyButtonEl.classList =
        "waves-effect waves-light btn grey darken-4 search-history-button col s12";
      historyButtonEl.textContent = searchHistoryArray[i];
      historyButtonEl.addEventListener("click", (e) => {
        $("#history-modal").modal("close");
        fetchEventData(e);
      });
      historyModal.appendChild(historyButtonEl);
    }
  }
});

function removeOldHotels() {
  var modalEl = document.getElementById("modal1");
  var hotelCardsArray = document.querySelectorAll(".hotel-card");
  if (hotelCardsArray) {
    for (i = 0; i < hotelCardsArray.length; i++) {
      modalEl.removeChild(hotelCardsArray[i]);
    }
  }
}

function pageScroll() {
  window.scrollBy(0, 950);
}

function clearHistory() {
  localStorage.removeItem("searchHistory");
}

clearSearchHistoryEl.addEventListener("click", clearHistory);
