const slidesData = {
  pediatrics: [
    'Enterol2560/E (1).png', 'Enterol2560/E (2).png', 'Enterol2560/E (25).png', 
    'Enterol2560/E (5).png', 'Enterol2560/E (20).png', 'Enterol2560/E (19).png',
    'Enterol2560/E (21).png', 'Enterol2560/E (26).png', 'Marimer2560/M (8).png', 
    'Marimer2560/M (9).png', 'Marimer2560/M (11).png', 'Marimer2560/M (13).png',
    'Marimer2560/M (14).png', 'Marimer2560/M (6).png', 'Marimer2560/M (5).png', 
    'Marimer2560/M (23).png', 'Marimer2560/M (2).png', 'Marimer2560/M (18).png',
    'Marimer2560/M (16).png', 'Marimer2560/M (17).png', 'Bebykol2560/Б (3).png',
    'Bebykol2560/Б (4).png', 'Otipax2560/O (7).png', 'Otipax2560/O (2).png'
  ],
  gastro: [
    'Enterol2560/E (1).png', 'Enterol2560/E (2).png', 'Enterol2560/E (20).png', 
    'Enterol2560/E (19).png', 'Enterol2560/E (21).png', 'Enterol2560/E (22).png',
    'Enterol2560/E (26).png', 'Asacol/A (0).png', 'Stresam2560/C (14).png',
    'Stresam2560/C (1).png', 'Stresam2560/C (12).png'
  ],
  pediatric_gastro: [
    'Enterol2560/E (1).png', 'Enterol2560/E (2).png', 'Enterol2560/E (20).png',
    'Enterol2560/E (19).png', 'Enterol2560/E (21).png', 'Enterol2560/E (22).png',
    'Enterol2560/E (26).png', 'Bebykol2560/Б (4).png', 'Bebykol2560/Б (6).png', 
    'Bebykol2560/Б (8).png', 'Asacol/A (0).png'
  ],
  advanced_family: [
    'Enterol2560/E (1).png', 'Enterol2560/E (2).png', 'Enterol2560/E (20).png', 
    'Enterol2560/E (19).png', 'Enterol2560/E (5).png', 'Enterol2560/E (18).png',
    'Enterol2560/E (21).png', 'Enterol2560/E (22).png', 'Enterol2560/E (9).png',
    'Stresam2560/C (2).png', 'Stresam2560/C (11).png', 'Otipax2560/O (1).png',
    'Otipax2560/O (5).png', 'Otipax2560/O (6).png', 'Marimer2560/M (15).png',
    'ACerumen2560/АЦ (1).png'
  ],
  beginner_family: [
    'Enterol2560/E (1).png', 'Enterol2560/E (2).png', 'Enterol2560/E (5).png',
    'Enterol2560/E (6).png', 'Enterol2560/E (3).png', 'Enterol2560/E (4).png',
    'Enterol2560/E (7).png', 'Enterol2560/E (9).png', 'Stresam2560/C (2).png',
    'Otipax2560/O (1).png', 'Otipax2560/O (6).png', 'Marimer2560/M (15).png',
    'ACerumen2560/АЦ (2).png'
  ],
  ent: [
    'Marimer2560/M (2).png', 'Marimer2560/M (18).png', 'Marimer2560/M (16).png',
    'Marimer2560/M (17).png', 'Marimer2560/M (23).png', 'Otipax2560/O (4).png',
    'Otipax2560/O (5).png', 'ACerumen2560/АЦ (1).png', 'ACerumen2560/АЦ (2).png',
    'Enterol2560/E (9).png', 'Enterol2560/E (26).png'
  ]
};


let currentSlides = [];
let currentIndex = 0;
const sliderElement = document.getElementById('slider');
const initialScreen = document.getElementById('initial-screen');
const sliderScreen = document.getElementById('slider-screen');

function filterSlides(type) {
  currentSlides = slidesData[type];
  currentIndex = 0;
  renderSlides();
  initialScreen.style.display = 'none';
  sliderScreen.style.display = 'block';
}

function renderSlides() {
  sliderElement.innerHTML = currentSlides.map(src =>
    `<div class='slide'><img src='${src}' alt='Slide'></div>`
  ).join('');
  updateSliderPosition();
}

function updateSliderPosition() {
  sliderElement.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % currentSlides.length;
  updateSliderPosition();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
  updateSliderPosition();
}

function goToInitialScreen() {
  sliderScreen.style.display = 'none';
  initialScreen.style.display = 'block';
}

sliderElement.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

sliderElement.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  isDragging = false;
  handleSwipe(endX);
});

sliderElement.addEventListener('mousedown', e => {
  startX = e.clientX;
  isDragging = true;
});

sliderElement.addEventListener('mouseup', e => {
  const endX = e.clientX;
  isDragging = false;
  handleSwipe(endX);
});

sliderElement.addEventListener('mouseleave', () => {
  isDragging = false;
});

sliderElement.addEventListener('wheel', e => {
  if (e.deltaY > 0) {
    nextSlide();
  } else {
    prevSlide();
  }
});

function handleSwipe(endX) {
  if (startX - endX > 50) nextSlide();
  if (endX - startX > 50) prevSlide();
}
