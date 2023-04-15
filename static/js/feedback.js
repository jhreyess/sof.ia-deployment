import { feedbackForm, feedbackInput, submitBtn, otherOption, otherOptionContainer, feedbackExpected } from './domElements.js';

export let botResponse = '';

export function checkOtherInput(){
    const isSelectionEmpty = feedbackExpected.value === "";
    const isOtherInputEmpty = feedbackExpected.value === "other" && otherOption.value.trim() === "";
    submitBtn.disabled = isOtherInputEmpty || isSelectionEmpty;
}

export function submitFeedback(button) {
    botResponse = button.closest('.bot-message').getAttribute('data-topic');
    const userMessage = button.closest('.bot-message')
        .previousElementSibling
        .querySelector('.message-text')
        .textContent;

    feedbackInput.value = userMessage;
    feedbackForm.requestSubmit();
}

export function showFeedbackForm(button) {
    checkOtherInput();
    document.getElementById('feedback-modal').style.display = "block";

    botResponse = button.closest('.bot-message').getAttribute('data-topic');
    const userMessage = button.closest('.bot-message')
        .previousElementSibling
        .querySelector('.message-text')
        .textContent;

    feedbackInput.value = userMessage;
}

export function disableFeedbackForm() {
    document.getElementById('feedback-modal').style.display = "none";
    otherOptionContainer.style.display = "none";
}