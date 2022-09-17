function fetchImage() {
    fetch("https://source.unsplash.com/random/3840x2160/?nature")
        .then((resp) => resp)
        .then((imagelists) => {
            let selectedImage = imagelists.url;
            let dom = document.getElementById("header");
            dom.style.backgroundColor = "grey";
            dom.style.backgroundImage = `url(${selectedImage})`;
        });
}

fetchImage();
restoreSettings();

// Save the settings to a Chrome extension storage
function saveSettings() {
    chrome.storage.sync.set({
        language: document.querySelector("select[name='language']").value,
        timeformat: document.querySelector("select[name='timeformat']").value,
        quoteSource: document.querySelector("input[name='quoteSource']").value,
        imageSource: document.querySelector("input[name='imageSource']").value,
        imageResolution: document.querySelector("input[name='imageResolution']").value,
        imageCategory: document.querySelector("input[name='imageCategory']").value
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Get settings from Chrome extension storage
function restoreSettings() {
    chrome.storage.sync.get({
        language: 'en',
        timeformat: '12',
        quoteSource: 'https://simonrijntjes.nl/quote.php',
        imageSource: 'https://source.unsplash.com/random/',
        imageResolution: '3840x2160',
        imageCategory: 'Nature'
    }, function (items) {
        document.querySelector("select[name='language']").value = items.language;
        document.querySelector("select[name='timeformat']").value = items.timeformat;
        document.querySelector("input[name='quoteSource']").value = items.quoteSource;
        document.querySelector("input[name='imageSource']").value = items.imageSource;
        document.querySelector("input[name='imageResolution']").value = items.imageResolution;
        document.querySelector("input[name='imageCategory']").value = items.imageCategory;
    });
}

document.addEventListener('DOMContentLoaded', restoreSettings);