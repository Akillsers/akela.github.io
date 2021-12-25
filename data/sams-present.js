var time = 0;
var playing_present = 0;
var present_opened = 0;

function play_pause_video()
{
    var video = document.getElementById('play-target')
    var overlay = document.getElementById('video-overlay');
    var volume_bar = document.getElementById('volume-bar');
    var play_button = document.getElementById('play-button');
    
    if(video.paused)
    {
        video.play();    
        
        video.style.opacity = "1";
        volume_bar.style.visibility = "visible";
        play_button.style.visibility = "hidden";
        
        overlay.style.background = "rgba(0, 0, 0, 0.5)";
        overlay.style.opacity = "0";
    }
    else
    {
        video.pause();
        overlay.style.opacity = "1";
    }
    
    //overlay.setAttribute("onclick", "play_pause_video()")
    play_button.removeAttribute("onclick");
};

function change_video_source(name)
{
    var video = document.getElementById('play-target');
    var source = video.childNodes[0];
    
    source.removeAttribute("src");
    source.setAttribute("src", name);
    video.load(); 
}

function on_video_end()
{   
    var video = document.getElementById('play-target')
    var playback_time = video.currentTime;
    // var accident_time = 5;
    // var present_time = 2;
    
    if(/*playback_time > accident_time &&*/ !playing_present && !present_opened)
    {
        firebase.database().ref('started-countdown').set(1);
        var time_now = new Date(Date.now());
        var h = 3;
        var m = 7;
        var s = 3;
        var expiry = new Date();
        //expiry.setTime(time_now.getTime() + h*60*60*1000);
        expiry.setTime(time_now.getTime() + m*60*1000);
        //expiry.setTime(time_now.getTime() + s*1000);
        
        firebase.database().ref('time').set(expiry.toString());
        countDownDate = expiry;
        
        var play_button = document.getElementById('play-button');

        var overlay = document.getElementById('video-overlay');

        var volume_bar = document.getElementById('volume-bar');
        var timer_display = document.getElementById('timer-display');
        overlay.removeAttribute("onclick")
        play_button.style.visibility = "hidden";

        timer_display.style.visibility = "visible";
        video.pause();
        
        video.style.opacity = "0";
        volume_bar.style.visibility = "hidden";
        
        overlay.style.background = "rgba(0, 0, 0, 0)";
        overlay.style.opacity = "1";
        
        start_countdown();
    }
    else if(/*playback_time > present_time &&*/ playing_present && !present_opened)
    {
        var interaction_pane = document.getElementById("interaction-pane");
        var overlay = document.getElementById('video-overlay');
        interaction_pane.style.display = "block";
        
//      overlay.style.background = "rgba(0, 0, 0, 0.5)";
        overlay.style.opacity = "1";
    }
    else if(playing_present && present_opened)
    {
        firebase.database().ref('started-countdown').set(2);
        display_christmas_message();
    }
}

function open_present()
{
    var video = document.getElementById('play-target');
    var overlay = document.getElementById('video-overlay');
    var interaction_message = document.getElementById("interaction-message");

    
    if(present_opened == 0)
    {
        change_video_source("data/message3.webm");
        interaction_message.innerHTML = "PLAY FULLSCREEN";
    }
    
    overlay.style.opacity = "0";
    video.play();
    video.requestFullscreen();

    present_opened = 1;
}

// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

function display_present()
{
    var overlay = document.getElementById('video-overlay');
    var play_button = document.getElementById('play-button');
    var timer_display = document.getElementById('timer-display');
    var message_text = document.getElementById('message-text');

    play_button.style.visibility = "visible";
    timer_display.style.visibility = "hidden";
    message_text.innerHTML = "Elf Sam (Sammycat) is back.";
    overlay.setAttribute("onclick", "play_pause_video()");
    overlay.classList.add("hoverable");
    
    change_video_source("data/message2.webm");
}

function display_christmas_message()
{
    var play_button = document.getElementById('play-button');
    var message_text = document.getElementById('message-text');
    var image_icon = document.getElementById("img-icon");
    var timer_display = document.getElementById('timer-display');
    var overlay = document.getElementById('video-overlay');
    var video = document.getElementById('play-target');

    video.style.opacity = "0";
    overlay.style.opacity = "1";
    
    overlay.removeAttribute("onclick");
    overlay.classList.remove("hoverable");
    message_text.innerHTML = "Merry Christmas!";
    play_button.style.visibility = "visible";
    timer_display.style.visibility = "hidden";
    image_icon.setAttribute("src", "data/elf-hat.png");
}

function update_timer()
{
    // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate.getTime() - now;
    
  // Time calculations for days, hours, minutes and seconds
  // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor(distance / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="timer"
  document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0 && playing_present == 0) {
    playing_present = 1;
    clearInterval(time_update_interval);
    // document.getElementById("timer").innerHTML = "f";
    display_present();
  }
}

// Update the count down every 1 second
//
var time_update_interval;
function start_countdown()
{
    var timer_display = document.getElementById('timer-display');
    var overlay = document.getElementById('video-overlay');
    timer_display.style.visibility = "visible";
    overlay.classList.remove("hoverable");
    
    update_timer();
    time_update_interval = setInterval(update_timer, 1000);
}

function doc_loaded()
{
    // Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyDgUBKCj4a4AVdhOk_lx9olIJqOn4Q1vlw",
    authDomain: "sams-present.firebaseapp.com",
    databaseURL: "https://sams-present-default-rtdb.firebaseio.com",
    projectId: "sams-present",
    storageBucket: "sams-present.appspot.com",
    messagingSenderId: "273364283287",
    appId: "1:273364283287:web:92a9b31a0bcaf0cfc91ed2"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const dbRef = firebase.database().ref()

    var stage = 1;
    
    dbRef.child("started-countdown").get().then((snapshot1) => {
      if (snapshot1.exists()) {
        var countdown_started = snapshot1.val();
        
        var time_retrieved = dbRef.child("time").get().then((snapshot2) => {
        if(snapshot2.exists())
        {
            time = snapshot2.val();
            countDownDate = new Date(time);
            console.log(countDownDate);
            if(countdown_started == 0)
            {
                stage = 0;
            }
            else if(countdown_started == 1)
            {
                stage = 1;
            }
            else
            {
                stage = 2;
            }
            
            if(stage ==  0)
            {
                console.log("starting stage 0");
                var play_button = document.getElementById('play-button');
                var video_overlay = document.getElementById('video-overlay');
                video_overlay.setAttribute("onclick", "play_pause_video()")
                video_overlay.classList.add("hoverable")
                play_button.style.visibility = "visible";

                video_overlay.classList.add("hoverable");
            }
            else if(stage == 1)
            {
                console.log("starting countdown");
                start_countdown();
            }
            else if(stage == 2)
            {
                display_christmas_message();
            }
        }
        else
        {
            console.log("Time not available.")
        }
        }).catch((error)=> {console.error(error)});
        
       
        
      } else {
        console.log("Countdown started not available");
      }
    }).catch((error) => {
      console.error(error);
    });

    console.log("stage is" + stage);
}

function update_volume()
{

    var video = document.getElementById('play-target')
    var volume_slider = document.getElementById('volume-control');
    console.log(volume_slider.value);
    video.volume = volume_slider.value / 100;
}

