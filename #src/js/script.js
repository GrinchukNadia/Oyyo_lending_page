document.addEventListener("DOMContentLoaded", () => {
    // спойлер, аккардеон
    let spoilerBtn = document.querySelector(".info_open-btn"),
        openPanel = document.querySelector('.more_info-title'),
        allInfo = document.querySelector(".more_info-content");

        openPanel.addEventListener('click', () => {
        allInfo.classList.toggle('active_content');
        spoilerBtn.classList.toggle('close_panel');

        if(allInfo.classList.contains("active_content")) {
            allInfo.style.maxHeight = 0;
        }
        else {
            allInfo.style.maxHeight = allInfo.scrollHeight + "px";
        }
    });
    // конец спойлер, аккардеон

    // кнопка прокрутки сайта наверх
    const scrollTopBtn = document.querySelector('.scroll_top');

    window.addEventListener('scroll', () => {
        if(window.scrollY > 100) {   
            scrollTopBtn.classList.remove('scroll_hide');
        } else {
            scrollTopBtn.classList.add('scroll_hide');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    })
    // конец кнопка прокрутки сайта наверх

    // форма, валидация
    const inputName = document.querySelectorAll('input[name="name"]'),
          inputPhone = document.querySelectorAll('input[name="phone"]'),
          topInfoName = document.querySelectorAll('.input_top-name'),
          topInfoPhone = document.querySelectorAll('.input_top-phone'),
          validateName = document.querySelectorAll('.validation_name'),
          validatePhone = document.querySelectorAll('.validation_phone');

    let regexPhone = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/;
    let regexName = /^[a-zA-Zа-яёА-ЯЁ]+$/u;
    
    let validate = (regex, inp) => {
        return regex.test(inp);
    }
    
    let showInfoInput = (name, info, regex, val) => {
        name.forEach(item => {
            item.addEventListener('keydown', () => {
        
                if (item.value.length > 1){
                    info.forEach(info => {
                        info.style.display = "block"
                    });
                } else{
                    info.forEach(info => {
                        info.style.display = "none"
                    });
                }
        
                if(!validate(regex, item.value)) {
                    val.forEach(validation => {
                        validation.style.display = "none"
                    });
                } else{
                    val.forEach(validation => {
                        validation.style.display = "block"
                    });
                }
            });
        })
    }

    showInfoInput(inputName, topInfoName, regexName, validateName);
    showInfoInput(inputPhone, topInfoPhone, regexPhone, validatePhone);
    // конец форма, валидация

    // скрипт модальное окно открыть/закрыть
    const knowMoreBtns = document.querySelectorAll('[data-knowmore]'),
          callBackBtns = document.querySelectorAll('[data-callback]'),
          popupKnowMore = document.querySelector('[data-popupknowmore]'),
          popupCallBack = document.querySelector('[data-popupcallback]'),
          popupCloseBtns = document.querySelectorAll('.popup_close');

        knowMoreBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                popupKnowMore.style.display = "block";
            })
        });
        popupCloseBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                popupKnowMore.style.display = "none";
            });
        })
        callBackBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                popupCallBack.style.display = "block";
            })
        });
        popupCloseBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                popupCallBack.style.display = "none";
            });
        })
    // конец скрипт модальное окно открыть/закрыть

    // слайдер swiper
    function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
        // slider
        const slides = document.querySelectorAll(slide),
              slider = document.querySelector(container),
              prev = document.querySelector(prevArrow),
              next = document.querySelector(nextArrow),
              total = document.querySelector(totalCounter),
              current = document.querySelector(currentCounter),
              slidesWrapper = document.querySelector(wrapper),
              slidesField = document.querySelector(field),
              slideWidth = window.getComputedStyle(slidesWrapper).width;
    
        let slideIndex = 1;
        let offset = 0;
    
        if(slides.length < 10) {
            total.textContent = ` 0${slides.length} `;
            current.textContent = ` 0${slideIndex} `;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
    
        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';
    
        slidesWrapper.style.overflow = 'hidden';
    
        slider.style.position = 'relative';
        const indicators = document.createElement('ol'),
                dots = [];
        indicators.classList.add('carousel-indicators');
        slider.append(indicators);
    
        for(let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.classList.add('dot');
            dot.setAttribute('data-slide-to', i + 1);
            if (i == 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
        }
    
        slides.forEach( slide => {
            slide.style.width = slideWidth;
        });
    
        function currentDot() {
            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex -1].style.opacity = 1;
        }
        function addZeroSlider() {
            if ( slides.length < 10) {
                current.textContent = ` 0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
        }
        function clearNotDigit(str) {
            return +str.replace(/\D/g, '');
        }
    
        next.addEventListener('click', () => {
            if (offset == clearNotDigit(slideWidth) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += clearNotDigit(slideWidth);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }
            addZeroSlider();
            currentDot();
        });
        
        prev.addEventListener('click', () => {
            if (offset == 0) {
                offset = clearNotDigit(slideWidth) * (slides.length - 1);
            } else {
                offset -= clearNotDigit(slideWidth);
            }
    
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            
            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }
    
            addZeroSlider();
            currentDot();
        });
    
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');
    
                slideIndex = slideTo;
    
                offset = clearNotDigit(slideWidth) * (slideTo- 1);
                slidesField.style.transform = `translateX(-${offset}px)`;
    
                addZeroSlider();
                currentDot();
            });
        });
    }

    slider({
        container: '.instructor-container',
        nextArrow: '.next-arrow',
        prevArrow: '.prev-arrow',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.instructor-wrapper',
        field: '.instructor_inner',
        slide: ".instructor-slide"
    });
    // конец слайдер swiper
});