var topics = ["Captain America", "Iron Man","Hulk" ,"Thor", "Scarlet Witch", "Spider Man","Ant Man", "Black Panther","Black Widow","Doctor Strange"];

var queryURL;
var still;
var moving;


//prerenders the buttons
makeButtons(); 


//will trigger the gif rendering upon button click
$(document).on("click", ".gifButton", function addGifs(){
	$(".insert").empty(); //emptys the div of any previous gifs	

	for (var i = 0; i < 10; i++) {
		$("#gif"+i).empty();
	}
	
	subject = $(this).attr("data-name");

	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";

	$.ajax({
	url: queryURL,
	method: "GET"
	}).done(function(response) {

		var results = response.data;
		console.log(results)

		for (var i = 0; i < results.length; i++) {
			still = results[i].images.fixed_height_still.url; //grabs the still gif url
			moving = results[i].images.fixed_height.url; //grabs the animated gif url

			var gif = $("<img>");
			var p = $("<p>");
			var rating = $("<h4>")
			
			$(rating).append("Rating: " + results[i].rating)
			$(p).append(gif);
			$(gif).attr("src", still);
			$(gif).attr("data-still", still);
			$(gif).attr("data-moving", moving);
			$(gif).attr("status", "still");
			$(gif).attr("class", "gif");
			$(p).prepend(rating);
			$("#gif"+i).append(p)
		}
	})
})


$(document).on('click', '.gif' ,function(){
    var state = $(this).attr("status");
    if (state==="still") {
      $(this).attr("status","moving");
      $(this).attr("src",$(this).attr("data-moving"))
    } else if (state==="moving"){
      $(this).attr("status","still");
      $(this).attr("src",$(this).attr("data-still"))
    }
})	


function makeButtons() {
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
      var buttons = $("<button>");
      buttons.addClass("gifButton");
      buttons.addClass("btn");
      buttons.addClass("btn-primary");
      buttons.attr("data-name", topics[i]);
      buttons.text(topics[i]);
      $("#buttons").append(buttons);
    }
}

$("#submit").on("click", function(event) {
	event.preventDefault();
	var newGif = $("#input").val().trim();
	if (newGif === "") {
		alert("You did not enter anything")
	} else {
		topics.push(newGif);
	  	makeButtons();
  	}
});


