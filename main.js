song1 = "";
song2 = "";
LeftWristX = 0;
RightWristX = 0;
LeftWristY= 0;
RightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload()
{
    song1 = loadSound("BAIXO.mp3");
    song2 = loadSound("MONTAGEM DO H.mp3");
}
function setup()
{
    canvas = createCanvas(500 , 400);
    canvas.position(680, 400 ,);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotposes);
    
}

function modelLoaded()
{
    console.log("The model has been loaded");
}

function draw()
{
    image(video , 0 , 0, 500, 400);
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    fill('#ff0000');
    stroke('#ff0000')
    if(scoreRightWrist>0.2)
    {
        circle(RightWristX , RightWristY , 20);
        song2.stop();
        if(song1status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - BAIXO";
        }
    }
    if(scoreLeftWrist>0.2)
    {
        circle(LeftWristX , LeftWristY , 20);
        song1.stop();
        if(song2status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Motagem DO h";
        }
    }

}

function play_button()
{
    song.play();
    song.setVolume(1);
    song.rate(1);

}

function gotposes(results)
{
    if(results.length>0)
    {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Right Wrist = "+ scoreRightWrist +"Score Left Wrist = "+ scoreLeftWrist);

        console.log(results);
        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWrist x = "+ LeftWristX + "LeftWrist y = "+ LeftWristY);

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("RightWrist x = "+ RightWristX +"RightWrist y = "+ RightWristY);


    }
}
