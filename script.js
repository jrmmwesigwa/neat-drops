// Add any JavaScript functionality here if needed
// For example, you can add a loading animation or smooth scroll effect

document.addEventListener("DOMContentLoaded", function() {
    // Smooth scroll for navigation links
    const links = document.querySelectorAll('.navbar a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});