// Mobile navigation: show or hide the menu when the button is clicked.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after selecting a section.
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Automatically show the current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

// Prepare an email from the visitor's details.
// Replace the placeholder address with a dedicated professional email
// only if you want it publicly visible.
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("visitorName").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();
  const message = document.getElementById("visitorMessage").value.trim();

  const subject = encodeURIComponent("Portfolio enquiry from " + name);
  const body = encodeURIComponent(
    "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
  );

  // Change this placeholder to the professional email you choose to publish.
  window.location.href = "mailto:your-professional-email@example.com?subject=" + subject + "&body=" + body;
});


// ---------------- PORTFOLIO CHAT ASSISTANT ----------------
// This is a rule-based demo assistant. It answers known portfolio questions.
// It does not call an AI model or send visitor data to a server.

const chatLauncher = document.getElementById("chatLauncher");
const chatWidget = document.getElementById("chatWidget");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatSuggestions = document.getElementById("chatSuggestions");

function openChat() {
  chatWidget.hidden = false;
  chatLauncher.setAttribute("aria-expanded", "true");
  chatInput.focus();
}

function closeChat() {
  chatWidget.hidden = true;
  chatLauncher.setAttribute("aria-expanded", "false");
  chatLauncher.focus();
}

chatLauncher.addEventListener("click", openChat);
chatClose.addEventListener("click", closeChat);

function addChatMessage(message, sender) {
  const bubble = document.createElement("div");
  bubble.className = "chat-message " + sender;
  bubble.textContent = message;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getPortfolioReply(question) {
  const q = question.toLowerCase();

  if (q.includes("contact") || q.includes("email") || q.includes("reach") ||
      q.includes("hire") || q.includes("connect")) {
    return "You can connect with Megasri through LinkedIn: linkedin.com/in/megasri-m-824a5834b or GitHub: github.com/megasri242-cmd. For a direct email contact, add a professional email address to the portfolio before publishing it.";
  }

  if (q.includes("project") || q.includes("work")) {
    return "Megasri's portfolio highlights three academic projects: Block Care, a blockchain-based patient consent and medical data access project; Smart Municipal Grievance & Relief System; and Data Security in MNC Companies using Obfuscation. Visit the Projects section to read the summaries.";
  }

  if (q.includes("skill") || q.includes("technology") || q.includes("program")) {
    return "The listed technical skills are Python, HTML, CSS, JavaScript and MySQL. Microsoft Office is also included in the portfolio.";
  }

  if (q.includes("certificate") || q.includes("certification") || q.includes("course")) {
    return "The portfolio includes a Python Programming certificate from HiCore Tech (2025) and a Diploma in Web Designing from MIT Computer Education, Pullambadi (March–May 2019). You can view the certificate images in the Certifications section.";
  }

  if (q.includes("education") || q.includes("college") || q.includes("degree") ||
      q.includes("study")) {
    return "Megasri completed a Master of Computer Applications at Dhanalakshmi Srinivasan Engineering College, and a Bachelor of Computer Applications at Cauvery College for Women (Autonomous), Trichy. See the Education section for the listed years and grades.";
  }

  if (q.includes("about") || q.includes("who") || q.includes("meg asri") ||
      q.includes("megasri") || q.includes("introduce")) {
    return "Megasri M is a computer applications postgraduate and web development fresher interested in building useful, responsive web experiences. Explore the About Me section for her introduction.";
  }

  if (q.includes("resume") || q.includes("cv")) {
    return "You can find the resume download link in the Certifications and Resume area of this portfolio. Please use the latest reviewed version.";
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hello! What would you like to know about Megasri? You can ask about her education, skills, projects, certificates or contact links.";
  }

  return "I can help with Megasri's education, skills, projects, certificates, resume and contact links. Try asking: “What are her skills?” or “How can I contact Megasri?”";
}

function sendChatQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  addChatMessage(cleanQuestion, "visitor");
  const reply = getPortfolioReply(cleanQuestion);
  window.setTimeout(() => addChatMessage(reply, "assistant"), 250);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendChatQuestion(chatInput.value);
  chatInput.value = "";
});

chatSuggestions.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-question]");
  if (button) sendChatQuestion(button.dataset.question);
});


// Show or hide each certificate image only when its button is clicked.
document.querySelectorAll(".certificate-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const imageId = button.getAttribute("aria-controls");
    const certificateImage = document.getElementById(imageId);
    const isCurrentlyHidden = certificateImage.hidden;

    certificateImage.hidden = !isCurrentlyHidden;
    button.setAttribute("aria-expanded", String(isCurrentlyHidden));
    button.textContent = isCurrentlyHidden ? "Hide Certificate" : "View Certificate";
  });
});
