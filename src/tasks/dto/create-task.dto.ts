import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTaskDto{

    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    description: string

} 