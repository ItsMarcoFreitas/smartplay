// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }

    lastScrollY = currentScrollY;
  });

  // Hero section - clean design without animations

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".feature-card, .plan-card, .testimonial-card",
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    observer.observe(el);
  });

  // WhatsApp button functionality
  const whatsappButtons = document
    .querySelectorAll(".fa-whatsapp")
    .forEach((icon) => {
      if (
        icon.parentElement.tagName === "BUTTON" ||
        icon.parentElement.tagName === "A"
      ) {
        icon.parentElement.addEventListener("click", function (e) {
          e.preventDefault();
          const message = encodeURIComponent(
            "Olá! Tenho interesse no SmartPlay. Poderia me dar mais informações?",
          );
          window.open(`https://wa.me/555192387622?text=${message}`, "_blank");
        });
      }
    });

  // Comprar Agora buttons redirect to WhatsApp
  const comprarButtons = document.querySelectorAll(".cta-button, .btn-primary");
  comprarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const message = encodeURIComponent(
        "Olá! Tenho interesse no SmartPlay TV BOX.",
      );
      window.open(`https://wa.me/555192387622?text=${message}`, "_blank");
    });
  });

  // Demo video functionality
  const demoButtons = document.querySelectorAll(".btn-secondary");
  demoButtons.forEach((button) => {
    if (button.textContent.includes("Demonstração")) {
      button.addEventListener("click", function () {
        const message = encodeURIComponent(
          "Olá! Tenho interesse no SmartPlay TV BOX. Poderia me dar mais informações?",
        );
        window.open(`https://wa.me/555192387622?text=${message}`, "_blank");
        showDemoModal();
      });
    }
  });

  // Form validation (if contact form exists)
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      validateAndSubmitForm(this);
    });
  }
});

// Background animations removed for clean design

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex !important;
        }
    }
`;
document.head.appendChild(style);

// Demo modal functionality
function showDemoModal() {
  const modal = document.createElement("div");
  modal.className = "demo-modal";
  modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Veja Como Funciona</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="demo-video">
                        <div class="video-placeholder">
                            <i class="fas fa-play-circle"></i>
                            <p>Vídeo demonstrativo do TV BOX Pro</p>
                        </div>
                    </div>
                    <div class="demo-features">
                        <h4>O que você verá no vídeo:</h4>
                        <ul>
                            <li>✓ Instalação fácil em 2 minutos</li>
                            <li>✓ Navegação intuitiva pela interface</li>
                            <li>✓ Qualidade de imagem 4K</li>
                            <li>✓ Acesso a milhares de canais</li>
                            <li>✓ Futebol ao vivo sem travar</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary modal-cta">Comprar Agora</button>
                </div>
            </div>
        </div>
    `;

  // Add modal styles
  const modalStyle = document.createElement("style");
  modalStyle.textContent = `
        .demo-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
        }

        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal-header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
        }

        .modal-body {
            padding: 20px;
        }

        .video-placeholder {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            height: 300px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            margin-bottom: 20px;
        }

        .video-placeholder i {
            font-size: 4rem;
            margin-bottom: 10px;
        }

        .demo-features ul {
            list-style: none;
            padding: 0;
        }

        .demo-features li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }

        .modal-footer {
            padding: 20px;
            border-top: 1px solid #eee;
            text-align: center;
        }

        .modal-cta {
            width: 100%;
        }
    `;
  document.head.appendChild(modalStyle);

  document.body.appendChild(modal);

  // Modal event listeners
  const closeBtn = modal.querySelector(".modal-close");
  const overlay = modal.querySelector(".modal-overlay");
  const ctaBtn = modal.querySelector(".modal-cta");

  function closeModal() {
    modal.remove();
    modalStyle.remove();
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });
  ctaBtn.addEventListener("click", function () {
    closeModal();
    window.scrollTo({
      top: document.querySelector("#plans").offsetTop - 100,
      behavior: "smooth",
    });
  });
}

// Form validation
function validateAndSubmitForm(form) {
  const formData = new FormData(form);
  let isValid = true;

  // Basic validation
  form
    .querySelectorAll("input[required], textarea[required]")
    .forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("error");
        isValid = false;
      } else {
        field.classList.remove("error");
      }
    });

  if (isValid) {
    // Show success message
    showNotification(
      "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      "success",
    );
    form.reset();
  } else {
    showNotification(
      "Por favor, preencha todos os campos obrigatórios.",
      "error",
    );
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  const notificationStyle = document.createElement("style");
  notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10001;
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification.success {
            background: #4CAF50;
        }
        
        .notification.error {
            background: #f44336;
        }
        
        .notification.info {
            background: #2196F3;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;

  if (!document.querySelector("#notification-styles")) {
    notificationStyle.id = "notification-styles";
    document.head.appendChild(notificationStyle);
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideInRight 0.3s ease-out reverse";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Countdown timer for special offers
function startCountdownTimer() {
  const countdownElements = document.querySelectorAll(".countdown");
  if (countdownElements.length === 0) return;

  // Set end time (24 hours from now)
  const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance < 0) {
      countdownElements.forEach((el) => (el.textContent = "Oferta encerrada"));
      return;
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    countdownElements.forEach((el) => (el.textContent = timeString));
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Performance optimization - Lazy loading images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add loading states for buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function () {
    if (!this.classList.contains("no-loading")) {
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
      }, 2000);
    }
  });
});
