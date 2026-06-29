let menu = document.querySelector('#menu-btn');
let header = document.querySelector('.header');
let toggle = document.querySelector('#theme-toggle');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  header.classList.toggle('active');
  document.body.classList.toggle('active');
};

toggle.onclick = () => {
  document.body.classList.toggle('dark-mode');
  toggle.classList.toggle('fa-moon');
  toggle.classList.toggle('fa-sun');
};

// Scroll Highlight & Floating Header Effect
window.onscroll = () => {
  if (window.innerWidth < 991) {
    menu.classList.remove('fa-times');
    header.classList.remove('active');
    document.body.classList.remove('active');
  }

  // Floating Header
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  document.querySelectorAll('section').forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      document.querySelectorAll('.header .navbar a').forEach(links => {
        links.classList.remove('active');
        let activeLink = document.querySelector('.header .navbar a[href*=' + id + ']');
        if (activeLink) activeLink.classList.add('active');
      });
    }
  });
};

// Typing effect
const typedSpan = document.querySelector('.typing');
const texts = ["Computer Science Student", "AI/ML Projects", "Cybersecurity Enthusiast"];
let i = 0, j = 0, currentText = '', isDeleting = false;

function type() {
  if (i < texts.length) {
    if (!isDeleting && j <= texts[i].length) {
      currentText = texts[i].slice(0, ++j);
    } else if (isDeleting && j > 0) {
      currentText = texts[i].slice(0, --j);
    }

    if (typedSpan) typedSpan.textContent = currentText;

    if (!isDeleting && j === texts[i].length) {
      isDeleting = true;
      setTimeout(type, 1500);
      return;
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % texts.length;
    }

    setTimeout(type, isDeleting ? 40 : 100);
  }
}
if (typedSpan) type();

// Cursor Spotlight Effect
const glow = document.querySelector('.cursor-glow');
if (glow) {
  document.addEventListener('mousemove', (e) => {
    // We use clientX/Y if position is fixed, pageX/Y if position is absolute.
    // Assuming fixed position for the glow to cover viewport.
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// Initialize Vanilla-Tilt for Cards
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll(".skill-box, .box, .exp-card, .project-box, .cert-img"), {
    max: 12,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.02
  });
}

// Preloader Logic
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 1800); // Wait for typing animation to complete
  }
});

// Terminal Logic
const termInput = document.getElementById('term-input');
const termBody = document.getElementById('terminal-body');

if (termInput && termBody) {
  termInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const command = this.value.trim().toLowerCase();
      this.value = '';

      let response = '';
      switch (command) {
        case 'help':
          response = 'Available commands: whoami, skills, clear, sudo, repo';
          break;
        case 'whoami':
          response = 'Kshitij Rana - Full Stack Web Developer & Cybersecurity Enthusiast.';
          break;
        case 'skills':
          response = 'HTML, CSS, JS, PHP, MySQL, Cybersecurity, C/C++, Java';
          break;
        case 'repo':
          response = 'You can find my work at github.com/Kshitij1917';
          break;
        case 'clear':
          const previousLines = termBody.querySelectorAll('.term-output-line, p');
          previousLines.forEach(line => line.remove());
          return;
        case 'sudo':
          response = 'Nice try. This incident will be reported.';
          break;
        case '':
          return;
        default:
          response = `Command not found: ${command}. Type 'help' for available commands.`;
      }

      const newLine = document.createElement('div');
      newLine.className = 'term-output-line';
      newLine.innerHTML = `<span class="term-prompt">kshitij@portfolio:~$</span> ${command}<br><span style="color:#94a3b8; margin-bottom:10px; display:inline-block">${response}</span>`;
      termBody.insertBefore(newLine, termInput.parentElement);

      termBody.scrollTop = termBody.scrollHeight;
    }
  });

  const termContainer = document.querySelector('.terminal-container');
  if (termContainer) {
    termContainer.addEventListener('click', () => {
      termInput.focus();
    });
  }
}

// Toast Notification Logic for Contact Form
const contactForm = document.getElementById('contact-form');
const toastContainer = document.getElementById('toast-container');

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch(this.action, {
      method: 'POST',
      body: formData
    })
      .then(() => {
        showToast('Message sent successfully!');
        this.reset();
      })
      .catch(() => {
        showToast('Error sending message. Please try again.');
      });
  });
}
