import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_kEY } from './role.decorator';
import { Role } from './role.enum';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_kEY,[
      context.getHandler(),
      context.getClass(),
    ])
    if(!requiredRoles){
      return true; // If no roles are required, grant access
    }
   
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role)); // Check if the user has the required role
  }
}
