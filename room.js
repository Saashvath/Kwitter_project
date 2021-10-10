
var firebaseConfig = {
  apiKey: "AIzaSyBcCnV5eniaeOrTJ7gMAuWwmQPOf_5p2OY",
  authDomain: "kwitter-project-41ed1.firebaseapp.com",
  databaseURL: "https://kwitter-project-41ed1-default-rtdb.firebaseio.com",
  projectId: "kwitter-project-41ed1",
  storageBucket: "kwitter-project-41ed1.appspot.com",
  messagingSenderId: "909814972327",
  appId: "1:909814972327:web:31c272fca83f409e078082"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function add_room(){

  var room_name = document.getElementById("room_name").value; 
  localStorage.setItem("room_name",room_name)


  firebase.database().ref("/").child(room_name).update({
      purpose: "Add room_name"
  })

  window.location ="room_page.html"
}


function getData() {
  
  //const db = firebase.database().ref();
 //db.on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
  firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;

  Room_names = childKey;
 //Start code
 console.log("room_names")
 row = "<div class ='room_name' id = '"+Room_names + "' onclick ='redirect_to_room_name(this.id)'>" +Room_names+ "</div><hr>";
 document.getElementById("output").innerHTML += row;
 //End code
 });});}
getData();


function redirect_to_room_name(trending_room_name){

  localStorage.setItem("room_name", trending_room_name)
  console.log(trending_room_name);
  window.location ="kwitter_page.html" ;
}

function send(){

  msg =document.getElementById("Msg").value;

  firebase.databse().ref(room_name).push({

      name:user_name,
      like:0,
      message:msg
  });
  document.getElementById("Msg")
}
function logout(){

localStorage.removeItem(user_name);
localStorage.removeItem(room_name);
window.location ="index.html"
}



