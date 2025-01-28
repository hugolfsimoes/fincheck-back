import { createParamDecorator, ExecutionContext, SetMetadata, UnauthorizedException } from "@nestjs/common";



export const ActiveUserId = createParamDecorator<undefined>(
  (_data, contex: ExecutionContext) => {
    const request = contex.switchToHttp().getRequest();
    const userId = request.userId;
    if (!userId) throw new UnauthorizedException();
    return userId;
  }
);