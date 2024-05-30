import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { WalletAddressModule } from './wallet-address/wallet-address.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, WalletAddressModule, PrismaModule],
})
export class AppModule {}
