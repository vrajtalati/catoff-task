import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateWalletAddressDto {


  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  walletPassword: string;
}
