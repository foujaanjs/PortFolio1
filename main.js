// Typing animation
const textArray = ["Software Engineer", "Full Stack Java Developer", "Web Developer"];
let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const typingElement = document.querySelector(".typing-text");

function typeEffect() {
  if (charIndex < textArray[textIndex].length) {
    typingElement.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, typingSpeed);
  } else {
    setTimeout(eraseEffect, 1500);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 60);
  } else {
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(typeEffect, 200);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Active link highlight
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let fromTop = window.scrollY;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section && section.offsetTop <= fromTop + 80 && section.offsetTop + section.offsetHeight > fromTop + 80) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// EmailJS Integration
(function() {
  emailjs.init("CJFLyE0mVejC2mw4K"); // Replace with your EmailJS public key if needed
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const serviceID = "service_mog78pp";
  const templateID = "template_4cjusb3";

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      alert("✅ Message sent successfully!");
      this.reset();
    }, (err) => {
      alert("❌ Failed to send message. Please try again.");
      console.error(err);
    });
});

// ===== Mobile Menu Toggle (robust) =====
document.addEventListener("DOMContentLoaded", function () {
  const mobileBtn = document.getElementById("mobile-menu");
  const navList = document.querySelector(".nav-links");

  if (mobileBtn && navList) {
    mobileBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const opened = navList.classList.toggle("open");
      // set aria-expanded
      mobileBtn.setAttribute("aria-expanded", opened ? "true" : "false");

      // toggle icon — try FontAwesome classes; if not present, toggle text fallback
      const icon = mobileBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      } else {
        // fallback: change button text
        mobileBtn.textContent = opened ? "Close" : "Menu";
      }
    });

    // Close menu when clicking outside (mobile friendly)
    document.addEventListener("click", function (e) {
      if (navList.classList.contains("open") && !navList.contains(e.target) && !mobileBtn.contains(e.target)) {
        navList.classList.remove("open");
        mobileBtn.setAttribute("aria-expanded", "false");
        const icon = mobileBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        } else {
          mobileBtn.textContent = "Menu";
        }
      }
    });

    // Close menu when a nav link is clicked (so it collapses after selection)
    const links = navList.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", function () {
        if (navList.classList.contains("open")) {
          navList.classList.remove("open");
          mobileBtn.setAttribute("aria-expanded", "false");
          const icon = mobileBtn.querySelector("i");
          if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
          } else {
            mobileBtn.textContent = "Menu";
          }
        }
      });
    });
  }
});
