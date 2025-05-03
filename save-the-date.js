const imageElement = document.getElementById('box');

const start = 1;
const end = 8;

const images = Array.from(
  { length: end - start + 1 },
  (_, i) => `assets/dialogue/dialogue${i + start}.png`
);

// const images = [
//   'assets/ethan-dialogue.png',
//   'assets/amanda-dialogue.png',
//   'assets/ethan-dialogue.png',
// ];
let currentIndex = 0;

const backButton = document.querySelector('button[onclick="previousImage()"]');
const nextButton = document.querySelector('button[onclick="nextImage()"]');

const preloadedImages = images.map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

function showImage(index) {
  imageElement.src = preloadedImages[index].src;
  updateButtons();
}

function nextImage() {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    showImage(currentIndex);
  }
}

function previousImage() {
  if (currentIndex > 0) {
    currentIndex--;
    showImage(currentIndex);
  }
}

function toggleOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.classList.toggle('hidden');
  const toggleImage = document.getElementById('toggleImage');
  const image1 = 'assets/show-flyer-button.png';
  const image2 = 'assets/hide-flyer-button.png';
  toggleImage.src = toggleImage.src.includes(image1) ? image2 : image1;
}

const music = document.getElementById('backgroundMusic');
let musicStarted = false;

music.volume = 0.1;

function startMusicOnce() {
  if (!musicStarted) {
    music.play().catch(e => {
      console.warn("Music playback failed:", e);
    });
    musicStarted = true;
    document.removeEventListener('click', startMusicOnce);
  }
}

document.addEventListener('click', startMusicOnce);

function updateButtons() {
    backButton.classList.toggle('invisible', currentIndex === 0);
    nextButton.classList.toggle('invisible', currentIndex === images.length - 1);
  }

document.addEventListener('keydown', function (event) {
    let button = null;
  
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextImage();
      button = nextButton;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      previousImage();
      button = backButton;
    }
  
    if (button) {
      button.classList.add('active');
      setTimeout(() => {
        button.classList.remove('active');
      }, 100); // Match the transition duration
    }
  });

function amandaFavicon() {
  const favicon = document.getElementById('favicon');
  favicon.href = 'assets/amanda_sprite.gif';
}

function ethanFavicon() {
  const favicon = document.getElementById('favicon');
  favicon.href = 'assets/ethan_sprite.gif';
}

showImage(currentIndex);
