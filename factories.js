class ship{
    constructor( length ){
        this.length= length;
        this.hits=0;
        this.Such= this.isSuck();
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
        this.hits=0;

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
        if((ship.length+colum)>9)
        return false;
    else{
       let index= row*10+ colum;
        for(let i=index; i<index+ship.length; i++){
            if(this.board[i].hasShip=== true) return false;
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
        for(let i=0; i< this.ships.length; i++){
            if(this.ships[i].isSuck()==false) return false;
        }
        return true;
    }

    createRandomShips(){
        let lengthArr= [4, 3, 3, 2, 2];
        for(let i=0; i<lengthArr.length; i++){
            let newShip= new ship( lengthArr[i] );
            let row= Math.floor(Math.random()*9);
            let colum= Math.floor(Math.random()*9);
            let isCreate= this.placeShip(newShip, row, colum);
            if(isCreate === false ){
                lengthArr.push( lengthArr[i] );
            }
        }
    }


}


class player{
    constructor( Name= 'player'){
        this.name= Name;
        this.gameboard= new Gameboard( 10 );
        this.opponentBoard= new Gameboard( 10);
        this.opponentBoard.createRandomShips();
    }

    attack( index ){
        if(this.opponentBoard.board[index].isShot === false){
            this.opponentBoard.board[index].isShot= true;
            console.log(index);
            return;}
            else return this.attack();  

    }

    randomAttack(){
        let index= Math.floor(Math.random()*99);
        if(this.gameboard.board[index].isShot === false){
            this.gameboard.board[index].isShot= true;
            console.log(index);
            return index;
        }
        else return this.computerAttack();
        

    }


}

const player1= new player( 'Or' );
console.log( player1 );
player1.attack(3, 4);

