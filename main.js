Webcam.set({
    height : 300,
    width : 350,
    image_format : 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach(" #camera ");

function welcome() {
    window.alert("Welcome to the hand gesture app, you can click a photo of your hand and the computer detect your gesture!")
}


function take_snapshot(){
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML= '<img id="captured_image" src="'+data_uri+'"  />';


    });
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance("image captured");
    synth.speak(utterThis);
}


console.log("ml5 version : ", ml5.version);


classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/03qXmaYLv/model.json", modelReady);


function modelReady(){
    console.log("model loaded!")
    
}

prediction_1 = "";
prediction_2 = "";



function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    //Add  classify(img, gotResult)
    classifier.classify(img, gotResult) ;
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance("predicting gesture");
    //call  speak(utterThis)
    synth.speak(utterThis);
}


function gotResult(error, results){
    if(error){
        console.error(error);

    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("result_gesture_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
    }

     //add  results[0].label == "Wave"

    if(results[0].label == "Wave"){
        document.getElementById("update_gesture").innerHTML = "🤚";
    }

    if(results[0].label == "Thumbs up"){ 
        //add id as update_gesture
        document.getElementById("update_gesture").innerHTML = "👍";
    }

    if(results[0].label == "Call Me"){
        document.getElementById("update_gesture").innerHTML = "🤙";
    }

    if(results[1].label == "Wave"){
        document.getElementById("update_gesture2").innerHTML = "🤚";
    }
  //add   results[1].label == "Thumbs up"
    if( results[1].label == "Thumbs up"){
        document.getElementById("update_gesture2").innerHTML = "👍";
    }

    if(results[1].label == "Call Me"){
        document.getElementById("update_gesture2").innerHTML = "🤙";
    }
}