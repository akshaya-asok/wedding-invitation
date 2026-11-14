/**
 * ============================================================================
 * WEDDING INVITATION CONFIGURATION (City-3 Template Replica)
 * ============================================================================
 * Edit the values in this file to customize the entire wedding website for your
 * event. All text, dates, event cards, photos, links, and particle settings
 * are controlled from here.
 */

window.WEDDING_CONFIG = {
  // 1. Page Meta & Audio
  meta: {
    title: "Anand Mahadevan weds Akshaya — Wedding Invitation",
    musicSrc: "assets/music.mp3",
    autoplayMusic: true,
  },

  // 2. Falling Rose Petals Canvas Settings (240Hz Physics Engine)
  petals: {
    enabled: true,
    spriteSrc: "assets/petal.png",
    particleCountDesktop: 60,
    particleCountMobile: 30,
    particleSize: 4,     // Base size multiplier
    speed: 0.5,          // Fall speed multiplier
    rotationSpeed: 5,    // Rotation speed (deg/s)
    density: 3,          // Gravity & wind density multiplier
    fadeDuration: 0.35,  // Fast smoothstep fade-in duration (seconds) so petals appear immediately from top
  },

  // 3. Hero Section
  hero: {
    groomName: "Anand Mahadevan",
    conjunction: "weds",
    brideName: "Akshaya",
    sky1Desktop: "assets/sky-1-desktop.png",
    sky1Mobile: "assets/sky-1-mobile.png",
    sky2Desktop: "assets/sky-2-desktop.png",
    sky2Mobile: "assets/sky-2-mobile.jpg",
    palaceDesktop: "assets/palace-desktop.png",
    palaceMobile: "assets/palace-mobile.png",
  },

  // 4. Section 1: Invitation & Family Details
  invite: {
    mantra: "ॐ श्री गणेशाय नम",
    ganeshaIcon: "assets/ganesha.png",
    blessingIntro: "With the heavenly blessings of",
    grandparents: "Smt. Seema Bajaj W/o Late Sh. Rajesh Bajaj",
    divider: "——",
    groomParents: "Mrs. Vandana & Kishore Bajaj",
    inviteHeadline: "INVITE",
    inviteSubheadline: "You to join us in the wedding celebrations of",
    coupleName1: "Abhishek",
    coupleAmpersand: "&",
    coupleName2: "Kanika",
    brideParentsRelation: "Daughter of",
    brideParentsNames: "Mrs. Manisha & Ajay Gupta",
    eventsIntro: "On the following events",
  },

  // 5. Wedding Events Grid (6 Arched Cards)
  events: [
    {
      title: "Mehendi",
      datetime: "Friday, March 9th 2026\n5pm onwards",
      venue: "Iconic lawns, Bhola Bhawan",
      mapLabel: "See the route",
      mapUrl: "https://maps.google.com",
      image: "",
    },
    {
      title: "Haldi",
      datetime: "Friday, March 9th 2026\n5pm onwards",
      venue: "Iconic lawns, Bhola Bhawan",
      mapLabel: "See the route",
      mapUrl: "https://maps.google.com",
      image: "",
    },
    {
      title: "Cocktail",
      datetime: "Friday, March 9th 2026\n5pm onwards",
      venue: "Iconic lawns, Bhola Bhawan",
      mapLabel: "See the route",
      mapUrl: "https://maps.google.com",
      image: "",
    },
    {
      title: "Pre-wedding",
      datetime: "Friday, March 9th 2026\n5pm onwards",
      venue: "Iconic lawns, Bhola Bhawan",
      mapLabel: "See the route",
      mapUrl: "https://maps.google.com",
      image: "",
    },
    {
      title: "Wedding",
      datetime: "Friday, March 9th 2026\n5pm onwards",
      venue: "Iconic lawns, Bhola Bhawan",
      mapLabel: "See the route",
      mapUrl: "https://maps.google.com",
      image: "",
    },
    {
      title: "Reception",
      datetime: "Friday, March 9th 2026\n5pm onwards",
      venue: "Iconic lawns, Bhola Bhawan",
      mapLabel: "See the route",
      mapUrl: "https://maps.google.com",
      image: "",
    },
  ],

  // 6. Section 1 CTA: Venue Route (Rotating Mandala Medallion — Gold Theme)
  locationCta: {
    headline: "See the\nroute",
    subtext: "Click to open the map",
    url: "https://maps.google.com",
    ringImage: "assets/mandala-ring-location.png",
    innerImage: "assets/mandala-inner-location.png",
  },

  // 7. Section 2: Meet the Bride and Groom & Ornate Mirror Slideshow
  coupleSection: {
    headingTop: "Meet the",
    headingBottom: "Bride and Groom",
    message:
      "We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. The affection shown to us by so many people since our engagement has been incredibly moving, and has touched us both deeply. We would like to take this opportunity to thank everyone most sincerely for their kindness. We are looking forward to see you at the wedding.",
    slideshowIntervalMs: 2000,
    photos: [],
    rsvpCta: {
      headline: "Please\nrsvp",
      subtext: "Click to message on WhatsApp",
      url: "https://wa.me/919999999999?text=Hi!%20I%20would%20love%20to%20RSVP%20for%20the%20wedding!",
      ringImage: "assets/mandala-ring-rsvp.png",
      innerImage: "assets/mandala-inner-rsvp.png",
    },
  },

  // 8. Section 3: Things to Know
  thingsToKnow: {
    headingTop: "Things to",
    headingBottom: "know",
    description:
      "To help you feel at ease and enjoy every moment of the celebrations, we’ve gathered a few thoughtful details we’d love for you to know before the big day.",
    items: [
      {
        icon: "",
        title: "Hashtag",
        text: "While posting photos on social media please use the hashtag - #abkan",
      },
      {
        icon: "",
        title: "Weather",
        text: "It will be mostly sunny with temperature reaching up to 28 degrees at the venue",
      },
      {
        icon: "",
        title: "Staff",
        text: "We recommend the nearby hotel called Bhola Bhawan near the venue for the staff members",
      },
      {
        icon: "",
        title: "Parking",
        text: "Valet parking for all our guests will be available at the venue",
      },
    ],
    instagramCta: {
      headline: "Follow the\naction",
      subtext: "Click to open our Instagram page",
      url: "https://instagram.com",
      ringImage: "assets/mandala-ring-instagram.png",
      innerImage: "assets/mandala-inner-instagram.png",
    },
  },

  // 9. Footer & Live Countdown
  footer: {
    headingTop: "The countdown",
    headingBottom: "begins",
    // ISO 8601 target date for the wedding countdown
    targetDate: "2027-03-10T00:00:00.000Z",
    closingLine1: "Looking forward to seeing you",
    closingLine2: "Mittal and Gupta Family",
    backToTopLabel: "Back to top",
    copyright: "© Missing Piece 2026",
  },
};

