const data = [
  { word: 'Formula', prompt: 'The chemical ___ for water is H2O.', answer: 'Formula', hint: 'A mathematical rule or chemical symbols.' },
  { word: 'Sample', prompt: 'The lab tested a soil ___ for pollution.', answer: 'Sample', hint: 'A small part representing the whole.' },
  { word: 'To advance', prompt: 'Technology ___ rapidly in the 21st century.', answer: 'To advance', hint: 'To move forward or improve.' },
  { word: 'Practice', prompt: 'In ___, this method works well.', answer: 'Practice', hint: 'The actual application of an idea (vs. theory).' },
  { word: 'Method', prompt: 'The scientific ___ involves observation and experimentation.', answer: 'Method', hint: 'A systematic way of doing something.' },
  { word: 'Theory', prompt: 'Darwin’s ___ of evolution changed biology.', answer: 'Theory', hint: 'A well-substantiated explanation of phenomena.' },
  { word: 'Scientifically', prompt: 'The theory was ___ proven.', answer: 'Scientifically', hint: 'In a way related to science.' },
  { word: 'Matter', prompt: 'Scientists study the properties of ___.', answer: 'Matter', hint: 'Anything that has mass and takes up space.' },
  { word: 'To measure', prompt: '___ the liquid carefully before mixing.', answer: 'To measure', hint: 'To determine size, amount, or degree.' },
  { word: 'Phenomenon', prompt: 'Lightning is a natural ___.', answer: 'Phenomenon', hint: 'An observable event or fact.' }
];

let current = 0;
let score   = 0;

const container = document.querySelector('.card-container');

/* ---------- RENDER CARD ---------- */
function renderCard(idx) {
  const { prompt, hint } = data[idx];

  container.innerHTML = `
    <div class="card">
      <h2>${idx + 1}/${data.length}</h2>
      <p>${prompt}</p>

      <div class="input-wrap">
        <input type="text" id="answerInput" placeholder="Type your answer" />
        <span class="qmark" data-tip="${hint}">?</span>
      </div>

      <div class="button-row">
        <button id="submitBtn" class="btn">Submit</button>
        <button id="nextBtn" class="btn next">→</button>
      </div>

      <p class="feedback" id="feedback"></p>
    </div>`;

  // focus removed to prevent page jump
  // document.getElementById('answerInput').focus();

  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextCard);

  // Mobile tooltip toggle
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    const qmark = document.querySelector('.qmark');
    qmark.addEventListener('click', e => {
      document.querySelectorAll('.qmark').forEach(t => {
        if (t !== e.target) t.classList.remove('active');
      });
      qmark.classList.toggle('active');
    });
  }
}

/* ---------- CHECK ---------- */
function checkAnswer() {
  const inp = document.getElementById('answerInput');
  const fb  = document.getElementById('feedback');
  if (!inp) return;

  const user    = inp.value.trim().toLowerCase();
  const correct = data[current].answer.toLowerCase();

  fb.textContent = user === correct ? '✓ Correct!' : `✗ ${correct}`;
  fb.className   = 'feedback ' + (user === correct ? 'correct' : 'incorrect');
  if (user === correct) score++;

  document.getElementById('nextBtn').classList.add('show');
}

/* ---------- RESULT ---------- */
function showResult() {
  const msg =
    score <= 5 ? '😅 Try again!' :
    score <= 7 ? '👍 Not bad — you can do better!' :
    score <= 9 ? '✅ Well done!' :
                 '🌟 You\'re a pro!';

  container.innerHTML = `
    <div class="card result-card">
      <img src="mascot-result-unscreen.gif" alt="Mascot" class="mascot-gif" />
      <h2>${msg}</h2>
      <p>You got&nbsp;<strong>${score}</strong>&nbsp;out of&nbsp;<strong>${data.length}</strong>&nbsp;correct.</p>
      <button id="restartBtn" class="btn">🔁 Try Again</button>
    </div>`;

  document.getElementById('restartBtn').addEventListener('click', () => {
    current = 0;
    score   = 0;
    renderCard(current);
  });
}

/* ---------- NEXT ---------- */
function nextCard() {
  current++;
  current < data.length ? renderCard(current) : showResult();
}

/* ---------- ENTER KEY ---------- */
container.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkAnswer();
});

/* ---------- INIT ---------- */
renderCard(current);












