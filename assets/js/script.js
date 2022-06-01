//Grabbing the flip card class from HTML
let filpCard = document.querySelector(".flip")

//Grabbing the Search button
let searchBtn = document.querySelector("#searchBtn")
searchBtn.addEventListener('click', search)

//Grabbing Search input field 
let searchInput = document.querySelector("#search")

let appenedEl = document.querySelector("#appendEl")
let appenedEl1 = document.querySelector("#appendEl1")

let hotelCard = document.querySelector("#hotelView")
hotelCard.addEventListener('click', hotelApi )



//Search Button function
function search() {
  filpCard.classList.remove("hide")

  console.log(searchInput.value)
  apiTM()
  hotelApi()
  
}

function apiTM() {
  let apiKey = "MjIzNjI4MTd8MTY1MzUyMjkzMS42NzQ0ODU";
  let apiUrl = "https://api.seatgeek.com/2/events?geoip=true&range=20mi&client_id=MjIzNjI4MTd8MTY1MzUyMjkzMS42NzQ0ODU "
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      console.log(apiUrl)
      return response.json()

    } else {
      alert(" Error Try Again")
    }


  }).then(function(data){
   console.log(data)
    console.log(data.events[0])
    console.log(data.events[0].type)
    console.log(data.events[0].title)
    console.log(data.events[0].city)
    console.log(data.events[0].datetime_utc)

let apiValues = [ data.events[0].type , data.events[0].city]

let listItemElHEading = document.createElement("h5");
listItemElHEading.textContent = data.events[0].title
appenedEl.append(listItemElHEading)

     let listItemEl = document.createElement("p");
  listItemEl.textContent = apiValues
  appenedEl.append(listItemEl)



  let apiValues1 = [ data.events[2].type , data.events[2].city]

let listItemElHEading1 = document.createElement("h5");
listItemElHEading1.textContent = data.events[2].title
appenedEl1.append(listItemElHEading1)

     let listItemEl1 = document.createElement("p");
  listItemEl1.textContent = apiValues1
  appenedEl1.append(listItemEl1)


  }  
  


  )}




function hotelApi (){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'hotel-price-aggregator.p.rapidapi.com',
      'X-RapidAPI-Key': 'e5eb4ef180mshbf601c540e61cb2p1b592bjsnf529ab523414'
    }
  };
  
  fetch('https://hotel-price-aggregator.p.rapidapi.com/search?q=300%2016th%20st', options)
    .then(response => response.json())
    .then(data => console.log(data[0].address))

  
    .catch(err => console.error(err));



    
  }
  









  // console.log( data.events[0].title)
  // let listItemEl = document.createElement("p");
  // listItemEl.textContent = data.events[0].title
  // appenedEl.append(listItemEl)




//   let filpCard = document.querySelector(".flip");
// let searchBtn = document.querySelector("#searchBtn");
// searchBtn.addEventListener("click", fetchEventData);
// let searchInput = document.querySelector("#search");
// const cardSection = document.getElementById("card-parent");

// function fetchEventData(e) {
//   e.preventDefault();
//   let apiKey = "MjIzNjI4MTd8MTY1MzUyMjkzMS42NzQ0ODU";
//   let apiUrl = `https://api.seatgeek.com/2/events?client_id=${apiKey}&q=${searchInput.value}&per_page=12`;
//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         return response.json();
//       } else {
//         alert(" Error Try Again");
//       }
//     })
//     .then(function (data) {
//       console.log(data);
//       removeOldEvents();
//       displayEvents(data);
//     });
// }

// function removeOldEvents() {
//   var eventsArray = document.querySelectorAll(".card");
//   for (i = 0; i < eventsArray.length; i++) {
//     cardSection.removeChild(eventsArray[i]);
//   }
// }

// function displayEvents(data) {
//   for (i = 0; i < data.events.length; i++) {
//     generateCards(data, i);
//   }
//   filpCard.classList.remove("hide");
// }

// function generateCards(data, iterator) {
//   var cardEl = document.createElement("div");
//   cardEl.classList = "col s4 card";
//   var titleEl = document.createElement("span");
//   titleEl.classList = "card-title";
//   titleEl.innerHTML = data.events[iterator].title;
//   cardSection.appendChild(cardEl);
//   var imageContainerEl = document.createElement("div");
//   var eventImageEl = document.createElement("img");


//   if (data.events[i].performers[0].image != null) {
//     eventImageEl.setAttribute("src", data.events[iterator].performers[0].image);
//   } else {
//     eventImageEl.setAttribute("src", "./assets/images/images.png");
//   }


//   eventImageEl.classList = "card-image";
//   var descriptionEl = document.createElement("div");
//   var dateEl = document.createElement("p");
//   var timeEl = document.createElement("p");
//   var locationEl = document.createElement("p");

//   dateEl.innerHTML =
//     "Date: " + data.events[iterator].datetime_local.substring(0, 11);
//   timeEl.innerHTML =
//     "Time: " + data.events[iterator].datetime_local.substring(12);
//   locationEl.innerHTML = "Location: " + data.events[iterator].venue.name;
//   descriptionEl.append(dateEl, timeEl, locationEl);
//   imageContainerEl.append(eventImageEl, titleEl);
//   cardEl.appendChild(imageContainerEl);
//   cardEl.appendChild(titleEl);
//   cardEl.appendChild(descriptionEl);
// }