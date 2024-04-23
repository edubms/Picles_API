import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator"

export default class UpdateShelterControllerInput {
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsNumberString()
    @Length(10,11)
    whatsapp:string
    @IsNotEmpty()
    @IsNumberString()
    @Length(10,11)
    phone: string
    @IsNotEmpty()
    @IsEmail()
    mail: string
}