  const ids = ['btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6'];

  ids.forEach(id => {
    const btn = document.getElementById(id);
    btn.addEventListener('click', () => {
      ids.forEach(otherId => {
        document.getElementById(otherId).classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  const cardsPerPage = 20;
  let currentPage = 0;
  const countryCode = 'US';

  async function fetchEvents(page = 0) {
    const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?limit=${cardsPerPage}&page=${page}&countryCode=${countryCode}&segmentName=Film&apikey=49FrD8b5pF7reRwv5Ebt667wyQ9AQQPZ`
  }
const card = document.querySelector('.main__container--div--card');
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.modal__close');

card.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
