import * as fs from "fs";

export const Dictionary = {
    words: new Set<string>(),
    isValidWord(word: string) {
        return this.words.has(word.toLowerCase());
    },
    read() {
        if (this.words.size) return;
        const stream = fs.createReadStream(`../data/twl.txt`);
        let data = "";
        return new Promise((resolve, reject) => {
            stream.on("error", (err) => {
                reject(err);
            });
            stream.on("data", (chunk) => {
                data += chunk;
            });
            stream.on("end", () => {
                this.words = new Set(data.split("\n"));
                resolve();
            });
        });
    },
};
