# Apron Cleans Co. ZA — Website

## Student Information
- Name: Lutho Xelo
- Student number: ST10506801
- Module: WEDE5020
- Year: 2026

## Project Overview
An HTML website built for **Apron Cleans Co. ZA**, a
residential and commercial cleaning business founded by Sinesipho Peter in
East London, South Africa, in 2020. The business employs and trains
previously unemployed young people from its local community, and offers
residential, move-in/move-out, post-construction, spring, window, and
kitchen/bathroom cleaning services.

Organisation source: https://www.goexpress.co.za/2025/02/06/go-people-sinesipho-peter/

## Website Goals and Objectives
- Give the business a professional, trustworthy online presence.
- Clearly present the full range of cleaning services on offer.
- Make it easy for a visitor to request a free quote via an enquiry form.
- Communicate the organisation's community-employment story to build trust.
- Provide clear contact details and service-area maps for both East London
  and King William's Town.

## Key Features and Functionality
- Fully responsive, mobile-first layout with an accessible hamburger nav.
- Client-side validated **enquiry form** (`enquiry.html`) with required
  fields, inline error messages, and a success state.
- Client-side validated **contact form** (`contact.html`).
- Two embedded maps (East London and King William's Town) on the contact
  page, satisfying the "more than one location" requirement.
- Consistent, working navigation across all five pages.

## Timeline and Milestones
| Milestone | Status |
|---|---|
| Website Project Proposal | Complete |
| Content research & sourcing | Complete |
| Sitemap & file/folder structure | Complete |
| Initial HTML pages (Part 1) | Complete |

## Part 1 Details
Part 1 delivers the initial HTML structure and static content for all five
required pages, a shared stylesheet, shared JavaScript (navigation, form
validation, scroll reveal), and the file/folder structure below.
Part 2 and Part 3 will build on this foundation in future submissions/edits.


## Part 2 Details
Part 2 focused on visual design, layout, and navigation, turning the static
Part 1 HTML into a styled, fully responsive site:

- **Added `style.css`** — a single shared stylesheet linked from every page,
  using CSS custom properties (variables) for the colour palette so the
  theme is easy to adjust in one place.
- **Colour scheme** — alpine dark green background (`#07271b`–`#0f4a33`
  range), white (`#ffffff`) body text and section headings, yellow
  (`#ffd447`) accents on headings, links, hover states, and buttons, and a
  white footer with a yellow top border.
- **Hamburger navigation** — implemented with pure CSS (a hidden checkbox +
  `<label>` icon + `:checked` sibling selectors). Below 720px the nav
  collapses behind the hamburger icon, which animates into an "X" when
  opened. No JavaScript is used for this, per the current project scope.
- **Responsive layout** — mobile-first CSS using Flexbox and CSS Grid:
  - Hero image, service images, and team photos scale fluidly with
    `max-width: 100%`.
  - Services and team sections use a responsive card grid that reflows from
    1 column on phones to 2 columns on tablets/desktops.
  - The enquiry form's inputs, selects, and textareas stack full-width on
    small screens.
  - Both Google Maps embeds on the contact page are wrapped in an
    aspect-ratio container (`.map-responsive`) so they resize correctly on
    any screen instead of staying at a fixed pixel size.
- **Bug fixes carried out to support the redesign:**
  - Fixed two `<img>` tags in `about.html` that were missing their closing
    `>`, which was breaking the rest of the page.
  - Rebuilt `contact.html`, which had structural HTML errors (`</main>`
    closing too early, a stray duplicate `<body>`, and a malformed second
    map embed). Both locations now render correctly.
  - Fixed the "Home" nav link on the homepage, which incorrectly pointed to
    `about.html` instead of `index.html`.
  - Added an active-page indicator to the nav on every page.

## Sitemap

## Sitemap
```
Home (index.html)
├── About Us (about.html)
├── Services (services.html)
│   ├── Residential cleaning
│   ├── Move in / move out cleaning
│   ├── Post-construction cleaning
│   ├── Spring cleaning
│   ├── Window cleaning
│   └── Kitchen & bathroom cleaning
├── Enquiry (enquiry.html)
└── Contact (contact.html)

##Part 2
## File and Folder Structure

/
├── index.html
├── style.css
├── README.md
├── Assets/
│ └── (images used across the site — hero, service, and team photos)
└── Pages/
├── about.html
├── services.html
├── enquiry.html
└── contact.html
```

## File and Folder Structure
```
/
├── index.html
├── about.html
├── services.html
├── enquiry.html
├── contact.html
├── README.md
└── images/
    └── (reserved for future image assets)
```

## Changelog
- **v0.1.0** — Initial project structure, sitemap, and file organisation created.
- **v0.2.0** (Part 1) — Built out index.html and the four Pages files with
  static content, shared header/nav/footer markup, and no styling yet.
- **v0.3.0** (Part 2) — Added `style.css` with the alpine dark-green colour
  scheme, pure-CSS hamburger navigation, fully responsive layout (Flexbox +
  CSS Grid, fluid images, responsive map embeds), active-nav-link styling,
  and fixed pre-existing HTML structural bugs in `about.html` and
  `contact.html`.

## References
*Complete this section using your institution's recognised referencing style.
Suggested sources used to inform content:*
- GO! & Express. (2026). *GO People – Sinesipho Peter*. Available at:
  https://www.goexpress.co.za/2025/02/06/go-people-sinesipho-peter/
- Google Fonts: Space Grotesk, Work Sans, IBM Plex Mono —
  https://fonts.google.com/
- OpenStreetMap — https://www.openstreetmap.org/ (embedded maps)
