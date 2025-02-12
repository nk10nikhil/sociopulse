// Import the Connection type from the mongoose module
import { Connection } from "mongoose";

declare global {
    var mongoose: {
        connection: Connection | null;
        promise: Promise<Connection> | null;
    }
}

export { }