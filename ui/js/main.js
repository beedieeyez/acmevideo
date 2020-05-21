function getVideo() {
  var x=0
  var videoSources=["\"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4\"","\"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4\"","\"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4\"","\"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4\"", "\"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4\"","\"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4\"","\"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4\"","\"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4\"","\"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4\"","\"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4\"","\"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4\"","\"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4\""]
 
  var x=Math.floor(Math.random() * 10)   
  var videoHTML = "<video width=\"640\" height=\"480\" autoplay > <source src=" + videoSources[x] + " type=\"video/mp4\">";
  document.querySelector('.center').innerHTML = videoHTML;

}

function getRemote(grabURL) {

    var remote = "";

    $.ajax({
        type: "GET",
        url: grabURL,
        async: false,
        success : function(data) {
            remote = data;
        }
    });

    return remote;

}


function doClick(){
var totalMovieCount=0;
var carryObjectLen=0;

var a=0;
var b =0;

changeObj=[];

           if ($("#fname").val() !== ""  || $("#lname").val() !== ""){

              var urlAdd = {"fname":"","lname":""};
              urlAdd["fname"]=$("#fname").val().trim();
              urlAdd["lname"]=$("#lname").val().trim();
              var encodedString="";
              var encodedString = btoa(JSON.stringify(urlAdd));
              var fullUrl = "https://www.acme.com:9099/api/"+"?" + encodedString;
              var videoHTML = " ";
              document.querySelector('.videocenter').innerHTML = videoHTML;

                       apiData= getRemote(fullUrl);
                       apiDataJSON=atob(apiData);

                       var a,b =0; 
                       console.log(apiDataJSON);  
                       changeObj = JSON.parse(apiDataJSON);
                       carryObjectLen=(changeObj.length);
                       text="";
                       for (a=0;a<changeObj.length;a++){
                       text += "<p style=\"color:blue;font-size:24px;font-weight:bold;\">"+ "Actor" + "</p>";
                       text += "<p class=\"blink\" style=\"color:red;font-size:24px;font-weight:bold;\">"+   changeObj[a].first_name + " " + changeObj[a].last_name + "</p>";



                        for (b=0;b<changeObj[a].FilmData.length;b++){
                             text += "<p  style=\"color:blue;font-size:18px;\"  >  <a href=\"javascript:void(0)\"  onclick=\"getVideo(); \" > "+ "Movie Title: "+ changeObj[a].FilmData[b].title + " </a>" + "  " +"***"+ "  " + "Release Year:  " + changeObj[a].FilmData[b].release_year + "  </p>";
                             text += "<p>"+ "Description: " + changeObj[a].FilmData[b].description + "   " + "</p>";
                             text += "<p>"+ "Rating: " + changeObj[a].FilmData[b].rating +  "  " + "</p>";
                             text += "<p style=\"color:blue;font-size:14px;\">"+ "Length: " + changeObj[a].FilmData[b].length +  " minutes   " + "</p>";
                             totalMovieCount+=1;
};


};

              var countHTML="<p>  Search Results </p>";
               countHTML+="<p>"+  carryObjectLen +  " Actors  " + "</p>";
              countHTML+="<p>"+ totalMovieCount +  " Movie Titles  " + "</p>";

              
              $("#queryResults").html( text );
              console.log(text);
              $("#displayCount").html(countHTML);
              text=" ";
}else{
               carryObjectLen=0;
               totalMovieCount=0
               $("#displayCount").html("<p>  </p");
               $("#queryResults").text("Enter A First Name Or Last Or At Least Some Letters");
               $("#queryResults").text("Enter A First Name Or Last Name Or At Least Some Letters");
               var videoHTML = " ";
               document.querySelector('.videocenter').innerHTML = videoHTML;

               
              text=" ";

            };
};
