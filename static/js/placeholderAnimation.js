import { messageInput } from "./domElements.js";
import { exampleQuestions } from "./dicts.js";

export let [exampleQuestionIndex, setQuestionIndex ] = [0, (it) => { exampleQuestionIndex = it}];
export let [charIndex, setCharIndex] = [0, (it) => { charIndex = it}];
export let typingTimeout;
export let [isDeleting, setIsDeleting] = [false, (it) => { isDeleting = it}];

export function typeAndEraseExampleQuestion() {
    const currentPlaceholder = messageInput.getAttribute("placeholder");
    const currentQuestion = exampleQuestions[exampleQuestionIndex];
    const isTyping = charIndex < currentQuestion.length && !isDeleting;
    const shouldErase = charIndex === currentQuestion.length && !isDeleting;

    if (isTyping) {
        // Character is being written
        messageInput.setAttribute("placeholder", currentPlaceholder + currentQuestion[charIndex]);
        charIndex++;
        typingTimeout = setTimeout(typeAndEraseExampleQuestion, 50);
    } else if (shouldErase) {
        // Sentence has been written
        isDeleting = true;
        typingTimeout = setTimeout(typeAndEraseExampleQuestion, 2000);
    } else if (isDeleting) {
        // Character is being ereased
        messageInput.setAttribute("placeholder", currentPlaceholder.slice(0, -1));
        charIndex--;

        if (charIndex === 0) {
            // Sentence has been ereased
            isDeleting = false;
            exampleQuestionIndex = (exampleQuestionIndex + 1) % exampleQuestions.length;
            typingTimeout = setTimeout(typeAndEraseExampleQuestion, 500);
        } else {
            typingTimeout = setTimeout(typeAndEraseExampleQuestion, 20);
        }
    }
};