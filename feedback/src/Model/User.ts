import mongoose ,{Schema , Document} from "mongoose";
import { Content } from "next/font/google";
import { createDeflate } from "zlib";

export interface Message extends Document{
    Content: string;
    createAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    Content: {type: String, required: true},

    createAt: {type: Date, required: true, default: Date.now}
});

export interface User extends Document{
     username: string;
     email: string;
     password: string;
     verifyCode: string;
     verifyCodeExpire: Date;
     messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {type: String, required: [true, "Username is required"],
        unique:true,
        trim : true
    },

    email: {type: String,
         required:  [true, "Email is required"],
        unique: true,
        }
});