
const shuffle = function (array) {
    let m = array.length, t , i
    while (m > 0) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}
const permuteNumbers = function (board) {
    const numbers = [1,2,3,4,5,6,7,8,9]
    shuffle(numbers)
    const permutationMap = new Map()
    for (i = 1; i < 10; i++) {
        permutationMap.set(i, numbers[i-1])
    }
    for (i = 0; i<9; i++) {
        for (j=0; j<9; j++) {
            board[i][j] = permutationMap.get(board[i][j])
        }
    }
}


const generateSolvedBoard = function () {
    const baseSolvedBoard =[[4,8,2,6,1,5,3,9,7],
                            [7,5,9,2,4,3,1,8,6],
                            [6,3,1,8,9,7,5,2,4],
                            [5,7,4,1,3,9,8,6,2],
                            [9,2,6,5,8,4,7,1,3],
                            [8,1,3,7,6,2,9,4,5],
                            [1,9,5,3,2,6,4,7,8],
                            [2,4,7,9,5,8,6,3,1],
                            [3,6,8,4,7,1,2,5,9]]
    permuteNumbers(baseSolvedBoard)
    return baseSolvedBoard;
}

const findPossibles = function(board, i, j) {
    const numbers = [1,2,3,4,5,6,7,8,9]
    let leitud = []
    for (let k = 0; k < 9; k++) {
        if (!leitud.includes(board[i][k]) && board[i][k] != 0) {
            leitud.push(board[i][k])
        }
        if (!leitud.includes(board[k][j]) && board[k][j] != 0) {
            leitud.push(board[k][j])
        }
    }
    const ifloor = Math.floor(i/3)*3
    const jfloor = Math.floor(j/3)*3
    for (let k = 0; k<3;k++) {
        for (let l = 0; l<3;l++) {
            if (!leitud.includes(board[ifloor+k][jfloor+l]) && board[ifloor+k][jfloor+l] != 0) {
                leitud.push(board[ifloor+k][jfloor+l])
            }
        }
    }
    return numbers.filter(value => !leitud.includes(value));
}

const createPossibilitiesMatrix = function(board) {
    const matrix = []
    for (let i = 0; i < 9; i++) {
        matrix[i] = []
        for (let j = 0; j <9; j++) {
            if (board[i][j] == 0) {
                matrix[i][j] = findPossibles(board, i, j)
            } else {
                matrix[i][j] = []
            }
        }
    }
    return matrix;
}

const updatePossibilityMatrix = function (matrix, i, j, possibility) {
    matrix[i][j] = []
    for (let k = 0; k < 9; k++) {
        matrix[i][k] = matrix[i][k].filter(val => val !== possibility)
        for (let l = 0; l<matrix[i][k].length;l++) {
            if (matrix[i][k][l] == possibility) {
                matrix[i][k][l] = matrix[i][k][matrix[i][k].length-1]
                matrix[i][k].pop();
                break
            }
        }
        for (let l = 0; l<matrix[k][j].length;l++) {
            if (matrix[k][j][l] == possibility) {
                matrix[k][j][l] = matrix[k][j][matrix[k][j].length-1]
                matrix[k][j].pop();
                break
            }
        }
    }
    const ifloor = Math.floor(i/3)*3
    const jfloor = Math.floor(j/3)*3
    for (let k = 0; k<3 ;k++) {
        for (let l = 0; l<3;l++) {
            for (let m = 0; m<matrix[ifloor+k][jfloor+l].length;m++) {
                if (matrix[ifloor+k][jfloor+l][m] == possibility) {
                    matrix[ifloor+k][jfloor+l][m] = matrix[ifloor+k][jfloor+l][matrix[ifloor+k][jfloor+l].length-1]
                    matrix[ifloor+k][jfloor+l].pop();
                    break
                }
            }
            
        }
    }
    return matrix

}

const solveBoard = function (board, possibilities) {
    let solutions = 0;
    let newBoard, ZeroI, ZeroJ, pikkus;
    let maxPossibilites = 9;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j <9; j++) {
            pikkus = possibilities[i][j].length
            if (pikkus < maxPossibilites && pikkus > 0) {
                maxPossibilites = pikkus
                ZeroI=i
                ZeroJ=j
            }
        }
    }
    if (maxPossibilites == 9) {
        return 1
    }
    possibilities[ZeroI][ZeroJ].forEach(possibility => {
        newBoard = structuredClone(board)
        newBoard[ZeroI][ZeroJ] = possibility
        const t0 = performance.now()
        newMatrix = updatePossibilityMatrix(structuredClone(possibilities), ZeroI, ZeroJ, possibility)
        const t1 = performance.now()
        totalTimePossibility += t1-t0
        solutions += solveBoard(newBoard, newMatrix)
    });
            
    return solutions
}

let totalTimePossibility = 0;
let totalTimeSolve =0
const createEmptyBoard = function (solvedBoard) {
    positions = []
    for (let i = 0; i<9; i++) {
        for (let j = 0; j<9; j++) {
            positions.push([i,j])
        }
    }
    shuffle(positions)
    
    let n=45;
    let i = 0, row, column, temp, solutions;
    while (n>0 && i<81) {
        row = positions[i][0];
        column = positions[i][1];
        i++;
        temp = solvedBoard[row][column];
        solvedBoard[row][column] = 0;
        
        const possibilities = createPossibilitiesMatrix(solvedBoard)
        t0 = performance.now()
        solutions = solveBoard(solvedBoard, possibilities); 
        t1 = performance.now()
        totalTimeSolve += t1-t0
        if (solutions != 1) {
            solvedBoard[row][column] = temp;
        } else {
            n--;
        }
    }
    console.log(n)
    return solvedBoard
}
const solvedBoard = generateSolvedBoard()
const board = createEmptyBoard(structuredClone(solvedBoard))
console.log(totalTimePossibility)
console.log(totalTimeSolve)