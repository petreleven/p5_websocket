let initPos = {
  x:0,
  y:0
};

let targPos = {
  x:0,
  y:0
};

let selectedPos ={
  x:0,
  y:0
}

let connected = false;

const EASESPEED = 0.1;

function setup() {
  createCanvas(400, 400);
  
  background(0);
  noStroke();
}

function draw() {
 
  fill(0, 15);
  rect(0, 0, width, height);
  fill(255);
  
  square(initPos.x, initPos.y, 20);
   
  initPos.x += (targPos.x - initPos.x) * EASESPEED;
  initPos.y += (targPos.y - initPos.y) * EASESPEED;
  
  
  
}

function mouseClicked()
{
  if(connected){
    
    setSelectedPos(mouseX, mouseY);
    sendSelectCordToServer();

    //console.log("new target :");
    console.log(targPos);
  }
}

function setSelectedPos(tx, ty)
{
  selectedPos = {
    x : tx,
    y : ty,
  };
}

function sendSelectCordToServer()
{ 
  
  let str = JSON.stringify(selectedPos)
  serverConnecion.send(str); 
 
}

//websocket stuff

const SERVERADDRESS =  "wss://eight-oceanic-floor.glitch.me/";

const  serverConnecion = new WebSocket(SERVERADDRESS);

serverConnecion.onopen = function (){
  //serverConnecion.send("P5 connected to server!!");
  connected = true;
};

serverConnecion.onmessage = function(event)
{
  if(connected)
    {
        
        let obj = new Blob([event.data], {type:     'application/json'});
        obj.text().then(value => {
              self.objectName = JSON.parse(value);
              targPos = self.objectName
              
         })
        
  
         //console.log("Received: " , targPos); 
        
    }
}

