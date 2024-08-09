import mongoose ,{Schema , Document} from "mongoose";
 
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
     isVerified: boolean;
     isAcceptingMessages: boolean;
     messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {type: String, required: [true, "Username is required"],
        unique:true,
        trim : true
    },

    email: {
        type: String,
         required:  [true, "Email is required"],
        unique: true,
        match : [ /.+\@.+\..+/ ,"Email is invalid"],  //TODO: Add regexr for email
        },
    password: {
        type: String,
         required: [true, "Password is required"]
        },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"]
    },
    verifyCodeExpire: {
        type: Date,
        required: [true, "Verify code expire is required"]
    },
    isVerified: {
        type: Boolean,
         
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
});

const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;