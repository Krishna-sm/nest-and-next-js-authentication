import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from './constant';
@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/nextjs-auth"),JwtModule.register({
    global:true,
    secret: JWT_KEY,
    signOptions:{
      expiresIn:'30d'
    }
  }),AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
