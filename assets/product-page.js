/* ==========================================================================
   ESCAPE CLOTHING 👣 - PRODUCT PAGE JS
   Gallery thumbnails, lightbox zoom, size guide modal, delivery estimate
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initProductGallery();
  initSizeGuideModal();
  initDeliveryEstimates();
  initAccordions();
});

/**
 * Gallery Image Switcher and Zoom Lightbox
 */
function initProductGallery() {
  const mainImage = document.getElementById('MainProductImage');
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  const zoomBtn = document.getElementById('ProductZoomButton');
  const lightbox = document.getElementById('ProductLightbox');
  const lightboxImg = document.getElementById('LightboxImage');
  const lightboxClose = document.getElementById('LightboxClose');
  const imageCounter = document.querySelector('.image-gallery__counter');

  if (!mainImage) return;

  // Thumbnail clicks
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      // Update main image source
      const newSrc = thumb.getAttribute('data-src');
      const newWidthSrc = thumb.getAttribute('data-width-src') || newSrc;
      mainImage.setAttribute('src', newSrc);
      mainImage.setAttribute('srcset', newWidthSrc);
      
      // Update active state
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      // Update image counter text (e.g., 2 / 5)
      if (imageCounter) {
        imageCounter.textContent = `${index + 1} / ${thumbnails.length}`;
      }
    });
  });

  // Lightbox Zoom
  const openLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.setAttribute('src', mainImage.getAttribute('src'));
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (zoomBtn) {
    zoomBtn.addEventListener('click', openLightbox);
  }
  if (mainImage) {
    mainImage.addEventListener('click', openLightbox);
  }
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
}

/**
 * Size Guide Modal popup
 */
function initSizeGuideModal() {
  const sizeGuideBtn = document.getElementById('SizeGuideBtn');
  const sizeGuideModal = document.getElementById('SizeGuideModal');
  const sizeGuideClose = document.getElementById('SizeGuideClose');

  if (!sizeGuideBtn || !sizeGuideModal) return;

  sizeGuideBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sizeGuideModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    sizeGuideModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (sizeGuideClose) {
    sizeGuideClose.addEventListener('click', closeModal);
  }

  sizeGuideModal.addEventListener('click', (e) => {
    if (e.target === sizeGuideModal) closeModal();
  });
}

/**
 * Delivery estimate details generator and same-day dispatch countdown
 */
function initDeliveryEstimates() {
  const deliveryText = document.getElementById('DeliveryEstimateText');
  const countdownText = document.getElementById('DispatchCountdownText');

  if (deliveryText) {
    const today = new Date();
    
    // Add 4 to 8 days for PAN India shipment
    const minDelivery = new Date(today);
    minDelivery.setDate(today.getDate() + 4);
    
    const maxDelivery = new Date(today);
    maxDelivery.setDate(today.getDate() + 8);

    const formatOptions = { month: 'short', day: 'numeric' };
    const minStr = minDelivery.toLocaleDateString('en-US', formatOptions);
    const maxStr = maxDelivery.toLocaleDateString('en-US', formatOptions);

    deliveryText.textContent = `Estimated delivery: ${minStr} – ${maxStr}`;
  }

  if (countdownText) {
    // Set dispatch countdown to end of business hours or midnight (e.g. 5:00 PM / 17:00)
    // For simplicity, we can do 3 hours 24 minutes countdown repeating or counting down to next midnight
    function updateCountdown() {
      const now = new Date();
      const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      let diffMs = endOfToday - now;
      
      // If past dispatch time (say 5 PM), countdown to next day's 5 PM
      const dispatchHour = 17;
      const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), dispatchHour, 0, 0);
      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
      }
      diffMs = targetTime - now;

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      countdownText.textContent = `Order in next ${hours}h ${minutes}m ${seconds}s for same-day dispatch`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
}

/**
 * Accordion tabs expand/collapse handlers
 */
function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const title = item.querySelector('.accordion-title');
    if (!title) return;

    title.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other accordion items
      accordionItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
