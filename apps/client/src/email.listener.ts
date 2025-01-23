import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailListener {
  constructor(private config: ConfigService) {}
  @OnEvent('password.reset')
  async handlePasswordResetEvent(event: { email: string; resetLink: string }) {
    const transporter = nodemailer.createTransport({
      //   service: 'gmail', // You can use your email service
      //   auth: {
      //     user: 'your-email@gmail.com',
      //     pass: 'your-password',
      //   },
      host: 'smtp.gmail.com',
      port: 587, // or use 465 for secure connection
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.config.get('EMAIL_USER'),
        pass: this.config.get('EMAIL_PASS'),
      },
    });

    const mailOptions = {
      from: this.config.get('EMAIL_USER'),
      to: event.email,
      subject: 'Password Reset Request',
      text: `Click on the following link to reset your password: ${event.resetLink}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email', error);
    }
  }
}
