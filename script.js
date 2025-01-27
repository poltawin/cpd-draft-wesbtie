let currentLesson = 1;
const totalLessons = 4;

// Function to show a specific lesson
function showLesson(lessonNumber) {
    for (let i = 1; i <= totalLessons; i++) {
        document.getElementById(`lesson-${i}`).style.display = "none";
    }
    document.getElementById(`lesson-${lessonNumber}`).style.display = "block";
    document.getElementById("lesson-indicator").textContent = `Lesson ${lessonNumber}`;
}

// Lesson navigation
function showNext() {
    if (currentLesson < totalLessons) {
        currentLesson++;
        showLesson(currentLesson);
    }
}

function showPrevious() {
    if (currentLesson > 1) {
        currentLesson--;
        showLesson(currentLesson);
    }
}

// Initialize the first lesson view
showLesson(currentLesson);

// Drag-and-Drop Functionality
function enableDragAndDrop(lessonNumber) {
    const draggables = document.querySelectorAll(`#draggable-items-${lessonNumber} .draggable`);
    const dropZones = document.querySelectorAll(`#puzzle-area-${lessonNumber} .drop-zone`);

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (dragging && !zone.hasChildNodes()) {
                zone.appendChild(dragging);
            }
        });
    });
}

// Initialize drag-and-drop for each lesson
for (let i = 1; i <= totalLessons; i++) {
    enableDragAndDrop(i);
}

// Check Solution for each lesson
function checkSolution(lessonNumber) {
    const zones = document.querySelectorAll(`#puzzle-area-${lessonNumber} .drop-zone`);
    let isCorrect = true;

    zones.forEach(zone => {
        const order = zone.getAttribute('data-order');
        const droppedItem = zone.querySelector('.draggable');
        if (!droppedItem || droppedItem.getAttribute('data-order') !== order) {
            isCorrect = false;
        }
    });

    const feedback = document.getElementById(`feedback-${lessonNumber}`);
    feedback.textContent = isCorrect ? 'Correct! You formed a valid syllogism!' : 'Incorrect. Try again.';
    feedback.style.color = isCorrect ? 'green' : 'red';
}

// Function to simulate quiz start
function startQuiz() {
    alert("Quiz will begin soon! Get ready!");
}
