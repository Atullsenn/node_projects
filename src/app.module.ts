import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/mongoose/database.module';
import { MongooseModelsModule } from './schemas/mongoose-models.module';
// import {UserModule} from "./users/users.module";
import { UsersModule } from './users/user.module';

@Module({
  // imports: [],
  // controllers: [AppController, userController],
  // providers: [AppService],
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    MongooseModelsModule,
    UsersModule
  ]
})
export class AppModule {}



// import { Module } from "@nestjs/common";
// import { ConfigModule } from "@nestjs/config";
// import { DatabaseModule } from "./infra/mongoose/database.module";
// import { MongooseModelsModule } from "./schemas/mongoose-models.module";
// import { UsersModule } from "./users/user.module";

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     DatabaseModule,
//     MongooseModelsModule,
//     UsersModule
//   ],
// })
// export class AppModule {}
