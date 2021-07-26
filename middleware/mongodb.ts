import mongodb from 'mongodb';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

let db: mongodb.MongoClient;
const connectDB = (handler: (req: NextApiRequest, res: NextApiResponse, db: mongodb.Db) => void) => async (req: NextApiRequest, res: NextApiResponse) => {

    // Use new db connection
    if (!db) {
        //@ts-ignore
        db = new mongodb.MongoClient(process.env.MONGODB_URI)
        await db.connect();
    }
    //@ts-ignore
    return handler(req, res, db.db(process.env.MONGODB_DB));
};

export default connectDB;