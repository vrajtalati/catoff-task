import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Hash the user's password before saving it
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const data = {
        ...createUserDto,
        password: hashedPassword,
      };
      // Create the user in the database
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      // Handle specific error cases
      if (error.code == 'P2002') {  
        throw new BadRequestException("Email Already Exists");
      }
     
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      // Retrieve all users from the database
      return await this.prisma.user.findMany();
    } catch (error) {
      
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      // Find a user by ID in the database
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      // If user doesn't exist, throw a not found exception
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      // If the error is already a not found exception, rethrow it
      if (error instanceof NotFoundException) {
        throw error;
      }
      // For other errors
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      // If user is updating password, hash it before saving
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }
      // Update the user in the database
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      // Handle specific error cases
      if (error.code === 'P2002') {  
        throw new BadRequestException('Email is already in use');
      }
      if (error.code === 'P2025') {  
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      // For other errors
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Delete the user from the database
      await this.prisma.user.delete({
        where: { id },
      });
      // Return resolved promise if deletion is successful
      return Promise.resolve(); 
    } catch (error) {
      
      if (error.code === 'P2025') {  
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      // For other error
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
