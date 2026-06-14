const easyBtn = document.querySelector('.easy');
const mediumBtn = document.querySelector('.medium');
const hardBtn = document.querySelector('.hard');

const levels = document.querySelector('.levels');
const questionBlock = document.querySelector('.question');

const questionText = document.querySelector('.q');
const answersContainer = document.querySelector('.answers');

const recordSpan = document.querySelector('.r');
const scoreSpan = document.querySelector('.s');
const progress = document.querySelector('.progress');
const timerElement = document.querySelector('.timer');
const questioneasy = [
{
    question: "Як правильно: їхати чи їздити?",
    answers: ["їхати", "їздити", "обидва варіанти"],
    correct: 2
},
{
    question: "Скільки букв в українському алфавіті?",
    answers: ["31", "32", "33", "34"],
    correct: 2
},
{
    question: "Яке слово написано правильно?",
    answers: ["будьласка", "будь ласка", "будь-ласка", "будласка"],
    correct: 1
},
{
    question: "Яка буква є тільки в українській абетці?",
    answers: ["е", "є", "а", "о"],
    correct: 1
},
{
    question: "Оберіть іменник:",
    answers: ["бігти", "гарний", "книга", "швидко"],
    correct: 2
},
{
    question: "Яка столиця України?",
    answers: ["Львів", "Харків", "Київ", "Одеса"],
    correct: 2
},
{
    question: "Скільки голосних букв в українській мові?",
    answers: ["6", "8", "10", "12"],
    correct: 0
},
{
    question: "Оберіть дієслово:",
    answers: ["стіл", "гарний", "читати", "швидко"],
    correct: 2
}
];
const questionmedium = [
{
    question: "У якому рядку всі слова написані правильно?",
    answers: [
        "будь ласка, пів яблука",
        "будь-ласка, півяблука",
        "будь ласка, пів-яблука",
        "будьласка, пів яблука"
    ],
    correct: 0
},
{
    question: "Яка частина мови відповідає на питання 'який?'",
    answers: ["Іменник", "Прикметник", "Дієслово", "Прислівник"],
    correct: 1
},
{
    question: "Оберіть слово з апострофом:",
    answers: ["буряк", "піря", "м'ята", "свято"],
    correct: 2
},
{
    question: "Яке слово є антонімом до слова 'високий'?",
    answers: ["великий", "широкий", "низький", "довгий"],
    correct: 2
},
{
    question: "У якому слові наголос падає на другий склад?",
    answers: ["завдання", "олівець", "черговий", "каталог"],
    correct: 1
},
{
    question: "Яке слово є синонімом до слова 'сміливий'?",
    answers: ["хоробрий", "тихий", "сумний", "лінивий"],
    correct: 0
},
{
    question: "Оберіть прислівник:",
    answers: ["гарний", "бігти", "швидко", "учень"],
    correct: 2
},
{
    question: "У якому слові є префікс?",
    answers: ["переписати", "стіл", "ніч", "ручка"],
    correct: 0
}
];
const questionhard = [
{
    question: "У якому рядку всі слова є прислівниками?",
    answers: [
        "швидко, голосно, вгорі",
        "швидкий, голосно, вгорі",
        "швидко, голосний, вгорі",
        "швидко, голосно, гора"
    ],
    correct: 0
},
{
    question: "Яке речення є складним?",
    answers: [
        "Сонце світить яскраво.",
        "Діти гралися на подвір'ї.",
        "Зійшло сонце, і птахи заспівали.",
        "На небі пливли хмари."
    ],
    correct: 2
},
{
    question: "У якому слові відбувається подвоєння літер?",
    answers: ["листя", "знання", "пір'я", "буряк"],
    correct: 1
},
{
    question: "Який відмінок відповідає на питання 'ким? чим?'",
    answers: ["Родовий", "Знахідний", "Орудний", "Місцевий"],
    correct: 2
},
{
    question: "Як правильно написати прислівник?",
    answers: [
        "по українськи",
        "по-українськи",
        "поукраїнськи",
        "по українському"
    ],
    correct: 1
},
{
    question: "Яке слово є дієприслівником?",
    answers: ["читаючи", "читач", "читання", "читаний"],
    correct: 0
},
{
    question: "Яке речення є безособовим?",
    answers: [
        "Я читаю книгу.",
        "Надворі сутеніє.",
        "Учні працюють.",
        "Вітер шумить."
    ],
    correct: 1
},
{
    question: "Укажіть складнопідрядне речення:",
    answers: [
        "Сонце зійшло, і стало тепло.",
        "Коли зійшло сонце, стало тепло.",
        "Сонце зійшло над лісом.",
        "Стало тепло надворі."
    ],
    correct: 1
}
];
let currentQuestions = [];
let questionIndex = 0;
let score = 0;
let answered = false;

let timer;
let timeLeft = 15;

let record = localStorage.getItem('record') || 0;
recordSpan.textContent = record;

questionBlock.style.display = 'none';

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

easyBtn.addEventListener('click', () => startQuiz(questioneasy));
mediumBtn.addEventListener('click', () => startQuiz(questionmedium));
hardBtn.addEventListener('click', () => startQuiz(questionhard));

function startQuiz(questions) {

    currentQuestions = shuffle(questions);

    questionIndex = 0;
    score = 0;

    scoreSpan.textContent = 0;

    levels.style.display = 'none';
    questionBlock.style.display = 'block';

    showQuestion();
}

function startTimer() {

    clearInterval(timer);

    timeLeft = 15;
    timerElement.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            answered = true;

            setTimeout(() => {
                nextQuestion();
            }, 500);
        }

    }, 1000);
}

function showQuestion() {

    answered = false;

    const question = currentQuestions[questionIndex];

    progress.textContent =
        `Питання ${questionIndex + 1} із ${currentQuestions.length}`;

    questionText.textContent = question.question;

    answersContainer.innerHTML = '';

    const shuffledAnswers = question.answers.map((answer, index) => ({
        text: answer,
        correct: index === question.correct
    }));

    shuffle(shuffledAnswers).forEach(answer => {

        const btn = document.createElement('button');

        btn.textContent = answer.text;
        btn.classList.add('answer-btn');

        btn.addEventListener('click', () => {

            if (answered) return;

            answered = true;

            clearInterval(timer);

            const buttons =
                document.querySelectorAll('.answer-btn');

            buttons.forEach(button => {

                button.disabled = true;

                if (button.textContent === getCorrectAnswer(question)) {
                    button.style.background = "green";
                    button.style.color = "white";
                }

            });

            if (answer.correct) {

                score++;
                scoreSpan.textContent = score;

            } else {

                btn.style.background = "red";
                btn.style.color = "white";
            }

            setTimeout(() => {
                nextQuestion();
            }, 1500);

        });

        answersContainer.appendChild(btn);

    });

    startTimer();
}

function getCorrectAnswer(question) {
    return question.answers[question.correct];
}

function nextQuestion() {

    questionIndex++;

    if (questionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {

    clearInterval(timer);

    const percent =
        Math.round((score / currentQuestions.length) * 100);

    let message = '';

    if (percent >= 90) {
        message = '🏆 Відмінний рівень!';
    }
    else if (percent >= 70) {
        message = '👏 Хороший результат!';
    }
    else if (percent >= 50) {
        message = '🙂 Непогано!';
    }
    else {
        message = '📚 Потрібно ще потренуватися.';
    }

    questionText.innerHTML = `
        Тест завершено!<br>
        Результат: ${score}/${currentQuestions.length}<br>
        ${percent}%<br><br>
        ${message}
    `;

    answersContainer.innerHTML = '';

    if (score > record) {

        record = score;

        localStorage.setItem('record', record);

        recordSpan.textContent = record;
    }

    const restartBtn = document.createElement('button');

    restartBtn.textContent = 'Грати знову';

    restartBtn.addEventListener('click', () => {

        questionBlock.style.display = 'none';
        levels.style.display = 'block';

        restartBtn.remove();
    });

    answersContainer.appendChild(restartBtn);
}