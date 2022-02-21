import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
    saveFile(file: string): Promise<string> {
        throw new Error('Method not implemented.');
    }
    deleteFile(file: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}