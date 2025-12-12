// ==================== SMOOTH SCROLL UNTUK NAVIGASI ====================
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// ==================== INTERSECTION OBSERVER UNTUK ANIMASI ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe semua elemen yang perlu animasi
document.querySelectorAll('section, .feature-card, .benefit-item').forEach(el => {
  observer.observe(el);
});

// ==================== WELCOME NOTIFICATION ====================
window.addEventListener('load', () => {
  setTimeout(() => {
    showNotification('Selamat datang!', 'Jelajahi informasi lengkap tentang panel surya dan energi terbarukan.', 'success');
  }, 800);
});

// Fungsi untuk menampilkan notifikasi yang elegan
function showNotification(title, message, type = 'info') {
  const notificationContainer = document.createElement('div');
  notificationContainer.className = `notification notification-${type}`;
  
  const notificationHTML = `
    <div class="notification-content">
      <div class="notification-icon">
        ${getNotificationIcon(type)}
      </div>
      <div class="notification-text">
        <h4>${title}</h4>
        <p>${message}</p>
      </div>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  notificationContainer.innerHTML = notificationHTML;
  document.body.appendChild(notificationContainer);
  
  setTimeout(() => {
    notificationContainer.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notificationContainer.classList.remove('show');
    setTimeout(() => notificationContainer.remove(), 300);
  }, 5000);
}

function getNotificationIcon(type) {
  const icons = {
    'success': '<i class="fas fa-check-circle"></i>',
    'info': '<i class="fas fa-info-circle"></i>',
    'warning': '<i class="fas fa-exclamation-circle"></i>',
    'error': '<i class="fas fa-times-circle"></i>'
  };
  return icons[type] || icons['info'];
}

// ==================== SCROLL EFFECT ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
  } else {
    navbar.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
  }
  
  lastScroll = currentScroll;
});

// ==================== SMOOTH ANIMATIONS ON SCROLL ====================
const addAnimationStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 400px;
      opacity: 0;
      transform: translateX(400px);
      transition: all 0.3s ease;
    }

    .notification.show {
      opacity: 1;
      transform: translateX(0);
    }

    .notification-content {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(10px);
    }

    .notification-success .notification-content {
      background: linear-gradient(135deg, #009879 0%, #7ed6ff 100%);
      color: white;
    }

    .notification-info .notification-content {
      background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
      color: white;
    }

    .notification-warning .notification-content {
      background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
      color: white;
    }

    .notification-error .notification-content {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: white;
    }

    .notification-icon {
      font-size: 1.5em;
      display: flex;
      align-items: center;
      min-width: 30px;
    }

    .notification-text h4 {
      margin: 0 0 5px 0;
      font-weight: 600;
    }

    .notification-text p {
      margin: 0;
      opacity: 0.9;
      font-size: 0.95em;
    }

    .notification-close {
      background: none;
      border: none;
      color: white;
      font-size: 1.2em;
      cursor: pointer;
      padding: 0;
      margin-left: 10px;
      opacity: 0.7;
      transition: opacity 0.3s;
    }

    .notification-close:hover {
      opacity: 1;
    }

    @media (max-width: 480px) {
      .notification {
        left: 10px;
        right: 10px;
        max-width: none;
        top: auto;
        bottom: 20px;
        transform: translateY(400px);
      }

      .notification.show {
        transform: translateY(0);
      }

      .notification-content {
        flex-direction: column;
      }
    }
  `;
  document.head.appendChild(style);
};

addAnimationStyles();

// ==================== PARALLAX EFFECT UNTUK HEADER ====================
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    const scrollPosition = window.pageYOffset;
    header.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
  }
});

// ==================== ACTIVE NAV LINK ====================
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset + 100;
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
});

// Tambahkan style untuk active nav link
const styleActive = document.createElement('style');
styleActive.innerHTML = `
  .nav-link.active {
    color: var(--secondary-color);
    background: rgba(0, 152, 121, 0.1);
  }

  .nav-link.active::before {
    transform: scaleX(1);
  }
`;
document.head.appendChild(styleActive);

// ==================== CALCULATOR (Panjang Panel Surya) ====================
function setupCalculator(backdrop) {
  if (!backdrop) return;
  const modal = backdrop.querySelector('.calc-modal');
  const reqPowerInput = backdrop.querySelector('#reqPower');
  const powerPerMeterInput = backdrop.querySelector('#powerPerMeter');
  const powerPerPanelInput = backdrop.querySelector('#powerPerPanel');
  const resultEl = backdrop.querySelector('#calcResult');
  const computeBtn = backdrop.querySelector('#calcCompute');
  const closeButtons = backdrop.querySelectorAll('.btn-calc.secondary');

  function closeModal() {
    backdrop.classList.remove('show');
    backdrop.setAttribute('aria-hidden', 'true');
    if (resultEl) {
      resultEl.style.display = 'none';
      resultEl.innerHTML = '';
    }
  }

  // close when clicking backdrop (outside modal)
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  // close buttons
  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

  // draggable behavior
  const handle = modal.querySelector('.calc-handle');
  let isDragging = false;
  let startX = 0, startY = 0, startLeft = 0, startTop = 0;

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = (e.touches ? e.touches[0].clientX : e.clientX);
    const clientY = (e.touches ? e.touches[0].clientY : e.clientY);
    const dx = clientX - startX;
    const dy = clientY - startY;
    let newLeft = startLeft + dx;
    let newTop = startTop + dy;
    const maxLeft = window.innerWidth - modal.offsetWidth - 8;
    const maxTop = window.innerHeight - modal.offsetHeight - 8;
    newLeft = Math.max(8, Math.min(maxLeft, newLeft));
    newTop = Math.max(8, Math.min(maxTop, newTop));
    modal.style.left = newLeft + 'px';
    modal.style.top = newTop + 'px';
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    modal.classList.remove('dragging');
    document.removeEventListener('mousemove', onPointerMove);
    document.removeEventListener('mouseup', onPointerUp);
    document.removeEventListener('touchmove', onPointerMove);
    document.removeEventListener('touchend', onPointerUp);
  }

  function onPointerDown(e) {
    e.preventDefault();
    isDragging = true;
    modal.classList.add('dragging');
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    startY = (e.touches ? e.touches[0].clientY : e.clientY);
    startLeft = parseInt(window.getComputedStyle(modal).left, 10) || modal.getBoundingClientRect().left;
    startTop = parseInt(window.getComputedStyle(modal).top, 10) || modal.getBoundingClientRect().top;
    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('mouseup', onPointerUp);
    document.addEventListener('touchmove', onPointerMove, { passive: false });
    document.addEventListener('touchend', onPointerUp);
  }

  if (handle) {
    handle.addEventListener('mousedown', onPointerDown);
    handle.addEventListener('touchstart', onPointerDown, { passive: false });
  }

  // compute function
  function computeLength() {
    const reqPower = parseFloat(reqPowerInput.value) || 0;
    const powerPerMeter = parseFloat(powerPerMeterInput.value) || 0;
    const powerPerPanel = parseFloat(powerPerPanelInput.value) || 0;

    if (reqPower <= 0 || powerPerMeter <= 0) {
      resultEl.style.display = 'block';
      resultEl.style.color = '#b33';
      resultEl.innerHTML = 'Masukkan nilai yang valid untuk daya yang dibutuhkan dan daya per meter.';
      return;
    }

    const lengthMeters = reqPower / powerPerMeter;

    let html = `Perkiraan panjang panel yang dibutuhkan: <strong>${lengthMeters.toFixed(2)} m</strong> (berdasarkan ${powerPerMeter} W/m).`;

    if (powerPerPanel > 0) {
      const panelsNeeded = Math.ceil(reqPower / powerPerPanel);
      const panelWidth = powerPerPanel / powerPerMeter;
      const totalLengthPanels = panelsNeeded * panelWidth;
      html += `<br>Jika menggunakan panel ${powerPerPanel} W per unit (lebar ≈ ${panelWidth.toFixed(2)} m), maka diperlukan <strong>${panelsNeeded}</strong> panel, total panjang ≈ <strong>${totalLengthPanels.toFixed(2)} m</strong>.`;
    }

    resultEl.style.display = 'block';
    resultEl.style.color = '#083';
    resultEl.innerHTML = html;
  }

  if (computeBtn) computeBtn.addEventListener('click', computeLength);
}

document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-calculator');
  if (!openBtn) return;

  openBtn.addEventListener('click', async () => {
    let backdrop = document.getElementById('calcBackdrop');
    if (!backdrop) {
      // Fallback HTML (used if fetch fails or when opened via file://)
      const fallbackHTML = `
<div class="calc-modal-backdrop" id="calcBackdrop" role="dialog" aria-hidden="true">
  <div class="calc-modal" role="document" aria-label="Kalkulator Panjang Panel Surya">
    <div class="calc-handle" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
      <h3 style="margin:0;">Kalkulator Panjang Panel Surya</h3>
      <button id="calcClose" class="btn-calc secondary" aria-label="Tutup kalkulator">✕</button>
    </div>
    <p style="font-size:0.9em;margin:6px 0 12px 0;color:#556;">Isi daya yang Anda butuhkan, lalu tekan <strong>Hitung</strong>.</p>
    <div class="calc-row">
      <label for="reqPower">Daya yang dibutuhkan (W)</label>
      <input id="reqPower" type="number" min="0" value="1000" />
    </div>
    <div class="calc-row">
      <label for="powerPerMeter">Daya per meter (W/m)</label>
      <input id="powerPerMeter" type="number" min="1" value="200" />
    </div>
    <div class="calc-row">
      <label for="powerPerPanel">Daya per panel (W) (opsional)</label>
      <input id="powerPerPanel" type="number" min="1" placeholder="50" />
    </div>
    <div class="calc-actions">
      <button id="calcCloseAlt" class="btn-calc secondary">Tutup</button>
      <button id="calcCompute" class="btn-calc">Hitung</button>
    </div>
    <div id="calcResult" class="calc-result" style="display:none;"></div>
  </div>
</div>`;

      // If opened via file://, skip fetch and use fallback to avoid CORS/Fetch issues
      if (location.protocol === 'file:') {
        const temp = document.createElement('div');
        temp.innerHTML = fallbackHTML;
        document.body.appendChild(temp.firstElementChild);
        backdrop = document.getElementById('calcBackdrop');
        setupCalculator(backdrop);
      } else {
        try {
          const resp = await fetch('calculator.html');
          if (!resp.ok) throw new Error('Gagal memuat kalkulator');
          const html = await resp.text();
          const temp = document.createElement('div');
          temp.innerHTML = html;
          // insert the fragment into body
          document.body.appendChild(temp.firstElementChild);
          backdrop = document.getElementById('calcBackdrop');
          setupCalculator(backdrop);
        } catch (err) {
          console.warn('Fetch failed, using fallback fragment', err);
          const temp = document.createElement('div');
          temp.innerHTML = fallbackHTML;
          document.body.appendChild(temp.firstElementChild);
          backdrop = document.getElementById('calcBackdrop');
          setupCalculator(backdrop);
        }
      }
    }

    const modal = backdrop.querySelector('.calc-modal');
    // show backdrop and modal
    backdrop.classList.add('show');
    backdrop.setAttribute('aria-hidden', 'false');

    // set initial center position (if not moved previously)
    if (!modal.dataset.positioned) {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const left = Math.max(16, Math.round((vw - modal.offsetWidth) / 2));
      modal.style.left = left + 'px';
      modal.style.top = (80) + 'px';
      modal.dataset.positioned = '1';
    }

    // focus first input for accessibility
    const reqPowerInput = backdrop.querySelector('#reqPower');
    setTimeout(() => reqPowerInput && reqPowerInput.focus(), 120);
  });
});

// ==================== LEARNING MODULE MODAL HANDLER ====================
document.addEventListener('DOMContentLoaded', function() {
  const learningBtn = document.getElementById('learning-module-btn');
  const modal = document.getElementById('learning-module-modal');
  const overlay = document.getElementById('learning-modal-overlay');
  const closeBtn = document.getElementById('close-learning-modal');

  // Open modal
  learningBtn.addEventListener('click', function() {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  closeBtn.addEventListener('click', closeModal);

  // Close modal when clicking overlay
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});

// ==================== BACKGROUND MUSIC CONTROL ====================
document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('background-music');
  const musicBtn = document.getElementById('music-toggle');
  let isPlaying = false;

  // Set volume
  audio.volume = 0.3;

  // Toggle music on button click
  musicBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (isPlaying) {
      audio.pause();
      musicBtn.classList.remove('playing');
      musicBtn.classList.add('muted');
      // mute audio when paused so UI reflects muted state
      audio.muted = true;
      // update icon to muted
      const icon = musicBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
      }
      isPlaying = false;
    } else {
      // Ensure audio is unmuted when user explicitly requests playback
      audio.muted = false;
      audio.play().catch(err => {
        console.log('Audio play failed:', err);
      });
      musicBtn.classList.add('playing');
      musicBtn.classList.remove('muted');
      // update icon to volume-up
      const icon = musicBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
      }
      isPlaying = true;
    }
  });

  // Update button state when audio ends
  audio.addEventListener('ended', function() {
    if (isPlaying) {
      audio.currentTime = 0;
      audio.play();
    }
  });

  // Initialize button state (muted by default for better UX)
  musicBtn.classList.add('muted');
  const initIcon = musicBtn.querySelector('i');
  if (initIcon) {
    initIcon.classList.remove('fa-volume-up');
    initIcon.classList.add('fa-volume-mute');
  }
  isPlaying = false;

  // Try to autoplay with muted state first
  audio.muted = true;
  audio.play().then(() => {
    audio.muted = false;
    musicBtn.classList.add('playing');
    musicBtn.classList.remove('muted');
    // update icon to volume-up after successful autoplay
    const icon = musicBtn.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-volume-mute');
      icon.classList.add('fa-volume-up');
    }
    isPlaying = true;
  }).catch(err => {
    // Autoplay failed, user will click to play
    console.log('Audio autoplay failed, user must click to play');
  });
});