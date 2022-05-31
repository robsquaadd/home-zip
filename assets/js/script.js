//clientSecret b340483a7a27e88d5f194b3ecaff1d876de82fb6f8ad348d9ea12020a1b129cf
// clientID MjIzNjI4MTd8MTY1MzUyMjkzMS42NzQ0ODU

//Grabbing the flip card class from HTML
let filpCard = document.querySelector(".flip");

//Grabbing the Search button
let searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", search);

//Grabbing Search input field
let searchInput = document.querySelector("#search");

function search() {
  filpCard.classList.remove("hide");
  console.log(searchInput.value);
  apiTM();
}

function apiTM() {
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
    });
}
