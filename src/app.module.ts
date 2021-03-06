import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/module';
import { ApiModule } from '@application/api/module';
import { EventHandlerModule } from '@application/event-handler/module';

@Module({
  imports: [
    ApiModule,
    EventHandlerModule,
    DomainModule,
  ],
})
export class AppModule { }
