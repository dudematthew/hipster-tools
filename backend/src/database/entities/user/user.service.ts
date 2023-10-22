import { BadRequestException, Inject, Injectable, InternalServerErrorException, forwardRef } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserInterface } from "./user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionsBitField, User } from "discord.js";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async create(user: UserInterface): Promise<UserEntity> {
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }

    async findOneById(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { id },
        });
    }

    async findOneByName(name: string): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { name },
        });
    }


    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async update(id: number, user: UserInterface): Promise<UserEntity> {
        const userToUpdate = await this.findOneById(id);
        if (!userToUpdate) {
            throw new BadRequestException('User not found');
        }
        const updatedUser = this.userRepository.merge(userToUpdate, user);
        return await this.userRepository.save(updatedUser);
    }

    async delete(id: number): Promise<UserEntity> {
        const userToDelete = await this.findOneById(id);
        if (!userToDelete) {
            throw new BadRequestException('User not found');
        }
        return await this.userRepository.remove(userToDelete);
    }
    
}