import crypto from "crypto"; // A library to deal with cryptography
import multer from "multer";
import { resolve } from "path";


export default {

    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder), // I am getting my current directory, and then I am backing by two directories (..), and after I amsetting it to the folder variable.
                filename: (reques, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName); // the first parameter that the callback function receives is an error so in this case will be null.
                }
            })
        }
    }

}