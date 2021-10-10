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

user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")


function send() {

  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({

    name: user_name,
    message: msg,
    like: 0
  });
  document.getElementById("msg")
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;

        console.log(firebase_message_id)
        console.log(message_data)
        user = message_data['name']
        message = message_data['message']
        like = message_data['like']
        name_tag = "<h4>" + user + "<img  class='user_tick' src ='tick.png'></h4>";
        message_tag = "<h4 class='message_h4'> " + message + "</h4>"
        like_button = "<button class = 'btn btn-warning'>id='" + firebase_message_id + "value=" + like + "onclick='like(this.id)'>";
        span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>"

        row = name_tag + message_tag + like_button + span_tag;
        document.getElementById("output").innerHTML += row;
      }
    });
  });
}

getData();

function like(message_id) {

  console.log("click on the like button -" + message_id)
  button_id = message_id
  likes = document.getElementById(button_id).value
  updated_likes = Number(likes) + 1
  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes
  })
}
