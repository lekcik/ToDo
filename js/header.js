/* header code */

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

let openSortFormBtn = document.querySelector('.jsSortByBtn');
let sortForm = document.querySelector('.jsRadio');

openSortFormBtn.addEventListener('click', () => {
    if (sortForm.classList.contains('show')) {
        sortForm.classList.remove('show');

        setTimeout(() => {
            sortForm.style.display = 'none';
        }, transitionDuration);
    } else {
        sortForm.style.display = 'inline-flex';

        setTimeout(() => {
            sortForm.classList.add('show');
        }, 10);
    }
})