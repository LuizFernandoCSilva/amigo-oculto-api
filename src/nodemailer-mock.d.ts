declare module "nodemailer-mock" {
  import nodemailer from "nodemailer";

  const mock: {
    getSentMail(): Array<{
      from: string;
      to: string;
      subject: string;
      text?: string;
      html?: string;
    }>;
    reset(): void;
    setShouldFailOnce(): void;
  };

  export = mock;
}
