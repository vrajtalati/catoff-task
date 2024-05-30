import { Module } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { WalletAddressController } from './wallet-address.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WalletAddressService],
  controllers: [WalletAddressController],
})
export class WalletAddressModule {}
