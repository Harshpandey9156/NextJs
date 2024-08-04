import { sendVerificationEmail } from "@/helpers/SendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Model/User";
import bycrypt from "bcrypt";



export async function POST(request : Request) {
    await dbConnect();
    try {
        const {username,email, Password} =await request.json();
        const existingUserVerifiedByUserName= await UserModel.findOne({
            username,
            isVerified: true
        })
        if(existingUserVerifiedByUserName){
            return Response.json({
                success: false,
                message: 'Username already exists'
            },
            {
                status: 400
            })

        }

    const exestingUserverifiedByEmail =await UserModel.findOne({email})


    const verifyCode =Math.floor(100000 + Math.random() * 900000).toString()
      
    if(exestingUserverifiedByEmail){
        if(exestingUserverifiedByEmail.isVerified){
            return Response.json({
                success: false,
                message: 'Email already exists'
            },
            {
                status: 400
            })

        }
        else{
             const hashedPassward =await bycrypt.hash(Password,10)
             exestingUserverifiedByEmail.password=hashedPassward;
            exestingUserverifiedByEmail.verifyCode=verifyCode;
            exestingUserverifiedByEmail.verifyCodeExpire=new Date(Date.now()+60*60*1000)
            await exestingUserverifiedByEmail.save()
            
        }
    }
    else{
        const hashedPassward =await bycrypt.hash(Password,10)
        const expiryDate= new Date()
        expiryDate.setDate(expiryDate.getDate()+1)

       const newUser= new UserModel({
            username,
            email,
            password: hashedPassward,
            verifyCode,
            verifyCodeExpire: expiryDate,
            isVerified: false,
            isAcceptingMessages: true,
            messages: []
        })
        await newUser.save()
        }

        //send verification email
        const emailResponse=await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        if(!emailResponse){
            return Response.json({
                success: false,
                message: 'Error sending email'
            },
            {
                status: 500
            })
        }
        return Response.json({
            success: true,
            message: 'User registered successfully please verify your email'
        },
        {
            status: 201
        })

    } catch (error) {
        console.log('Error regestering  user',error);
        return Response.json({
            success: false,
            message : 'Error registering user'

        },
    {
        status: 500
    })
        
    }
     
}


