let openFormBtn = document.querySelector('.jsOpenFormBtn');
let formSection = document.querySelector('.jsAddTaskSection');

let transitionFast = getComputedStyle(document.documentElement).getPropertyValue('--transition-fast');

let transitionDuration = parseFloat(transitionFast) * 1000;

openFormBtn.addEventListener('click', () => {
    if (formSection.classList.contains('show')) {
        formSection.classList.remove('show');

        setTimeout(() => {
            formSection.style.display = 'none';
        }, transitionDuration); 
    } else {
        formSection.style.display = 'block';

        setTimeout(() => {
            formSection.classList.add('show');
        }, 10); 
    }
});