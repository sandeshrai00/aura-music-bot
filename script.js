// ==========================================
// DOM Elements
// ==========================================
const qrImage = document.getElementById('qrImage');
const selectedAmountDisplay = document.getElementById('selectedAmount');
const presetButtons = document.querySelectorAll('.preset-btn');
const cryptoItems = document.querySelectorAll('.crypto-item');
const allWalletCodes = document.querySelectorAll('.wallet-code');
const allCopyButtons = document.querySelectorAll('.copy-btn-full');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ==========================================
// Initialize Application
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initializePresetButtons();
  initializeCryptoAccordions();
  initializeCopyFunctionality();
  preloadQRImages();
});

// ==========================================
// Preset Amount Selection
// ==========================================
function initializePresetButtons() {
  presetButtons.forEach(button => {
    button.addEventListener('click', function() {
      handlePresetSelection(this);
    });
  });
}

function handlePresetSelection(button) {
  const qrFile = button.getAttribute('data-qr');
  const amount = button.getAttribute('data-amount');
  
  // Update QR code with loading animation
  updateQRCode(qrFile);
  
  // Update selected amount display
  updateAmountDisplay(amount);
  
  // Update active button state
  updateActiveButton(button);
  
  // Add click animation
  addClickAnimation(button);
}

function updateQRCode(qrFile) {
  qrImage.classList.add('loading');
  
  setTimeout(() => {
    qrImage.src = `img/${qrFile}`;
    qrImage.classList.remove('loading');
  }, 200);
}

function updateAmountDisplay(amount) {
  selectedAmountDisplay.textContent = `$${amount}`;
  
  // Add pulse animation
  selectedAmountDisplay.style.transform = 'scale(1.1)';
  setTimeout(() => {
    selectedAmountDisplay.style.transform = 'scale(1)';
  }, 200);
}

function updateActiveButton(activeButton) {
  presetButtons.forEach(btn => btn.classList.remove('active'));
  activeButton.classList.add('active');
}

function addClickAnimation(button) {
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = '';
  }, 150);
}

// ==========================================
// Crypto Accordion Toggle
// ==========================================
function initializeCryptoAccordions() {
  cryptoItems.forEach(item => {
    const header = item.querySelector('.crypto-header');
    
    header.addEventListener('click', () => {
      toggleCryptoItem(item);
    });
    
    // Keyboard accessibility
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCryptoItem(item);
      }
    });
  });
}

function toggleCryptoItem(item) {
  const isExpanded = item.classList.contains('expanded');
  
  // Close all other items
  cryptoItems.forEach(otherItem => {
    if (otherItem !== item) {
      otherItem.classList.remove('expanded');
    }
  });
  
  // Toggle current item
  if (isExpanded) {
    item.classList.remove('expanded');
  } else {
    item.classList.add('expanded');
  }
}

// ==========================================
// Copy Wallet Address Functionality
// ==========================================
function initializeCopyFunctionality() {
  // Copy on wallet code click
  allWalletCodes.forEach(walletCode => {
    walletCode.addEventListener('click', () => {
      const address = walletCode.getAttribute('data-address');
      copyAddressToClipboard(address);
    });
  });
  
  // Copy on icon button click within wallet code
  const walletCopyIcons = document.querySelectorAll('.wallet-copy-icon');
  walletCopyIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      const walletCode = icon.closest('.wallet-code');
      const address = walletCode.getAttribute('data-address');
      copyAddressToClipboard(address);
    });
  });
  
  // Copy on full button click
  allCopyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const walletCode = button.previousElementSibling.querySelector('.wallet-code');
      const address = walletCode.getAttribute('data-address');
      copyAddressToClipboard(address);
    });
  });
}

function copyAddressToClipboard(address) {
  // Try modern clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(address)
      .then(() => {
        showToast('Address copied to clipboard!');
      })
      .catch(err => {
        console.error('Clipboard API failed:', err);
        fallbackCopyToClipboard(address);
      });
  } else {
    // Fallback for older browsers
    fallbackCopyToClipboard(address);
  }
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.style.opacity = '0';
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showToast('Address copied to clipboard!');
    } else {
      showToast('Failed to copy address');
    }
  } catch (err) {
    console.error('Fallback copy failed:', err);
    showToast('Copy not supported');
  }
  
  document.body.removeChild(textArea);
}

// ==========================================
// Toast Notification
// ==========================================
function showToast(message, duration = 2500) {
  toastMessage.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    hideToast();
  }, duration);
}

function hideToast() {
  toast.classList.remove('show');
}

// ==========================================
// Image Preloading
// ==========================================
function preloadQRImages() {
  const imagesToPreload = ['2us.jpg', '20us.jpg', '50us.jpg', '100us.jpg'];
  
  imagesToPreload.forEach(filename => {
    const img = new Image();
    img.src = `img/${filename}`;
  });
}

// ==========================================
// Smooth Scroll Enhancement
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================
// Accessibility Enhancements
// ==========================================
// Add focus visible styles for keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ==========================================
// Performance Optimization
// ==========================================
// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll events if needed
const handleScroll = debounce(() => {
  // Add scroll-based animations or effects here if needed
}, 100);

window.addEventListener('scroll', handleScroll);

// ==========================================
// Error Handling
// ==========================================
window.addEventListener('error', (e) => {
  console.error('Application error:', e.error);
});

// Handle image loading errors
qrImage.addEventListener('error', () => {
  console.error('Failed to load QR code image');
  showToast('Failed to load QR code', 3000);
});

// ==========================================
// Analytics & Tracking (Optional)
// ==========================================
function trackDonationSelection(amount) {
  // Add your analytics tracking code here
  console.log(`Donation amount selected: $${amount}`);
}

function trackCryptoExpanded(cryptoType) {
  // Add your analytics tracking code here
  console.log(`Crypto option expanded: ${cryptoType}`);
}

function trackCopyAction(type) {
  // Add your analytics tracking code here
  console.log(`Address copied: ${type}`);
}

// ==========================================
// Console Welcome Message
// ==========================================
console.log('%c🎵 Aura Music Donation Page', 'color: #5DADE2; font-size: 20px; font-weight: bold;');
console.log('%cThank you for supporting our project!', 'color: #b0b0b0; font-size: 14px;');
console.log('%cWebsite: https://www.auramusic.tech', 'color: #5DADE2; font-size: 12px;');