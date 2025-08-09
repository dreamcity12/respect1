let currentQuestionIndex = 0;
let questions = [];
let score = {1: 0, 2: 0};

async function loadQuestions() {
  const response = await fetch('questions.json');
  questions = await response.json();
  if(questions.length === 0){
    document.getElementById('quiz-container').innerHTML = "<h3>لا توجد أسئلة حالياً. يرجى إضافة أسئلة في ملف questions.json</h3>";
    return;
  }
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    document.getElementById('quiz-container').innerHTML = "<h3>انتهت الأسئلة! شكرًا للعب.</h3>";
    return;
  }
  document.getElementById('result').textContent = "";
  document.getElementById('correct-answer').value = "";
  const question = questions[currentQuestionIndex].question;
  document.getElementById('question-text').textContent = `السؤال ${currentQuestionIndex + 1}: ${question}`;
}

function awardPoint(team) {
  const correctAnswer = document.getElementById('correct-answer').value.trim();
  if (!correctAnswer) {
    alert("يرجى إدخال الإجابة الصحيحة قبل تحديد الفريق.");
    return;
  }

  if (team === 1 || team === 2) {
    score[team]++;
    document.getElementById('result').textContent = `تم منح نقطة للفريق ${team} على الإجابة الصحيحة: "${correctAnswer}"`;
  } else {
    document.getElementById('result').textContent = `لم يتم منح نقاط، ولا واحد جاوب صح. الإجابة الصحيحة: "${correctAnswer}"`;
  }

  document.getElementById('score1').textContent = score[1];
  document.getElementById('score2').textContent = score[2];

  currentQuestionIndex++;
  setTimeout(showQuestion, 3000);
}

loadQuestions();
