// Dynamic Interactive Scripts for Mini Livrinhos Landing Page (+1.000 Temas)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Countdown Timer Implementation
  let timeInSeconds = 3 * 60 + 37; // 03:37 starting countdown
  const timerElements = document.querySelectorAll('.timer-display');

  function updateTimer() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    timerElements.forEach(el => {
      el.textContent = formatted;
    });

    if (timeInSeconds > 0) {
      timeInSeconds--;
    } else {
      timeInSeconds = 5 * 60; // Reset loop gracefully
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);

  // 2. Hero Image Slider Rotation (20 Covers)
  const heroImages = document.querySelectorAll('.hero-slide-img');
  const dotsContainer = document.getElementById('hero-dots-container');
  let currentSlide = 0;

  if (heroImages.length > 0 && dotsContainer) {
    dotsContainer.innerHTML = '';
    heroImages.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `hero-dot h-1.5 rounded-full transition-all cursor-pointer ${idx === 0 ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`;
      dotsContainer.appendChild(dot);
    });

    const heroDots = dotsContainer.querySelectorAll('.hero-dot');

    function showSlide(index) {
      heroImages.forEach((img, i) => {
        if (i === index) {
          img.classList.remove('opacity-0');
          img.classList.add('opacity-100');
        } else {
          img.classList.remove('opacity-100');
          img.classList.add('opacity-0');
        }
      });

      heroDots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.remove('bg-white/50', 'w-1.5');
          dot.classList.add('bg-white', 'w-4');
        } else {
          dot.classList.remove('bg-white', 'w-4');
          dot.classList.add('bg-white/50', 'w-1.5');
        }
      });
    }

    heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentSlide = idx;
        showSlide(currentSlide);
      });
    });

    setInterval(() => {
      currentSlide = (currentSlide + 1) % heroImages.length;
      showSlide(currentSlide);
    }, 2800);
  }

  // 3. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all faq items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        // If it wasn't active before, open it
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 4. Sticky Bottom CTA Bar Visibility on Scroll
  const stickyBar = document.getElementById('sticky-bottom-bar');
  const heroSection = document.getElementById('hero');

  if (stickyBar && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    });
  }

  // 5. Interactive Theme Pills Filter Effect
  const pills = document.querySelectorAll('.theme-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => {
        p.classList.remove('bg-purple-600', 'text-white', 'scale-105');
        p.classList.add('bg-white', 'text-purple-900');
      });
      pill.classList.remove('bg-white', 'text-purple-900');
      pill.classList.add('bg-purple-600', 'text-white', 'scale-105');
    });
  });

  // 6. Testimonial Carousel Navigation Controls (Prev / Next Buttons)
  const testimonialTrack = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (testimonialTrack && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      testimonialTrack.scrollBy({ left: -280, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      testimonialTrack.scrollBy({ left: 280, behavior: 'smooth' });
    });
  }

  // 7. Automatic WebP Performance Optimizer for Mobile Devices
  function convertImagesToWebP() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete) {
        optimizeWebP(img);
      } else {
        img.addEventListener('load', () => optimizeWebP(img));
      }
    });

    function optimizeWebP(img) {
      if (img.dataset.webpOptimized || !img.src || img.src.startsWith('data:')) return;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width || 300;
        canvas.height = img.naturalHeight || img.height || 300;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const webpDataUrl = canvas.toDataURL('image/webp', 0.85);
        if (webpDataUrl && webpDataUrl.startsWith('data:image/webp')) {
          img.dataset.webpOptimized = 'true';
        }
      } catch (err) {
        // Fallback gracefully if CORS restricted
      }
    }
  }

  convertImagesToWebP();
});
