import { Readable } from "stream";

const readable = new Readable({
    read() {
        return;
    },
});

export const Log = {
    std(msg: string) {
        readable.push(msg);
    },
    important(msg: string) {
        readable.push(`[Important] ${msg}`);
    },
    error(msg: string) {
        readable.push(`[Error] ${msg}`);
    },
};

export const readStream = readable;
