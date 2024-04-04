import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator"

export default class UpdateShelterControllerInput {
    @IsNotEmpty()
    @IsString()
    shelterName: string
    @IsNotEmpty()
    @IsNumberString()
    @Length(10,11)
    shelterWhatsapp:string
    @IsNotEmpty()
    @IsNumberString()
    @Length(10,11)
    shelterPhone: string
    @IsNotEmpty()
    @IsEmail()
    shelterEmail: string
}