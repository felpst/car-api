import upload from '@config/upload';
import { S3 } from 'aws-sdk';
import { resolve } from 'path';
import fs from 'fs';
import mime from 'mime';
import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    public async saveFile(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file); 

        const fileContent = await fs.promises.readFile(originalName);

        const ContentType = mime.getType(originalName); // gets the content type of the file with the original name

        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: "public_read",
            Body: fileContent,
            ContentType,
        }).promise(); // .promise() is used to convert the AWS SDK's promise to a native promise

        await fs.promises.unlink(originalName); // deletes the file from the tmp folder

        return file;
    }
    
    public async deleteFile(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
        }).promise();
    }
}

export { S3StorageProvider };