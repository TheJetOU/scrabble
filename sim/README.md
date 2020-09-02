# Introduction

A zero runtime dependencies Scrabble simulator.

# Installation

```bash
$ npm install scrabble-sim
```

# Usage

To start a game:

```typescript
import { Game } from "scrabble-sim";

// 2-4 players needed
const PLAYERS = new Map([
    ["a", { name: "a" }],
    ["b", { name: "b" }],
    ["c", { name: "c" }],
]);

const game = new Game(PLAYERS);
```

(Continuing from the above code)

To read the outputted game log:

```typescript
game.log.on("data", (msg) => {
    console.log(`GAME MSG: ${msg}`);
});

game.players.forEach("data", (player) => {
    player.log.on("data", (msg) => {
        console.log(`${player.name.toUpperCase()} MSG: ${msg}`);
    });
});
```

To play a turn:

```typescript
game.move(word, startingCell);
```

Player need not be specified because the code tracks the current player.

`startingCell` is the cell you want to add the first tile in. If the main word reads left-to-right the row number precedes the column letter; if the main word reads top-to-bottom, the column letter preceds the row number.

For example, if you want to add `PARK` horizontally on row 8 and column number H, the starting cell would be `8H`. Conversely, if you want to add `PARK` vertically on row 8 and column number H, the starting cell would be `8H`.

To exchange tiles:

```typescript
// n can be 1 - 7
game.exchangeTiles(n);
```

To skip a turn:

```typescript
game.skip();
```

# License

'Scrabble' is a trademark of Mattel in most of the world except in the U.S. and Canada where it is a trademark of Hasbro. The code in this repository is under the terms of the MIT license.
