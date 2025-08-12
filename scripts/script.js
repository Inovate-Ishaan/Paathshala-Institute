const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.achiever-card');
const container = track.parentElement;
let index = 0;
const total = cards.length;

// Function to get accurate card width + margin dynamically
function getCardFullWidth() {
  const card = cards[0];
  const style = getComputedStyle(card);
  const width = card.offsetWidth;
  const marginLeft = parseInt(style.marginLeft);
  const marginRight = parseInt(style.marginRight);
  return width + marginLeft + marginRight;
}

// Function to center a card and apply active class
function centerCard(i) {
  const fullCardWidth = getCardFullWidth();

  // Clear active from all
  cards.forEach(card => card.classList.remove('active'));

  // Add active to current
  cards[i].classList.add('active');

  // Calculate offset to center it
  const offset = fullCardWidth * i - (container.offsetWidth - fullCardWidth) / 2;
  track.style.transform = `translateX(-${offset}px)`;
}

// Init: center first card
centerCard(index);

// Auto-slide with interval
setInterval(() => {
  index = (index + 1) % total;
  centerCard(index);
}, 3000);

// ----- Detect wheel scroll or swipe on yellow section -----

const yellowSection = document.getElementById('div_1');
const achieversSection = document.getElementById('div_2');

// Detect wheel scroll (for desktops)
yellowSection.addEventListener('wheel', (e) => {
  if (e.deltaY > 30) { // threshold to avoid accidental scroll
    achieversSection.scrollIntoView({ behavior: 'smooth' });
  }
});

// Detect swipe up (for mobile)
let touchStartY = 0;

yellowSection.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

yellowSection.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if (deltaY > 50) { // user swiped up
    achieversSection.scrollIntoView({ behavior: 'smooth' });
  }
});