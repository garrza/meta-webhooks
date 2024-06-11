import { Controller, Post, Body, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';

@Controller('webhook')
export class WebhookController {
  @Post()
  async handleWebhook(@Req() req: Request, @Body() webhookData: any): Promise<string> {
    try {
      const isVerified = await this.verifyWhatsAppWebhookSignature(req, webhookData);
      if (!isVerified) {
        throw new HttpException('Invalid webhook signature', HttpStatus.UNAUTHORIZED);
      }

      const entry = webhookData?.entry?.[0]; 

      if (entry?.changes) {
        for (const change of entry.changes) {
          const value = change?.value;
          if (value) {
            await this.processWhatsAppChange(value);
          }
        }
      }

      return 'Webhook processed successfully';
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw new HttpException('Error processing webhook', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async processWhatsAppChange(value: any): Promise<void> {
    const messageType = value?.messages?.[0]?.type;

    switch (messageType) {
      case 'text':
        await this.handleTextMessage(value.messages[0]);
        break;
      case 'image':
        await this.handleImageMessage(value.messages[0]);
        break;
      default:
        console.warn('Unhandled WhatsApp message type:', messageType);
    }
  }

  private async handleTextMessage(message: any): Promise<void> {
    console.log('Text message received:', message.text.body);
  }

  private async handleImageMessage(message: any): Promise<void> {
    console.log('Image message received:', message.image.id);
  }

  private async verifyWhatsAppWebhookSignature(req: Request, webhookData: any): Promise<boolean> {
    const appSecret = process.env.WHATSAPP_APP_SECRET; 
    const signatureHeader = req.headers['x-whatsapp-signature-256'] as string;

    if (!signatureHeader || !appSecret) {
        return false;
    }

    const hmac = crypto.createHmac('sha256', appSecret);
    hmac.update(Buffer.from(JSON.stringify(webhookData), 'utf8'));
    const expectedSignature = `sha256=${hmac.digest('hex')}`;
    return expectedSignature === signatureHeader;
  }
}
