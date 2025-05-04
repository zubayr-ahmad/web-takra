document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }

    // Get Course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));

    // Load Course Details
    fetch('data/courses.json')
        .then(response => response.json())
        .then(courses => {
            const course = courses.find(c => c.id === courseId);
            if (course) {
                document.getElementById('course-title').textContent = course.title;
                document.getElementById('course-description').textContent = course.description;
                document.getElementById('course-instructor').textContent = course.instructor;
                document.getElementById('course-price').textContent = `$${course.price}`;

                // Progress Tracker
                const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '{}');
                const progress = enrolledCourses[courseId]?.progress || 0;
                document.getElementById('progress-fill').style.width = `${progress}%`;
                document.getElementById('progress-text').textContent = `${progress}% Complete`;

                // Enroll Button
                const enrollButton = document.getElementById('enroll-button');
                enrollButton.addEventListener('click', () => {
                    enrolledCourses[courseId] = { ...course, progress: enrolledCourses[courseId]?.progress || 0 };
                    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
                    alert('Enrolled successfully!');
                });

                // Update Progress
                document.getElementById('update-progress').addEventListener('click', () => {
                    let newProgress = prompt('Enter new progress (0-100):', progress);
                    newProgress = parseInt(newProgress);
                    if (isNaN(newProgress) || newProgress < 0 || newProgress > 100) {
                        alert('Please enter a valid progress (0-100).');
                        return;
                    }
                    enrolledCourses[courseId].progress = newProgress;
                    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
                    document.getElementById('progress-fill').style.width = `${newProgress}%`;
                    document.getElementById('progress-text').textContent = `${newProgress}% Complete`;
                });
            }
        });
});