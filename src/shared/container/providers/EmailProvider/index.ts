import { container } from "tsyringe";
import { IEmailProvider } from "./IEmailProvider";
import { EtherealEmailProvider } from "./implementations/EtherealEmailProvider";
import { SESEmailProvider } from "./implementations/SesEmailProvider";

const emailProvider = {
    ethereal: container.resolve(EtherealEmailProvider),
    ses: container.resolve(SESEmailProvider),
}

container.registerInstance<IEmailProvider>(
    "EmailProvider",
    emailProvider[process.env.EMAIL_PROVIDER]
);