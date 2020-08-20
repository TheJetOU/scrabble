/**
 * Projected file dir:
 * game.ts should orchestrate everything from the top
 * board.ts - handle adding words and validating if it's a valid word / a valid position
 * points.ts - giving players points wrt special tiles etc
 * log.ts - outputting the game log
 * tiles.ts - API to communicate with the games tiles (points it gives, number of each char etc)
 * dict.ts - an API to communicate with the game dictionary (list of words, parse the file, check if words is valid)
 */

export { Game } from "./game";
export { readStream } from "./log";
