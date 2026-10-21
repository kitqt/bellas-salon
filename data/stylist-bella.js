/* =====================================================================
   STYLIST DATA: Bella Morales
   ---------------------------------------------------------------------
   Everything on stylist-bella.html comes from this one object.
   The page itself (HTML) and the code that builds it
   (js/stylist-page.js) are shared by every stylist.

   To edit Bella's page: change the text inside the quotes below.
   Keep the commas, quotes, and brackets exactly where they are.

   To make a page for a new stylist: copy this file (for example to
   data/stylist-jasmine.js), change the values, and point a copy of
   stylist-bella.html at the new file. See the notes in that HTML file.
   ===================================================================== */

window.STYLIST = {

  /* ---------- Basics ---------- */
  name: "Bella Morales",
  firstName: "Bella",                       // Used in buttons like "Call Bella"
  title: "Owner & Master Stylist",
  tagline: "Lived-in color and bold vivids, made to fit your life.",

  // Main photo. Replace the placeholder with a real headshot.
  // A vertical (portrait) photo works best, about 800 x 1000 pixels.
  photo: {
    src: "images/placeholder-portrait.svg",
    alt: "Portrait of Bella Morales, owner and master stylist"
  },

  // Three quick highlights shown under her name in the top section.
  quickFacts: [
    { value: "15+",  label: "Years behind the chair" },
    { value: "4.9★", label: "Client rating" },
    { value: "200+", label: "Brides styled" }
  ],

  // What shows in the browser tab and in Google search results.
  seo: {
    title: "Bella Morales, Owner & Master Stylist | Bella's Hair & Nail Salon",
    description: "Meet Bella Morales, owner and master stylist at Bella's Hair & Nail Salon in Anytown, ST. Balayage, bold vivids, color correction, and bridal styling."
  },

  /* ---------- Booking & contact ---------- */
  booking: {
    // Paste an online booking link here (Square, Vagaro, Fresha, Booksy, etc.).
    // While it's empty (""), every "Book" button scrolls down to Bella's
    // phone and email at the bottom of the page instead.
    url: ""
  },

  contact: {
    phone: "(555) 555-0101",
    email: "bella@bellassalon.com"
  },

  // "network" must be Instagram, Facebook, or TikTok (the icons the page has).
  // Replace "#" with the full link to the profile.
  social: [
    { network: "Instagram", handle: "@bella.styles",             url: "#" },
    { network: "TikTok",    handle: "@bella.styles",             url: "#" },
    { network: "Facebook",  handle: "Bella's Hair & Nail Salon", url: "#" }
  ],

  /* ---------- About Me (one string per paragraph) ---------- */
  about: [
    "I've been doing hair for more than 15 years, and I still get butterflies every time I turn the chair around for the big reveal. I started out sweeping floors and mixing color at a small salon downtown, fell in love with the craft, and opened Bella's so I could build the kind of place I always wanted to work in: warm, welcoming, and a little bit glam.",
    "Color is my happy place. Whether it's a soft, lived-in balayage that grows out beautifully or a bright vivid that turns heads, I love finding the shade that makes you feel most like yourself. I also have a soft spot for brides. Being part of someone's big day never gets old.",
    "Every appointment starts with a real conversation. I'll ask about your routine, your hair history, and how much time you actually want to spend styling each morning. Then I'll be honest about what's possible and we'll make a plan together. My goal is for you to leave loving your hair, and still love it six weeks later."
  ],

  /* ---------- Specialties (3 to 6 work best) ---------- */
  specialties: [
    { name: "Balayage & Lived-in Color", description: "Soft, hand-painted dimension that grows out gracefully, so you can go longer between visits." },
    { name: "Bold Vivids",               description: "Rich, saturated fashion colors, from copper to violet, with a care plan to keep them bright." },
    { name: "Color Correction",          description: "Fixing brassy tones, box dye, and uneven color gently, one step at a time." },
    { name: "Bridal Styling",            description: "Trials, day-of styling, and wedding-party hair, calm and right on schedule." }
  ],

  /* ---------- Services & Pricing ----------
     price:    the starting price in dollars (a number, no $ sign)
     duration: roughly how long the appointment takes */
  services: [
    {
      category: "Cuts",
      items: [
        { name: "Women's Cut & Style", description: "Consultation, wash, precision cut, and blowout", price: 65,  duration: "1 hr" },
        { name: "Men's Cut",           description: "Includes wash and style",                         price: 40,  duration: "45 min" },
        { name: "Bang Trim",           description: "A quick shape-up between appointments",           price: 15,  duration: "15 min" }
      ]
    },
    {
      category: "Color",
      items: [
        { name: "Single Process",        description: "All-over color or root touch-up",                 price: 90,  duration: "1.5 hrs" },
        { name: "Balayage",              description: "Hand-painted, lived-in color with toner",         price: 185, duration: "3–4 hrs" },
        { name: "Full Highlights",       description: "Foil highlights from root to ends",               price: 150, duration: "2.5–3 hrs" },
        { name: "Vivid / Fashion Color", description: "Pre-lightening plus bold custom color",           price: 200, duration: "3–5 hrs" },
        { name: "Color Correction",      description: "Consultation required before booking",            price: 250, duration: "4+ hrs" }
      ]
    },
    {
      category: "Styling",
      items: [
        { name: "Blowout",              description: "Wash plus a smooth or voluminous finish", price: 45,  duration: "45 min" },
        { name: "Updo / Special Event", description: "Formal styling for any occasion",         price: 95,  duration: "1 hr" },
        { name: "Bridal Package",       description: "Trial run plus day-of styling",           price: 250, duration: "2 visits" }
      ]
    },
    {
      category: "Treatments",
      items: [
        { name: "Deep Conditioning",     description: "Moisture mask with a scalp massage",    price: 35,  duration: "20 min" },
        { name: "Bond-Building Add-On",  description: "Protects and strengthens during color", price: 30,  duration: "+15 min" },
        { name: "Scalp Detox",           description: "Exfoliating scalp treatment",            price: 40,  duration: "30 min" },
        { name: "Keratin Smoothing",     description: "Frizz control for up to three months",  price: 250, duration: "2.5 hrs" }
      ]
    }
  ],

  priceNote: "Prices are starting points and may vary with hair length, thickness, and what we decide together at your consultation. Consultations are always free.",

  /* ---------- Portfolio ----------
     6 or 9 photos fill the grid evenly. When you add real photos, put
     them in the images folder and update src, alt (a short description
     of the photo for screen readers), and caption. */
  portfolio: [
    { src: "images/placeholder-photo.svg", alt: "Honey balayage on long, wavy hair",           caption: "Honey Balayage" },
    { src: "images/placeholder-photo.svg", alt: "Bright copper vivid color on shoulder-length hair", caption: "Copper Vivid" },
    { src: "images/placeholder-photo.svg", alt: "Soft blonde highlights with a curled finish",  caption: "Soft Blonde Highlights" },
    { src: "images/placeholder-photo.svg", alt: "Even brunette color after a color correction", caption: "Color Correction" },
    { src: "images/placeholder-photo.svg", alt: "Bridal updo with small pearl pins",            caption: "Bridal Updo" },
    { src: "images/placeholder-photo.svg", alt: "Lived-in brunette with face-framing pieces",   caption: "Lived-in Brunette" }
  ],

  /* ---------- Client Reviews ----------
     SAMPLE CONTENT: these are made-up example reviews for the demo.
     Replace them with real reviews (with the client's permission)
     before the page goes live. rating is a number from 1 to 5. */
  reviews: [
    { name: "Sarah",  rating: 5, service: "Color Correction", text: "Bella fixed years of box dye in one visit and gave me the soft balayage I'd been dreaming about. I've never gotten so many compliments." },
    { name: "Mia",    rating: 5, service: "Bridal Package",   text: "She did my hair for my wedding and I felt completely calm the whole morning. It held through hours of dancing!" },
    { name: "Alexis", rating: 5, service: "Vivid Color",      text: "My copper is still bright eight weeks later. Bella sent me home with a care plan, and it really works." },
    { name: "Jordan", rating: 5, service: "Full Highlights",  text: "She really listens. My highlights look natural, and she was honest about what would work with my hair." }
  ],

  /* ---------- Availability ----------
     Use 24-hour times ("18:00" = 6pm). For a day off, set start to null. */
  availability: [
    { day: "Monday",    start: null },
    { day: "Tuesday",   start: "10:00", end: "18:00" },
    { day: "Wednesday", start: "10:00", end: "18:00" },
    { day: "Thursday",  start: "12:00", end: "20:00" },
    { day: "Friday",    start: "10:00", end: "18:00" },
    { day: "Saturday",  start: "09:00", end: "15:00" },
    { day: "Sunday",    start: null }
  ],

  availabilityNote: "Early-morning bridal appointments are available on request.",

  /* ---------- Certifications & Training ----------
     SAMPLE CONTENT: replace with Bella's real license and trainings. */
  certifications: [
    { title: "Licensed Cosmetologist",                 issuer: "State Board of Cosmetology",    year: "2009" },
    { title: "Advanced Balayage & Color Melting",      issuer: "Color Academy Intensive",       year: "2018" },
    { title: "Color Correction Specialist",            issuer: "Advanced Haircolor Institute",  year: "2020" },
    { title: "Bridal Hair Masterclass",                issuer: "Wedding Styling Workshop",      year: "2021" },
    { title: "Bond-Building & Hair Health Certification", issuer: "Professional Education Day", year: "2023" }
  ]
};
