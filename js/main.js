// Main JavaScript for Portfolio Website

// Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1500);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + '%';
  }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal, .slide-left, .slide-right, .zoom-in');

function reveal() {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Stagger Animation
const staggerElements = document.querySelectorAll('.stagger');

function staggerReveal() {
  staggerElements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      setTimeout(() => {
        element.classList.add('active');
      }, index * 100);
    }
  });
}

window.addEventListener('scroll', staggerReveal);
staggerReveal(); // Initial check

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// Parallax Effect
window.addEventListener('scroll', () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  const scrolled = window.pageYOffset;
  
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;
    const increment = target / 100;
    
    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      updateCounter();
      observer.disconnect();
    }
  });
  
  observer.observe(counter);
});

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target.dataset.progress;
      entry.target.style.width = progress + '%';
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
  progressObserver.observe(bar);
});

// Circular Progress Animation
const circularProgress = document.querySelectorAll('.progress-circle');

circularProgress.forEach(circle => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = circle.getAttribute('data-progress');
        const circumference = 2 * Math.PI * 70; // radius = 70
        const offset = circumference - (progress / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        observer.disconnect();
      }
    });
  });
  
  observer.observe(circle);
});

// Form Validation
const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
        input.nextElementSibling?.classList.add('show');
      } else {
        input.classList.remove('error');
        input.nextElementSibling?.classList.remove('show');
      }
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        isValid = false;
        emailInput.classList.add('error');
      }
    }
    
    if (isValid) {
      // Show success message
      const successMsg = form.querySelector('.success-message');
      if (successMsg) {
        successMsg.classList.add('show');
      }
      
      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        if (successMsg) {
          successMsg.classList.remove('show');
        }
      }, 2000);
    }
  });
});

// Add active class to current page nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
  if (link.getAttribute('href') === currentPage || 
      (currentPage === '' && link.getAttribute('href') === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// Page Transition Effect
const pageLinks = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');

pageLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.hostname === window.location.hostname) {
      e.preventDefault();
      const href = link.getAttribute('href');
      
      // Create transition element
      const transition = document.createElement('div');
      transition.className = 'page-transition active';
      document.body.appendChild(transition);
      
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    }
  });
});

console.log('Portfolio loaded successfully!');
