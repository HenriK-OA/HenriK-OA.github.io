const board = [[0,0,0,0,0,0,3,0,7],
                [0,5,0,2,4,0,0,0,0],
                [6,0,0,0,9,0,0,0,4],
                [0,0,0,1,3,0,0,6,0],
                [9,2,0,5,0,0,0,1,0],
                [8,0,3,7,0,0,0,0,0],
                [0,0,5,0,0,6,0,0,0],
                [0,4,7,0,0,8,6,0,0],
                [0,0,8,0,0,1,2,5,0]]
const solvedBoard = [[4,8,2,6,1,5,3,9,7],
                    [7,5,9,2,4,3,1,8,6],
                    [6,3,1,8,9,7,5,2,4],
                    [5,7,4,1,3,9,8,6,2],
                    [9,2,6,5,8,4,7,1,3],
                    [8,1,3,7,6,2,9,4,5],
                    [1,9,5,3,2,6,4,7,8],
                    [2,4,7,9,5,8,6,3,1],
                    [3,6,8,4,7,1,2,5,9]]
    
        
for (let i = 0; i < 9; i++) {
    const threeCell = $('<div class = "threeCell" id='+ i + '></div>');
    $("#board").append(threeCell);
}
for (let i = 0; i<9; i++) {
    for (let j = 0; j<9; j++) {
        const newCell = $('<div class = "cell" id='+ i + j + '><div class = "textDisplay"></div></div>');
        if (board[i][j] != 0) {
            newCell.addClass("locked")
            newCell.children().eq(0).html(board[i][j])
        }
        let id = 3*Math.floor(i/3) + Math.floor(j/3)
        if (id % 2 == 0) {
            newCell.addClass("primary") 
        } else {
            newCell.addClass("secondary")
        }
        $('#' + id).append(newCell);
    }
}
for (let i = 1; i<10; i++) {
    const newInputCell = $('<div class = "inputCell" id=in'+ i + '><div class = "textDisplay"></div></div>');
    newInputCell.children().eq(0).html(i)
    $("#inputBoard").append(newInputCell);
}
const newInputCell = $('<div class = "inputCell" id=in0><div class = "textDisplay"></div></div>');
newInputCell.children().eq(0).html("X")
$("#inputBoard").append(newInputCell);