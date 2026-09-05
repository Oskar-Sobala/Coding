/**
 * JavaScript for handling the contact form word count and the image carousel. Textmängd.
 */

const messageField = document.querySelector("#message");
const wordCount = document.querySelector("#message-count");

if (messageField && wordCount) {
  const maxWords = 150;

  function getWords(value) {
    return value.trim().match(/\S+/g) || [];
  }

  function updateWordCount() {
    const words = getWords(messageField.value);

    if (words.length > maxWords) {
      messageField.value = words.slice(0, maxWords).join(" ");
    }

    const count = getWords(messageField.value).length;
    wordCount.textContent = `${count} / ${maxWords} ord`;
    wordCount.classList.toggle("limit-reached", count === maxWords);
  }

  messageField.addEventListener("input", updateWordCount);
  updateWordCount();
}

/**
 * Image carousel functionality. Bildkarusell.
 */

const track = document.querySelector(".cards-track");
const previousButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

if (track && previousButton && nextButton) {
  let isSliding = false;

  function slideDistance() {
    return 100 / (window.innerWidth <= 700 ? 1 : 3);
  }

  function resetTrack() {
    track.classList.add("is-resetting");
    track.style.transform = "translateX(0)";
    track.offsetHeight;
    track.classList.remove("is-resetting");
    isSliding = false;
  }

  previousButton.addEventListener("click", () => {
    if (isSliding) return;

    const lastCard = track.lastElementChild;
    if (!lastCard) return;

    isSliding = true;
    track.classList.add("is-resetting");
    track.prepend(lastCard);
    track.style.transform = `translateX(-${slideDistance()}%)`;
    track.offsetHeight;
    track.classList.remove("is-resetting");
    track.style.transform = "translateX(0)";

    track.addEventListener("transitionend", resetTrack, { once: true });
  });

  nextButton.addEventListener("click", () => {
    if (isSliding) return;

    const firstCard = track.firstElementChild;
    if (!firstCard) return;

    isSliding = true;
    track.style.transform = `translateX(-${slideDistance()}%)`;
    track.addEventListener("transitionend", () => {
      track.append(firstCard);
      resetTrack();
    }, { once: true });
  });
}

/**
 * Login form interactions.
 */

const loginForm = document.querySelector("[data-login-form]");
const passwordToggle = document.querySelector(".password-toggle");
const loginPassword = document.querySelector("#login-password");
const loginStatus = document.querySelector("[data-login-status]");

if (passwordToggle && loginPassword) {
  passwordToggle.addEventListener("click", () => {
    const isHidden = loginPassword.type === "password";
    loginPassword.type = isHidden ? "text" : "password";
    passwordToggle.textContent = isHidden ? "Dölj" : "Visa";
    passwordToggle.setAttribute("aria-pressed", String(isHidden));
  });
}

if (loginForm && loginStatus) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!loginForm.checkValidity()) {
      loginForm.reportValidity();
      return;
    }

    loginStatus.textContent = "Inloggningen är klar att kopplas till en kontotjänst.";
  });
}
