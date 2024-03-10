import { SetMetadata } from '@nestjs/common/decorators/core/set-metadata.decorator';
import { UserRoles } from './user.enum';


export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);