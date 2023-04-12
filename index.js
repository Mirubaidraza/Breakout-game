const grid=document.querySelector('.Grid')
const scoreDisplay=document.querySelector("#score")
const blockWidth=100
const blockHeight=25
const boardWidth=560
const boardheight=300
const userStart=[230,10]
let currentPos=userStart
const ballStart=[270,40]
const ballCurrent=ballStart
let timerId;
const ballDiamter=20
let xDir=2
let yDir=2
let score=0
//create the block
class Block{
    constructor(xAxis,yAxis){
        this.bottomLeft=[xAxis,yAxis]
        this.bottomRight=[xAxis+blockWidth,yAxis]
        this.topLeft=[xAxis+blockHeight,yAxis]
        this.topRight=[xAxis+blockHeight,yAxis+blockWidth]
    }
}
//all my blocks
const blocks=[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210)
]
//draw  all the block
function addBlocks(){

for(let i =0;i<blocks.length;i++){
    const block=document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1]+'px'
    grid.appendChild(block)
}
}

addBlocks()

//Add User
const user=document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

function drawUser(){
    user.style.left=currentPos[0]+'px'
    user.style.bottom=currentPos[1]+'px'
}

function drawBall(){
    ball.style.left=ballCurrent[0]+'px'
    ball.style.bottom=ballCurrent[1]+'px'
}
 
//move User
function moveUser(e){
    switch(e.key){
        case'ArrowLeft' :
        if(currentPos[0]>0)
        currentPos[0]-=10 
        drawUser()
        break;
        case'ArrowRight' :
        if(currentPos[0]<boardWidth-100)
        currentPos[0]+=10 
        drawUser()
        break;
          

    }
}
document.addEventListener('keydown',moveUser)
const ball=document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move Ball
function moveBall()
{
ballCurrent[0]+=xDir
ballCurrent[1]+=yDir
drawBall()
checkForCollisions()
}


timerId=setInterval(moveBall,30)

//collison check

function checkForCollisions(){
  
    for(let i =0;i<blocks.length;i++){
        if(ballCurrent[0]>blocks[i].bottomLeft[0]
            && ballCurrent[0]<blocks[i].bottomRight[0]
            && (ballCurrent[1]+ballDiamter)>blocks[i].bottomLeft[1]
            &&ballCurrent[1]<blocks[i].topLeft[1]){
                const allBlocks= Array.from(document.querySelectorAll('.block'))
                allBlocks[i].classList.remove('block')
                blocks.splice(i,1)
                score++
                scoreDisplay.innerHTML=score
                changeDir()
        }
    }
    //User collisions
    if((ballCurrent[0]>currentPos[0]
        &&ballCurrent[0]<currentPos+blockWidth)
        &&(ballCurrent[1]>currentPos[1]&&ballCurrent[1]<currentPos[1]+blockHeight))
    //wall
    if(ballCurrent[0]>=boardWidth-ballDiamter 
    || ballCurrent[1]>=boardheight-ballDiamter
    || ballCurrent[0]===0
    ){
        changeDir()
    }
if(ballCurrent[1]<=0){
    clearInterval(timerId)
    scoreDisplay.innerHTML="you lose"
    removeEventListener('keydown',moveUser)
}
}
function changeDir(){
    if(xDir=== 2 && yDir === 2){
        yDir=-2
        return
    }
    if(xDir===2 && yDir===-2){
        xDir=-2
        return
    }
    if(xDir===-2 && yDir===-2){
        yDir=2
        return
    }
    if(xDir===-2 && yDir===2){
        xDir=2
        return
        
    }
}