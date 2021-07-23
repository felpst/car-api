import fs from "fs";

export const deleteFile = async(filename: string) => {

    try {
        await fs.promises.stat(filename); // Verify is a file exists in the dict passed
    } catch {
        return;
    }
    await fs.promises.unlink(filename); // unlink is responsible rto remove the file
};