const slider = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slider');
const leftBtn = document.querySelector('.left-shift');
const rightBtn = document.querySelector('.right-shift');
const bars = document.querySelectorAll('.bar-1');

let currentIndex = 0;
const totalSlides = slides.length;
let slideInterval;
let direction = 1;

function moveSlide() {
    currentIndex += direction;

    if (currentIndex >= totalSlides - 1) {
        slider.scrollTo({
            left: currentIndex * slider.clientWidth,
            behavior: 'smooth'
        });

        setTimeout(() => {
            slider.scrollTo({
                left: 0,
                behavior: 'auto'
            });
            currentIndex = 0;
            resetAndStartFirstFiller();
        }, 1000);
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 2;
        slider.scrollTo({
            left: currentIndex * slider.clientWidth,
            behavior: 'auto'
        });
    } else {
        slider.scrollTo({
            left: currentIndex * slider.clientWidth,
            behavior: 'smooth'
        });
    }

    animateFillers(currentIndex);
}

function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(moveSlide, 3000);
}

leftBtn.addEventListener('click', () => {
    direction = -1;
    moveSlide();
    startAutoSlide();
});

rightBtn.addEventListener('click', () => {
    direction = 1;
    moveSlide();
    startAutoSlide();
});

function animateFillers(index) {
    bars.forEach((bar, i) => {
        let filler = bar.querySelector('.color-filler');
        if (i === index) {
            bar.classList.add('expanded');
            filler.style.transition = "width 1s ease-in-out";
            filler.style.width = "100%";
        } else {
            bar.classList.remove('expanded');
            filler.style.transition = "none";
            filler.style.width = "0";
        }
    });
}

function resetAndStartFirstFiller() {
    bars.forEach(bar => {
        let filler = bar.querySelector('.color-filler');
        filler.style.transition = "none";
        filler.style.width = "0";
    });

    setTimeout(() => {
        let firstBar = bars[0];
        let firstFiller = firstBar.querySelector('.color-filler');
        firstBar.classList.add('expanded');
        firstFiller.style.transition = "width 1s ease-in-out";
        firstFiller.style.width = "100%";
    }, 50);
}

animateFillers(0);
startAutoSlide();


const bgColor = document.querySelector('.Fix-Container');
let randBgColor = () => {
    const randomNum = Math.floor(Math.random() * 16777215);
    const color = `#${randomNum.toString(16).padStart(6, '0')}`; // Ensures 6-digit color
    bgColor.style.backgroundColor = color;
};

setInterval(randBgColor, 1000); // Calls randBgColor every second

