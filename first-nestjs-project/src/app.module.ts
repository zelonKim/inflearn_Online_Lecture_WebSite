import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

@Module({
  // 애플리케이션의 기능을 그룹화하여 관리함.
  imports: [PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
