import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { Company } from './company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { MyContext } from 'src/@types/MyContext';
import { LoginInput } from './dto/login.input';
import { LoginType } from './@types/LoginType';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService, // private readonly i18n: I18nService,
  ) {}

  // @Query(() => [User])
  // async getAllUsers(@I18nLang() lang: string): Promise<User[]> {
  //   const response = await this.i18n.translate('auth.HELLO_MESSAGE', {
  //     lang,
  //     args: { id: 1, username: 'Toon' },
  //   });
  //   console.log(response);
  //   return this.authService.getAllUser();
  // }

  @Query(() => Boolean)
  test(): boolean {
    return true;
  }
  @UseGuards(AuthGuard)
  @Query(() => User)
  getUser(@Args('id') id: string): Promise<User> {
    return this.authService.getUser(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => Company)
  getCompany(@Args('id') id: string): Promise<Company> {
    return this.authService.getCompanyById(id);
  }

  @Mutation(() => Company)
  companyLogin(
    @Context() ctx: MyContext,
    @Args('credentials') credentials: LoginInput,
  ): Promise<Company> {
    return this.authService.companyLogin(credentials, ctx.req);
  }

  @Mutation(() => User)
  userLogin(
    @Context() ctx: MyContext,
    @Args('credentials') credentials: LoginInput,
  ): Promise<User> {
    return this.authService.userLogin(credentials, ctx.req);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  createUser(@Args('newUser') newUser: CreateUserInput): Promise<User> {
    return this.authService.createUser(newUser);
  }

  @Mutation(() => Company)
  createNewCompany(
    @Args('newCompanyInput') newCompanyInput: CreateCompanyInput,
  ): Promise<Company> {
    return this.authService.createCompany(newCompanyInput);
  }
}
