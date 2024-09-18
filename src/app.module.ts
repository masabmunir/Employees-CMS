import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { AddPrefixMiddleware } from './middleware/add-prefix.middleware';
import { StudentController } from './student/student.controller';

@Module({
  imports: [StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddPrefixMiddleware)
    .forRoutes(StudentController)   // we can use '*' to use globally
  }
}
