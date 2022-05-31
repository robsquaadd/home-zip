//clientSecret b340483a7a27e88d5f194b3ecaff1d876de82fb6f8ad348d9ea12020a1b129cf
// clientID MjIzNjI4MTd8MTY1MzUyMjkzMS42NzQ0ODU

let filpCard = document.querySelector(".flip");
let searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", fetchEventData);
let searchInput = document.querySelector("#search");
const cardSection = document.getElementById("card-parent");

/*const search = async () => {
  var eventData = await fetchEventData()
  displayEvents(eventData)
}*/

function fetchEventData() {
  let apiKey = "MjIzNjI4MTd8MTY1MzUyMjkzMS42NzQ0ODU";
  let apiUrl = `https://api.seatgeek.com/2/events?client_id=${apiKey}`;
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
      displayEvents(data);
    });
}

function displayEvents(data) {
  for (i = 0; i < data.events.length; i++) {
    console.log(data.events[i]);
    var cardEl = document.createElement("div");
    cardEl.classList = "card";
    cardEl.textContent = data.events[i].title;
    cardSection.appendChild(cardEl);
  }
  filpCard.classList.remove("hide");
}

// Modal triger
$(document).ready(function() {
  $(".modal").modal();
});