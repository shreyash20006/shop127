/* ==========================================================================
   ESCAPE CLOTHING 👣 - CART DRAWER JS
   Shopify AJAX Cart API operations, drawer slide, progress bar, counts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
});

function initCartDrawer() {
  const cartDrawer = document.getElementById('CartDrawer');
  const cartClose = document.getElementById('CartDrawerClose');
  const cartTriggers = document.querySelectorAll('.js-cart-trigger');
  
  if (!cartDrawer) return;

  // Open Drawer
  const openCart = () => {
    cartDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
    refreshCartDrawer();
  };

  // Close Drawer
  const closeCart = () => {
    cartDrawer.classList.remove('active');
    document.body.style.overflow = '';
  };

  cartTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });

  if (cartClose) {
    cartClose.addEventListener('click', closeCart);
  }

  cartDrawer.addEventListener('click', (e) => {
    if (e.target === cartDrawer) closeCart();
  });

  // Attach global functions to window so they can be called from quick-add or product form submissions
  window.openCartDrawer = openCart;
  window.closeCartDrawer = closeCart;
  window.refreshCartDrawer = refreshCartDrawer;

  // Intercept standard Add-to-Cart form submissions
  const addToCartForms = document.querySelectorAll('form[action$="/cart/add"]');
  addToCartForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'ADD TO CART';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span>';
      }

      const formData = new FormData(form);

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(item => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        openCart();
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      });
    });
  });
}

/**
 * Fetch latest cart data and re-render the Drawer elements
 */
function refreshCartDrawer() {
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      updateCartDrawerDOM(cart);
      updateHeaderCartBadge(cart.item_count);
    })
    .catch(error => console.error('Error fetching cart:', error));
}

/**
 * Update the Badge count inside all cart icons
 */
function updateHeaderCartBadge(count) {
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });
}

/**
 * Draw/re-draw all elements inside the drawer (Progress bar, items list, subtotal)
 */
function updateCartDrawerDOM(cart) {
  const container = document.getElementById('CartDrawerItems');
  const subtotalLabel = document.getElementById('CartDrawerSubtotal');
  const footerSection = document.getElementById('CartDrawerFooter');
  const headerTitle = document.getElementById('CartDrawerTitle');

  if (headerTitle) {
    headerTitle.textContent = `MY CART (${cart.item_count})`;
  }

  // Update Free Shipping Progress Bar
  const threshold = window.themeSettings.freeShippingThreshold; // ₹999 in paise (99900)
  const progressBar = document.getElementById('FreeShippingProgressBar');
  const progressText = document.getElementById('FreeShippingProgressText');

  if (progressBar && progressText) {
    if (cart.item_count === 0) {
      progressBar.style.width = '0%';
      progressText.innerHTML = `Add <strong>₹999</strong> more for FREE shipping!`;
    } else if (cart.total_price >= threshold) {
      progressBar.style.width = '100%';
      progressBar.style.backgroundColor = '#2ECC71';
      progressText.innerHTML = `🎉 You've unlocked <strong>FREE shipping!</strong>`;
    } else {
      const remainingPaise = threshold - cart.total_price;
      const remainingRupees = (remainingPaise / 100).toFixed(0);
      const percentage = (cart.total_price / threshold) * 100;
      
      progressBar.style.width = `${percentage}%`;
      progressBar.style.backgroundColor = 'var(--highlight-color)';
      progressText.innerHTML = `Add <strong>₹${remainingRupees}</strong> more for FREE shipping!`;
    }
  }

  // Handle empty state
  if (cart.item_count === 0) {
    if (container) {
      container.innerHTML = `
        <div class="cart-drawer__empty text-center" style="padding: 60px 20px;">
          <p style="margin-bottom: 24px; color: var(--text-muted);">Your cart is currently empty.</p>
          <a href="/collections/all" class="btn btn-primary">SHOP NEW ARRIVALS</a>
        </div>
      `;
    }
    if (footerSection) footerSection.style.display = 'none';
    return;
  }

  if (footerSection) footerSection.style.display = 'block';

  // Render items list
  if (container) {
    container.innerHTML = '';
    
    cart.items.forEach(item => {
      const itemHTML = `
        <div class="cart-drawer-item flex" data-key="${item.key}">
          <div class="cart-drawer-item__image" style="width: 70px; margin-right: 16px;">
            <img src="${item.image ? item.image : '//cdn.shopify.com/s/images/admin/no-image-large.gif'}" alt="${item.title}" style="width: 100%; object-fit: cover; aspect-ratio: 3/4;">
          </div>
          <div class="cart-drawer-item__details" style="flex: 1;">
            <div class="flex justify-between" style="margin-bottom: 4px;">
              <h4 style="font-size: 1.4rem; font-family: var(--font-body); font-weight: 600; text-transform: uppercase;">
                <a href="${item.url}">${item.product_title}</a>
              </h4>
              <button class="cart-drawer-item__remove" onclick="changeQuantity('${item.key}', 0)" style="color: var(--text-muted); font-size: 1.8rem; line-height: 1;">×</button>
            </div>
            ${item.variant_title ? `<p style="font-size: 1.2rem; color: var(--text-muted); margin-bottom: 8px;">Size/Variant: ${item.variant_title}</p>` : ''}
            <div class="flex justify-between align-center" style="margin-top: 12px;">
              <div class="qty-selector flex align-center" style="border: 1px solid var(--border-color); padding: 4px 8px;">
                <button onclick="changeQuantity('${item.key}', ${item.quantity - 1})" style="padding: 0 8px; font-size: 1.6rem;">−</button>
                <span style="padding: 0 12px; font-size: 1.4rem;">${item.quantity}</span>
                <button onclick="changeQuantity('${item.key}', ${item.quantity + 1})" style="padding: 0 8px; font-size: 1.6rem;">+</button>
              </div>
              <p style="font-size: 1.4rem; font-weight: 600; color: var(--text-primary);">₹${(item.final_line_price / 100).toFixed(0)}</p>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', itemHTML);
    });
  }

  // Update subtotal
  if (subtotalLabel) {
    subtotalLabel.textContent = `₹${(cart.total_price / 100).toFixed(0)}`;
  }
}

/**
 * Handle line item quantity updates via AJAX
 */
window.changeQuantity = function(key, quantity) {
  const itemRow = document.querySelector(`.cart-drawer-item[data-key="${key}"]`);
  if (itemRow && quantity === 0) {
    itemRow.style.opacity = '0.5';
    const title = itemRow.querySelector('h4');
    if (title) title.style.textDecoration = 'line-through';
  }

  fetch('/cart/change.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: key,
      quantity: quantity
    })
  })
  .then(response => response.json())
  .then(cart => {
    updateCartDrawerDOM(cart);
    updateHeaderCartBadge(cart.item_count);
  })
  .catch(error => {
    console.error('Error changing quantity:', error);
    refreshCartDrawer();
  });
};
