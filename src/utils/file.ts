import fs from "fs";

export const deleteFile = async(filename: string) => {

    try {
        await fs.promises.stat(filename); // Verify if a file exists in the dict passed
    } catch {
        return;
    }
    await fs.promises.unlink(filename); // unlink is responsible to remove the file
};