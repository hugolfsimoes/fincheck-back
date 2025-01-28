import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')

  signin(@Body() signin: SigninDto) {
    return this.authService.signin(signin);
  }

  @Post('signup')

  signup(@Body() signupDTO: SignupDto) {
    return this.authService.signup(signupDTO);
  }
}


