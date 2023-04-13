const chatContainer = document.getElementById('chat-container');

// Model prediction form elements
const messageForm = document.getElementById('message-input-form');
const messageInput = document.getElementById('message-input-field');

// Feedback form elements
const feedbackForm = document.getElementById('feedback-form');
const feedbackInput = document.getElementById('feedback-form-field')
const feedbackSuccess = document.getElementById('feedback-success')
const feedbackExpected = document.getElementById("feedback-expected");
const otherOptionContainer = document.getElementById("other-option");
const otherOption = document.getElementById("feedback-expected-other");
const submitBtn = document.getElementById("feedback-submit-btn");
const dismissBtn = document.getElementById("feedback-dismiss-btn");
let botResponse = "";

function getTranslationDict() {
    return {
        'activities': 'Actividades extracurriculares',
        'admission': 'Admisión e Ingreso',
        'financial aid': 'Becas',
        'calendar': 'Calendario académico',
        'costs': 'Costos y pagos',
        'egress': 'Egreso y titulación',
        'research': 'Estancia en la investigación',
        'schedules': 'Horarios de atención',
        'enrollment': 'Inscripción de horario',
        'exchange': 'Intercambio académico',
        'majors': 'Información sobre carreras',
        'postgrad': 'Posgrado',
        'internship': 'Prácticas profesionales',
        'social service': 'Servicio Social',
        'procedures': 'Trámites',
    };
}

function randomResponse(topic){
    const phrases = [
        "Eso parece ser una pregunta acerca de ",
        "Tu pregunta es sobre el tema ",
        "De lo que entiendo, estás preguntando sobre ",
        "Si no me equivoco, estás interesado en el tema ",
        "Creo que lo que necesitas es información sobre ",
    ]
    const translationDict = getTranslationDict();
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex] + translationDict[topic]
}

function checkOtherInput(){
    const isSelectionEmpty = feedbackExpected.value === "";
    const isOtherInputEmpty = feedbackExpected.value === "other" && otherOption.value.trim() === "";
    submitBtn.disabled = isOtherInputEmpty || isSelectionEmpty;
}

// Function to add a chat message to the chat container
function addChatMessage(message, sender, topic) {
    // Create the chat message element
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message', `${sender}-message`);
  
    // Create the message text element
    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    messageText.textContent = message;
    
    // Append the elements to the chat message element
    chatMessage.appendChild(messageText);
    
    if (sender === 'bot') {
        chatMessage.setAttribute('data-topic', topic);
    
        const feedbackButtons = createFeedbackButtons();
        chatMessage.appendChild(feedbackButtons);
    }
    
    // Append the chat message to the chat container
    chatContainer.appendChild(chatMessage);
}

function addWritingBubble() {
    const writingBubble = document.createElement('div');
    writingBubble.classList.add('chat-message', 'bot-message');
    writingBubble.id = 'writing-bubble';

    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    messageText.textContent = 'SOF.IA está escribiendo...';

    writingBubble.appendChild(messageText);
    chatContainer.appendChild(writingBubble);
}

function createFeedbackButtons() {
    const feedbackButtons = document.createElement('div');
    feedbackButtons.classList.add('feedback-buttons');

    const likeButton = createFeedbackButton(true);
    const dislikeButton = createFeedbackButton(false);

    feedbackButtons.appendChild(likeButton);
    feedbackButtons.appendChild(dislikeButton);

    return feedbackButtons;
}

function createFeedbackButton(isLike) {
    const button = document.createElement('button');
    button.classList.add('feedback-button', isLike ? 'like' : 'dislike');
    button.innerHTML = `<svg width="50" height="46"><use xlink:href="${static_url + 'thumb.svg'}#thumb"></use></svg>`;
    button.addEventListener('click', () => {
        feedbackSuccess.value = isLike;
        if (isLike) {
          submitFeedback(button);
        } else {
          showFeedbackForm(button);
        }

        // Make the clicked button always visible and disable its clickability
        button.classList.add(isLike ? 'like-clicked' : 'dislike-clicked');
        button.disabled = true;

        // Hide the other button
        const otherButton = button.parentElement.querySelector(isLike ? '.dislike' : '.like');
        otherButton.style.display = 'none';
    });
    
    return button;
}

function submitFeedback(button) {
    botResponse = button.closest('.bot-message').getAttribute('data-topic');
    const userMessage = button.closest('.bot-message')
        .previousElementSibling
        .querySelector('.message-text')
        .textContent;

    feedbackInput.value = userMessage;
    feedbackForm.requestSubmit();
}

function showFeedbackForm(button) {
    feedbackForm.style.opacity = "1";
    feedbackForm.style.pointerEvents = "all";

    botResponse = button.closest('.bot-message').getAttribute('data-topic');
    const userMessage = button.closest('.bot-message')
        .previousElementSibling
        .querySelector('.message-text')
        .textContent;

    feedbackInput.value = userMessage;
}

// Submit a question to predict its label
messageForm.addEventListener('submit', async e => {
    e.preventDefault();
    const message = messageInput.value;
    messageInput.value = "";
    messageInput.disabled = true;
    addChatMessage(message, 'user');
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    addWritingBubble();
    chatContainer.scrollTop = chatContainer.scrollHeight;

    const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message }),
    });

    const data = await response.json();

    const writingBubble = document.getElementById('writing-bubble');
    writingBubble.remove();

    console.log(data.answer || data.label);
    addChatMessage(data.answer || randomResponse(data.label), 'bot', data.label);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    messageInput.disabled = false;
});

// Submit feedback
feedbackForm.addEventListener('submit', async e => {
    e.preventDefault();
    disableFeedbackForm();
  
    const data = {
      "input": feedbackInput.value,
      "success": feedbackSuccess.value,
      "got": botResponse,
      "expected": otherOption.value || feedbackExpected.value,
    };
    console.log(data);

    const response = await fetch('/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    
    const result = await response.json();
    console.log(result);
    if (response.ok) {
        console.log('Feedback submitted successfully');
    } else {
        console.log('Error submitting feedback');
    }
    
    submitBtn.disabled = true;
    feedbackForm.reset();
});

function disableFeedbackForm() {
    feedbackForm.style.opacity = "0.3";
    feedbackForm.style.pointerEvents = "none";
    otherOptionContainer.style.display = "none";
}

otherOption.addEventListener("input", checkOtherInput);

feedbackExpected.addEventListener("change", (e) => {
  otherOptionContainer.style.display = e.target.value === "other" ? "block" : "none";
  if (e.target.value !== "other") {
    otherOption.value = "";
  }
  checkOtherInput();
});

dismissBtn.addEventListener("click", () => {
    disableFeedbackForm();

    // Find the specific message related to the feedback input
    const userMessageText = feedbackInput.value;
    const userMessageElement = Array.from(chatContainer.querySelectorAll('.user-message .message-text'))
        .find(element => element.textContent === userMessageText);

    if (userMessageElement) {
        // Find the associated chat message and update the data-liked attribute
        const chatMessage = userMessageElement.parentElement.nextElementSibling;
        chatMessage.dataset.liked = 'false';

        // Find the associated like and dislike buttons for the specific message
        const likeButton = chatMessage.querySelector('.like');
        const dislikeButton = chatMessage.querySelector('.dislike');

        likeButton.classList.remove('like-clicked');
        dislikeButton.classList.remove('dislike-clicked');

        likeButton.disabled = false;
        dislikeButton.disabled = false;

        likeButton.style.display = 'inline-block';
        dislikeButton.style.display = 'inline-block';
    }
});