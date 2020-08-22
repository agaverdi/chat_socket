var socket = io();

var input_message=document.getElementById('message');
var input_handle=document.getElementById('handle');
var btn=document.getElementById('send');


btn.addEventListener('click', function(){
  socket.emit("chat message",{

    input_message:input_message.value,
    input_handle:input_handle.value,
    
  })
  console.log("1", input_message.value)
  
  saveMessage(input_message.value)

  input_message.value="";

  return false

})


// $("form").submit(function (e) {
//   e.preventDefault(); // prevents page reloading
//   socket.emit("chat message", $("#mesajlar").val());
//   messa = $("#mesajlar").val();
//   console.log(messa);
//   saveMessage(messa);

//   $("#mesajlar").val("");

//   return false;
// });
// socket.on("chat message", function (msg) {
//   $("#messages").append($("<li>").text(msg));
// });
socket.on("message",function(message){
  $("#messages").append($("<li>").text(message))
})

socket.on('chat', function(data){
  output.innerHTML+='<p><strong>'+ data.handle +': </strong>' + data.message + '</p>'
})
var messageul = document.getElementById("messages");


const outputMessage = (message) => {
  let messli = document.createElement("li");
  messli.innerText = message;
  console.log(messli)
  messageul.appendChild(messli);
};

const saveMessage = async (message) => {
  console.log(message)
  const url = "http://localhost:3000/messages";
  const settings = {
    method: "POST",
    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json",
    },
    body: JSON.stringify({ msg: message }),
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
      'Content-Type': "application/json",
    },
  };

  try {
    const messago = await fetch(url, settings);
    const mesresp = await messago.json();

    mesresp.forEach((element) => {
      console.log(mesresp)
      mess = element.msg;
      user = element.user
      console.log(user)
      outputMessage(user+": "+mess);
    });
  } catch (error) {
    throw error;
  }
};

retrymess();
