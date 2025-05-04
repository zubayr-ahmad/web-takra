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

    // EmailJS Initialization
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email.');
            return;
        }

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: name,
            from_email: email,
            message: message
        }).then(() => {
            alert('Message sent successfully!');
            contactForm.reset();
        }, (error) => {
            alert('Failed to send message. Please try again.');
            console.error(error);
        });
    });
});