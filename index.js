(function () {
    let dom = document.getElementById("bgimg");
    dom.style.background = "linear-gradient(220.55deg, #5D85A6 0%, #0E2C5E 100%)";
    dom.style.backgroundRepeat = "no-repeat";
    dom.style.backgroundSize = "cover";
    fetchImage();

    function fetchImage() {
        fetch("https://source.unsplash.com/3840x2160/?nature")
            .then((resp) => {
                return resp.url;
            })
            .then((imagelists) => {
                dom.style.backgroundImage = `url(${imagelists})`;
            })
    }
})();
(function () {
    function checkTime(i) {
        return i < 10 ? "0" + i : i;
    }

    function startTime() {
        const today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds()); // Not used, but can be used to show seconds. TODO : Add seconds to the clock as an setting.
        document.getElementById("time").innerHTML = h + ":" + m;
        setTimeout(function () {
            startTime();
        }, 1000);
    }
    startTime();
})();

class Init {
    constructor() {
        this.dateDetails = null;
    }
}

class TabAction extends Init {
    constructor(props) {
        super(props);
    }

    setDateDetails() {
        this.dateDetails = getdateDetails();
    }
}

let tab = new TabAction();
getQuote();
tab.setDateDetails();
insertDom();

function insertDom() {
    document.getElementById(
        "date"
    ).innerHTML = `${tab.dateDetails.day}, ${tab.dateDetails.month} ${tab.dateDetails.date}`;
}

function getQuote() {
    $.ajax({
        url: "https://api.quotable.io/random",
        dataType: "json",
        timeout: 1000,
        success: function (data) {
            let template =
                '<span style="font-size: 3vh;padding: 8px;;text-shadow: 2px 2px 4px #000000; font-weight: normal"><strong style="font-style: italic;font-size: 3vh; font-weight: normal ;text-shadow: 0 0 2px gray;">"QUOTE"</strong><a target="_blank" rel="noopenner" style="color:white;text-decoration: none;">- AUTHOR</a><span></span></span>';
            const quote = `${data.content}`;
            const author = `${data.author}`;
            template = template.replace("QUOTE", quote);
            template = template.replace("AUTHOR", author);
            $("#quote").html(template);
        },
        error: function (data) {
            let template =
                '<span style="font-size: 2vh;padding: 8px;;text-shadow: 2px 2px 4px #000000;"><strong style="font-style: italic;font-size: 2vh;text-shadow: 0 0 2px gray;">"QUOTE"</strong><a target="_blank" rel="noopenner" style="color:white;text-decoration: none;">- AUTHOR</a><span></span></span>';
            const quote = `Error while fetching quote`;
            const author = `OpenSourceSimon`;
            template = template.replace("QUOTE", quote);
            template = template.replace("AUTHOR", author);
            $("#quote").html(template);
        }
    });
}

function getdateDetails() {
    const today = new Date();
    const day = today.getDay();
    const dd = today.getDate();
    const mm = today.getMonth();
    const yyyy = today.getFullYear();
    const dL = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const mL = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return {
        day: dL[day],
        month: mL[mm],
        date: dd,
        year: yyyy,
    };
}

function timeTo12HrFormat(time) {
    let time_part_array = time.split(":");
    let ampm = "AM";
    if (time_part_array[0] >= 12) {
        ampm = "PM";
    }
    if (time_part_array[0] > 12) {
        time_part_array[0] = time_part_array[0] - 12;
    }
    return `${time_part_array[0]}:${time_part_array[1]} <span class="am_pm">${ampm}<span>`;
}
