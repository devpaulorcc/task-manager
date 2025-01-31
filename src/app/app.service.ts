import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  status() {
    return {
      status: 200,
      autor: 'Paulo Ricardo',
      github: 'https://github.com/devpaulorcc',
      repositorio: 'https://github.com/devpaulorcc/task-manager'
    };
  }
}
