const functions = require("./minimax.js");
const X = "X";
const O = "O";


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

