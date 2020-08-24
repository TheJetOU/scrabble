import { Readable } from "stream";

export class Log {
    readonly readable = new Readable({
        read() {
            return;
        },
    });
    std(msg: string) {
        this.readable.push(msg);
    }
    important(msg: string) {
        this.readable.push(`[Important] ${msg}`);
    }
    error(msg: string) {
        this.readable.push(`[Error] ${msg}`);
    }
}
