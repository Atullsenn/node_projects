import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from "mongoose";
import { USER_MODEL, UserDocument } from "../schemas/user";
import { CreateUserDTO, UpdateUserDTO } from "./dto";


@Injectable()
export class UsersService{
    constructor(
        @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>

    ){}

    async create(createUserDto: CreateUserDTO){
        try{
            const createUser = await this.userModel.create(createUserDto);
            return createUser;
        }
        catch(error){
            if(error.name === "ValidationError"){
                throw new BadRequestException(error.errors);
            }

            throw new ServiceUnavailableException();
        }
    }


    async findAll() {
        const users = await this.userModel.find();
        return users;
    }


    async findOne(id: string){
        const user = await this.userModel.findById(id);

        if(!user){
            throw new NotFoundException("User Not Found");
        }

        return user;
    }
}