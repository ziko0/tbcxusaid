// hamburger menu
let openHamburger = document.querySelector(".hamburger__open");
let closeHamburger = document.querySelector(".hamburger__close");
let navList = document.querySelector(".nav__list");

const hamburgerEvent  = (navigation, close, open) => {
    navList.style.display = navigation;
    closeHamburger.style.display = close
    openHamburger.style.display = open;
};


openHamburger.addEventListener("click", () => hamburgerEvent("flex", "block", "none"));
closeHamburger.addEventListener("click", () => hamburgerEvent("none", "none", "block"));



document.addEventListener('DOMContentLoaded', function () {
  // Card generation code
  fetch('card.json')
    .then(response => response.json())
    .then(data => generateCards(data))
    .catch(error => console.error('Error fetching data:', error));
});

function generateCards(data) {
  const cardGrid = document.getElementById('cardGrid');

  data.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <img src="${item.image}" alt="${item.title}">
    <div class="card__content">
        <h1 class="card__title">${item.title}</h1>
        <span class="card__registration">${item.registration}</span>
    </div>
    <a href="${item.link}" target="_blank" class="card__details"><span>&#8594;</span>კურსის დეტალები</a>
    `;
    cardGrid.appendChild(card);
   
  });
}

// slider
let currentSlide = 0;

function showSlide() {
    const slider = document.querySelector('.slider-wrapper');
    slider.style.transform = `translateX(${-currentSlide * 100}%)`;

  
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide();
}

function prevSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide();
}


showSlide();


document.querySelector('.prev-btn').addEventListener('click', prevSlide);
document.querySelector('.next-btn').addEventListener('click', nextSlide);

// qeustions accordion
document.addEventListener('DOMContentLoaded', async function () {
  const accordion = document.getElementById('faqAccordion');

  try {

    const response = await fetch('questions.json');
    const data = await response.json();

    data.forEach(question => {
      const accordionItem = document.createElement('div');
      accordionItem.classList.add('accordion-item');

      const accordionHeader = document.createElement('div');
      accordionHeader.classList.add('accordion-header');
      accordionHeader.innerHTML = question.question;

      const accordionContent = document.createElement('div');
      accordionContent.classList.add('accordion-content');

      if (typeof question.answer === 'object') {
     
        accordionContent.innerHTML = `
          <div class="answer-header">${question.answer.header}</div>
          <div class="answer-middle">${question.answer.middle}</div>
          <div class="answer-bottom">${question.answer.bottom}</div>
        `;
      } else {
    
        accordionContent.innerHTML = `<p>${question.answer}</p>`;
      }

      accordionItem.appendChild(accordionHeader);
      accordionItem.appendChild(accordionContent);

      accordion.appendChild(accordionItem);

  
      accordionHeader.addEventListener('click', function () {
        accordionContent.style.display = (accordionContent.style.display === 'block') ? 'none' : 'block';
        accordionHeader.classList.toggle('active');
      });
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
});