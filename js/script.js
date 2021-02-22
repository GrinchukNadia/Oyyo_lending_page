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
});