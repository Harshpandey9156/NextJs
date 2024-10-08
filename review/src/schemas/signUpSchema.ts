import {z} from 'zod';

export const usernameValidation = z
         .string()
         .min(3 , "Username must be at least 3 characters")
         .max(20 ,"Username must be at most 20 characters")
         .regex(/^[a-zA-Z0-9]+$/ , "Username must be alphanumeric");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message : 'Invalid email'}),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
    // verifyCode: z.string().min(6),
    // verifyCodeExpire: z.date(),
    // isVerified: z.boolean(),
    // isAcceptingMessages: z.boolean(),
    // messages: z.array(z.object({
    //     Content: z.string(),
    //     createAt: z.date()
    // }) )
})

