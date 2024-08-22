const checkErrors = function () {
    if (checkIfSolved()) {
        alert("You win!");
    } else {
        $(".cell").removeClass("error")
        checkRowErrors()
        checkColumnErrors()
        checkThreeCellErrors()
    }
    
    
}
const checkRowErrors = function () {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            for (let k = j+1; k < 9; k++) {
                if (board[i][j] == board[i][k] && board[i][j]!= 0) {
                    $("#" + i + j).addClass("error")
                    $("#" + i + k).addClass("error")
                }
            }
        }
    }
}
const checkColumnErrors = function () {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            for (let k = j+1; k < 9; k++) {
                if (board[j][i] == board[k][i] && board[j][i]!= 0) {
                    $("#" + j + i).addClass("error")
                    $("#" + k + i).addClass("error")
                }
            }
        }
    }
}

const checkThreeCellErrors = function () {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            
        }
    }
}


const checkIfSolved = function () {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] != solvedBoard[i][j]) {
                return false;
            }
        }
    }
    return true;
}