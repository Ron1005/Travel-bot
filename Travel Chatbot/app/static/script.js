document.getElementById('send-btn').addEventListener('click', sendMessage);

function sendMessage() {
  const userInput = document.getElementById('user-input');
  const message = userInput.value.trim();

  if (!message) return;

  // Display user message
  displayMessage(message, 'user-message');

  // Clear input field
  userInput.value = '';

  // Send message to the backend
  fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display bot response
      displayMessage(data.response, 'bot-message');
    })
    .catch((error) => {
      console.error('Error:', error);
      displayMessage('Something went wrong. Please try again.', 'bot-message');
    });
}

function displayMessage(message, className) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${className}`;
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
