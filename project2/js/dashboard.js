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

    // Load Enrolled Courses
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '{}');
    const enrolledCoursesDiv = document.getElementById('enrolled-courses');
    if (Object.keys(enrolledCourses).length === 0) {
        enrolledCoursesDiv.innerHTML = '<p>No enrolled courses yet.</p>';
        return;
    }
    for (const courseId in enrolledCourses) {
        const course = enrolledCourses[courseId];
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <p>Progress: ${course.progress}%</p>
            <a href="course.html?id=${courseId}" class="cta-button">Continue Learning</a>
        `;
        enrolledCoursesDiv.appendChild(courseCard);
    }
});