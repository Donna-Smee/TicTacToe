const functions = require("./minimax.js");

const X = "X";
const O = "O";

let ai = X;
let human = O;


const maxVal = 10;
const minVal = -10;
const tieVal = 0;

// let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

/*
    0, 1, 2
    3, 4, 5
    6, 7, 8 
*/


describe("Checking for possible choices", () => {
    test("[1] When all 9 spaces are available, should return [0, 1, ..., 8]", () => {
        let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        expect(functions.getPossibleChoices(board)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });

    test("[2] When only one space is avaiable. Board = [X, O, X, O, X, 5, O, O, O]  Return [5]", () => {
        let board = [X, O, X, O, X, 5, O, O, O];
        expect(functions.getPossibleChoices(board)).toEqual([5]);
    });

    test("[3] When there are no Os. Board = [X, 1, X, X, X, X, X, X, 8]  Return [1, 8]", () => {
        let board = [X, 1, X, X, X, X, X, X, 8];
        expect(functions.getPossibleChoices(board)).toEqual([1, 8]);
    });

    test("[4] When there are no Xs. Board = [O, O, O, 3, 4, 5, O, O, O]  Return [3, 4, 5]", () => {
        let board = [O, O, O, 3, 4, 5, O, O, O];
        expect(functions.getPossibleChoices(board)).toEqual([3, 4, 5]);
    });

    test("[5] When there are no spaces avaialble. Board = [X, O, X, X, X, X, X, X, O]  Return []", () => {
        let board = [X, O, X, X, X, X, X, X, O];
        expect(functions.getPossibleChoices(board)).toEqual([]);
    });
});




// All these tests will use ai as the player
describe("Checking if the given player has won or not", () => {
    
    test("[1] When player won vertically - column 1", () => {
        let board = [X, O, 2, X, O, 5, X, 7, 8];
        expect(functions.hasWon(board, ai)).toBe(true);
        expect(functions.hasWon(board, human)).toBe(false);
    });

    test("[2] When player won vertically - column 2", () => {
        let board = [0, X, O, O, X, O, 6, X, 8];
        expect(functions.hasWon(board, ai)).toBe(true);
        expect(functions.hasWon(board, human)).toBe(false);
    });

    test("[3] When player won vertically - column 3", () => {
        let board = [O, 1, X, O, 4, X, 6, 7, X];
        expect(functions.hasWon(board, ai)).toBe(true);
        expect(functions.hasWon(board, human)).toBe(false);
    });

    test("[4] When player won horizontally - row 1", () => {
        let board = [X, X, X, 3, O, 5, 6, 7, O]; // TODO
        expect(functions.hasWon(board, ai)).toBe(true); 
        expect(functions.hasWon(board, human)).toBe(false);
    });

    test("[5] When player won horizontally - row 2", () => {
        let board = [0, 1, 2, X, X, X, 6, O, O];
        expect(functions.hasWon(board, ai)).toBe(true); 
        expect(functions.hasWon(board, human)).toBe(false);
    });

    test("[5] When player won horizontally - row 3", () => {
        let board = [0, O, 2, 3, O, 5, X, X, X];
        expect(functions.hasWon(board, ai)).toBe(true); 
        expect(functions.hasWon(board, human)).toBe(false);
    });

    test("[6] When the whole board is filled. X wins with row 3", () => {
        let board = [O, X, O, X, O, O, X, X, X];
        expect(functions.hasWon(board, ai)).toBe(true); 
        expect(functions.hasWon(board, human)).toBe(false);
    });

    test("[7] When the human player wins, should return false for ai", () => {
        let board = [0, X, 2, 3, X, 5, O, O, O];
        expect(functions.hasWon(board, ai)).toBe(false); 
        expect(functions.hasWon(board, human)).toBe(true);
    });

    test("[8] When there is no winner (tie). Ai and human is not the winner.", () => {
        let board = [X, O, X, X, O, X, O, X, O];
        expect(functions.hasWon(board, ai)).toBe(false); 
        expect(functions.hasWon(board, human)).toBe(false); 
    });

    test("[9] When player won diagonally [0, 4, 8]", () => {
        let board = [X, 1, O, 3, X, O, 6, 7, X];
        expect(functions.hasWon(board, ai)).toBe(true);
        expect(functions.hasWon(board, human)).toBe(false);
    });

    test("[10] When player won diagonally [2, 4, 6]", () => {
        let board = [0, 1, X, O, X, O, X, 7, 8];
        expect(functions.hasWon(board, ai)).toBe(true);
        expect(functions.hasWon(board, human)).toBe(false);
    });


});




describe("Checking for best move", () => {

    let moves = [{"spot": 1, "value": minVal}, {"spot": 2, "value": maxVal}, {"spot": 3, "value": tieVal}];

    test("[1] When AI is the player, the maximum value/spot is returned (spot = 2)", () => {
        expect(functions.bestValue(moves, ai)).toEqual({"spot": 2, "value": maxVal});
    });

    test("[2] When human is the player, the minimum value/spot is returned (spot = 1)", () => {
        expect(functions.bestValue(moves, human)).toEqual({"spot": 1, "value": minVal});
    });

    test("[3] When there are more than one value, return the first maximum (AI) value. Expected spot = 1" , () => {
        let moves = [{"spot": 1, "value": maxVal}, {"spot": 2, "value": maxVal}, {"spot": 3, "value": tieVal}, {"spot": 4, "value": maxVal}];
        expect(functions.bestValue(moves, ai)).toEqual({"spot": 1, "value": maxVal});
    });

    test("[4] When there are more than one value, return the first minimum (human) value. Expected spot = 2" , () => {
        let moves = [{"spot": 1, "value": maxVal}, {"spot": 2, "value": minVal}, {"spot": 3, "value": minVal}, {"spot": 4, "value": maxVal}];
        expect(functions.bestValue(moves, human)).toEqual({"spot": 2, "value": minVal});
    });


});



/*

 Acceptance Tests for minimax: minimax(board, player)

    When ai win => get maxVal
    When human win => get minVal
    When ends in tie => get tieVal

    When there is a clear move to take to win immediately. (other player is not close) (do one for each)
    When there is a clear move to take to prevent the other player from winning. (do one for each) (and you cannot win yet)

    When you can win and so can the other player (you must choose to win, not block the other player from winning)

    When no player is on the immediate verge of winning, (calc this out to find the answer) but someone could win

 */

describe("Checking for minimax algorithm", () => {

    test("[1] When ai (X) wins, maxVal should be returned.", () => {
        let board = [0, O, 2, X, X, X, 6, O, 8];
        expect(functions.minimax(board, ai)).toBe(maxVal);
    });

    test("[2] When human (O) wins, minVal should be returned.", () => {
        let board = [0, 1, O, 3, O, 5, O, X, X];
        expect(functions.minimax(board, human)).toBe(minVal);
    });

    test("[3] When the game ends in a tie, tieVal should be returned.", () => {
        let board = [X, O, X, X, O, O, O, X, X];
        expect(functions.minimax(board, human)).toBe(tieVal);
    });

    /* TIC TAC TOE BOARD
    | 0 | 1 | 2 |
    | 3 | 4 | 5 |
    | 6 | 7 | 8 |   */

    test("[4] When AI (X) can make a winning move, and human (O) cannot (immediately), ai will take that move to win.", () => {
        /* 
        | X | O | O |
        |   | X |   |
        |   |   |   | 
        Next move for ai should be 8  */
        let board = [X, O, O, 3, X, 5, 6, 7, 8];
        expect(functions.minimax(board, ai)).toMatchObject({"spot": 8});
    });

    test("[5] When human (O) can make a winning move, and ai (X) cannot (immediately), human will take that move to win.", () => {
        /* 
        | O | X | X |
        | O |   |   |
        |   |   |   | 
        Next move for human should be 6  */
        let board = [O, X, X, O, 4, 5, 6, 7, 8];
        expect(functions.minimax(board, human)).toMatchObject({"spot": 6});
    });

    test("[6] When ai (X) can win, human cannot, and it's human's turn. Human will take the move to prevent ai from winning.", () => {
        /* 
        |   |   | O |
        |   | X | X |
        |   |   |   | 
        Next move for human should be 3  */
        let board = [0, 1, O, 3, X, X, 6, 7, 8];
        expect(functions.minimax(board, human)).toMatchObject({"spot": 3});
    });

    test("[7] When human (O) can win, ai cannot, and it's ai's turn. AI will take the move to prevent human from winning.", () => {
        /* 
        |   |   | X |
        |   | O | O |
        |   |   |   | 
        Next move for human should be 3  */
        let board = [0, 1, X, 3, O, O, 6, 7, 8];
        expect(functions.minimax(board, ai)).toMatchObject({"spot": 3});
    });

    test("[8] When both ai and human are on the verge on winning, and it's ai's turn. AI should choose move to win.", () => {
        /* 
        | X |   | O |
        | X |   | O |
        |   |   |   | 
        Next move for human should be 6  */
        let board = [X, 1, O, X, 4, O, 6, 7, 8];
        expect(functions.minimax(board, ai)).toMatchObject({"spot": 6});
    });

    test("[9] When both ai and human are on the verge on winning, and it's human's turn. Human should choose move to win.", () => {
        /* 
        | X |   | O |
        | X |   | O |
        |   |   |   | 
        Next move for human should be 8  */
        let board = [X, 1, O, X, 4, O, 6, 7, 8];
        expect(functions.minimax(board, human)).toMatchObject({"spot": 8});
    });

    test("[10] When neither ai nor human are on the verge of winning (in the next move), but eventually someone could win. It is ai's turn, ai could win.", () => {
        /* 
        |   | X |   |
        | O | O | X |
        |   | O |   | 
        Next move for ai should be 2, with value = 10 or maxVal  */
        // See pdf to understand logic. 

        let board = [0, X, 2, O, O, X, 6, O, 8];
        expect(functions.minimax(board, ai)).toEqual({"spot": 2, "value": maxVal});
    }); 


});