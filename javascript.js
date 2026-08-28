const messageField = document.querySelector('#message');
const wordCount = document.querySelector('#message-count');

if (messageField && wordCount) {
    const maxWords = 150;

    function getWords(value) {
        return value.trim().match(/\S+/g) || [];
    }

    function updateWordCount() {
        const words = getWords(messageField.value);

        if (words.length > maxWords) {
            messageField.value = words.slice(0, maxWords).join(' ');
        }

        const count = getWords(messageField.value).length;
        wordCount.textContent = `${count} / ${maxWords} ord`;
        wordCount.classList.toggle('limit-reached', count === maxWords);
    }

    messageField.addEventListener('input', updateWordCount);
    updateWordCount();
}
