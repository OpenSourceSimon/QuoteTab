(function () {
  let dom = document.getElementById("bgimg");
  dom.style.background = "linear-gradient(220.55deg, #5D85A6 0%, #0E2C5E 100%)";
  dom.style.backgroundRepeat = "no-repeat";
  dom.style.backgroundSize = "cover";
  fetchImage();
  function fetchImage() {
    fetch("https://source.unsplash.com/random/3840x2160/?nature")
      .then((resp) => resp)
      .then((imagelists) => {
        let selectedImage = imagelists.url;
        let dom = document.getElementById("bgimg");
        dom.style.backgroundColor = "grey";
        dom.style.backgroundImage = `url(${selectedImage})`;
      })
      .catch(() => {
        error();
      });
  }
  //function fetchVideo() {
    //fetch("https://randomvideo.vercel.app/randomvideo")
      //.then((resp) => resp.json())
      //.then((res) => {
        //insertVideo(res?.src?.video_files[0].link);
      //})
      //.catch(() => {
        //error();
      //});
  //}
  //function insertVideo(src) {
    //var video = document.getElementById("myVideo");
    //var source = document.createElement("source");
    //source.setAttribute("src", src);
    //video.appendChild(source);
    //video.play();
  //}
  function error() {
    let dom = document.getElementById("bgimg");
    dom.style.backgroundColor = "grey";
  }
})();
(function () {
  function checkTime(i) {
    return i < 10 ? "0" + i : i;
  }
  function startTime() {
    var today = new Date(),
      h = checkTime(today.getHours()),
      m = checkTime(today.getMinutes()),
      s = checkTime(today.getSeconds());
    let time = h + ":" + m;
    document.getElementById("time").innerHTML = time;
    setTimeout(function () {
      startTime();
    }, 500);
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
insertinDom();
function insertinDom() {
  document.getElementById(
    "date"
  ).innerHTML = `${tab.dateDetails.day}, ${tab.dateDetails.month} ${tab.dateDetails.date}`;
}
function getQuote() {
    $.getJSON('https://api.quotable.io/random', function(data){
      let template =
      '<span style="font-size: 2vh;padding: 8px;;text-shadow: 2px 2px 4px #000000;"><strong style="font-style: italic;font-size: 2vh;text-shadow: 0 0 2px gray;">"QUOTE"</strong><a target="_blank" rel="noopenner" style="color:white;text-decoration: none;">- AUTHOR</a><span></span></span>';
      var quote = `${data.content}`;
      var author = `${data.author}`
      template = template.replace("QUOTE", quote);
      template = template.replace("AUTHOR", author);
      $("#quote").html(template);
    });
    }

function getdateDetails() {
  var today = new Date();
  var day = today.getDay();
  var dd = today.getDate();
  var mm = today.getMonth();
  var yyyy = today.getFullYear();
  var dL = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var mL = [
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
  let formatted_time = `${time_part_array[0]}:${time_part_array[1]} <span class="am_pm">${ampm}<span>`;
  return formatted_time;
}
