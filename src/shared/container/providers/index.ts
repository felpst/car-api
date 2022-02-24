import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IEmailProvider } from "./EmailProvider/IEmailProvider";
import { EtherealEmailProvider } from "./EmailProvider/implementations/EtherealEmailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";


container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);

container.registerInstance<IEmailProvider>(
    "EtherealEmailProvider",
    new EtherealEmailProvider(),
);

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    S3StorageProvider
);