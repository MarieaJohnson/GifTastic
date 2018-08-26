// GifTastic JS

// console.log("JavaScript is connected");

var animals = ["Planes", "Dogs", "Food", "Hedgehogs", "Cars"];

function displayGifs() {
  // document.getElementById("#gifHere").innerHTML = "";
  // $("#gifHere").clear();
  var gif = $(this).attr("data-item");
}

function displayButtons() {
  $("#gifButton").empty();
  $("#gifInput").val("");
  for (let i = 0; i < animals.length; i++) {
    const element = animals[i];
    var newButton = $("<button>");
    newButton.addClass("animal");
    newButton.attr("data-name", element);
    newButton.text(element);
    $("#gifButton").append(newButton);
  }
}

$("#newGif").on("click", function (event){
    $('#gifHere').empty();
    // Prevents browser from refreshing
    event.preventDefault();
    var userInput = $("#gifInput").val();
    // Pushes userInput into animals array
    animals.push(userInput);
    console.log(animals);
    console.log(userInput);
    displayButtons();
})

displayButtons();

$(document).on("click",".animal", function () {
  $('#gifHere').empty();
  var item = $(this).attr("data-name");
  console.log(item);

  // URL to search Giphy
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=7N9x3bYP39sIn52AU3Ml0BfnNnT51d5d&limit=10";

  // Performing AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // Gif from the API
    .then(function (response) {

      var gifHere = $("<div class = 'gif'>");

      // Storing an array of results in the results variable
      var results = response.data;

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "item"
          var gifDiv = $("<div class='item'>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var pRating = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var itemImage = $("<img class = 'result'>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;
          itemImage.attr("src", still);
          itemImage.attr("data-state", "still");
          itemImage.attr("data-animate", animated);
          itemImage.attr("data-still", still);

          // Appending the paragraph and itemImage we created to the "gifDiv" div we created
          gifDiv.append(pRating);
          gifDiv.append(itemImage);

          // Prepending the gifDiv to the "#gifHere" div in the HTML
          $("#gifHere").prepend(gifDiv);
        }
      }
    })
  })
$(document).on("click", ".result", function () {
  var state = $(this).attr("data-state");

  // Animate/still Gif
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
})