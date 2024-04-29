const questions = [
    {
        question: "What is 17 x 2?",
        answers: [
            { text: "34", correct: true },
            { text: "49", correct: false },
            { text: "56", correct: false },
            { text: "69", correct: false }
        ]
    },
    {
        question: "What is 19 x 5?",
        answers: [
            { text: "195", correct: false },
            { text: "95", correct: true },
            { text: "87", correct: false },
            { text: "69", correct: false }
        ]
    },
    {
        question: "What is 33 x 2?",
        answers: [
            { text: "69", correct: false },
            { text: "35", correct: false },
            { text: "333", correct: false },
            { text: "66", correct: true }
        ]
    },
    {
        question: "What is 172 + 19?",
        answers: [
            { text: "195", correct: false },
            { text: "191", correct: true },
            { text: "87", correct: false },
            { text: "192", correct: false }
        ]
    },
    {
        question: "What is 24 + 48 + 7?",
        answers: [
            { text: "79", correct: true },
            { text: "68", correct: false },
            { text: "87", correct: false },
            { text: "24487", correct: false }
        ]  
    }
];

const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer_buttons');
const nextButton = document.getElementById('next_btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;
    answerButtonElement.innerHTML = '';  // Clear previous buttons

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => handleAnswer(answer.correct));
        answerButtonElement.appendChild(button);
    });
}

function handleAnswer(isCorrect) {
    if (isCorrect) {
        score++;
        alert('Correct!');
    } else {
        alert('Wrong Answer!');
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionElement.innerHTML = "Quiz Completed!";
    answerButtonElement.innerHTML = `Your score: ${score}/${questions.length}`;
    nextButton.style.display = 'none';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

document.addEventListener('DOMContentLoaded', startQuiz);  // Ensure the quiz starts when the document is ready
