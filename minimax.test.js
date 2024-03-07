const functions = require("./minimax.js");

const X = "X";
const O = "O";

let ai = X;
let human = O;

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
        let board = [O, X, O, X, O, X, X, X, O];
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