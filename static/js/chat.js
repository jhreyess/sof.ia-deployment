import { chatContainer, feedbackSuccess } from "./domElements.js";
import { translations, phrases, sorryPhrases, reformulationSuggestions } from "./dicts.js";
import { submitFeedback, showFeedbackForm } from "./feedback.js";

// Function to add a chat message to the chat container
export function addChatMessage(message, sender, topic) {
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

export function addWritingBubble() {
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

export function randomResponse(topic){

    const randomIndex1 = Math.floor(Math.random() * sorryPhrases.length);
    const randomIndex2 = Math.floor(Math.random() * phrases.length);
    const randomIndex3 = Math.floor(Math.random() * reformulationSuggestions.length);

    return `${sorryPhrases[randomIndex1]}. ${phrases[randomIndex2]} '${translations[topic]}'. ${reformulationSuggestions[randomIndex3]}.`;
}