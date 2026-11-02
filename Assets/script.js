/* ==========================================================================
   Apron Cleans Co. ZA — Main JavaScript File
   Features:
   1. Active Nav Link Highlighting
   2. Shared Helper Utilities (Validation & Error Handling)
   3. Booking & Enquiry Cost Calculator Form
   4. Contact Form (`mailto:` trigger & validation)
   5. Interactive Location Map Selector (Rubric Requirement)
   6. Gallery Lightbox Modal (Rubric Requirement - Updated with zoomable support)
   7. Dynamic Content Search & Category Filtering (Rubric Requirement)
   8. AJAX Data Loader (Rubric Requirement - Asynchronous JSON content injection)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------------
     1. Shared Helper Functions (Validation & Errors)
     ------------------------------------------------------------------------ */
  function showError(input, message) {
    clearError(input);
    if (!input) return;
    input.classList.add('invalid');
    var small = document.createElement('small');
    small.className = 'field-error';
    small.textContent = message;
    input.insertAdjacentElement('afterend', small);
  }

  function clearError(input) {
    if (!input) return;
    input.classList.remove('invalid');
    var next = input.nextElementSibling;
    if (next && next.classList.contains('field-error')) next.remove();
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidPhone(value) {
    return /^[0-9+()\s-]{7,15}$/.test(value);
  }

  /* ------------------------------------------------------------------------
     2. Active Navigation Link Highlighting
     ------------------------------------------------------------------------ */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('nav#main-nav a');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ------------------------------------------------------------------------
     3. Booking & Enquiry Form (Cost Calculator)
     ------------------------------------------------------------------------ */
  var enquiryForm = document.querySelector('#booking-section form');
  if (enquiryForm) {
    var enquiryResponseBox = document.createElement('div');
    enquiryResponseBox.id = 'enquiry-response';
    enquiryResponseBox.className = 'form-message';
    enquiryResponseBox.setAttribute('role', 'status');
    enquiryResponseBox.hidden = true;
    enquiryForm.insertAdjacentElement('afterend', enquiryResponseBox);

    var pricing = {
      'residential':       { base: 450,  perRoom: 120, availability: '2 - 3 working days' },
      'deep-clean':        { base: 850,  perRoom: 200, availability: '4 - 6 working days' },
      'post-construction': { base: 1200, perRoom: 260, availability: '5 - 7 working days' },
      'wall-window':       { base: 350,  perRoom: 90,  availability: '1 - 2 working days' }
    };

    var roomsBySize = { '1-2-bed': 2, '3-4-bed': 4, 'commercial': 6 };

    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var fullname = enquiryForm.querySelector('#fullname');
      var phone = enquiryForm.querySelector('#phone');
      var email = enquiryForm.querySelector('#email');
      var service = enquiryForm.querySelector('#service');
      var propertySize = enquiryForm.querySelector('#property-size');
      var preferredDate = enquiryForm.querySelector('#preferred-date');

      [fullname, phone, email, service, preferredDate].forEach(clearError);
      enquiryResponseBox.hidden = true;

      var valid = true;

      if (!fullname || !fullname.value.trim()) {
        showError(fullname, 'Please enter your full name.');
        valid = false;
      }
      if (!phone || !isValidPhone(phone.value.trim())) {
        showError(phone, 'Please enter a valid phone number.');
        valid = false;
      }
      if (!email || !isValidEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address.');
        valid = false;
      }
      if (!service || !service.value) {
        showError(service, 'Please select a cleaning service.');
        valid = false;
      }
      if (!preferredDate || !preferredDate.value) {
        showError(preferredDate, 'Please choose a preferred date.');
        valid = false;
      } else {
        var chosen = new Date(preferredDate.value);
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (chosen < today) {
          showError(preferredDate, 'Preferred date cannot be in the past.');
          valid = false;
        }
      }

      if (!valid) return;

      var plan = pricing[service.value] || { base: 500, perRoom: 100, availability: '1 - 3 working days' };
      var rooms = (propertySize && roomsBySize[propertySize.value]) ? roomsBySize[propertySize.value] : 2;
      var estimate = plan.base + (plan.perRoom * rooms);

      enquiryResponseBox.innerHTML =
        '<strong>Thank you, ' + fullname.value.trim() + '!</strong><br>' +
        'Based on your selection, your estimated cost is <strong>R' + estimate + '</strong>, ' +
        'and our next availability for this service is <strong>' + plan.availability + '</strong>.<br>' +
        'We will confirm final pricing and booking details via ' + email.value.trim() + ' or ' + phone.value.trim() + '.';
      enquiryResponseBox.className = 'form-message success';
      enquiryResponseBox.hidden = false;
      enquiryResponseBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

      enquiryForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
     4. Contact Form (`contact.html`)
     ------------------------------------------------------------------------ */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var RECIPIENT_EMAIL = 'info@aproncleans.co.za';

    var contactResponseBox = document.createElement('div');
    contactResponseBox.id = 'contact-response';
    contactResponseBox.className = 'form-message';
    contactResponseBox.setAttribute('role', 'status');
    contactResponseBox.hidden = true;
    contactForm.insertAdjacentElement('afterend', contactResponseBox);

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('#contact-name');
      var email = contactForm.querySelector('#contact-email');
      var phoneInput = contactForm.querySelector('#contact-phone');
      var type = contactForm.querySelector('#message-type');
      var message = contactForm.querySelector('#contact-message');

      [name, email, type, message].forEach(clearError);
      contactResponseBox.hidden = true;

      var valid = true;

      if (!name || !name.value.trim()) {
        showError(name, 'Please enter your name.');
        valid = false;
      }
      if (!email || !isValidEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address.');
        valid = false;
      }
      if (!type || !type.value) {
        showError(type, 'Please select a message type.');
        valid = false;
      }
      if (!message || !message.value.trim()) {
        showError(message, 'Please type a message before sending.');
        valid = false;
      }

      if (!valid) return;

      var phoneVal = phoneInput ? phoneInput.value.trim() : 'Not provided';
      var subject = '[' + type.value + '] Message from ' + name.value.trim();
      var bodyLines = [
        'Name: ' + name.value.trim(),
        'Email: ' + email.value.trim(),
        'Phone: ' + (phoneVal || 'Not provided'),
        'Type: ' + type.value,
        '',
        message.value.trim()
      ];
      var body = bodyLines.join('\n');

      var mailtoLink = 'mailto:' + RECIPIENT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      contactResponseBox.innerHTML =
        '<strong>Thanks, ' + name.value.trim() + '!</strong><br>' +
        'Your email client should now be opening with your message ready to send to us. ' +
        'If it does not open automatically, please email us directly at <strong>' + RECIPIENT_EMAIL + '</strong>.';
      contactResponseBox.className = 'form-message success';
      contactResponseBox.hidden = false;
      contactResponseBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

      window.location.href = mailtoLink;
      contactForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
     5. Interactive Location Map Selector 
     ------------------------------------------------------------------------ */
  var mapFrame = document.querySelector('.map-responsive iframe');
  var locationButtons = document.querySelectorAll('[data-map-src]');

  if (mapFrame && locationButtons.length > 0) {
    locationButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var newSrc = this.getAttribute('data-map-src');
        if (newSrc) {
          mapFrame.src = newSrc;
          locationButtons.forEach(function (btn) { btn.classList.remove('active'); });
          this.classList.add('active');
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. Gallery Lightbox Preview 
     ------------------------------------------------------------------------ */
  var galleryImages = document.querySelectorAll('.gallery-grid img, .card img, img.zoomable');
  if (galleryImages.length > 0) {
    var lightboxOverlay = document.createElement('div');
    lightboxOverlay.id = 'lightbox-modal';
    lightboxOverlay.className = 'lightbox-modal';
    lightboxOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);display:none;justify-content:center;align-items:center;z-index:1000;cursor:pointer;';
    
    var lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = 'max-width:90%;max-height:85vh;border-radius:8px;border:3px solid #ffd447;box-shadow:0 8px 24px rgba(0,0,0,0.5);object-fit:contain;cursor:default;';
    lightboxOverlay.appendChild(lightboxImg);
    document.body.appendChild(lightboxOverlay);

    galleryImages.forEach(function (img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function (e) {
        e.stopPropagation();
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt || 'Expanded image view';
        lightboxOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    lightboxOverlay.addEventListener('click', function () {
      lightboxOverlay.style.display = 'none';
      document.body.style.overflow = '';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightboxOverlay.style.display === 'flex') {
        lightboxOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  /* ------------------------------------------------------------------------
     7. Dynamic Content Search & Category Filtering 
     ------------------------------------------------------------------------ */
  var searchInput = document.querySelector('#content-search');
  var categorySelect = document.querySelector('#category-filter');
  var cards = document.querySelectorAll('.card-grid .card');

  function filterCards() {
    var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    var selectedCategory = categorySelect ? categorySelect.value.toLowerCase() : 'all';

    cards.forEach(function (card) {
      var text = card.textContent.toLowerCase();
      var category = card.getAttribute('data-category') ? card.getAttribute('data-category').toLowerCase() : 'all';

      var matchesSearch = text.includes(query);
      var matchesCategory = (selectedCategory === 'all' || category === selectedCategory);

      card.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterCards);
  if (categorySelect) categorySelect.addEventListener('change', filterCards);

  /* ------------------------------------------------------------------------
     8. AJAX Data Loader (Asynchronous JSON Content Fetch)
     ------------------------------------------------------------------------ */
  var dynamicContainer = document.getElementById('dynamic-services-container');

  if (dynamicContainer) {
    fetch('assets/services.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function (data) {
        var htmlContent = '';
        
        data.forEach(function (service) {
          htmlContent += 
            '<div class="card" style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ddd;">' +
              '<h3>' + service.title + '</h3>' +
              '<p><strong>Price:</strong> ' + service.price + '</p>' +
              '<p>' + service.description + '</p>' +
            '</div>';
        });

        dynamicContainer.innerHTML = htmlContent;
      })
      .catch(function (error) {
        console.error('Error fetching data via AJAX:', error);
        dynamicContainer.innerHTML = '<p>Unable to load live services at this moment. Please try again later.</p>';
      });
  }

});