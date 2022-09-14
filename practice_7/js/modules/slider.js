function slider() {
    // Slider

    // const leftSwipe = document.querySelector('.offer__slider-prev'),
    //       rightSwipe = document.querySelector('.offer__slider-next'),
    //       currentCounter = document.querySelector('#current'),
    //       totalCounter = document.querySelector('#total'),
    //       sliderImgs = document.querySelectorAll('.offer__slide');
    // let sliderIndex = 1;

    // if (sliderImgs.length >= 1 && sliderImgs.length < 10) {
    //     totalCounter.innerHTML = `0${sliderImgs.length}`;
    // } else {
    //     totalCounter.innerHTML = `${sliderImgs.length}`;
    // }

    // function showSlide() {
    //     for (let sliderImg of sliderImgs) {
    //         sliderImg.style.display = 'none';
    //     }
    //     sliderImgs[sliderIndex - 1].style.display = 'block';
    //     if (sliderIndex >= 1 && sliderIndex < 10) {
    //         currentCounter.innerHTML = `0${sliderIndex}`;
    //     } else {
    //         currentCounter.innerHTML = `${sliderIndex}`;
    //     }
    // }

    // showSlide();

    // function nextSlide() {
    //     sliderIndex += 1;
    //     if (sliderIndex > sliderImgs.length) {
    //         sliderIndex = 1;
    //     }
    //     showSlide();
    // }

    // function previousSlide() {
    //     sliderIndex -= 1;
    //     if (sliderIndex < 1) {
    //         sliderIndex = sliderImgs.length;
    //     }
    //     showSlide();
    // }

    // leftSwipe.addEventListener(('click'), previousSlide);

    // rightSwipe.addEventListener(('click'), nextSlide);

    const slides = document.querySelectorAll('.offer__slide'),
            prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            total = document.querySelector('#total'),
            current = document.querySelector('#current'),
            slidesWrapper = document.querySelector('.offer__slider-wrapper'),
            slidesField = document.querySelector('.offer__slider-inner'),
            width = window.getComputedStyle(slidesWrapper).width,
            slider = document.querySelector('.offer__slider');
    let sliderIndex = 1;
    let offset = 0;

    // slider.style.position = 'relative';

    // const dotsWrapper = document.createElement('div');
            
    // dotsWrapper.className = 'carousel-indicators';

    // slider.appendChild(dotsWrapper);

    // for (let i = 0; i < slides.length; i++) {
    //     const dot = document.createElement('div');
    //     dot.className = 'dot';
    //     dot.setAttribute('place', i + 1);
    //     dotsWrapper.appendChild(dot);
    // }

    // slides.forEach(() => {
    //     const dot = document.createElement('div');
    //     dot.className = 'dot';
    //     dotsWrapper.appendChild(dot);
    // });

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`; 
        current.textContent = `0${sliderIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = sliderIndex ;
    }

    slidesField.style.width = 100 * slides.length + '%'; 
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
            dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }
        currentCounter();
        lightDots();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }
        currentCounter();
        lightDots();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            sliderIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);  
            slidesField.style.transform = `translateX(-${offset}px)`;
            currentCounter();
            lightDots();
        });
    });

    function lightDots() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[sliderIndex - 1 ].style.opacity = 1;
    }

    function currentCounter() {
        if (slides.length < 10) {
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }
    }

    function deleteNotDigits(str) {
        return(+str.replace(/\D/g, ''));
    }

    // showSlides(sliderIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`; 
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         sliderIndex = 1;
    //     }
    //     if (n < 1) {
    //         sliderIndex = slides.length;
    //     }
    //     slides.forEach(item => item.style.display = 'none');
    //     slides[sliderIndex - 1].style.display = 'block';
    //     if (slides.length < 10) {
    //         current.textContent = `0${sliderIndex}`; 
    //     } else {
    //         current.textContent = sliderIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(sliderIndex += n); 
    // }

    // prev.addEventListener('click', () =>  {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // })
}

module.exports = slider;