//We are going to simulate a click on the drum elements if a key matching the letter is keyboard pressed
// //this means we won't actually click on the drum but simulate a click,when the relevant key is pressed
//phone
$("h1").click(function(){
    // 1.let the CPU play
   
    level=0; 
   $("#level-title").text("Level: "+level)
   CPU_Clicks= StartOver();
   startCountdown()
   console.log("CPU_Clicks:"+CPU_Clicks);
    No_CPU_Plays=CPU_Clicks.length;
    if (intervalId !== null) {
              clearInterval(intervalId);
              countdown = 10;
              startCountdown();
              console.log("Countdown restarted!");
          }
    }); 

//PC
$(document).keypress(function(){
   // 1.let the CPU play
   
    level=0; 
   $("#level-title").text("Level: "+level)
   CPU_Clicks= StartOver();
   startCountdown()
   console.log("CPU_Clicks:"+CPU_Clicks);
    No_CPU_Plays=CPU_Clicks.length;
    if (intervalId !== null) {
              clearInterval(intervalId);
              countdown = 10;
              startCountdown();
              console.log("Countdown restarted!");
          }
   
   
   }); 
    
//Countdown

let countdown = 10;
let intervalId = null;

function startCountdown() {
    intervalId = setInterval(() => {
        if (countdown <= 0) {
            GameOver();
            clearInterval(intervalId);
            console.log("Countdown finished!");
           // GameOver();
            return;
        }

        document.getElementById('countdown').textContent = countdown;
        countdown--;
    }, 1000);
}

// document.addEventListener('keydown', (event) => {
//     if (intervalId !== null) {
//         clearInterval(intervalId);
//         countdown = 10;
//         startCountdown();
//         console.log("Countdown restarted!");
//     }
// }); 


//CPU random clicks
CPU_Clicks=[];
var Num_Buttons=$(".btn").length
function CPU_Play(){
        var Randomiser=Math.random()*Num_Buttons;
        Randomiser=Math.floor(Randomiser);
         var RandomClick=$(".btn")[Randomiser];
        //SimulateClick(RandomClick);
   // console.log(RandomClick.id);
    var RandomClickId=RandomClick.id;
   playSound( RandomClickId); 
     animatePress(RandomClickId);
   CPU_Clicks.push(RandomClick.id);
   // console.log(RandomClick.id);
   // startCountdown();
return CPU_Clicks;
}
var level=0;
var MoneyCash=0;
 var levelArray=['0'];
    PlayerPattern=[];
//The Start of Playing sequence of the game
$(".btn").click(function(event){
   var ClickedButton=event.target;//
   //console.log(ClickedButton.id);
   PlayerPattern.push(ClickedButton.id);
   //console.log("Execution: " +PlayerPattern);
   animatePress(ClickedButton.id)
   playSound(ClickedButton.id)
  

 if(PlayerPattern.length>0){
       PlayerPattern=PlayerPattern;
    Player_position= PlayerPattern.length-1;
    No_CPU_Plays=CPU_Clicks.length;
    // console.log(No_CPU_Plays)
   if(PlayerPattern[Player_position]===CPU_Clicks[Player_position]){
          
          // console.log
           if(PlayerPattern.length===No_CPU_Plays){
         level++;
          MoneyCash+=10;//Money Reward
           document.getElementById('moneyValue').innerHTML= MoneyCash;
           console.log(document.getElementById('moneyValue').innerHTML);
         levelArray.push(level)
         $("#level-title").text("Level: "+level)//WINNING A LEVEL
         
         
         //StartOver()
          if (intervalId !== null) {
            clearInterval(intervalId);
            countdown = 10;
            setTimeout(function(){CPU_Play();},2000);
            startCountdown();
            console.log("Countdown restarted!");
           
         
          }
         PlayerPattern=[];
         //restart countdown
         
       }
       
   } 
   else{//LOSING AND START over
         Doyile= new Audio('sounds/wrong.mp3')
         Doyile.play();
         $("body").addClass("game-over");
         $("#level-title").text("Game Over, Press Any Key to Restart")
         setTimeout(function(){ $("body").removeClass("game-over")},500);
         MoneyCash=0;
   }
}
///end of Game Sequence

});

 //essential functions below

  


function StartOver(){
      CPU_Clicks=[];
      PlayerPattern=[];
      setTimeout(function() {
         console.log('Hello, world!');
       }, 2000);
      CPU_Clicks= CPU_Play();
     return CPU_Clicks;
   }



 function playSound(id){Buzz= new Audio('sounds/'+id+'.mp3');
  Buzz.play();};
   
function animatePress(colour) {
   $("#" + colour).addClass("pressed");
   setTimeout(function(){$("#" + colour).removeClass("pressed")},100);
}


function GameOver(){
   Doyile= new Audio('sounds/wrong.mp3')
   Doyile.play();
   $("body").addClass("game-over");
   $("#level-title").text("Game Over, Press Any Key to Restart")
   setTimeout(function(){ $("body").removeClass("game-over")},500);
}
