import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { AddPrefixMiddleware } from './middleware/add-prefix.middleware';
import { StudentController } from './student/student.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true  // Make environment variables globally available
  }),
    StudentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddPrefixMiddleware)
    .forRoutes(StudentController)   // we can use '*' to use globally
  }
}
