class ship{
    constructor( length ){
        this.length= length;
        this.hits=0;
        this.Such= this.isSuck();
        this.cells= [];
    }

    hit(){
         this.hits++;
         return this.hits;
    }

    isSuck(){
        if(this.length === this.hits) return true;
        return false;

    }
}
class Gameboard{
    constructor( size ){
        this.board= this.createBoard( size );
        this.ships= [];

    }
    

    createBoard( size ){
        let board= []
        for(let i=0; i<size; i++){
            for(let j=0; j<size; j++){
                let place= ({position:[j, i], hasShip: false, isShot: false });
                board.push(place);
            }
        }
        return board;
    }
    placeShip( ship, row, colum ){
        if((ship.length+colum)>10)
        colum= 10-ship.length;
    else{
       let index= row*10+ colum;
        for(let i=index; i<index+ship.length; i++){
            if(this.board[i].hasShip=== true) return false;
        }
        for(let i=index; i<index+ship.length; i++){
            this.board[i].hasShip= true; 
        }
        this.ships.push(ship);
        return true;
    }


    }

    receiveAttack( index ){
        this.board[ index].isShot= true;
    }

    missedAttack(){
        let missedCells=[];
        for(let i=0; i<this.board.length; i++){
            let cell= this.board[i];
            if(cell.hasShip == false && cell.isShot == true){
                missedCells.push(cell.position);
            }
        }
        return missedCells;
    }

    allShipsSuck(){
        let count=0;
        let sum=0;
        for(let i=0; i<this.ships.length; i++){
            sum= sum+ this.ships[i].length;
        }
        for(let i=0; i<this.board.length; i++){
            if((this.board[i].hasShip === true) && (this.board[i].isShot === true)){
                count= count+1;
            }
        }
        if(sum === count){
            return true;
        }
        else return false;
    }

    createRandomShips(){
        let lengthArr= [4, 3, 3, 2, 2];
        for(let i=0; i<lengthArr.length; i++){
            let newShip= new ship( lengthArr[i] );
            let row= Math.floor(Math.random()*10);
            let colum= Math.floor(Math.random()*10);
            let isCreate= this.placeShip(newShip, row, colum);
            if(isCreate === false ){
                lengthArr.push( lengthArr[i] );
            }
        }
    }


}
class player{
    constructor( ){
        this.name= 'Player'
        this.level= 'Easy';
        this.gameboard= new Gameboard( 10 );
        this.opponentBoard= new Gameboard( 10);
        this.opponentBoard.createRandomShips();
    }

    attack( index ){ 
            this.opponentBoard.board[index].isShot= true;

    }

    randomAttack(){
        let colum= Math.floor(Math.random()*10);
        let row= Math.floor(Math.random()*10);
        let index= row*10+colum;
        if(this.gameboard.board[index].isShot === false){
            this.gameboard.board[index].isShot= true;
            return [colum, row, index];
        }
        else return this.randomAttack();
        
    }

    hardAttack( ){
        for(let i=0; i<this.gameboard.board.length; i++){
            if((this.gameboard.board[i].hasShip === true) && (this.gameboard.board[i].isShot === false)){
                this.gameboard.board[i].isShot = true;
                let x= this.gameboard.board[i].position[0];
                let y= this.gameboard.board[i].position[1];
                let newplace=[x, y, y*10+x];
                return newplace;
               }    
        }
        return this.randomAttack();
           
           
    }



}


const playerBoard= document.querySelector("#playerBoard");
const computerBoard=document.querySelector("#computerBoard");
const computerContainer= document.querySelector("#computer")
const startButton= document.querySelector( '#playButton');
const winWindow= document.querySelector("#popup");
const playAgain= document.querySelector("#play-again");
const statusbar= document.querySelector("#statusbar");
const statusWin= document.querySelector(".statusWin");
const darkmode= document.querySelector("#background");
const main= document.querySelector("#main");
const gameboard= document.querySelector("#gameBoard");
const homepage= document.querySelector("#homePage");
const openGame= document.querySelector("#openGame");
const nameBoard= document.querySelector("#nameBoard");
const backHomebutton= document.querySelector("#backHome")
window.scrollTo({top: 0,
    behavior: "smooth"});
openGame.addEventListener("click", openGamePage);
backHomebutton.addEventListener("click", backHome);
let player1= new player();
console.log( player1 );


function openGamePage(){
    homepage.style.top='-100%';
    winWindow.style.transform= 'translate(-50%, -50%) scale(0.1)';
    homepage.style.visibility='hidden';
    gameboard.style.visibility='visible';
    document.body.style.overflow='auto';
    if(document.querySelector('#name').value ) {
        player1.name=document.querySelector('#name').value;
    }
    if(document.querySelector('#levels').value ) {
        player1.level=document.querySelector('#levels').value;
    }
    nameBoard.textContent= player1.name;

}

function backHome(){
    homepage.style.top='0';
    winWindow.style.transform= 'translate(-50%, -50%) scale(1)';
    homepage.style.visibility='visible';
    gameboard.style.visibility='hidden';
    document.body.style.overflow='hidden';
}





const playerCells= [];
for(let i=0; i<10; i++){
    let row=[];
    for(let j=0; j<10; j++){
        let cell= document.createElement("div");
        cell.setAttribute("indexX", j);
        cell.setAttribute("indexY", i);
        cell.classList.add("cell");
        playerBoard.appendChild(cell);
        row.push(cell);
    }
    playerCells.push(row);
}
console.log(playerCells);

const computerCells= [];
for(let i=0; i<10; i++){
    let row=[];
    for(let j=0; j<10; j++){
        let cell= document.createElement("div");
        cell.setAttribute("indexX", j);
        cell.setAttribute("indexY", i);
        cell.classList.add("cell");
        computerBoard.appendChild(cell);
        row.push(cell);
    }
    computerCells.push(row);
}


computerContainer.style.display= 'none';

let start=0;
let childs=[];
let ships= [new ship(4), new ship(3), new ship(3), new ship(2), new ship(2)];
computerCells.forEach((row)=> {row.forEach((cell) =>{ cell.addEventListener("mouseover", cellHoverComputer)})});
computerCells.forEach((row)=> {row.forEach((cell) =>{ cell.addEventListener("mouseout", cellOutComputer)})});
computerCells.forEach((row)=> {row.forEach((cell) =>{ cell.addEventListener("click", playerAttack)})});
playerCells.forEach((row)=> {row.forEach((cell) =>{ cell.addEventListener("click", addNewShip)})});

startButton.addEventListener("click", startGameClick);

function startGameClick(){
    if( start === 0){
        if(player1.gameboard.ships.length === 5){
            computerContainer.style.display= 'block';
            statusbar.textContent= 'its your turn, attack the computer!'; 
            startButton.textContent= 'Play Again';
            start=1;
        }
        
    }
    else if(start === 1){
     startNewGame();
    }
    
    

}

function cellHoverComputer(){
    if( this.style.backgroundColor == 'gray') return;
    if( this.style.backgroundColor == 'green') return;
    if( this.style.backgroundColor == 'yellow') return;
        this.style.backgroundColor= 'red';
    
    
}
function cellOutComputer(){
    if( this.style.backgroundColor == 'gray') return;
    if( this.style.backgroundColor == 'green') return;
    if( this.style.backgroundColor == 'yellow') return;
        this.style.backgroundColor= 'white';
    
    
}
function showShips(){
    let board= player1.gameboard.board;
    for(let i=0; i<board.length; i++){
        if(board[i].hasShip === true){
            let x= board[i].position[0];
            let y=board[i].position[1];
            let row=playerCells[y];
            row[x].style.backgroundColor='blue';
        }
    }
}


function addNewShip(){
    if(ships.length== 0){
        statusbar.textContent= 'click on "Start Game" button'; 
        return;
    }
    let row= this.getAttribute('indexy');
    let colum= this.getAttribute('indexx');
    let newship= ships.pop();
    colum= findNum( colum );
    row= findNum( row);
    if(colum+ newship.length >9){
        colum= 10- newship.length;
    }
    let isCreate= player1.gameboard.placeShip( newship, row, colum);
    if(isCreate ==false){
        ships.push(newship);
    }
    showShips();

}

function findNum( num ){
const nums=['0', '1', '2', '3', '4', '5', '6','7','8', '9'];
for(let i=0; i<nums.length; i++){
    if(nums[i]== num){
        return i;
    }
}
}

function playerAttack(){
    let row= this.getAttribute('indexy');
    let colum= this.getAttribute('indexx');
    colum= findNum( colum );
    row= findNum( row); 
    let index= row*10+ colum;
    if(player1.opponentBoard.board[index].isShot == true) return;
    player1.attack( index );
    if(player1.opponentBoard.board[index].hasShip == false){
        let water=document.createElement('img');
        water.src='water.gif';
        water.style.width='50px';
        water.style.height='50px';
        this.appendChild(water);
        childs.push(water);
    }
    if(player1.opponentBoard.board[index].hasShip == true){
        statusbar.textContent='The enemy fires a shot into your waters ...... its a hit!'
        this.style.backgroundColor='yellow';
        let bomb=document.createElement('img');
        bomb.src='bomb.gif';
        bomb.style.width='50px';
        this.appendChild(bomb);
        childs.push(bomb);
    }
    console.log(player1.opponentBoard.allShipsSuck()== true);
    if(player1.opponentBoard.allShipsSuck()== true){
     createWinWindow( 'YOU' );

    }
    computerAttack();
}

function computerAttack(){
    let position=[];
    if(player1.level === 'Hard'){
         position= player1.hardAttack();
    }
    else  position= player1.randomAttack();
    let row= position[1];
    let colum= position[0];
    let index= position[2];
    let rowArray=  playerCells[row];
    if(player1.gameboard.board[index].hasShip == false){
        let water=document.createElement('img');
        water.src='water.gif';
        water.style.width='50px';
        water.style.height='50px';
        rowArray[colum].appendChild(water);
        childs.push(water);
        
    }
    if(player1.gameboard.board[index].hasShip == true){
        rowArray[colum].style.backgroundColor= 'blue';
        let bomb=document.createElement('img');
        bomb.src='bomb.gif';
        bomb.style.width='50px';
        rowArray[colum].appendChild(bomb);
        childs.push(bomb);
        
    }
    if(player1.gameboard.allShipsSuck()== true){
        createWinWindow( 'COMPUTER' );
    }
}

function createWinWindow( name ){
    window.scrollTo({top: 0,
        behavior: "smooth"});
    document.body.style.overflow='hidden';
    winWindow.style.visibility= 'visible';
    winWindow.style.transform= 'translate(-50%, -50%) scale(1)';
    winWindow.style.top= '50%';
    darkmode.style.display= 'block';
    statusWin.textContent= `${name} WIN!`;
    playAgain.addEventListener("click", startNewGame);

}

function startNewGame(){
    homepage.style.top='-100%';
    homepage.style.visibility='hidden';
    gameboard.style.visibility='visible';
    computerContainer.style.display= 'none';
    statusbar.textContent= ' place five boats ...'; 
     ships= [new ship(4), new ship(3), new ship(3), new ship(2), new ship(2)];
    computerCells.forEach((row)=> {row.forEach((cell) =>{ cell.style.backgroundColor='white'})});
    playerCells.forEach((row)=> {row.forEach((cell) =>{ cell.style.backgroundColor='white'})});
    player1= new player();
    while(childs.length != 0){
        (childs.pop()).remove();
    }
    start=0;
    startButton.textContent= 'Start Game';

}
