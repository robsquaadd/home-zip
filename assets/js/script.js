const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
    "X-RapidAPI-Key": "d84de6e21amsha8ee7921306ee3fp1316c8jsne853c68ba923",
  },
};

var seatGeekURL = "https://api.seatgeek.com/2/events";
var googleMapsURL = "";

const retrieveZillow = async () => {
  try {
    const response = await fetch(zillowURL, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

retrieveZillow();

// clientSecret b340483a7a27e88d5f194b3ecaff1d876de82fb6f8ad348d9ea12020a1b129cf
// clientID MjIzNjI4MTd8MTY1MzUyMjkzMS42NzQ0ODU

// <input type = 'submit' placeholder = 'Location'></input>
// add an event listener on the input field that saves the user's choice
// loop through events api for events in user inputted location.
// dynamically generate cards to display on the homepage.
// dynamically populate the modal with event information.
