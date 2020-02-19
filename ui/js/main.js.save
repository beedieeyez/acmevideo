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
                             text += "<p style=\"color:blue;font-size:18px;\">"+ "Movie Title: "+ changeObj[a].FilmData[b].title + "  " +"***"+ "  " + "Release Year:  " + changeObj[a].FilmData[b].release_year + "</p>";
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
               $("#queryResults").text("Enter A First Name Or Last Or At Least Some Letters");
              text=" ";

            };
};
