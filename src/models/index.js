import mongoose from "mongoose";
import DB from '../common/dbConfig.js'

try {
    console.log(DB.dbName, DB.dbUrl, '\n')

    mongoose.connect(`${DB.dbUrl}/${DB.dbName}`)
    console.log("Database Connected Successfully")
} 
catch (error) {
    console.log(error)
}

export default mongoose