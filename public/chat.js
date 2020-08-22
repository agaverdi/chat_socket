//connection
var socket = io.connect("http://localhost:3000");
var chat = document.getElementById("chat-window");
chat.scrollTop = chat.scrollHeight;
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var btn = document.getElementById("send");
var output = document.getElementById("output");

var feedback = document.getElementById("feedback");
var new_li = document.createElement("li");
var new_li2=document.createElement("li");

var person=prompt("what is your name?")

while(person==null){
  person=prompt("please write your name")
}
handle.value=person
btn.addEventListener("click", function () {

  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
  
  saveMessage(message.value,handle.value);
  message.value = "";
});

message.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});

//listen for events

socket.on("chat", function (data) {
  output.innerHTML +=
    "<p>" + data.handle + ": " + data.message + "</p>";
  feedback.innerHTML = "";
});

socket.on("typing", function (data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});

socket.on("chat message", function (msg) {
  var li_text = (new_li.innerText = msg + "<br/>");
  output.innerHTML += li_text;
  return 0;
});

socket.on("online", function (msg) {
  var li_text = (new_li2.innerText = person  + msg + "<br/>");
  output.innerHTML += li_text;
  person=""
  // console.log("---------------",person)
  return 0;
});

const outputMessage = (message) => {
  let messli = document.createElement("li");
  messli.innerText = message;
  console.log(messli);
  output.appendChild(messli);
};

const saveMessage = async (message, user) => {
  console.log(message);
  const url = "http://localhost:3000/messages";
  const settings = {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({user:user, msg: message }),
  };

  try {
    const messago = await fetch(url, settings);
    const mesresp = await messago.json();

    if (messago.status == 201) {
      socket.emit("chatMessage", message);
    }
  } catch (error) {
    throw error;
  }
};

const retrymess = async () => {
  const url = "http://localhost:3000/messages";
  const settings = {
    method: "GET",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const messago = await fetch(url, settings);
    const mesresp = await messago.json();

    mesresp.forEach((element) => {
      mess = element.msg;
      user = element.user
      console.log(user)
      outputMessage(user + ": " + mess);
    });
  } catch (error) {
    throw error;
  }
};

retrymess();
