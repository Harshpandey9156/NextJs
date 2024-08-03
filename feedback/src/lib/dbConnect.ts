 
import mongoose   from "mongoose";


type ConnectionObject={
    isConnected?: number  //? represent that the number is optionals
}

const connection : ConnectionObject={}

async function dbConnect():Promise<void>{ // void means which type of data s commming not need to take care of that
    if(connection.isConnected)
    {
        console.log("Already Connected to database")
        return
    }
    try {
        const db=await mongoose.connect(process.env.MONGODB_URI || '',{})
        connection.isConnected  = db.connections[0].readyState

        console.log("DB is connected successfully");
        
    }
     catch (error) {
        console.log("database connection failed ",error);
        
        process.exit()
        
    }
}

export default dbConnect;