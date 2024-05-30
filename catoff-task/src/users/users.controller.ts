import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // Call the service method to create a user 
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    // Call the service method to find all users 
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Call the service method to find a user by ID 
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // Call the service method to update a user by ID
    this.usersService.update(+id, updateUserDto);
    
    return 'User updated successfully';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Call the service method to remove a user by ID
    this.usersService.remove(+id);
    
    return 'User deleted successfully';
  }
}
