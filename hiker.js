const wSelect = document.getElementById("w-select")
const vSelect = document.querySelector("#vol")
const whistleOne = document.getElementById("whistle-one")
const whistleTwo = document.getElementById("whistle-two")
const whistleThree = document.getElementById("whistle-three")
const whistleFour = document.getElementById("whistle-four")
const whistleFive = document.getElementById("whistle-five")
const timer = document.getElementById("sack-timer")
const allWhistles = [whistleOne, whistleTwo, whistleThree, whistleFour, whistleFive]




function playWhistle() {
    var whistle = allWhistles[wSelect.value]
    whistle.volume = vSelect.value / 100
    whistle.play()
}

function delayWhistle() {
    setTimeout(function() {
        playWhistle()
    }, timer.value * 1000)
}


if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    // Speech recognition API supported
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true; // Keep listening after each recognition
  
    recognition.onstart = function() {
      console.log('Speech recognition started');
    };
  
    recognition.onresult = function(event) {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.trim().toLowerCase(); // Convert command to lowercase and remove leading/trailing spaces
      console.log('Recognized:', command);
  
      // Check if the recognized command matches the specified phrase
      if (command === 'set hike') {
        delayWhistle(); // Call the function to set hike
      }
    };
  
    recognition.onerror = function(event) {
      console.error('Speech recognition error:', event.error);
    };
  
    document.getElementById('startButton').addEventListener('click', function() {
      recognition.start();
      console.log('Listening for voice commands...');
    });
  
    function delayWhistle() {
      console.log('Hike has been set!');
      // Add your logic here to execute when the voice command "set hike" is recognized
    }
  } else {
    // Speech recognition API not supported
    console.error('Speech recognition not supported');
  }
