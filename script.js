// Global variables
let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 90;
let timerInterval;
let highScore = localStorage.getItem('highScore') || 0;

// Quiz Questions: Math, Science, History, Computer Science, Reasoning, English
const quizData = {
    Math: [
        { question: "What is the square root of 256?", answers: ["14", "15", "16", "18"], correct: 2 },
        { question: "Solve: 12 * (3 + 5) / 4", answers: ["18", "24", "32", "36"], correct: 1 },
        { question: "What is 2 to the power of 8?", answers: ["128", "256", "64", "512"], correct: 1 },
        { question: "Find the derivative of x^3", answers: ["x^2", "3x", "3x^2", "x^3"], correct: 2 },
        { question: "What is the value of pi to 3 decimal places?", answers: ["3.142", "3.145", "3.141", "3.149"], correct: 0 },
        { question: "Solve for x: 2x + 3 = 15", answers: ["6", "5", "4", "8"], correct: 1 },
        { question: "What is the area of a circle with radius 7?", answers: ["154", "144", "196", "49"], correct: 0 },
        { question: "Solve: (3x - 5) = 10. Find x.", answers: ["3", "5", "8", "6"], correct: 3 },
        { question: "What is the 10th prime number?", answers: ["23", "29", "31", "19"], correct: 2 },
        { question: "Simplify: 3√27", answers: ["3", "6", "9", "1"], correct: 0 },
    ],
    Science: [
        { question: "What is the chemical symbol for gold?", answers: ["Au", "Ag", "Pb", "Fe"], correct: 0 },
        { question: "What gas do plants absorb from the atmosphere?", answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 1 },
        { question: "Which planet has the most moons?", answers: ["Earth", "Mars", "Saturn", "Jupiter"], correct: 3 },
        { question: "What is the heaviest naturally occurring element?", answers: ["Uranium", "Plutonium", "Lead", "Osmium"], correct: 0 },
        { question: "Which organ is responsible for pumping blood throughout the body?", answers: ["Liver", "Heart", "Lungs", "Kidneys"], correct: 1 },
        { question: "What is the chemical formula for water?", answers: ["H2O", "O2", "CO2", "NaCl"], correct: 0 },
        { question: "What force keeps planets in orbit around the sun?", answers: ["Magnetism", "Friction", "Gravity", "Inertia"], correct: 2 },
        { question: "What part of the cell contains the genetic material?", answers: ["Ribosomes", "Nucleus", "Cytoplasm", "Mitochondria"], correct: 1 },
        { question: "Which planet is closest to the Sun?", answers: ["Venus", "Mercury", "Earth", "Mars"], correct: 1 },
        { question: "What is the basic unit of life?", answers: ["Atom", "Molecule", "Cell", "Organism"], correct: 2 },
    ],
    History: [
        { question: "Who was the first Emperor of Rome?", answers: ["Julius Caesar", "Augustus", "Nero", "Caligula"], correct: 1 },
        { question: "Which war was fought between 1939 and 1945?", answers: ["World War I", "Vietnam War", "World War II", "Cold War"], correct: 2 },
        { question: "In which year did the Titanic sink?", answers: ["1912", "1905", "1899", "1920"], correct: 0 },
        { question: "Who was the first woman to fly solo across the Atlantic?", answers: ["Amelia Earhart", "Harriet Tubman", "Florence Nightingale", "Marie Curie"], correct: 0 },
        { question: "Which country gifted the Statue of Liberty to the United States?", answers: ["Germany", "Italy", "France", "Canada"], correct: 2 },
        { question: "What was the name of the ship that brought the Pilgrims to America in 1620?", answers: ["The Mayflower", "The Santa Maria", "The Pinta", "The Nina"], correct: 0 },
        { question: "In which year did the Berlin Wall fall?", answers: ["1985", "1989", "1991", "1995"], correct: 1 },
        { question: "Who discovered penicillin?", answers: ["Albert Einstein", "Alexander Fleming", "Isaac Newton", "Marie Curie"], correct: 1 },
        { question: "Who was the first President of the United States?", answers: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], correct: 1 },
        { question: "Which civilization built the pyramids?", answers: ["Greeks", "Romans", "Egyptians", "Persians"], correct: 2 },
    ],
    "Computer Science": [
        { question: "What does 'HTML' stand for?", answers: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyperlink Text Marking Language"], correct: 1 },
        { question: "What is the time complexity of binary search?", answers: ["O(n)", "O(n^2)", "O(log n)", "O(n log n)"], correct: 2 },
        { question: "Which programming language is known as the 'mother of all languages'?", answers: ["C", "Assembly", "Python", "Java"], correct: 0 },
        { question: "What does 'CSS' stand for?", answers: ["Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"], correct: 0 },
        { question: "What does TCP stand for?", answers: ["Transmission Control Protocol", "Transfer Communication Protocol", "Terminal Connection Protocol", "Time Control Protocol"], correct: 0 },
        { question: "Which company developed the Java programming language?", answers: ["Apple", "Google", "Sun Microsystems", "Microsoft"], correct: 2 },
        { question: "Which data structure uses LIFO (Last In, First Out)?", answers: ["Queue", "Stack", "Array", "Linked List"], correct: 1 },
        { question: "What is the default port number for HTTP?", answers: ["21", "80", "443", "8080"], correct: 1 },
        { question: "Which of these is a NoSQL database?", answers: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], correct: 2 },
        { question: "What is the full form of 'RAM'?", answers: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Run Access Memory"], correct: 0 },
    ],
    Reasoning: [
        { question: "Find the odd one out: 3, 5, 7, 12, 17, 19", answers: ["12", "5", "3", "17"], correct: 0 },
        { question: "Complete the series: 2, 6, 12, 20, ?", answers: ["28", "30", "32", "24"], correct: 0 },
        { question: "If 'DOG' is coded as '3127', what is 'CAT'?", answers: ["3120", "3122", "3121", "3123"], correct: 2 },
        { question: "A is twice as old as B. B is 5 years older than C. If C is 10 years old, how old is A?", answers: ["30", "25", "20", "40"], correct: 0 },
        { question: "Which word cannot be formed using letters from 'PROBABILITY'?", answers: ["ABILITY", "RATIO", "PROFIT", "PORT"], correct: 2 },
        { question: "If all roses are flowers, and all flowers are plants, are all roses plants?", answers: ["Yes", "No", "Cannot be determined", "Possibly"], correct: 0 },
        { question: "If 24 is related to 12, and 36 is related to 18, then 48 is related to?", answers: ["24", "22", "26", "28"], correct: 0 },
        { question: "Find the missing number: 7, 14, 28, 56, ?", answers: ["112", "84", "70", "120"], correct: 0 },
        { question: "If 6x = 12 + 8x, what is x?", answers: ["3", "4", "1", "2"], correct: 3 },
        { question: "A man walks 5km North, turns left and walks 3km. Where is he from the starting point?", answers: ["5km East", "5km North-East", "5km South-West", "5km West"], correct: 1 },
    ],
    English: [
        { question: "Identify the correct synonym for 'obstinate'", answers: ["Stubborn", "Flexible", "Indecisive", "Polite"], correct: 0 },
        { question: "Which sentence is grammatically correct?", answers: ["She don't like pizza", "He has went home", "They are playing football", "I done the homework"], correct: 2 },
        { question: "What is the meaning of 'to call it a day'?", answers: ["To finish something", "To work hard", "To start something new", "To have a bad day"], correct: 0 },
        { question: "Choose the correctly spelled word:", answers: ["Seperate", "Separate", "Separete", "Seperete"], correct: 1 },
        { question: "Fill in the blank: He _____ to the store yesterday.", answers: ["go", "going", "went", "gone"], correct: 2 },
        { question: "Identify the antonym of 'benevolent'", answers: ["Kind", "Rude", "Malevolent", "Generous"], correct: 2 },
        { question: "Which of these is a verb?", answers: ["Quickly", "Walk", "Beautiful", "Sad"], correct: 1 },
        { question: "What is the plural of 'child'?", answers: ["Childs", "Childes", "Children", "Childen"], correct: 2 },
        { question: "Which punctuation is used to show possession?", answers: ["Comma", "Apostrophe", "Colon", "Semicolon"], correct: 1 },
        { question: "Complete the sentence: 'He is taller _____ me.'", answers: ["then", "than", "that", "there"], correct: 1 },
    ]
};

// Start the quiz
function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 90;

    document.getElementById('category-selection').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
    document.getElementById('quiz-category').innerText = `Category: ${category}`;

    startTimer();
    loadQuestion();
}

// Timer Functionality
function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showFeedback();
        }
    }, 1000);
}

// Load the current question
function loadQuestion() {
    const questionData = quizData[currentCategory][currentQuestionIndex];
    document.getElementById('question-container').innerText = questionData.question;

    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    questionData.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.innerText = answer;
        answerBtn.onclick = () => checkAnswer(index);
        answersContainer.appendChild(answerBtn);
    });
}

// Check the selected answer
function checkAnswer(selectedIndex) {
    const correctIndex = quizData[currentCategory][currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
        alert('Correct!');
    } else {
        alert('Incorrect!');
    }

    nextQuestion();
}

// Load the next question or show feedback if quiz is over
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= quizData[currentCategory].length) {
        clearInterval(timerInterval);
        showFeedback();
    } else {
        loadQuestion();
    }
}

// Show feedback and score
function showFeedback() {
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('feedback-section').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;

    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    document.getElementById('high-score').innerText = highScore;
}

// Restart the quiz
function restartQuiz() {
    document.getElementById('feedback-section').classList.add('hidden');
    document.getElementById('category-selection').classList.remove('hidden');
}

