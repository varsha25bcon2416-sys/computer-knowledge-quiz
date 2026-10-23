/**
 * Computer Knowledge Quiz - Assignment 10
 * Interactive Quiz Application Script
 */

// 1. Question Bank (10 Multiple Choice Questions with 4 Options Each)
const quizQuestions = [
  {
    category: "Hardware & Architecture",
    question: "What does the abbreviation 'CPU' stand for in computer systems?",
    options: [
      "Central Process Unit",
      "Central Processing Unit",
      "Computer Personal Unit",
      "Control Processing Unit"
    ],
    correctIndex: 1,
    explanation: "CPU stands for Central Processing Unit. It is the primary component of a computer that interprets and executes instructions."
  },
  {
    category: "Memory & Storage",
    question: "Which type of computer memory is volatile and loses all stored data when the power is turned off?",
    options: [
      "ROM (Read-Only Memory)",
      "SSD (Solid State Drive)",
      "RAM (Random Access Memory)",
      "Flash BIOS Memory"
    ],
    correctIndex: 2,
    explanation: "RAM (Random Access Memory) is volatile working memory; its contents vanish as soon as electrical power is disconnected."
  },
  {
    category: "System Software",
    question: "What is the primary role of an Operating System (such as Windows, macOS, or Linux)?",
    options: [
      "To compile high-level programming code directly into electricity",
      "To manage computer hardware resources and provide an interface for applications",
      "To manufacture silicon microchips on the motherboard",
      "To prevent physical dust accumulation on internal components"
    ],
    correctIndex: 1,
    explanation: "An Operating System coordinates the computer's processor, memory, storage devices, and peripherals while providing an environment to run user applications."
  },
  {
    category: "Computer Networking",
    question: "In computer networking and the Internet, what does 'IP' stand for in 'IP Address'?",
    options: [
      "Internet Protocol",
      "Internal Program",
      "Internet Provider",
      "Interface Port"
    ],
    correctIndex: 0,
    explanation: "IP stands for Internet Protocol. An IP address is a unique identifier assigned to every device participating in a computer network."
  },
  {
    category: "Data Representation",
    question: "How many Megabytes (MB) are equivalent to 1 Gigabyte (GB) in standard binary computing?",
    options: [
      "100 MB",
      "512 MB",
      "1,024 MB",
      "2,048 MB"
    ],
    correctIndex: 2,
    explanation: "In binary computing systems (powers of 2), 1 Gigabyte is equal to 1,024 Megabytes (2^10 MB)."
  },
  {
    category: "Web & Security",
    question: "Which protocol encrypts data transmission to provide secure communication over the World Wide Web?",
    options: [
      "FTP (File Transfer Protocol)",
      "HTTP (Hypertext Transfer Protocol)",
      "HTTPS (Hypertext Transfer Protocol Secure)",
      "SMTP (Simple Mail Transfer Protocol)"
    ],
    correctIndex: 2,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) employs TLS/SSL encryption to protect data confidentiality between client browsers and servers."
  },
  {
    category: "Web Development",
    question: "What does the abbreviation 'HTML' stand for in web technologies?",
    options: [
      "HyperText Markup Language",
      "High Transfer Machine Language",
      "Hyperlink Text Management Logic",
      "Home Tool Markup Language"
    ],
    correctIndex: 0,
    explanation: "HTML stands for HyperText Markup Language, which forms the standard foundation and structural markup for documents rendered in web browsers."
  },
  {
    category: "Computer Fundamentals",
    question: "Which two digits make up the base numbering system used natively by digital computer circuits?",
    options: [
      "0 and 9",
      "0 and 1",
      "1 and 2",
      "1 and 10"
    ],
    correctIndex: 1,
    explanation: "Digital computers utilize the binary numeral system (base 2), which uses 0 and 1 to represent the off and on electrical states of microscopic transistors."
  },
  {
    category: "Open Source Software",
    question: "Which widely used operating system kernel is famous for being free, open-source, and collaboratively developed globally?",
    options: [
      "Windows NT",
      "macOS Darwin",
      "Linux",
      "MS-DOS"
    ],
    correctIndex: 2,
    explanation: "Linux, created by Linus Torvalds in 1991, is the world's most famous open-source operating system kernel, powering servers, supercomputers, and Android."
  },
  {
    category: "Cybersecurity",
    question: "What cybersecurity attack involves masquerading as a trustworthy entity to trick users into revealing sensitive credentials?",
    options: [
      "Overclocking",
      "Phishing",
      "Defragmentation",
      "Packet Sniffing"
    ],
    correctIndex: 1,
    explanation: "Phishing is a social engineering attack where malicious actors deceive victims into handing over login credentials, credit cards, or personal data."
  }
];

// 2. Application State
const totalQuestions = quizQuestions.length;
let currentQuestionIndex = 0;
let userAnswers = new Array(totalQuestions).fill(null); // stores selected optionIndex (0-3) or null

// 3. DOM Elements
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const nextBtnText = document.getElementById("next-btn-text");
const restartBtn = document.getElementById("restart-btn");
const toggleReviewBtn = document.getElementById("toggle-review-btn");
const reviewBtnText = document.getElementById("review-btn-text");
const reviewSection = document.getElementById("review-section");
const reviewList = document.getElementById("review-list");

const currentQNum = document.getElementById("current-q-num");
const totalQNum = document.getElementById("total-q-num");
const answeredCounter = document.getElementById("answered-counter");
const progressFill = document.getElementById("progress-fill");
const questionNavigator = document.getElementById("question-navigator");

const questionCategory = document.getElementById("question-category");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const selectionStatus = document.getElementById("selection-status");

// Results Elements
const trophyBadge = document.getElementById("trophy-badge");
const resultHeadline = document.getElementById("result-headline");
const resultFeedback = document.getElementById("result-feedback");
const finalScore = document.getElementById("final-score");
const scoreFillRing = document.getElementById("score-fill-ring");
const scorePercentage = document.getElementById("score-percentage");
const gradeBadge = document.getElementById("grade-badge");
const correctCountEl = document.getElementById("correct-count");
const incorrectCountEl = document.getElementById("incorrect-count");
const unansweredCountEl = document.getElementById("unanswered-count");
const accuracyRateEl = document.getElementById("accuracy-rate");

// 4. Initialization
function initApp() {
  totalQNum.textContent = totalQuestions;
  buildNavigatorDots();

  // Event Listeners
  startBtn.addEventListener("click", startQuiz);
  prevBtn.addEventListener("click", handlePrevious);
  nextBtn.addEventListener("click", handleNextOrSubmit);
  restartBtn.addEventListener("click", restartQuiz);
  toggleReviewBtn.addEventListener("click", toggleReview);

  // Keyboard Navigation: Arrow Left / Arrow Right / 1-4 for options
  window.addEventListener("keydown", handleKeyNavigation);
}

// Build 1 to 10 question pills
function buildNavigatorDots() {
  questionNavigator.innerHTML = "";
  for (let i = 0; i < totalQuestions; i++) {
    const dot = document.createElement("button");
    dot.className = "nav-dot";
    dot.textContent = i + 1;
    dot.setAttribute("aria-label", `Jump to question ${i + 1}`);
    dot.title = `Question ${i + 1}`;
    dot.addEventListener("click", () => {
      goToQuestion(i);
    });
    questionNavigator.appendChild(dot);
  }
}

// Start Quiz Handler
function startQuiz() {
  welcomeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  quizScreen.classList.add("fade-in");
  goToQuestion(0);
}

// Render Question at index
function goToQuestion(index) {
  if (index < 0 || index >= totalQuestions) return;
  currentQuestionIndex = index;

  const q = quizQuestions[currentQuestionIndex];

  // Update header text and categories
  currentQNum.textContent = currentQuestionIndex + 1;
  questionCategory.textContent = q.category;
  questionText.textContent = `${currentQuestionIndex + 1}. ${q.question}`;

  // Render 4 options
  renderOptions(q);

  // Update Progress Bar
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressFill.style.width = `${progressPercent}%`;

  // Update Previous / Next Buttons
  updateNavButtons();

  // Update Navigator Dots state
  updateNavigatorDots();

  // Update answered count
  updateAnsweredCounter();

  // Update helper selection note
  updateSelectionStatus();
}

// Render the 4 Option Cards
function renderOptions(q) {
  optionsContainer.innerHTML = "";
  const letters = ["A", "B", "C", "D"];

  q.options.forEach((optText, optIdx) => {
    const isSelected = userAnswers[currentQuestionIndex] === optIdx;

    const optButton = document.createElement("button");
    optButton.type = "button";
    optButton.className = `option-card ${isSelected ? "selected" : ""}`;
    optButton.setAttribute("role", "radio");
    optButton.setAttribute("aria-checked", isSelected ? "true" : "false");

    optButton.innerHTML = `
      <div class="option-letter">${letters[optIdx]}</div>
      <div class="option-text">${escapeHtml(optText)}</div>
      <div class="option-check"></div>
    `;

    optButton.addEventListener("click", () => {
      selectOption(optIdx);
    });

    optionsContainer.appendChild(optButton);
  });
}

// Select an option
function selectOption(optionIndex) {
  userAnswers[currentQuestionIndex] = optionIndex;

  // Refresh visual selection in options
  const optionCards = optionsContainer.querySelectorAll(".option-card");
  optionCards.forEach((card, idx) => {
    if (idx === optionIndex) {
      card.classList.add("selected");
      card.setAttribute("aria-checked", "true");
    } else {
      card.classList.remove("selected");
      card.setAttribute("aria-checked", "false");
    }
  });

  updateNavigatorDots();
  updateAnsweredCounter();
  updateSelectionStatus();
}

// Update Navigator Dots
function updateNavigatorDots() {
  const dots = questionNavigator.querySelectorAll(".nav-dot");
  dots.forEach((dot, idx) => {
    dot.classList.remove("current", "answered");

    if (userAnswers[idx] !== null) {
      dot.classList.add("answered");
    }
    if (idx === currentQuestionIndex) {
      dot.classList.add("current");
    }
  });
}

// Update Answered Counter
function updateAnsweredCounter() {
  const answeredCount = userAnswers.filter(ans => ans !== null).length;
  answeredCounter.textContent = `${answeredCount} / ${totalQuestions} Answered`;
}

// Update selection status indicator
function updateSelectionStatus() {
  if (userAnswers[currentQuestionIndex] !== null) {
    const letters = ["A", "B", "C", "D"];
    const chosen = letters[userAnswers[currentQuestionIndex]];
    selectionStatus.textContent = `Selected: Option ${chosen}`;
    selectionStatus.classList.add("ready");
  } else {
    selectionStatus.textContent = "Select an option to record your answer";
    selectionStatus.classList.remove("ready");
  }
}

// Update Previous & Next Buttons
function updateNavButtons() {
  // Previous button disabled on Q1
  prevBtn.disabled = currentQuestionIndex === 0;

  // Next Button becomes "Submit Quiz" on last question
  if (currentQuestionIndex === totalQuestions - 1) {
    nextBtnText.textContent = "Submit Quiz";
    nextBtn.classList.add("btn-glow");
  } else {
    nextBtnText.textContent = "Next";
    nextBtn.classList.remove("btn-glow");
  }
}

// Previous Button Action
function handlePrevious() {
  if (currentQuestionIndex > 0) {
    goToQuestion(currentQuestionIndex - 1);
  }
}

// Next / Submit Button Action
function handleNextOrSubmit() {
  if (currentQuestionIndex < totalQuestions - 1) {
    goToQuestion(currentQuestionIndex + 1);
  } else {
    // Last question - submit flow
    const unansweredCount = userAnswers.filter(ans => ans === null).length;
    if (unansweredCount > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unansweredCount} unanswered question${unansweredCount > 1 ? "s" : ""}.\n\nDo you want to submit your quiz and view your results anyway?`
      );
      if (!confirmSubmit) {
        // Find first unanswered question and jump there
        const firstUnanswered = userAnswers.findIndex(ans => ans === null);
        if (firstUnanswered !== -1) {
          goToQuestion(firstUnanswered);
        }
        return;
      }
    }
    showResults();
  }
}

// Results Calculation & Display
function showResults() {
  quizScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");
  resultsScreen.classList.add("fade-in");

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  quizQuestions.forEach((q, idx) => {
    const userChoice = userAnswers[idx];
    if (userChoice === null) {
      unansweredCount++;
    } else if (userChoice === q.correctIndex) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const accuracy = (totalQuestions - unansweredCount) > 0 
    ? Math.round((correctCount / (totalQuestions - unansweredCount)) * 100) 
    : 0;

  // Update Stat values
  finalScore.textContent = correctCount;
  scorePercentage.textContent = `${percentage}%`;
  correctCountEl.textContent = correctCount;
  incorrectCountEl.textContent = incorrectCount;
  unansweredCountEl.textContent = unansweredCount;
  accuracyRateEl.textContent = `${accuracy}%`;

  // Calculate SVG ring stroke offset
  // Circumference = 2 * PI * 50 = ~314.16
  const circumference = 2 * Math.PI * 50;
  const strokeOffset = circumference - (percentage / 100) * circumference;
  setTimeout(() => {
    scoreFillRing.style.strokeDashoffset = strokeOffset;
  }, 100);

  // Performance Evaluation & Badges
  if (percentage >= 90) {
    trophyBadge.textContent = "🏆";
    resultHeadline.textContent = "Outstanding Performance!";
    resultFeedback.textContent = "Master level! You have demonstrated exceptional computer science knowledge.";
    gradeBadge.textContent = "Grade: A+ (Mastery)";
    gradeBadge.style.borderColor = "#10b981";
    gradeBadge.style.color = "#34d399";
  } else if (percentage >= 80) {
    trophyBadge.textContent = "🌟";
    resultHeadline.textContent = "Excellent Work!";
    resultFeedback.textContent = "Great job! You have a solid grasp of core computing concepts.";
    gradeBadge.textContent = "Grade: A (Distinction)";
    gradeBadge.style.borderColor = "#e5b842";
    gradeBadge.style.color = "#f7d77b";
  } else if (percentage >= 70) {
    trophyBadge.textContent = "👍";
    resultHeadline.textContent = "Good Effort!";
    resultFeedback.textContent = "Well done! You answered most computer questions correctly.";
    gradeBadge.textContent = "Grade: B (Proficient)";
    gradeBadge.style.borderColor = "#3b82f6";
    gradeBadge.style.color = "#93c5fd";
  } else if (percentage >= 50) {
    trophyBadge.textContent = "📚";
    resultHeadline.textContent = "Quiz Completed!";
    resultFeedback.textContent = "Fair attempt! Review the detailed answers below to solidify your understanding.";
    gradeBadge.textContent = "Grade: C (Passing)";
    gradeBadge.style.borderColor = "#f59e0b";
    gradeBadge.style.color = "#fcd34d";
  } else {
    trophyBadge.textContent = "💡";
    resultHeadline.textContent = "Keep Learning!";
    resultFeedback.textContent = "A great starting point! Review the concepts and try taking the quiz again.";
    gradeBadge.textContent = "Grade: Needs Review";
    gradeBadge.style.borderColor = "#f43f5e";
    gradeBadge.style.color = "#fda4af";
  }

  // Pre-generate Review List
  renderReviewList();
}

// Render Review Section
function renderReviewList() {
  reviewList.innerHTML = "";
  const letters = ["A", "B", "C", "D"];

  quizQuestions.forEach((q, idx) => {
    const userChoice = userAnswers[idx];
    const isCorrect = userChoice === q.correctIndex;
    const isUnanswered = userChoice === null;

    const card = document.createElement("div");
    card.className = `review-card ${isCorrect ? "correct" : isUnanswered ? "unanswered" : "incorrect"}`;

    let statusBadgeHtml = "";
    if (isCorrect) {
      statusBadgeHtml = `<span class="review-badge correct">Correct (+1)</span>`;
    } else if (isUnanswered) {
      statusBadgeHtml = `<span class="review-badge unanswered">Skipped</span>`;
    } else {
      statusBadgeHtml = `<span class="review-badge incorrect">Incorrect</span>`;
    }

    const userChoiceText = isUnanswered 
      ? "No answer chosen" 
      : `Option ${letters[userChoice]}: ${escapeHtml(q.options[userChoice])}`;
    
    const correctSolText = `Option ${letters[q.correctIndex]}: ${escapeHtml(q.options[q.correctIndex])}`;

    card.innerHTML = `
      <div class="review-q-head">
        <span class="review-q-title">${idx + 1}. ${escapeHtml(q.question)}</span>
        ${statusBadgeHtml}
      </div>

      <div class="review-answers-box">
        <div class="review-row">
          <span class="review-row-label">Your Answer:</span>
          <span class="review-row-val ${isCorrect ? "user-choice-correct" : isUnanswered ? "" : "user-choice-wrong"}">
            ${userChoiceText}
          </span>
        </div>
        <div class="review-row">
          <span class="review-row-label">Correct Solution:</span>
          <span class="review-row-val correct-sol">
            ${correctSolText}
          </span>
        </div>
      </div>

      <p class="review-explanation"><strong>Concept:</strong> ${escapeHtml(q.explanation)}</p>
    `;

    reviewList.appendChild(card);
  });
}

// Toggle Review Accordion
function toggleReview() {
  const isHidden = reviewSection.classList.contains("hidden");
  if (isHidden) {
    reviewSection.classList.remove("hidden");
    reviewSection.classList.add("fade-in");
    reviewBtnText.textContent = "Hide Detailed Review";
    reviewSection.scrollIntoView({ behavior: "smooth" });
  } else {
    reviewSection.classList.add("hidden");
    reviewBtnText.textContent = "View Detailed Review";
  }
}

// Restart Quiz
function restartQuiz() {
  userAnswers.fill(null);
  currentQuestionIndex = 0;

  // Reset UI
  reviewSection.classList.add("hidden");
  reviewBtnText.textContent = "View Detailed Review";
  scoreFillRing.style.strokeDashoffset = "314";

  resultsScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  quizScreen.classList.add("fade-in");

  goToQuestion(0);
}

// Keyboard shortcuts for convenience
function handleKeyNavigation(e) {
  // Only handle keys if quiz screen is active
  if (quizScreen.classList.contains("hidden")) return;

  // Option selection with keys 1, 2, 3, 4
  if (["1", "2", "3", "4"].includes(e.key)) {
    const optIdx = parseInt(e.key, 10) - 1;
    selectOption(optIdx);
  } else if (e.key === "ArrowRight") {
    handleNextOrSubmit();
  } else if (e.key === "ArrowLeft") {
    handlePrevious();
  }
}

// Utility: HTML Escaper
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Run on page load
document.addEventListener("DOMContentLoaded", initApp);
