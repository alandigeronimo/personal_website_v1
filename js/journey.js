// Builds the photo gallery and lightbox for the Journey page.
// The photos themselves live in assets/data/personal/adventures.js

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightbox-content");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxCounter = document.getElementById("lightbox-counter");

const photoCount = adventures.length;
let currentIndex = 0;
let lastClickedItem = null;
let closeTimer = null;

// Returns the photo itself, or a gray placeholder box if no image has been added yet
function createPhoto(photo, index, forLightbox) {
  if (photo.image) {
    const altText = photo.alt || photo.caption || photo.location || "Adventure photo";
    // Cropping is only for the 3:4 gallery tiles, not the enlarged view
    const position = !forLightbox && photo.position ? ` style="object-position: ${photo.position}"` : "";
    return `<img src="${photo.image}" alt="${altText}"${position} />`;
  }
  return `<div class="photo-placeholder">Placeholder Photo ${index + 1}</div>`;
}

// Region, location, and caption. Anything left blank is skipped.
function createInfoLines(photo, className) {
  const region = photo.region ? `<div class="${className}-region">${photo.region}</div>` : "";
  const longName = className === "gallery-overlay" && photo.location && photo.location.length > 18;
  const locationClass = longName ? `${className}-location is-long` : `${className}-location`;
  const location = photo.location ? `<div class="${locationClass}">${photo.location}</div>` : "";
  const caption = photo.caption ? `<div class="${className}-caption">${photo.caption}</div>` : "";
  const date = photo.date ? `<div class="${className}-meta">${photo.date}</div>` : "";
  return region + location + caption + date;
}

function createOverlay(photo) {
  const lines = createInfoLines(photo, "gallery-overlay");
  return lines ? `<div class="gallery-overlay" aria-hidden="true">${lines}</div>` : "";
}

function createLabel(photo, index) {
  const parts = [photo.location, photo.region, photo.caption].filter(Boolean);
  return parts.length > 0 ? `Open photo: ${parts.join(", ")}` : `Open photo ${index + 1}`;
}

function createGalleryItem(photo, index) {
  return `
    <button class="gallery-item" type="button" data-index="${index}" aria-label="${createLabel(photo, index)}">
      ${createPhoto(photo, index, false)}
      ${createOverlay(photo)}
    </button>
  `;
}

gallery.innerHTML = adventures.map(createGalleryItem).join("");

// --- Lightbox ---

function wrapIndex(index) {
  return (index + photoCount) % photoCount;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isLightboxOpen() {
  return lightbox.classList.contains("is-open");
}

// Load the next/previous images in the background so arrow and swipe feel instant
function preloadAdjacent(index) {
  [wrapIndex(index - 1), wrapIndex(index + 1)].forEach((i) => {
    const src = adventures[i] && adventures[i].image;
    if (src) {
      const img = new Image();
      img.src = src;
    }
  });
}

function showLightboxPhoto(index) {
  currentIndex = wrapIndex(index);
  const photo = adventures[currentIndex];
  const info = createInfoLines(photo, "lightbox-info");
  lightboxContent.innerHTML =
    createPhoto(photo, currentIndex, true) + (info ? `<div class="lightbox-info">${info}</div>` : "");
  lightboxCounter.textContent = `${currentIndex + 1} / ${photoCount}`;
  preloadAdjacent(currentIndex);
}

function openLightbox(index, clickedItem) {
  lastClickedItem = clickedItem;
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }
  showLightboxPhoto(index);
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  requestAnimationFrame(() => {
    lightbox.classList.add("is-open");
  });
  lightboxClose.focus();
}

function closeLightbox() {
  if (!isLightboxOpen() && lightbox.hidden) {
    return;
  }
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  const finish = () => {
    lightbox.hidden = true;
    lightboxContent.innerHTML = "";
    document.body.classList.remove("no-scroll");
    if (lastClickedItem) {
      lastClickedItem.focus();
    }
  };
  if (prefersReducedMotion()) {
    finish();
  } else {
    closeTimer = setTimeout(finish, 280);
  }
}

function goToPhoto(step) {
  showLightboxPhoto(currentIndex + step);
}

gallery.addEventListener("click", (event) => {
  const item = event.target.closest(".gallery-item");
  if (item) {
    openLightbox(Number(item.dataset.index), item);
  }
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => goToPhoto(-1));
lightboxNext.addEventListener("click", () => goToPhoto(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!isLightboxOpen()) {
    return;
  }
  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    goToPhoto(-1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    goToPhoto(1);
  } else if (event.key === "Tab") {
    // Keep Tab inside the lightbox: Close, Previous, Next
    const buttons = [lightboxClose, lightboxPrev, lightboxNext];
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

// Swipe left = next photo, swipe right = previous. Small moves are ignored.
let touchStartX = 0;
let touchStartY = 0;

lightbox.addEventListener(
  "touchstart",
  (event) => {
    if (event.changedTouches.length !== 1) {
      return;
    }
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  },
  { passive: true }
);

lightbox.addEventListener(
  "touchend",
  (event) => {
    if (!isLightboxOpen() || event.changedTouches.length !== 1) {
      return;
    }
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.25) {
      return;
    }
    goToPhoto(dx < 0 ? 1 : -1);
  },
  { passive: true }
);
