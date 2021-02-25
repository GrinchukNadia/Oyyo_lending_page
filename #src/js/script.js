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