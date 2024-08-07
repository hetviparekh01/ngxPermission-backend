import { Container } from "inversify";
import { AuthService, SuperAdminService } from "./services";
import { PERMISSIONTYPE, TYPES } from "./constants";
import { AuthMiddleware, PermissionMiddleware } from "./middlewares";

const container=new Container();
container.bind<SuperAdminService>(TYPES.superAdminService).to(SuperAdminService),
container.bind<AuthService>(TYPES.authService).to(AuthService)
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
container.bind<PermissionMiddleware>(TYPES.ReadPermission).toDynamicValue(()=>new PermissionMiddleware(PERMISSIONTYPE.READ)).inRequestScope()
container.bind<PermissionMiddleware>(TYPES.WritePermission).toDynamicValue(() => new PermissionMiddleware(PERMISSIONTYPE.WRITE)).inRequestScope()
export default container