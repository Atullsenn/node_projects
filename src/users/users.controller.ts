import { Body, Controller, Post, Get, Param, Put, Delete } from "@nestjs/common";
import { CreateUserDTO, UpdateUserDTO } from "./dto";
import {UsersService} from "./users.service";


@Controller("/users")
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    create(@Body() createUserDto: CreateUserDTO){
        return this.usersService.create(createUserDto)
    }

    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @Get()
    findOne(@Param("id") id: string){
        return this.usersService.findOne(id)
    }
}