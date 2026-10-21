/* =====================================================================
   STYLIST PROFILE PAGE
   ---------------------------------------------------------------------
   Builds a stylist's profile page from the data in data/stylist-*.js
   (that file sets window.STYLIST). This same code works for every
   stylist, so you shouldn't need to edit it to add a new one.

   How it works:
   1. The HTML page is a skeleton: section headings plus empty
      containers with ids, like <div id="about-text"></div>.
   2. Each render function below fills ONE of those containers.
   3. At the very bottom, we run all the render functions in order.
   ===================================================================== */

const stylist = window.STYLIST;


/* ---------------------------------------------------------------------
   HELPERS: small tools the render functions share
   --------------------------------------------------------------------- */

// Makes text safe to put inside HTML, so characters like < or & in the
// data can't break the page.
function esc(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Builds an icon from the sprite at the top of the HTML page.
// icon('i-phone') → <svg><use href="#i-phone"/></svg>
function icon(id) {
  return `<svg aria-hidden="true"><use href="#${id}"/></svg>`;
}

// Turns a phone number into a link the phone can dial or text.
// phoneLink('(555) 555-0101')        → 'tel:5555550101'
// phoneLink('(555) 555-0101', 'sms') → 'sms:5555550101'
function phoneLink(phone, scheme = 'tel') {
  return `${scheme}:${phone.replace(/[^\d+]/g, '')}`;
}

// Turns a 24-hour time into a friendly one.
// formatTime('18:30') → '6:30pm', formatTime('10:00') → '10am'
function formatTime(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const suffix = hours >= 12 ? 'pm' : 'am';
  const hour12 = hours % 12 || 12;
  return hour12 + (minutes ? ':' + String(minutes).padStart(2, '0') : '') + suffix;
}

// Star rating, with a label so screen readers say "5 out of 5 stars".
function stars(rating) {
  return `<span class="stars" role="img" aria-label="${rating} out of 5 stars">` +
         '★'.repeat(rating) + '☆'.repeat(5 - rating) + '</span>';
}

// Where every "Book" button goes: the online booking link if the data
// file has one, otherwise the booking section at the bottom of the page.
function bookingAttrs() {
  const url = stylist.booking && stylist.booking.url;
  return url ? `href="${esc(url)}" target="_blank" rel="noopener"` : 'href="#book"';
}

// Hides a whole section when its list in the data file is empty,
// so you can leave out (for example) certifications for a new stylist.
function hideIfEmpty(elementId, list) {
  const isEmpty = !list || list.length === 0;
  if (isEmpty) document.getElementById(elementId).hidden = true;
  return isEmpty;
}


/* ---------------------------------------------------------------------
   PAGE SETUP: browser tab title, search description, first names
   --------------------------------------------------------------------- */
function renderPageInfo() {
  if (stylist.seo) {
    document.title = stylist.seo.title;
    document.querySelector('meta[name="description"]').setAttribute('content', stylist.seo.description);
  }
  // Any element marked data-first-name gets the stylist's first name
  document.querySelectorAll('[data-first-name]').forEach(el => {
    el.textContent = stylist.firstName;
  });
}


/* ---------------------------------------------------------------------
   HERO: photo, name, title, tagline, quick facts, and buttons
   --------------------------------------------------------------------- */
function renderHero() {
  const facts = (stylist.quickFacts || []).map(fact => `
    <li><strong>${esc(fact.value)}</strong><span>${esc(fact.label)}</span></li>`).join('');

  document.getElementById('hero').innerHTML = `
    <div class="profile-photo">
      <img src="${esc(stylist.photo.src)}" alt="${esc(stylist.photo.alt)}">
    </div>
    <div class="profile-intro">
      <span class="eyebrow">${esc(stylist.title)}</span>
      <h1 id="stylist-name">${esc(stylist.name)}</h1>
      <p class="tagline">${esc(stylist.tagline)}</p>
      ${facts ? `<ul class="quick-facts">${facts}</ul>` : ''}
      <div class="hero-actions">
        <a class="btn btn-primary" ${bookingAttrs()}>${icon('i-calendar')} Book an Appointment</a>
        <a class="btn btn-ghost" href="${phoneLink(stylist.contact.phone)}">${icon('i-phone')} Call ${esc(stylist.firstName)}</a>
      </div>
    </div>`;
}


/* ---------------------------------------------------------------------
   ABOUT ME: one <p> per paragraph in the data
   --------------------------------------------------------------------- */
function renderAbout() {
  if (hideIfEmpty('about', stylist.about)) return;
  document.getElementById('about-text').innerHTML =
    stylist.about.map(paragraph => `<p>${esc(paragraph)}</p>`).join('');
}


/* ---------------------------------------------------------------------
   SPECIALTIES: small cards
   --------------------------------------------------------------------- */
function renderSpecialties() {
  if (hideIfEmpty('specialties', stylist.specialties)) return;
  document.getElementById('specialties-list').innerHTML = stylist.specialties.map(item => `
    <li class="specialty">
      <h3>${esc(item.name)}</h3>
      <p>${esc(item.description)}</p>
    </li>`).join('');
}


/* ---------------------------------------------------------------------
   SERVICES & PRICING: one group per category (same look as the
   home page menu), each item with description, duration, and price
   --------------------------------------------------------------------- */
function renderServices() {
  if (hideIfEmpty('services', stylist.services)) return;

  document.getElementById('services-menu').innerHTML = stylist.services.map(group => `
    <div class="menu-group">
      <h3>${esc(group.category)}</h3>
      ${group.items.map(item => `
        <div class="menu-item">
          <span class="name">${esc(item.name)}
            <small>${esc(item.description)}</small>
            <small class="duration">${icon('i-clock')}<span class="sr-only">Time:</span> ${esc(item.duration)}</small>
          </span>
          <span class="dots"></span>
          <span class="price"><span class="sr-only">from </span>$${esc(item.price)}+</span>
        </div>`).join('')}
    </div>`).join('');

  document.getElementById('price-note').textContent = stylist.priceNote || '';
}


/* ---------------------------------------------------------------------
   PORTFOLIO: a grid of photo buttons. Clicking one opens the lightbox
   (see the LIGHTBOX section further down).
   --------------------------------------------------------------------- */
function renderPortfolio() {
  if (hideIfEmpty('portfolio', stylist.portfolio)) return;
  document.getElementById('portfolio-grid').innerHTML = stylist.portfolio.map((photo, index) => `
    <figure class="tile">
      <button type="button" class="tile-btn" data-index="${index}">
        <img src="${esc(photo.src)}" alt="${esc(photo.alt)}" loading="lazy">
        <span class="sr-only">(open larger view)</span>
      </button>
      <figcaption>${esc(photo.caption)}</figcaption>
    </figure>`).join('');
}


/* ---------------------------------------------------------------------
   CLIENT REVIEWS: same cards as the home page
   --------------------------------------------------------------------- */
function renderReviews() {
  if (hideIfEmpty('reviews', stylist.reviews)) return;
  document.getElementById('reviews-list').innerHTML = stylist.reviews.map(review => `
    <figure class="review">
      ${stars(review.rating)}
      <blockquote>${esc(review.text)}</blockquote>
      <figcaption>${esc(review.name)}<span>${esc(review.service)}</span></figcaption>
    </figure>`).join('');
}


/* ---------------------------------------------------------------------
   AVAILABILITY: weekly hours table. Today's row is highlighted and the
   badge says whether the stylist works today.
   --------------------------------------------------------------------- */
function renderAvailability() {
  const card = document.getElementById('availability');
  if (!stylist.availability || stylist.availability.length === 0) {
    card.hidden = true;
    return;
  }

  // e.g. "Wednesday" (matches the day names in the data file)
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  let worksToday = null;

  document.getElementById('hours-body').innerHTML = stylist.availability.map(entry => {
    const working = Boolean(entry.start);
    const isToday = entry.day === todayName;
    if (isToday) worksToday = working;

    const classes = [working ? '' : 'closed', isToday ? 'today' : ''].join(' ').trim();
    const hours = working ? `${formatTime(entry.start)} – ${formatTime(entry.end)}` : 'Off';
    return `
      <tr${classes ? ` class="${classes}"` : ''}>
        <th scope="row">${esc(entry.day)}${isToday ? '<span class="sr-only"> (today)</span>' : ''}</th>
        <td>${hours}</td>
      </tr>`;
  }).join('');

  // Badge next to the heading, e.g. "In today"
  if (worksToday !== null) {
    const badge = document.getElementById('today-badge');
    badge.textContent = worksToday ? 'In today' : 'Off today';
    badge.classList.toggle('closed', !worksToday);
  }

  document.getElementById('availability-note').textContent = stylist.availabilityNote || '';
}


/* ---------------------------------------------------------------------
   CERTIFICATIONS & TRAINING: a simple list with check icons
   --------------------------------------------------------------------- */
function renderCertifications() {
  if (hideIfEmpty('certifications', stylist.certifications)) return;
  document.getElementById('cert-list').innerHTML = stylist.certifications.map(cert => `
    <li>
      <span class="ico">${icon('i-check')}</span>
      <div>
        <strong>${esc(cert.title)}</strong>
        <span class="cert-meta">${esc(cert.issuer)} · ${esc(cert.year)}</span>
      </div>
    </li>`).join('');
}


/* ---------------------------------------------------------------------
   BOOKING SECTION: book online (if there's a link), call, text, email,
   plus social media links
   --------------------------------------------------------------------- */
function renderBooking() {
  const { phone, email } = stylist.contact;
  const bookingUrl = stylist.booking && stylist.booking.url;

  // With an online booking link, "Book Online" is the main button.
  // Without one, "Call" becomes the main button.
  document.getElementById('book-actions').innerHTML = `
    ${bookingUrl ? `<a class="btn btn-primary" ${bookingAttrs()}>${icon('i-calendar')} Book an Appointment</a>` : ''}
    <a class="btn ${bookingUrl ? 'btn-outline' : 'btn-primary'}" href="${phoneLink(phone)}">${icon('i-phone')} Call ${esc(stylist.firstName)}</a>
    <a class="btn btn-outline" href="${phoneLink(phone, 'sms')}">${icon('i-message')} Send a Text</a>
    <a class="btn btn-outline" href="mailto:${esc(email)}">${icon('i-mail')} Email</a>`;

  // Phone and email written out, for people who prefer to copy them
  document.getElementById('book-contact').innerHTML = `
    <a href="${phoneLink(phone)}">${esc(phone)}</a>
    <span aria-hidden="true">·</span>
    <a href="mailto:${esc(email)}">${esc(email)}</a>`;

  // Social icons. The data's "network" name picks the icon.
  document.getElementById('book-socials').innerHTML = (stylist.social || []).map(link => `
    <a href="${esc(link.url)}" aria-label="${esc(link.network)}: ${esc(link.handle)}">
      ${icon('i-' + link.network.toLowerCase())}
    </a>`).join('');
}


/* ---------------------------------------------------------------------
   STICKY PHONE BAR: Call and Book buttons pinned to the bottom of the
   screen on phones (the CSS hides it on bigger screens)
   --------------------------------------------------------------------- */
function renderStickyBar() {
  document.getElementById('sticky-cta').innerHTML = `
    <a href="${phoneLink(stylist.contact.phone)}">${icon('i-phone')}Call ${esc(stylist.firstName)}</a>
    <a ${bookingAttrs()}>${icon('i-calendar')}Book</a>`;
}


/* ---------------------------------------------------------------------
   LIGHTBOX: shows a portfolio photo large, with previous/next buttons.
   It uses the browser's built-in <dialog>, which handles the Escape
   key and keeps keyboard focus inside the viewer while it's open.
   --------------------------------------------------------------------- */
function setUpLightbox() {
  const photos = stylist.portfolio || [];
  if (photos.length === 0) return;

  const lightbox = document.getElementById('lightbox');
  const image = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  let current = 0;          // which photo is showing
  let openedFrom = null;    // the tile that opened it, so focus can go back there

  // Show photo number "index" (wraps around at either end)
  function show(index) {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    image.src = photo.src;
    image.alt = photo.alt;
    caption.textContent = `${photo.caption} (${current + 1} of ${photos.length})`;
  }

  // Clicking a tile opens the viewer on that photo
  document.getElementById('portfolio-grid').addEventListener('click', event => {
    const tile = event.target.closest('.tile-btn');
    if (!tile) return;
    openedFrom = tile;
    show(Number(tile.dataset.index));
    lightbox.showModal();
  });

  // Buttons inside the viewer
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));

  // Hide previous/next when there's only one photo
  if (photos.length < 2) {
    lightbox.querySelectorAll('.lightbox-prev, .lightbox-next').forEach(btn => { btn.hidden = true; });
  }

  // Left/right arrow keys flip through photos
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });

  // Clicking the dark area around the photo closes the viewer
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });

  // When it closes, put keyboard focus back on the tile that opened it
  lightbox.addEventListener('close', () => {
    if (openedFrom) openedFrom.focus();
  });
}


/* ---------------------------------------------------------------------
   MOBILE MENU (same behavior as the home page)
   --------------------------------------------------------------------- */
function setUpMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const closeMenu = () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  };
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}


/* ---------------------------------------------------------------------
   RUN EVERYTHING
   --------------------------------------------------------------------- */
setUpMobileMenu();
document.getElementById('year').textContent = new Date().getFullYear();

if (!stylist) {
  // The data file didn't load (wrong file name in the <script> tag?)
  document.getElementById('profile').innerHTML = `
    <div class="container notice">
      <h1>Profile not found</h1>
      <p>We couldn't load this stylist's information.</p>
      <a class="btn btn-primary" href="index.html#stylists">See all stylists</a>
    </div>`;
} else {
  renderPageInfo();
  renderHero();
  renderAbout();
  renderSpecialties();
  renderServices();
  renderPortfolio();
  renderReviews();
  renderAvailability();
  renderCertifications();
  renderBooking();
  renderStickyBar();
  setUpLightbox();

  // The page was still empty when the browser tried to jump to a link
  // like stylist-bella.html#book, so jump again now that it's filled in.
  const target = location.hash && document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView({ behavior: 'instant' });
}
