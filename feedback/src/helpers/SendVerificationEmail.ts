import { resend } from "@/lib/resend";

import VerificationEmail from "../../Emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(
    email: string, 
    username: string,
    verifyCode: string
    ):Promise<ApiResponse> {
        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Mystry message verification code  ',
                react: VerificationEmail({ username, otp: verifyCode }),
              });
            return{
                
                success: true,
                message: "verification email send successfully"
            }
            
        } catch (emailError) {
            console.error("Error sending email: ",emailError );
            return{
                success: false,
                message: "Error sending email"
            }
        }
    }
