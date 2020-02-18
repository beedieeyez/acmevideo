$("btn1").click(function(){
  var urlAdd = "{"+ "fname" + ":" + "$("#fname").val()" + "," + "lname" + ":" +  "$("#lname").val()" +"}";
  var encodedString = Base64.encode(urlAdd);
  var fullUrl = "http://acmeapi:9090/api/"+ encodedString;  
  $.get(fullUrl, function(data, status){
    var apiDecodedString = Base64.decode(data);
    var obj = JSON.stringify(apiDecodedString);  
    var changeObj = JSON.parse(obj);
    $("#queryResults").text("happ");
  });
}); 
