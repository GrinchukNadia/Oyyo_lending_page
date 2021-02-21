document.addEventListener("DOMContentLoaded", () => {
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
});