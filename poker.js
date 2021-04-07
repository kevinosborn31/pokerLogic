const cardValues = [
    '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
    '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
    '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
    '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
]


var hand = [];
var valuesArray = [];
var suitsArray = [];

function checkHand(){
    let handValue = process.argv[2];
    splitHandValue = handValue.split(" ");
    // console.log(handValue);
    var resultString = "";
    for(var i = 0; i < 5; i++){
        hand[i] = cardValues.indexOf(splitHandValue[i]);
        // console.log(hand);
    }
    convertHand();
    // console.log("Duplicate Cards: " + duplicateCards())
    switch(duplicateCards()){
        case "2":
             resultString = "1 Pair";
             break;
         case "22":
             resultString = "2 Pairs";
             break;
        case "3":
             resultString = "3 of a Kind";
             break;
        case "23":
        case "32":
             resultString = "Full House";
             break;
        case "4":
             resultString = "4 of a Kind";
             break;
        case "5":
             resultString = "5 of a Kind";
             break;
        default:
             if(isStraight()){
                  resultString = "Straight";     
             }
             if(isAceStraight()){
                  resultString = "Ace Straight";
             }
             break;
   }
   if(isFlush()){
        if(resultString){
             resultString += " and Flush";     
        }
        else{
             resultString = "Flush";
        }
   }
   if(!resultString){
        resultString = "nothing...";
   }
   console.log(resultString);
}  

function convertHand(){
   for(var i = 0; i < 5; i ++){
        valuesArray[i] = hand[i] % 13;
        suitsArray[i] = Math.floor(hand[i] / 13);     
   }
}


function isFlush(){
    for(var i = 0; i < 4; i ++){
         if(suitsArray[i] != suitsArray[i+1]){
              return false;
         }
    }
    return true;
}

function isStraight(){
    var lowest = getLowest();
    for(var i = 1; i < 5; i++){
         if(occurrencesOf(lowest + i) != 1){
              return false
         }     
    }
    return true;
}

function isAceStraight(){
    var lowest = 9;
    for(var i = 1; i < 4; i++){
         if(occurrencesOf(lowest + i) != 1){
              return false
         }     
    }
    return occurrencesOf(1) == 0;
}

function getLowest(){
    var min = 12;
    for(var i = 0; i < valuesArray.length; i++){
         min = Math.min(min, valuesArray[i]);     
    }
    return min;     
} 

function duplicateCards(){
    var occurrencesFound = []; 
    var result = "";
    for(var i = 0; i < valuesArray.length; i++){
         var occurrences = occurrencesOf(valuesArray[i]);
         if(occurrences > 1 && occurrencesFound.indexOf(valuesArray[i]) == -1){
              result += occurrences; 
              occurrencesFound.push(valuesArray[i]);    
         }
    }
    return result;
}

function occurrencesOf(n){
    var count = 0;
    var index = 0;   
    do{          
         index = valuesArray.indexOf(n, index) + 1;  
         if(index == 0){
              break;
         }
         else{
              count ++;
         }
    } while(index < valuesArray.length);
    return count;
}  

console.log(checkHand());