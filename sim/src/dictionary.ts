import { createReadStream } from "fs";

export const Dictionary = {
    words: new Set<string>(),
    isValidWord(word: string) {
        return this.words.has(word.toLowerCase());
    },
    read() {
        let data = "";
        createReadStream("../data/twl.txt").on("data", (chunk) => (data += chunk));
        this.words = new Set(data.split("\n"));
    },
};
