import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { hash } from 'bcryptjs';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UsersRepository, private readonly jwtService: JwtService) {}
  async signin(signinDTO: SigninDto) {
    const { email, password } = signinDTO;
    const user = await this.usersRepo.findUnique({
      where: {
        email
      }
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }


  async signup(signupDTO: SignupDto) {

    const { email, name, password } = signupDTO;

    const emailTaken = await this.usersRepo.findUnique({
      where: {
        email
      }, select: { id: true }
    });

    if (emailTaken) throw new ConflictException('Email is already in use');

    const hashedPassword = await hash(password, 12);
    const user = await this.usersRepo.create({
      data: {
        email, name, password: hashedPassword, categories: {
          createMany: {
            data: [
              { name: 'Salário', icon: 'travel', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'tranport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ]
          }
        }
      }
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
