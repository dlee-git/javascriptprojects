const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users')

const socket = io();


// Get username and room info from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});


// Join chatroom
socket.emit('joinRoom', {username, room});

// Get room and users
socket.on('roomUsers', ({room, users}) => {
  outputRoomName(room);
  outputUsers(users);
});




// Message from server
socket.on('message', (message) => {
  outputMessage(message);
  // Chat box scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


// Message submit
chatForm.addEventListener('submit', (event) => {
  // Prevents user message submission from saving as a file.
  event.preventDefault();

  // Get message text
  let msg = event.target.elements.msg.value;

  // Format and check user msg input
  msg = msg.trim();
  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage',msg);

  // Clear input
  event.target.elements.msg.value = '';
  event.target.elements.msg.focus();
})


// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <p class="meta">
    ${message.username}
    <span>${message.time}</span></p>
  <p class ="text"> 
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}


// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});

