import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class InitService implements OnModuleInit {
  onModuleInit() {
    if (!process.env.CREATE_ADMIN || process.env.CREATE_ADMIN.toUpperCase() === 'FALSE') {
      console.log('SKIP INITIAL ADMIN USER CREATION')
      return
    }

    // TODO process user creation if ENV CREATE_ADMIN is set
  }
}
