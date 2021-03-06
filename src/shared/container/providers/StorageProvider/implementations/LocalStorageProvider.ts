import upload from "@config/upload";
import fs from "fs";
import { resolve } from "path";

import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, file), // from where the file is going to be selected
            resolve(`${upload.tmpFolder}/${folder}`, file), // where the file will be moved
        )

        return file;
    }

    async delete(file: string, folder: string): Promise<void> {
        const filename = resolve(`${upload.tmpFolder}/${folder}`, file); // I am getting the path of the file to be deleted.

        try {
            await fs.promises.stat(filename); // I am trying to get the information of the file.
        } catch {
            return;
        }

        await fs.promises.unlink(filename); // I am deleting the file.
    }
}

export { LocalStorageProvider };