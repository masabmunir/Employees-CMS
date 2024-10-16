import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';


export const ROLES_kEY = 'role';
export const Roles = (...roles: Role[])=> SetMetadata(ROLES_kEY,roles);