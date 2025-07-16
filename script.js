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
 
let allEvents = [];

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

const container = document.getElementById("cardsContainer");
const paginationContainer = document.getElementById("pagination");

async function getEvents(page = 1) {
  const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?limit=20&page=${page - 1}&countryCode=US&segmentName=Film&apikey=49FrD8b5pF7reRwv5Ebt667wyQ9AQQPZ`;
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return {
      events: data._embedded?.events || [],
      totalPages: data.page?.totalPages || 1
    };
  } catch (error) {
    console.error("error", error);
    return {
      events: [],
      totalPages: 1
    };
  }
}

async function renderEvents(page = 1) {
  const { events, totalPages } = await getEvents(page);

  allEvents = events;

  container.innerHTML = "";

  for (const event of events) {
    const title = event.name || "no name";
    const localDate = event.dates?.start?.localDate || "no date";
    const url = event.images?.[0]?.url || "no img";
    const locale = event._embedded?.venues?.[0]?.name || "no venue";

    const card = document.createElement("div");
    card.className = "main__container--div--card";
    card.innerHTML = `
      <div class="main__container--div--card--photo"> 
        <div class="main__container--div--card--photo--svg">
          <svg class="main__container--div--card--photo--svg--kartinka" width="153" height="143" viewBox="0 0 153 143" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0.5H152.5V93C152.5 120.338 130.338 142.5 103 142.5H0.5V50C0.5 22.6619 22.6619 0.5 50 0.5Z" stroke="#DC56C5" stroke-opacity="0.3"/>
          </svg>
        </div>
        <img class="main__container--div--card--photo--img" src="${url}" alt="card">
      </div>
      <h3 class="main__container--div--card--h3">${title}</h3>
      <p class="main__container--div--card--p">${localDate}</p>
      <div class="main__container--div--card--container">
        <svg class="main__container--div--card--container--svg" width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 0C1.57011 0 0 1.55933 0 3.47595C0 5.88495 3.50344 10 3.50344 10C3.50344 10 7 5.76648 7 3.47595C7 1.55933 5.42995 0 3.5 0ZM4.55602 4.49371C4.26484 4.78284 3.88245 4.92743 3.5 4.92743C3.11761 4.92743 2.7351 4.78284 2.44404 4.49371C1.86173 3.91547 1.86173 2.97455 2.44404 2.39624C2.72601 2.11609 3.10108 1.96179 3.5 1.96179C3.89892 1.96179 4.27393 2.11615 4.55602 2.39624C5.13833 2.97455 5.13833 3.91547 4.55602 4.49371Z" fill="white"/>
        </svg>
        <p class="main__container--div--card--container--p1">${locale}</p>
      </div>
    `;
    container.appendChild(card);
  }

  renderPagination(page, totalPages);
}

function renderPagination(currentPage, totalPages) {
  paginationContainer.innerHTML = "";

  let startPage = currentPage - 2;
  if (startPage < 1) startPage = 1;
  let endPage = startPage + 4;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement("button");
    btn.className = "main__container--nav-button";
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => renderEvents(i));
    paginationContainer.appendChild(btn);
  }

  if (endPage < totalPages - 1) {
    const dots = document.createElement("span");
    dots.className = "main__container--nav--dot";
    dots.textContent = "...";
    paginationContainer.appendChild(dots);
  }

  if (endPage < totalPages) {
    const lastBtn = document.createElement("button");
    lastBtn.className = "main__container--nav-button";
    lastBtn.textContent = totalPages;
    if (currentPage === totalPages) lastBtn.classList.add("active");
    lastBtn.addEventListener("click", () => renderEvents(totalPages));
    paginationContainer.appendChild(lastBtn);
  }
}


const searchInput = document.querySelector(".header__div--navigation--inputs--input--text");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();

  if (!query) {
    renderEvents(1);
    return;
  }

  const filtered = allEvents.filter(ev =>
    ev.name.toLowerCase().includes(query)
  );

  renderFilteredEvents(filtered);
});

function renderFilteredEvents(events) {
  container.innerHTML = "";

  for (const event of events) {
    const title = event.name || "no name";
    const localDate = event.dates?.start?.localDate || "no date";
    const url = event.images?.[0]?.url || "no img";
    const locale = event._embedded?.venues?.[0]?.name || "no venue";

    const card = document.createElement("div");
    card.className = "main__container--div--card";
    card.innerHTML = `
      <div class="main__container--div--card--photo"> 
        <div class="main__container--div--card--photo--svg">
          <svg class="main__container--div--card--photo--svg--kartinka" width="153" height="143" viewBox="0 0 153 143" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0.5H152.5V93C152.5 120.338 130.338 142.5 103 142.5H0.5V50C0.5 22.6619 22.6619 0.5 50 0.5Z" stroke="#DC56C5" stroke-opacity="0.3"/>
          </svg>
        </div>
        <img class="main__container--div--card--photo--img" src="${url}" alt="card">
      </div>
      <h3 class="main__container--div--card--h3">${title}</h3>
      <p class="main__container--div--card--p">${localDate}</p>
      <div class="main__container--div--card--container">
        <svg class="main__container--div--card--container--svg" width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 0C1.57011 0 0 1.55933 0 3.47595C0 5.88495 3.50344 10 3.50344 10C3.50344 10 7 5.76648 7 3.47595C7 1.55933 5.42995 0 3.5 0ZM4.55602 4.49371C4.26484 4.78284 3.88245 4.92743 3.5 4.92743C3.11761 4.92743 2.7351 4.78284 2.44404 4.49371C1.86173 3.91547 1.86173 2.97455 2.44404 2.39624C2.72601 2.11609 3.10108 1.96179 3.5 1.96179C3.89892 1.96179 4.27393 2.11615 4.55602 2.39624C5.13833 2.97455 5.13833 3.91547 4.55602 4.49371Z" fill="white"/>
        </svg>
        <p class="main__container--div--card--container--p1">${locale}</p>
      </div>
    `;
    container.appendChild(card);
  }
}

renderEvents(1);
