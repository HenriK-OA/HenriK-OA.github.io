
const filterClippingMoves = function(cellY, cellX, moves, board) {
    properMoves =[]
    moves.forEach(function(move) {
        const newMove = [cellY+move[0], cellX+move[1]]
        if (0<=newMove[0] && newMove[0] <= 7 && 0 <= newMove[1] && newMove[1] <= 7) {
            if (board[newMove[0]][newMove[1]] == undefined || board[newMove[0]][newMove[1]]["white"] != board[cellY][cellX]["white"]) {
                properMoves.push(newMove)
            }
        }
    })
    return properMoves;
} 
const findLegalMoves = function(cellY, cellX, board) {
    let legalMoves = []
    let direction = 1;
    const type = board[cellY][cellX]["type"];
    const white = board[cellY][cellX]["white"];
    const moved = board[cellY][cellX]["moved"];
    if (type == "knight") {
        legalMoves = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]
        legalMoves = filterClippingMoves(cellY, cellX, legalMoves, board)

    }

    if (type == "pawn") {
        if (white == false) {
            direction = -1;
        }
        if (board[cellY+direction][cellX] == undefined) {
            legalMoves.push([cellY+direction, cellX])
            if (moved == false && board[cellY+2*direction][cellX] == undefined) {
                legalMoves.push([cellY + 2*direction,cellX])
            }
        }
        if (board[cellY+direction][cellX+1] != undefined && board[cellY+direction][cellX+1]["white"] != white) {
            legalMoves.push([cellY+ 1*direction,cellX + 1])
        }
        if (board[cellY+direction][cellX-1] != undefined && board[cellY+direction][cellX-1]["white"] != white) {
            legalMoves.push([cellY+ 1*direction,cellX - 1])
        }

    }
    if (type == "king") {
        legalMoves = [[-1,-1],[-1,1],[1,-1],[1,1],[0,-1],[-1,0],[0,1],[1,0]]
        legalMoves = filterClippingMoves(cellY, cellX, legalMoves, board)
    }

    if (type == "rook" || type == "queen") {
        const keepSearching = [true, true, true, true]
        for (let i = 1; i<8; i++) {
            if (keepSearching[0] && cellY+i < 8 ) {
                if (board[cellY+i][cellX] == undefined) {
                    legalMoves.push([cellY+i,cellX])
                } else if (board[cellY+i][cellX]["white"] != white){
                    legalMoves.push([cellY+i,cellX])
                    keepSearching[0] = false;
                }
                else {
                    keepSearching[0] = false;
                }
            }
            if (keepSearching[1] && cellY-i >=0 ) {
                if (board[cellY-i][cellX] == undefined) {
                    legalMoves.push([cellY-i,cellX])
                } else if (board[cellY-i][cellX]["white"] != white){
                    legalMoves.push([cellY-i,cellX])
                    keepSearching[1] = false;
                }
                else {
                    keepSearching[1] = false;
                }
            }
            if (keepSearching[2] && cellX+i < 8 ) {
                if (board[cellY][cellX+i] == undefined) {
                    legalMoves.push([cellY,cellX+i])
                } else if (board[cellY][cellX+i]["white"] != white){
                    legalMoves.push([cellY,cellX+i])
                    keepSearching[2] = false;
                }
                else {
                    keepSearching[2] = false;
                }
            }
            if (keepSearching[3] && cellX-i >= 0 ) {
                if (board[cellY][cellX-i] == undefined) {
                    legalMoves.push([cellY,cellX-i])
                } else if (board[cellY][cellX-i]["white"] != white){
                    legalMoves.push([cellY,cellX-i])
                    keepSearching[3] = false;
                }
                else {
                    keepSearching[3] = false;
                }
            }

        }
    }
    if (type == "bishop" || type == "queen") {
        const keepSearching = [true, true, true, true]
        for (let i = 1; i<8; i++) {
            if (keepSearching[0] && cellY+i < 8 && cellX+i < 8) {
                if (board[cellY+i][cellX+i] == undefined) {
                    legalMoves.push([cellY+i,cellX+i])
                } else if (board[cellY+i][cellX+i]["white"] != white){
                    legalMoves.push([cellY+i,cellX+i])
                    keepSearching[0] = false;
                }
                else {
                    keepSearching[0] = false;
                }
            }
            if (keepSearching[1] && cellY+i < 8 && cellX-i >= 0) {
                if (board[cellY+i][cellX-i] == undefined) {
                    legalMoves.push([cellY+i,cellX-i])
                } else if (board[cellY+i][cellX-i]["white"] != white){
                    legalMoves.push([cellY+i,cellX-i])
                    keepSearching[1] = false;
                }
                else {
                    keepSearching[1] = false;
                }
            }
            if (keepSearching[2] && cellY-i >= 0 && cellX+i < 8) {
                if (board[cellY-i][cellX+i] == undefined) {
                    legalMoves.push([cellY-i,cellX+i])
                } else if (board[cellY-i][cellX+i]["white"] != white){
                    legalMoves.push([cellY-i,cellX+i])
                    keepSearching[2] = false;
                }
                else {
                    keepSearching[2] = false;
                }
            }
            if (keepSearching[3] && cellY-i >= 0 && cellX-i >= 0) {
                if (board[cellY-i][cellX-i] == undefined) {
                    legalMoves.push([cellY-i,cellX-i])
                } else if (board[cellY-i][cellX-i]["white"] != white){
                    legalMoves.push([cellY-i,cellX-i])
                    keepSearching[3] = false;
                }
                else {
                    keepSearching[3] = false;
                }
            }

        }
    }

    return legalMoves;
}

const findAllLegalMoves = function (white, board) {
    const moveMatrix = [[],[],[],[],[],[],[],[]]
    for (let i = 0; i<8; i++) {
        for (let j = 0; j<8; j++) { 
            if (board[i][j] != undefined && board[i][j]["white"] == white) {
                const moves = findLegalMoves(i, j, board)
                if (moves != undefined) {
                    moveMatrix[i][j] = moves
                }
                
            }
            
        }
    }
    return moveMatrix
}

const determineIfKingInCheck = function(turn, board, pseudo=false) {
    // Get king pos
    let kingYPos; 
    let kingXPos;
    let inCheck = false;
    for (let i = 0; i <8; i++) {
        for (let j = 0; j <8; j++) {
            if(board[i][j] != undefined && board[i][j]["type"] == "king") {
                if ((!board[i][j]["white"] && !turn) || (board[i][j]["white"] && turn)){
                    kingYPos = i;
                    kingXPos = j;
                }
                
            }
        }
    }
    // Get legal moves of player who just played, to see if king has been put in check

    let allLegalMoves = findAllLegalMoves(!turn, board)

    for (let i = 0; i <8; i++) {
        for (let j = 0; j <8; j++) {
            if (allLegalMoves[i][j] != undefined) {
                allLegalMoves[i][j].forEach(function(move) {
                    if (move[0] == kingYPos && move[1] == kingXPos) {
                        inCheck = true;
                        if (!pseudo) {
                            $("#"+ kingYPos + kingXPos).addClass("inCheck")
                        }
                        
                    }
                })
            }
            
        }
    }
    return inCheck
}