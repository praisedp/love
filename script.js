document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Remove parallax effect on images
    // const images = document.querySelectorAll('.timeline-image');
    // window.addEventListener('scroll', () => {
    //     images.forEach(image => {
    //         const speed = 0.5;
    //         const rect = image.getBoundingClientRect();
    //         const scrolled = window.pageYOffset;
    //         
    //         if (rect.top < window.innerHeight && rect.bottom > 0) {
    //             image.style.transform = `translateY(${scrolled * speed}px)`;
    //         }
    //     });
    // });

    // Add hover effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.02)';
            item.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Add typing effect to the subtitle
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
});