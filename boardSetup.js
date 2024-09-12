
for (let i = 0; i < 9; i++) {
    const threeCell = $('<div class = "threeCell" id='+ i + '></div>');
    $("#board").append(threeCell);
}
for (let i = 0; i<9; i++) {
    for (let j = 0; j<9; j++) {
        const newCell = $('<div class = "cell" id='+ i + j + '><div class = "textDisplay"></div></div>');
        if (board[i][j] != 0) {
            newCell.addClass("locked")
            newCell.append('<div class=lockedCover></div>')
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