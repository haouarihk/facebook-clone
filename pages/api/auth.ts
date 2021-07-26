import type { NextApiRequest, NextApiResponse } from "next";
import mongodb from "mongodb";




export default connectDB((req: NextApiRequest, res: NextApiResponse, db: mongodb.Db) => {
    // get the username and password from the request
    const username: string = req.body.username;
    const password: string = req.body.password;

    // check if the username and password are null
    if (username == null || password == null) {
        // if so, return an error
        return res.status(401).json({
            status: 401,
            message: "username or password is null"
        });
    }

    // 0 for login, 1 for register, 2 for reset password;
    const di: number = req.body.do;

    switch (di) {
        case 1:
            // register
            register(req.body, res, db);
            break;
        case 2:
            // reset password
            resetPassword(req.body, res, db);
            break;

        default:
            // login
            login(req.body, res, db);
            break;
    }

})
import bcrypt from "bcrypt";
import connectDB from "../../middleware/mongodb";
async function login(body: any, res: NextApiResponse, db: mongodb.Db) {
    // we gotta take the username and password from the request
    const username: string = body.username;
    const password: string = body.password;
    // compare the username and password with the database
    const user = await db.collection("users").findOne({ username });
    if (user == null) {
        // send an error if the username is not found
        return res.status(401).json({
            status: 401,
            message: "username not found"
        });
    } else {
        // check the hashed password with the database
        const hashedPassword: string = user.password;
        const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
        if (isMatch) {
            // if the password matches, return the user object
            return res.json(user);
        }
    }

}

async function register(body: any, res: NextApiResponse, db: mongodb.Db) {
    // register
    const password: string = body.password;

    // hashed password
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    const hs = { hashed, salt };


    // save the hashed password to the mongodb database
    const result = await db.collection("users").insertOne(hs);
    if (result.insertedCount > 0) {
        // if so, return a success message
        return res.status(200).json({
            status: 200,
            message: "register success"
        });
    }


    return {
        status: 200,
        message: "register success"
    };
}

async function resetPassword(body: any, res: NextApiResponse, db: mongodb.Db) {
    // resetPassword
    return {
        status: 200,
        message: "resetPassword success"
    };
}