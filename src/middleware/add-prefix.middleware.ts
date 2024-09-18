import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AddPrefixMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if(req.body && req.body.name && typeof req.body.name === 'string'){
      if(!req.body.name.startsWith('Mr')){
        req.body.name = `Mr ${req.body.name}`
      }
    }
    next();
  }
}
