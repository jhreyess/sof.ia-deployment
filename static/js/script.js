import { chatContainer, messageForm, messageInput, infoBtn, infoModal, 
    feedbackForm, feedbackInput, feedbackExpected, feedbackSuccess, submitBtn, dismissBtn, 
    otherOption, otherOptionContainer } from './domElements.js';
import { randomResponse, addChatMessage, addWritingBubble } from './chat.js';
import { botResponse, checkOtherInput, disableFeedbackForm } from './feedback.js';
import { typeAndEraseExampleQuestion, setQuestionIndex, setCharIndex, typingTimeout, setIsDeleting } from './placeholderAnimation.js';

// On Load events
document.addEventListener('DOMContentLoaded', () => {
    const closeModal = document.getElementsByClassName("close")[0];
    closeModal.onclick = function() {
        infoModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == infoModal) {
            infoModal.style.display = "none";
        }
    }

    typeAndEraseExampleQuestion();
});

// Chat Form
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

// Feedback form
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

// Chat events
infoBtn.addEventListener('click', () => {
    infoModal.style.display = "block";
});

let isFirstInput = true;
messageInput.addEventListener("input", () => {
    if(isFirstInput){
        clearTimeout(typingTimeout);
        setCharIndex(0);
        setIsDeleting(false);
        setQuestionIndex(0);
        messageInput.setAttribute("placeholder", "Type your question here...");
        isFirstInput = false;
    }
});

// Feedback events
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
