'use strict';

window.addEventListener('DOMContentLoaded', () => {
    
    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();

    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2022-12-31';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    } 

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);
    
    // Modal

    // const modal = document.querySelector('.modal'),
    //       modalBtn = document.querySelectorAll('[data-modal]'),
    //       modalCross = modal.querySelector('[data-close]');

    // function showModal() {
    //     modal.style.display = 'block';
    // }

    // function closeModal() {
    //     modal.style.display = 'none';
    // }

    // modalBtn.forEach(item => {
    //     item.addEventListener('click', showModal);
    // });

    // modalCross.addEventListener('click', closeModal);

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerID);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';    
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(); 
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerID = setTimeout(openModal, 50000);

    function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для карточек

    // class Cards {
    //     constructor(img, name, text, price) {
    //         this.img = img;
    //         this.name = name;
    //         this.text = text;
    //         this.price = price;
    //     }
    //     createCard() {
    //         return this.img;
    //     }
    // }

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 65;
            this.changeToRUB();
        }
        changeToRUB() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url ) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        } 
        return await res.json();
    };

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container ').render();
            }); 
        });

    // getResource('http://localhost:3000/menu')
        // .then(data => {
        //     data.forEach(({img, altimg, title, descr, price}) => {
        //         new MenuCard(img, altimg, title, descr, price, '.menu .container ').render();
        //     }); 
    //     });

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));
    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> руб/день</div>
    //             </div> 
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     }); 
    // }

    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...' 
    }

    forms.forEach(item => {
        bindPostData (item);
    })

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data 
        }); 
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()) );
            postData('http://localhost:3000/requests', json )
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove(); 
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
           <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
           </div> 
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
           thanksModal.remove();
           prevModalDialog.classList.add('show');
           prevModalDialog.classList.remove('hide');
           closeModal();
        }, 4000);
    } 
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

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


});


