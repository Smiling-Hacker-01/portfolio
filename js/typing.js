// Typing Animation Effect

class TypeWriter {
  constructor(element, words, wait = 3000) {
    this.element = element;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = `<span class="typed-text">${this.txt}</span><span class="typed-cursor">|</span>`;

    let typeSpeed = 150;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.getElementById('typing-text');
  
  if (typingElement) {
    const words = [
      'Full Stack Developer',
      'Backend Developer (Java)',
      'Backend Developer (Node.js)',
      'AI & Mobile App Enthusiast',
      'Problem Solver'
    ];
    
    new TypeWriter(typingElement, words, 2000);
  }
});
