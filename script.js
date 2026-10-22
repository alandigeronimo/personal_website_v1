// Builds the song list for the "What I'm Listening To" card.
// The songs themselves live in assets/data/personal/songs.js

const songList = document.getElementById("song-list");

function createSongRow(song) {
  // Use a link if the song has a Spotify URL, otherwise plain text
  const title = song.spotifyUrl
    ? `<a class="song-title" href="${song.spotifyUrl}" target="_blank" rel="noopener">${song.title}</a>`
    : `<span class="song-title">${song.title}</span>`;

  // Only show an image if one was provided
  const image = song.image
    ? `<img src="${song.image}" alt="Album artwork for ${song.title}" />`
    : "";

  // Play control only when the song has a Spotify URL (avoids a dead button)
  const playButton = song.spotifyUrl
    ? `<button class="play-button" type="button" data-url="${song.spotifyUrl}" aria-label="Play ${song.title}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        </button>`
    : "";

  return `
    <div class="song">
      <div class="song-art">
        ${image}
        ${playButton}
      </div>
      <div class="song-info">
        ${title}
        <span class="song-artist">${song.artist}</span>
      </div>
    </div>
  `;
}

songList.innerHTML = songs.map(createSongRow).join("");

// Clicking a play button that has a Spotify URL opens the song in a new tab
songList.addEventListener("click", (event) => {
  const button = event.target.closest(".play-button");
  if (button && button.dataset.url) {
    window.open(button.dataset.url, "_blank", "noopener");
  }
});

// Builds the book list for the "What I'm Reading" card.
// The books themselves live in assets/data/personal/books.js

const bookList = document.getElementById("book-list");

function createBookRow(book) {
  // Only show an image if one was provided
  const image = book.image
    ? `<img src="${book.image}" alt="Cover of ${book.title}" />`
    : "";

  // The inside of the row is the same whether or not it is a link
  const content = `
    <div class="book-cover">${image}</div>
    <div class="book-info">
      <span class="book-title">${book.title}</span>
      <span class="book-author">${book.author}</span>
    </div>
  `;

  // The whole row is a link if the book has a Goodreads URL
  return book.goodreadsUrl
    ? `<a class="book" href="${book.goodreadsUrl}" target="_blank" rel="noopener">${content}</a>`
    : `<div class="book">${content}</div>`;
}

bookList.innerHTML = books.map(createBookRow).join("");

// Builds the poster grid for the "What I'm Watching" card.
// The movies and shows themselves live in assets/data/personal/watching.js

const posterGrid = document.getElementById("poster-grid");

function createPoster(item) {
  // Show the poster image if there is one, otherwise a labeled gray placeholder
  const content = item.image
    ? `<img src="${item.image}" alt="Poster for ${item.title}" />`
    : `<span class="poster-label">${item.title}</span>`;

  // The poster is a link if it has a URL
  return item.url
    ? `<a class="poster" href="${item.url}" target="_blank" rel="noopener">${content}</a>`
    : `<div class="poster">${content}</div>`;
}

posterGrid.innerHTML = watching.map(createPoster).join("");

// Builds the restaurant list for the "Where I'm Eating" card.
// The restaurants themselves live in assets/data/personal/restaurants.js

const restaurantList = document.getElementById("restaurant-list");

function createRestaurantRow(restaurant) {
  // Only show an image if one was provided
  const image = restaurant.image
    ? `<img src="${restaurant.image}" alt="Photo of ${restaurant.name}" />`
    : "";

  // Show a dash if there is no rating yet
  const rating = restaurant.rating || "–";

  // A link cannot sit inside another link, so the row is a plain <div>.
  // Helper: wraps text in a link that opens in a new tab, or returns it unchanged
  function link(url, className, text) {
    return url
      ? `<a class="${className}" href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
      : `<span class="${className}">${text}</span>`;
  }

  // The name opens the restaurant in Google Maps (if googleMapsUrl is filled in).
  // The location stays plain text.
  const name = link(restaurant.googleMapsUrl, "restaurant-name", restaurant.name);
  const location = `<span class="restaurant-location">${restaurant.location}</span>`;

  // Photo and rating open the restaurant on Beli (if url is filled in)
  const photoTag = restaurant.url ? "a" : "div";
  const ratingTag = restaurant.url ? "a" : "div";
  const beliAttrs = restaurant.url
    ? ` href="${restaurant.url}" target="_blank" rel="noopener noreferrer"`
    : "";

  return `
    <div class="restaurant${restaurant.url ? " restaurant-beli" : ""}">
      <${photoTag} class="restaurant-photo"${beliAttrs}>${image}</${photoTag}>
      <div class="restaurant-info">
        ${name}
        ${location}
      </div>
      <${ratingTag} class="restaurant-rating"${beliAttrs}>${rating}</${ratingTag}>
    </div>
  `;
}

restaurantList.innerHTML = restaurants.map(createRestaurantRow).join("");


// One overlay scrollbar for every Currently card. Native bars are hidden so
// they never steal width; this thumb floats on the right edge and follows scroll.
document.querySelectorAll(".overlay-scroll").forEach((wrap) => {
  const pane = wrap.querySelector(".song-list, .restaurant-list, .book-list, .poster-grid");
  const track = wrap.querySelector(".overlay-scrollbar");
  const thumb = wrap.querySelector(".overlay-scrollbar-thumb");
  if (!pane || !track || !thumb) return;

  let hideTimer;
  let dragging = false;
  let dragStartY = 0;
  let dragStartScroll = 0;

  function maxScroll() {
    return Math.max(0, pane.scrollHeight - pane.clientHeight);
  }

  function updateThumb() {
    const range = maxScroll();
    const needed = range > 1;
    track.classList.toggle("is-needed", needed);
    if (!needed) return;

    const trackHeight = track.clientHeight;
    const thumbHeight = Math.max(24, (pane.clientHeight / pane.scrollHeight) * trackHeight);
    const maxTop = Math.max(0, trackHeight - thumbHeight);
    const top = range === 0 ? 0 : (pane.scrollTop / range) * maxTop;
    thumb.style.height = thumbHeight + "px";
    thumb.style.transform = "translateY(" + top + "px)";
  }

  function showWhileScrolling() {
    wrap.classList.add("is-scrolling");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!dragging) wrap.classList.remove("is-scrolling");
    }, 700);
  }

  pane.addEventListener("scroll", () => {
    updateThumb();
    showWhileScrolling();
  });

  window.addEventListener("resize", updateThumb);
  updateThumb();

  function startDrag(clientY) {
    dragging = true;
    dragStartY = clientY;
    dragStartScroll = pane.scrollTop;
    track.classList.add("is-dragging");
    wrap.classList.add("is-scrolling");
  }

  function moveDrag(clientY) {
    if (!dragging) return;
    const trackHeight = track.clientHeight;
    const thumbHeight = thumb.offsetHeight;
    const maxTop = Math.max(1, trackHeight - thumbHeight);
    const dy = clientY - dragStartY;
    pane.scrollTop = dragStartScroll + (dy / maxTop) * maxScroll();
  }

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("is-dragging");
    showWhileScrolling();
  }

  thumb.addEventListener("mousedown", (event) => {
    event.preventDefault();
    startDrag(event.clientY);
  });

  document.addEventListener("mousemove", (event) => {
    moveDrag(event.clientY);
  });

  document.addEventListener("mouseup", endDrag);

  thumb.addEventListener("touchstart", (event) => {
    if (!event.touches[0]) return;
    startDrag(event.touches[0].clientY);
  }, { passive: true });

  document.addEventListener("touchmove", (event) => {
    if (!dragging || !event.touches[0]) return;
    moveDrag(event.touches[0].clientY);
  }, { passive: true });

  document.addEventListener("touchend", endDrag);
});
