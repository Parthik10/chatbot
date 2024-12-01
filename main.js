// Selecting HTML elements using predefined functions
var msgerForm = get(".msger-inputarea");
var msgerInput = get(".msger-input");
var msgerChat = get(".msger-chat");

// Constants for image paths and names for the bot and the user
var BOT_IMG = "bot.png";
var PERSON_IMG = "user.png";
var BOT_NAME = "BOT";
var PERSON_NAME = "Coderider";


var prompts = [
  ["hi"],
  ["a"],
  ["l"],
  ["c"],
  ["ev"],
  ["p"],
  ["e"],
  ["exit"]
  // ... (other prompt arrays)
];

var replies = [
  ["we have following options:<br> a for about<br> l for location<br>c for course<br>ev for events <br>p for placement<br>e for enquiry<br>exit to exit"],
  ["Graphic Era is known for its engineering and technology programs. It offers undergraduate and postgraduate degrees in various engineering courses, including Computer Science, Electronics and Communication, Mechanical Engineering, and more."],
  ["Road Society Area, Clement Town, Dehradun, Uttarakhand 248002"],
  ["Our university provide following courses:<br>1.Btech<br> cse<br>civil<br>mechanical<br><br>2.BBA<br><br>3.B.com<br><br>4.fashion design <br>....."],
  ["CISCT:Feb 22,2023<br>ICMTEA:Mar 20,2023<br>ICAICR:Aug 5,2023<br>IWSAB23:Aug 17,2023<br>DICCT-2024: Aug 21,2023<br>National Symposium on Avian Biology: Dec 28,2023"],
  ["Placements are at the core of University Education, especially in a rapidly growing country like India."],
  ["Connect to us via WhatsApp on 7617770113<br>For more, email us at admissions@gehu.ac.in or enquiry@gehu.ac.in<br> or to visit our site click on above icon☝ "],
  ["thank you for visiting us !!<br>visit again😄"],
  // ... (other reply arrays)
];

var alternative = ["I'm sorry, I didn't quite catch that😕"];

// Adding event listener for form submission
msgerForm.addEventListener("submit", event => {
  event.preventDefault();                                  // prevent submit
 
  var msgText = msgerInput.value;                           // Getting user input 
  if (!msgText) return; 

  msgerInput.value = "";                                       // Clearing the input field

  addChat(PERSON_NAME, PERSON_IMG, "right", msgText);            // Adding user's message to the chat on the right side

  output(msgText);                                                  // call output function for response
});

// Function to process user input and generate a response
function output(input) {
  var product;
  // Preprocessing the user input to simplify and standardize
  var text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")  
    .replace(/i feel /g, "hi")
    .replace(/whats/g, "what is")
    // ... (other replacements)

  // Checking if user input matches predefined prompts and generating a response
  if (compare(prompts, replies, text)) {
    product = compare(prompts, replies, text);
  }  else {
    // store alternative response in product
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Delaying the display of the bot's response 
  var delay = input.split(" ").length * 100;
  setTimeout(() => {
    // Adding the bot's response to the chat on the left side
    addChat(BOT_NAME, BOT_IMG, "left", product);
  }, delay);
}

// Function to compare user input with predefined prompts and get a corresponding reply
function compare(promptsArray, repliesArray, string) {
  var reply;
  var replyFound = false;

  for (var x = 0; x < promptsArray.length; x++) {
    for (var y = 0; y < promptsArray[x].length; y++) {
      // Checking if the user input matches any prompt
      if (promptsArray[x][y] === string) {
        var replies = repliesArray[x];
        // Selecting a random reply from the corresponding reply array
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    // Breaking out of the loop if a match is found
    if (replyFound) {
      break;
    }
  }

  // Returning the selected reply
  return reply;
}

// Function to add a chat message to the HTML
function addChat(name, img, side, text) {
  
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  // Inserting the message HTML into the chat container
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  // adding 500 pixels for visibility
  msgerChat.scrollTop += 500;
}

// Function to get an HTML element by selector
function get(selector, root = document) {
  return root.querySelector(selector);
}

// Function to format the current time as "HH:mm"
function formatDate(date) {
  var h = "0" + date.getHours();
  var m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}

// Function to generate a random number within a specified range
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
