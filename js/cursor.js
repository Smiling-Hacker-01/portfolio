// Custom Cursor Effect

const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
const speed = 0.15; // Cursor follow speed

// Update mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth cursor follow animation
function animateCursor() {
  const distX = mouseX - cursorX;
  const distY = mouseY - cursorY;
  
  cursorX += distX * speed;
  cursorY += distY * speed;
  
  if (cursor) {
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
  }
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor expand on hover
const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, input, textarea');

hoverElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    if (cursor) {
      cursor.classList.add('expand');
    }
  });
  
  element.addEventListener('mouseleave', () => {
    if (cursor) {
      cursor.classList.remove('expand');
    }
  });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  if (cursor) {
    cursor.style.opacity = '0';
  }
});

document.addEventListener('mouseenter', () => {
  if (cursor) {
    cursor.style.opacity = '1';
  }
});

// Additional cursor effects for specific elements
const clickableElements = document.querySelectorAll('.glass-card, .flip-card');

clickableElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    if (cursor) {
      cursor.style.width = '60px';
      cursor.style.height = '60px';
      cursor.style.borderColor = 'var(--neon-purple)';
    }
  });
  
  element.addEventListener('mouseleave', () => {
    if (cursor) {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.borderColor = 'var(--neon-blue)';
    }
  });
});
