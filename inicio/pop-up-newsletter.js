document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(function() {
        var popup = document.getElementById('popupDiv');
        var background = document.getElementById('popupBackground');
        var closeBtn = document.getElementById('closePopup');
        
        popup.style.display = 'block';
        background.style.display = 'block';

        closeBtn.addEventListener('click', function() {
            popup.style.display = 'none';
            background.style.display = 'none';
        });
    }, 7000); 
});
