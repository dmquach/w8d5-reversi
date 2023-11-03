# Reversi

Let's play [Reversi]! (If you aren't familiar with Reversi, you can play a round
or two [here][demo] to get a feel for how the game works.)

## Learning goals

By the end of this practice, you should be able to

- Reason about object-oriented JavaScript
- Describe the different ways that objects can interact with each other in
  JavaScript
- Write modular code and manually test it as you write it
- Write a run-loop in JavaScript
- Use duck typing to allow for both a HumanPlayer and a ComputerPlayer

## Setup

Download the starter repo from the `Download Project` button at the bottom of
this page.

Read the entirety of the project description before starting!

> **Note**
> You will notice some of the code has something like this at the top:
>
> ```javascript
> if (typeof window === 'undefined'){
>   const readline = require("readline");
>   const Board = require("./board.js");
> }
> ```
>
> If this doesn't make sense yet that is totally ok. You will learn more about
> it tomorrow. For now, make sure not to touch this code.

## Before you start: Familiarize yourself with Jasmine

For this project you will be using Jasmine, which is the same testing framework
that you will be using for your JavaScript assessment. Your file tree will look
like this:

```bash
- lib
- spec
- src
SpecRunner.html
```

All you need to do to run and see the specs is open the __SpecRunner.html__ file
in your browser. You will see the failed specs immediately, but if you want to
see all of them, click `Spec List` near the top. To re-run the specs, just
refresh the page. If you open up your __src__ folder you will see __board__,
__game__, and __piece__ files. This is where you will be writing your code. It
is highly recommend that you write your code in the order specified below.

## Piece and Board

Write the [Reversi] game. You will want `Piece`, `Board`, and `Game` classes.
The `Game` class has already been written for you. You will need to supply the
functionality for the `Piece` and `Board` classes. Note that the skeleton
structures the code in a way that is _modular_, i.e., it breaks the code into
small methods that you can test individually.

You'll want to complete the specs in this order:

- Piece
  - `color`
  - `oppColor`
  - `flip`
  - `toString`

- Board
  - `_makeGrid` && `constructor` function for `Board`
  - `isValidPos`
  - `getPiece`
  - `isMine`
  - `isOccupied`
  - `_positionsToFlip`
  - `validMove`
  - `placePiece`
  - `validMoves`
  - `hasMove`
  - `isOver`
  
The skeleton lays out the functions you will need to write and includes comments
above each function that describe its intended functionality.

## Bonus: Add an AI player

Create Bill, the AI player from this [demo], by creating an AIPlayer class that
reads the board and makes its next move based on the current placement of pieces
on the board.

[Reversi]: http://en.wikipedia.org/wiki/Reversi
[demo]: https://cardgames.io/reversi/
