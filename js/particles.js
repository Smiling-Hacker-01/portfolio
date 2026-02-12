// Animated Particle Background

const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Wrap around edges
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = `rgba(14, 165, 233, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Create particles
  const particlesArray = [];
  const numberOfParticles = window.innerWidth < 768 ? 50 : 100;
  
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
  
  // Connect particles with lines
  function connectParticles() {
    const maxDistance = 150;
    
    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i + 1; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.3;
          ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Mouse interaction
  let mouse = {
    x: null,
    y: null,
    radius: 150
  };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  // Push particles away from mouse
  function handleMouseInteraction() {
    if (mouse.x !== null && mouse.y !== null) {
      particlesArray.forEach(particle => {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          
          particle.x += directionX * force * 3;
          particle.y += directionY * force * 3;
        }
      });
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesArray.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    connectParticles();
    handleMouseInteraction();
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Recreate particles on resize
  window.addEventListener('resize', () => {
    particlesArray.length = 0;
    const newNumberOfParticles = window.innerWidth < 768 ? 50 : 100;
    
    for (let i = 0; i < newNumberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  });
}
