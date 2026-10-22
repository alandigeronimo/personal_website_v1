// Controls the postcard on the Contact page.
// The flip animation itself is done in CSS. This code only adds or removes the "flipped" class.

const postcard = document.getElementById("postcard");
const postcardFront = document.getElementById("postcard-front");
const postcardBack = document.getElementById("postcard-back");
const flipFrontButton = document.getElementById("flip-front");
const flipBackButton = document.getElementById("flip-back");
const postcardForm = document.getElementById("postcard-form");
const messageField = document.getElementById("message");
const postcardStatus = document.getElementById("postcard-status");

function setFlipped(isFlipped) {
  postcard.classList.toggle("flipped", isFlipped);

  // "inert" makes the side you can't see unclickable and skipped by the Tab key
  postcardFront.inert = isFlipped;
  postcardBack.inert = !isFlipped;
}

// Start with the front showing
setFlipped(false);

// Clicking the front (or pressing Enter / Space on it) flips to the form
flipFrontButton.addEventListener("click", () => {
  setFlipped(true);
  messageField.focus({ preventScroll: true });
});

// "Flip back" returns to the photo
flipBackButton.addEventListener("click", () => {
  setFlipped(false);
  flipFrontButton.focus({ preventScroll: true });
});

const postcardSend = postcardForm.querySelector(".postcard-send");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const replyToField = document.getElementById("postcard-replyto");
const subjectField = document.getElementById("postcard-subject");

// Public Web3Forms form key (not a Gmail password or secret API credential).
const WEB3FORMS_ACCESS_KEY = "d539394c-c843-4487-9ecb-fa35cd86d04d";
const POSTCARD_ENDPOINT = "https://api.web3forms.com/submit";
const SEND_TIMEOUT_MS = 15000;

let isSending = false;

function setStatus(text, kind) {
  postcardStatus.textContent = text;
  postcardStatus.classList.toggle("is-error", kind === "error");
  postcardStatus.classList.toggle("is-success", kind === "success");
}

function submissionSucceeded(payload) {
  return Boolean(payload && payload.success === true);
}

postcardForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (isSending) {
    return;
  }

  const senderName = nameField.value.trim();
  const senderEmail = emailField.value.trim();
  const senderMessage = messageField.value.trim();

  if (!senderName || !senderEmail || !senderMessage) {
    setStatus("Please fill in your name, email, and message.", "error");
    return;
  }

  replyToField.value = senderEmail;
  subjectField.value = "Website postcard from " + senderName;

  const body = new FormData(postcardForm);
  body.set("access_key", WEB3FORMS_ACCESS_KEY);
  body.set("from_name", senderName);

  isSending = true;
  postcardSend.disabled = true;
  setStatus("Sending…", "");

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);

  try {
    const response = await fetch(POSTCARD_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
      signal: controller.signal
    });

    const payload = await response.json().catch(() => null);

    if (submissionSucceeded(payload)) {
      postcardForm.reset();
      replyToField.value = "";
      subjectField.value = "Website postcard";
      setStatus("Postcard delivered! Looking forward to connecting.", "success");
      return;
    }

    const serviceMessage = payload && payload.message;
    setStatus(serviceMessage || "Couldn't send. Please try again.", "error");
  } catch (error) {
    setStatus("Couldn't send. Check your connection and try again.", "error");
  } finally {
    window.clearTimeout(timeoutId);
    isSending = false;
    postcardSend.disabled = false;
  }
});

// Clear the status as soon as the visitor edits the form again (so they can retry)
postcardForm.addEventListener("input", () => {
  if (!isSending) {
    setStatus("", "");
  }
});

// Fill in the contact links from assets/data/personal/contact.js
document.querySelectorAll("[data-contact]").forEach((link) => {
  const key = link.dataset.contact;
  link.href = key === "email" ? `mailto:${contactLinks.email}` : contactLinks[key];
});
