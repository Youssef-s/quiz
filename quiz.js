// Retrieve answered questions from localStorage (or initialize an empty array if none exist)
let answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions')) || [];

// Load the questions from the JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        renderQuestions(data);
    });

// Function to display the remaining unanswered questions
function renderQuestions(questions) {
    const questionLinksDiv = document.getElementById('question-links');
    questionLinksDiv.innerHTML = ''; // Clear the question links area

    // Filter out questions that have been answered
    const remainingQuestions = questions.filter(q => !answeredQuestions.includes(q.id));

    if (remainingQuestions.length === 0) {
        // If all questions have been answered, show a message
        questionLinksDiv.innerHTML = '<p>All questions have been answered!</p>';
        return;
    }

    // For each remaining question, create a clickable link
    remainingQuestions.forEach(question => {
        const link = document.createElement('a');
        link.textContent = question.id; // Display the question number as the link text
        link.href = '#'; // Make it a clickable link
        link.addEventListener('click', function () {
            showQuestion(question); // Display the question when the link is clicked
        });
        questionLinksDiv.appendChild(link); // Add the link to the page
    });
}

// Function to display a specific question and allow the user to show the answer
function showQuestion(question) {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <h2>Question ${question.id}</h2>
        <p>${question.question}</p>
        <button id="show-answer"><i class="fas fa-eye"></i> Show Answer</button>
        <p id="answer" style="display: none;">${question.answer}</p>
        <br><br>
        <button id="go-back">Back to Questions</button>
    `;

    // Handle the 'Show Answer' button click
    document.getElementById('show-answer').addEventListener('click', function () {
        document.getElementById('answer').style.display = 'block'; // Show the answer
        answeredQuestions.push(question.id); // Mark the question as answered
        localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions)); // Save the updated answered questions to localStorage
    });
    document.getElementById('show-answer').addEventListener('click', function () {
        document.getElementById('answer').classList.add('show');
        answeredQuestions.push(question.id); 
        localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
    });  

    // Handle the 'Back to Questions' button click to return to the home page
    document.getElementById('go-back').addEventListener('click', function () {
        window.location.reload(); // Reload the page to show updated list of unanswered questions
    });
}

// Add functionality to reset the quiz when the "Reset Quiz" button is clicked
document.getElementById('reset-quiz').addEventListener('click', function () {
    localStorage.removeItem('answeredQuestions'); // Clear answered questions from localStorage
    window.location.reload(); // Reload the page to show all the questions again
});
