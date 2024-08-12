import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs"
import UserModel from "@/Model/User";
import dbConnect from "@/lib/dbConnect";

export const authOptions : NextAuthOptions={
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text"},
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials : any):Promise<any>{
                

              }
        })
    ]
}