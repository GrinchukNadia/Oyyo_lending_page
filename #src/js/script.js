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


    // слайдер 

    let slider = (containerClass, slidesClass, slideClass, paggination, name) => {
        const slideContainer = document.querySelector(containerClass);
        const slide = document.querySelector(slidesClass);
        const pag = document.querySelector(paggination)
        
        let slides = document.querySelectorAll(slideClass);
        let index = 1;
        let start;
        let change;
        
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length -1].cloneNode(true);
        
        for (let i = 0; i < slides.length; i++){
            pag.insertAdjacentHTML("afterbegin", `<div class='pag_item pag_${name}'></div>`);
        }
        let pagItem = document.querySelectorAll(`.pag_${name}`);
        pagItem[0].classList.add('pag_active');

        firstClone.id = 'first-clone';
        lastClone.id = 'last-clone';
        
        slide.append(firstClone);
        slide.prepend(lastClone);
        
        const slideWidth = slides[index].clientWidth;
        
        slide.style.transform = `translateX(${(-slideWidth) * index}px)`;
        
        const getSlides = () => document.querySelectorAll(slideClass);
        
        
        slide.addEventListener('transitionend', () => {
            slides = getSlides();
            if (slides[index].id === firstClone.id) {
                slide.style.transition = 'none';
                index = 1;
                slide.style.transform = `translateX(${-(slideWidth) * index}px)`;
            }
            
            if (slides[index].id === lastClone.id) {
                slide.style.transition = 'none';
                index = slides.length - 2;
                slide.style.transform = `translateX(${-(slideWidth) * index}px)`;
            }
        });
        
        const moveToNextSlide = () => {
            slides = getSlides();
            if (index >= slides.length - 1) return;
            index++;
            slide.style.transition = '.7s ease-out';
            slide.style.transform = `translateX(${(-slideWidth) * index }px)`;
            let pagItem = document.querySelectorAll(`.pag_${name}`);
            let pagLength = pagItem.length;
            if (index - 1 == pagLength) {
                pagItem[0].classList.add('pag_active');
                pagItem[pagLength - 1].classList.remove('pag_active');
            } else {
                pagItem[index - 1].classList.add('pag_active');
                pagItem[index - 2].classList.remove('pag_active');
            }
        };
        
        const moveToPreviousSlide = () => {
            if (index <= 0) return;
            index--;
            slide.style.transition = '.7s ease-out';
            slide.style.transform = `translateX(${(-slideWidth) * index}px)`;
            let pagItem = document.querySelectorAll(`.pag_${name}`);
            let pagLength = pagItem.length;
            if (index - 1 < 0) {
                pagItem[pagLength - 1].classList.add('pag_active');
                pagItem[index].classList.remove('pag_active');
            } else {
                pagItem[index - 1].classList.add('pag_active');
                pagItem[index].classList.remove('pag_active');
            }
        };
        
        
        slideContainer.addEventListener('touchstart', (e) => {
            e.preventDefault();
            start = e.touches[0].clientX;
        });
        slideContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            let touch = e.touches[0];
            change = start - touch.clientX;
        });
        const swipeSlide = () => {
            if (change > 0) {
                moveToNextSlide();
            } else{
                moveToPreviousSlide();
            }
        }
        slideContainer.addEventListener('touchend', swipeSlide);
    }

    let sliderCards = () => {
        const slideContainer = document.querySelector('.cards_container');
        const slide = document.querySelector('.cards');
        const pag = document.querySelector('.pag-cards')
        
        let slides = document.querySelectorAll('.card');
        let index = 0;
        let start;
        let change;
        
        for (let i = 0; i < slides.length; i++){
            pag.insertAdjacentHTML("afterbegin", `<div class='pag_item pag_card'></div>`);
        }
        let pagItem = document.querySelectorAll(`.pag_card`);
        pagItem[0].classList.add('pag_active');
        
        const slideWidth = slides[index].clientWidth;
        
        const getSlides = () => document.querySelectorAll('.card');
        
        const moveToNextSlide = () => {
            slides = getSlides();
            if (index >= slides.length - 1) return;
            index++;
            slide.style.transition = '.7s ease-out';
            slide.style.transform = `translateX(${(-slideWidth + 14) * index }px)`;
            let pagItem = document.querySelectorAll(`.pag_card`);
            pagItem[index].classList.add('pag_active');
            pagItem[index - 1].classList.remove('pag_active');
        };
        
        const moveToPreviousSlide = () => {
            if (index <= 0) return;
            index--;
            slide.style.transition = '.7s ease-out';
            slide.style.transform = `translateX(${(-slideWidth + 14) * index}px)`;
            let pagItem = document.querySelectorAll(`.pag_card`);
            pagItem[index ].classList.add('pag_active');
            pagItem[index + 1].classList.remove('pag_active');
        };
        
        
        slideContainer.addEventListener('touchstart', (e) => {
            e.preventDefault();
            start = e.touches[0].clientX;
        });
        slideContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            let touch = e.touches[0];
            change = start - touch.clientX;
        });
        const swipeSlide = () => {
            if (change > 0) {
                moveToNextSlide();
            } else{
                moveToPreviousSlide();
            }
        }
        slideContainer.addEventListener('touchend', swipeSlide);
    }
    slider('.container-olga', '.slides-olga', '.slide-olga', '.pag-olga', 'olga');
    slider('.container-andrey', '.slides-andrey', '.slide-andrey', '.pag-andrey', 'andrey');
    slider('.container-sasha', '.slides-sasha', '.slide-sasha', '.pag-sasha', 'sasha');
    sliderCards();
    
    // конец слайдер 


    // мобильное меню
    const burgerMenu = document.querySelector('.burger_icon'),
          mobileMenu = document.querySelector('.mobile_menu'),
          body = document.querySelector('body'),
          menuLinks = document.querySelectorAll('#mobile_menu-link'),
          close_burger = document.querySelector('.close_burger'),
          open_burger = document.querySelector('.open_burger');


    burgerMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active_mobile-menu');
        body.classList.toggle('lock');
        close_burger.classList.toggle('none');
        open_burger.classList.toggle('none');
    });
    
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.toggle('active_mobile-menu');
            body.classList.toggle('lock');
            close_burger.classList.toggle('none');
            open_burger.classList.toggle('none');
        })
    });
    // конец мобильное меню
});