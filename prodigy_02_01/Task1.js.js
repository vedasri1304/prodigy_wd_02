document.getElementById('home').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
document.getElementById('about').addEventListener('click', function() {
    window.scrollTo({
        top: document.querySelector('.about-box').offsetTop,
        behavior: 'smooth'
    });
});
document.getElementById('internship').addEventListener('click', function() {
    window.scrollTo({
        top: document.querySelector('.services').offsetTop,
        behavior: 'smooth'
    });
});
document.getElementById('contact').addEventListener('click', function() {
    window.scrollTo({
        top: document.querySelector('footer').offsetTop,
        behavior: 'smooth'
    });
});