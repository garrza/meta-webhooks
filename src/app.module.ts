import { Module } from '@nestjs/common';
import { WebhookController } from './controllers/webhook.controller';

@Module({
  imports: [],
  controllers: [WebhookController],
  providers: [],
})
export class AppModule {}