import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if (!roles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return matchRoles(roles, user.role) //Match the roles from user and database.

    }
}

function matchRoles(roles, userRoles) {
    if (!roles.includes(userRoles)) return false;
    return true;
}
