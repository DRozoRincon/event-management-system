import { IsString, IsEmail, MaxLength, IsNotEmpty } from 'class-validator';

export class CredentialsDto {
    @IsString()
    @MaxLength(100)
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    password: string;
}
export class UserDto extends CredentialsDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
}
