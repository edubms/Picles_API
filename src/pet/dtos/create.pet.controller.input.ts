import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export default class CreatePetControllerInput{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Pet Name'})
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Pet Type'})
    type: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Pet Size'})
    size: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Pet gender'})
    gender: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1024)
    bio: string;
}