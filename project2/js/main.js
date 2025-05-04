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

    // Load Courses
    fetch('data/courses.json')
        .then(response => response.json())
        .then(courses => {
            const courseList = document.getElementById('course-list');
            courses.forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.classList.add('course-card');
                courseCard.innerHTML = `
                    <h3>${course.title}</h3>
                    <p>${course.description.substring(0, 100)}...</p>
                    <a href="course.html?id=${course.id}" class="cta-button">View Course</a>
                `;
                courseList.appendChild(courseCard);
            });
        });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('newsletter-name').value;
        const email = document.getElementById('newsletter-email').value;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email.');
            return;
        }
        const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        subscribers.push({ name, email });
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        alert('Subscribed successfully!');
        newsletterForm.reset();
    });
});