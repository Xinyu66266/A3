

let dataServer;
let pubKey = "pub-c-40aac7c7-7f6a-4014-abae-03a62134ebaa";
let subKey = "sub-c-f08172a1-736e-47c5-ae3b-26cd288cd19e";
let secretKey = "sec-c-OWRiMTVlMTItNjUyNC00NWUxLTg4MzQtN2EzMDAzYTdiMzgy";

let channelName = "messageHistory";

let you;

function preload() { 

  // logic to create a random UUID
    you = random(0,1000000); 
    console.log(you);
    you = int(you);
    console.log(you);
    you = you.toString();
  
}


function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: you,
      secretKey: secretKey,
      heartbeatInterval: 0,
    });

     // listen for messages coming through the subcription feed on this specific channel. 

    dataServer.subscribe({ channels: [channelName] });
    dataServer.addListener({ message: readIncoming });
   
  
    textAlign(CENTER);

    sendTheMessage();
    fetchMessages();

}

function fetchMessages() {
console.log("fetching");

  dataServer.fetchMessages(
    {
        channels: [channelName],
        end: '15343325004275466',
        count: 100
    },
    (status, response) => {
      drawMessages(response.channels.messageHistory);
    }
  );
   
}

function drawMessages(messageHistory) {

  console.log("in draw messages");
  background(255);
  textSize(80);
  text(messageHistory.length + " messages retrieved", windowWidth/2 , windowHeight/2);

}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      messageText: "Entering the page"
    },
  });

}

function readIncoming(inMessage) {
  console.log(inMessage);
  fetchMessages();

}
