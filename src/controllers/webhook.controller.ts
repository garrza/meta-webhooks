import { Body, Controller, Get, Post, Query } from '@nestjs/common';

const VERIFY_TOKEN = 'jerbi';

@Controller('webhook')
export class WebhookController {
  @Get()
  handleVerification(@Query('hub.mode') mode: string, @Query('hub.verify_token') token: string, @Query('hub.challenge') challenge: string) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return challenge;
    }
    throw new Error('Verification failed');
  }
  @Post()
  async handleWebhook(@Body() body: any) {
    console.log('Received webhook payload:', body);

    return { success: true };
  }
}