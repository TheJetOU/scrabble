import { Readable } from "stream";

export class Log extends Readable {
    private readonly logs: string[] = [];
    std(msg: string) {
        this.logs.push(msg);
    }
    important(msg: string) {
        this.logs.push(`[Important] ${msg}`);
    }
    error(msg: string) {
        this.logs.push(`[Error] ${msg}`);
    }
    _read() {
        for (const log of this.logs) {
            super.push(log);
        }
        this.logs.length = 0;
    }
}
