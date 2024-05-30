import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { CreateWalletAddressDto } from './dtos/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dtos/update-wallet-address.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('wallet-addresses')
@UseGuards(AuthGuard('jwt'))  // Ensure user is authenticated
export class WalletAddressController {
  constructor(private readonly walletAddressService: WalletAddressService) {}

  // Endpoint to create a new wallet address
  @Post()
  create(@Req() req: Request, @Body() createWalletAddressDto: CreateWalletAddressDto) {
    // Get the user ID from the request
    const userId = req.user!.id;
    // Call the service method to create a wallet address
    return this.walletAddressService.create(createWalletAddressDto, userId);
  }

  // Endpoint to find a wallet address by ID
  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
   
    const userId = req.user!.id;
   
    return this.walletAddressService.findOne(+id, userId);
  }
  
  // Endpoint to update a wallet address by ID
  @Patch(':id')
  update(@Req() req: Request, @Param('id') id: string, @Body() updateWalletAddressDto: UpdateWalletAddressDto) {
    
    const userId = req.user!.id;
    
    return this.walletAddressService.update(+id, userId, updateWalletAddressDto);
  }

  // Endpoint to remove a wallet address by ID
  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    
    const userId = req.user!.id;
    
    return this.walletAddressService.remove(+id, userId);
  }
}
