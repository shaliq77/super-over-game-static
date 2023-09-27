const strikebutton =  document.getElementById("strike") 
const resetbutton =  document.getElementById("reset") 
const $team1score =  document.getElementById("score-teeam1") 
const $team1wickets =  document.getElementById("wickets-teeam1") 
const $team2score =  document.getElementById("score-teeam2") 
const $team2wickets =  document.getElementById("wickets-teeam2")

const strikeAudio = new Audio("http://bit.ly/so-ball-hit")
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer")

var team1score = 0
var team1wickets = 0
var team2score = 0
var team2wickets = 0
var team1ballsfaced = 0
var team2ballsfaced = 0
var turn = 1

const possibleOutcomes = [0,1,2,3,4,6,"w"]

function gameOver(){
    gameOverAudio.play()
    if(team1score>team2score) alert("IND wins")
    if(team2score>team1score) alert("PAK wins")
    if(team2score===team1score) alert("It is another superover!")
}

function updateScore(){
    $team1score.textContent = team1score
    $team1wickets.textContent = team1wickets
    $team2score.textContent = team2score
    $team2wickets.textContent = team2wickets
}

resetbutton.onclick = () =>{
    window.location.reload()
}

strikebutton.onclick = ()=>{
    strikeAudio.pause()
    strikeAudio.currentTime = 0
    strikeAudio.play()

    // generate random strike value
    const randomElement = possibleOutcomes[Math.floor(Math.random()*possibleOutcomes.length)]
    
    if(turn === 2){
        // increasing the ball counts
        team2ballsfaced++
        // updating rhe score for the ball 
        document.querySelector(`#team2-superover div:nth-child(${team2Ballsfaced})`).textContent = randomElement 
        if(randomElement==="w"){
        team2wickets++
        }
        else{
        team2score += randomElement
        }
        if(team1ballsfaced===6 || team2wickets===2|| team2score>team1score){
        turn = 3
        gameOver()
        }
    }
    
    if(turn===1){
        team1ballsfaced++
        document.querySelector(`#team1-superover div:nth-child(${team1ballsfaced})`).textContent = randomElement
        if(randomElement === "W"){
            team1wickets ++
        }
        else{
            team1score += randomElement
        }
        if(team1ballsfaced===6 || team1wickets === 2) turn = 2
    }
    updateScore()
}