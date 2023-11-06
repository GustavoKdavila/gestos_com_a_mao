Webcam.set({
    widht:350,
    height:300,
    imageFormat:'png',
    pngQuality:90,
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot()
{
    Webcam.snap(function(data_uri)  {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LWrHwJTBl/model.json',modelLoaded);

function modelLoaded()
{
    console.log(modelLoaded);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results)  {
    if(error){
        console.error(error);
    }   else    {
        console.log(results);
        document.getElementById("resultGestureName").innerHTML = results[0].label;
        document.getElementById("resultGestureName2").innerHTML = results[1].label;
        prediction1 = results[0].label
        prediction2 = results[1].label
        speak();
        if(results[0].label == "Joinha")
        {
            document.getElementById("updateGesture").innerHTML = "&#128077;";
        }
        if(results[0].label == "Hang Loose")
        {
            document.getElementById("updateGesture").innerHTML = "&#129305;";
        }
        if(results[0].label == "Ok")
        {
            document.getElementById("updateGesture").innerHTML = "&#128076;";
        }


        if(results[1].label == "Joinha")
        {
            document.getElementById("updateGesture2").innerHTML = "&#128077;";
        }
        if(results[1].label == "Hang Loose")
        {
            document.getElementById("updateGesture2").innerHTML = "&#129305;";
        }
        if(results[1].label == "Ok")
        {
            document.getElementById("updateGesture2").innerHTML = "&#128076;";
        }
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speakData1 = "A primeira previsão é " + prediction1;
    speakData2 = "E a segunda previsão é" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}