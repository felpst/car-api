import { SES } from "aws-sdk";
import handlebars from "handlebars";
import fs from "fs";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IEmailProvider } from "../IEmailProvider";

@injectable()
class SESEmailProvider implements IEmailProvider {

    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: "2010-12-01",
                region: process.env.AWS_REGION,
            }),
        });
    }
    
    async sendEmail(
        to:string, 
        subject: string, 
        variables: any, 
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);
        
        await this.client.sendMail({
            to,
            from: "Rentx <hello@praxing.org>",
            subject,
            html: templateHTML,
        });

    }

}

export { SESEmailProvider }