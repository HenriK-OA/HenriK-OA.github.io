

let turn = "White";
$("#turnDisplay").children().eq(0).html(turn+" turn")
$("#turnDisplay").addClass("whiteTurn")
let allLegalMoves = findAllLegalMoves(true, board)
$(".cell").on("click", function () {
    const destCellY = Number($(this).attr('id').charAt(0));
    const destCellX = Number($(this).attr('id').charAt(1));
    console.log(board[destCellY][destCellX])
    console.log(destCellY)
    console.log(destCellX)
    // Määrame Kas kord on 6ige
    if ($('.selected').length == 0) {
        if (board[destCellY][destCellX]["white"] && turn =="White" || !board[destCellY][destCellX]["white"] && turn=="Black") {
            $(this).addClass("selected");
            const legalMoves = allLegalMoves[destCellY][destCellX];
            legalMoves.forEach(function(move) {
                $("#" + move[0] + move[1]).addClass("legal")
            })
        }
    } else {
        const origCellX = Number($('.selected').eq(0).attr('id').charAt(0));
        const origCellY = Number($('.selected').eq(0).attr('id').charAt(1));
        
        if ($("#" + destCellY + destCellX).hasClass("legal")) {
            $('.cell').removeClass("legal")
            $('.cell').removeClass("inCheck")
            $(this).removeClass("selected");
            // Liiguta nupp mehaaniliselt
            board[destCellY][destCellX] = board[origCellX][origCellY];
            board[destCellY][destCellX]["moved"] = true;
            // Liiguta nupp graafiliselt
            $("#"+ destCellY + destCellX).html(svgs[board[origCellX][origCellY]["type"]])
            if (board[origCellX][origCellY]["white"] == true) {
                    $("#"+ destCellY + destCellX).addClass("white")
                    $("#"+ destCellY + destCellX).removeClass("black")
            } else {
                    $("#"+ destCellY + destCellX).addClass("black")
                    $("#"+ destCellY + destCellX).removeClass("white")
            }
            $("#"+ origCellX + origCellY).empty();
            // Kustuta vana nupp mehaaniliselt
            board[origCellX][origCellY] = undefined;

            let findWhiteMoves = false;
            if (turn == "White") {
                findWhiteMoves = true;
            }

            // Determine if player who didnt just play is in check after move
            let inCheck = determineIfKingInCheck(!findWhiteMoves, board)
            
            
            // find legal moves for next player
            allLegalMoves = findAllLegalMoves(!findWhiteMoves, board)
            if (inCheck) {
                const newLegalMoves = [[],[],[],[],[],[],[],[]]
                for (let i = 0; i <8; i++) {
                    for (let j = 0; j <8; j++) {
                        if (allLegalMoves[i][j] != undefined && allLegalMoves[i][j].length != 0) {
                            let newMoves = [];
                            allLegalMoves[i][j].forEach(function(move) {
                                const pseudoBoard = structuredClone(board)
                                if (move.length != 0) {
                                    pseudoBoard[move[0]][move[1]] = pseudoBoard[i][j];
                                    pseudoBoard[move[0]][move[1]]["moved"] = true;
                                    pseudoBoard[i][j] = undefined;
                                    if (!determineIfKingInCheck(!findWhiteMoves, pseudoBoard, true)) {
                                        newMoves.push(move);
                                    }
                                }
                                
                            })
                            if (newMoves != undefined && newMoves.length != 0) {
                                newLegalMoves[i][j] = newMoves;
                            }
                            
                        }
                        
                    }
                }
                allLegalMoves = newLegalMoves 
            }
            
            // Switch turns
            if (turn == "White") {
                turn = "Black"
            } else {
                turn = "White"
            }
            $("#turnDisplay").toggleClass("whiteTurn")
            $("#turnDisplay").toggleClass("blackTurn")
            $("#turnDisplay").children().eq(0).html(turn+" turn")

        } else {
            $('.cell').removeClass("legal")
            $(this).removeClass("selected");
        }

            
        
    }
    
    $('.cell').not(this).removeClass("selected");
})