// webhook.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post()
  async handleWebhook(@Body() webhookData: any): Promise<string> {
    try {
      // 1. Verify Webhook Signature (Important for Security)
      const isVerified = await this.verifyWhatsAppWebhookSignature(webhookData);
      if (!isVerified) {
        throw new HttpException('Invalid webhook signature', HttpStatus.UNAUTHORIZED);
      }

      // 2. Extract Entry Information (WhatsApp-Specific)
      const entry = webhookData?.entry?.[0]; 

      // 3. Process Changes (WhatsApp-Specific)
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
      // ... handle other message types (audio, video, etc.)
      default:
        console.warn('Unhandled WhatsApp message type:', messageType);
    }
  }

  // Example Message Handlers (You'll customize these)
  private async handleTextMessage(message: any): Promise<void> {
    console.log('Text message received:', message.text.body);
    // Your logic to handle text messages here
  }

  private async handleImageMessage(message: any): Promise<void> {
    console.log('Image message received:', message.image.id);
    // Your logic to handle image messages here
  }

  // WhatsApp Webhook Signature Verification (Async)
  private async verifyWhatsAppWebhookSignature(webhookData: any): Promise<boolean> {
    // Implement WhatsApp's signature verification logic here 
    // You'll need your app secret, a crypto library, etc.
    // ... verification code ...
    return true; // Replace with the actual verification result
  }
}
