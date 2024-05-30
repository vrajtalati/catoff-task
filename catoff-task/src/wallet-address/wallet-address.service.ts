import { Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WalletAddress } from '@prisma/client';
import { CreateWalletAddressDto } from './dtos/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dtos/update-wallet-address.dto';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class WalletAddressService {
  constructor(private prisma: PrismaService) {}

  async create(createWalletAddressDto: CreateWalletAddressDto, userId: number): Promise<WalletAddress> {
    try {
      const hashedPassword = await bcrypt.hash(createWalletAddressDto.walletPassword, 10);
      const uniqueString = this.generateUniqueString(userId);
      const data = {
        walletPassword: hashedPassword,
        uniqueString,
        userId,
      };
      return await this.prisma.walletAddress.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create wallet address');
    }
  }



  // Method to find a wallet address by ID
  async findOne(id: number, userId: number): Promise<WalletAddress> {
    try {
      const walletAddress = await this.prisma.walletAddress.findUnique({
        where: { id },
      });
      if (!walletAddress || walletAddress.userId !== userId) {
        throw new NotFoundException(`Wallet address with ID ${id} not found`);
      }
      return walletAddress;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve wallet address');
    }
  }


  
// Update the wallet address in the database
  async update(id: number, userId: number, updateWalletAddressDto: UpdateWalletAddressDto): Promise<WalletAddress> {
    try {
      const walletAddress = await this.findOne(id, userId);

      if (updateWalletAddressDto.walletPassword) {
        updateWalletAddressDto.walletPassword = await bcrypt.hash(updateWalletAddressDto.walletPassword, 10);
      }

      return await this.prisma.walletAddress.update({
        where: { id },
        data: updateWalletAddressDto,
      });
    } catch (error) {
    
      throw new InternalServerErrorException('Failed to update wallet address');
    }
  }

   // Method to remove a wallet address by ID

  async remove(id: number, userId: number): Promise<void> {
    try {
      await this.prisma.walletAddress.delete({
        where: { id, userId },
      });
    } catch (error) {
      if (error.code === 'P2025') {  // Prisma record not found error code
        throw new NotFoundException(`Wallet address with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to delete wallet address');
    }
  }


  // Generate a random string
  private generateUniqueString(userId: number): string {
    const randomString = randomBytes(4).toString('hex');  
    return `${userId}-${randomString}`;
  }
}
