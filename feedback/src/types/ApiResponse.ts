import { Message } from "@/Model/User";
export interface ApiResponse{
    success: boolean;
    message: string;
    isAccepingMessages? : boolean;
    messages?: Array<Message>

}