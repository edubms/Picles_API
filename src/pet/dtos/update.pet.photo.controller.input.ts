import { IsNotEmpty, IsString } from "class-validator";

export default class UpdatePetPhotoByIdControllerInput{
    @IsString()
    @IsNotEmpty()
    photo: string;
}