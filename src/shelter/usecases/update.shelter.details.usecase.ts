import { iUseCase } from "src/domain/iusecase.interface";
import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";
import UpdateShelterDetailsUseCaseInput from "./dtos/update.shelter.details.usecase.input";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class UpdateShelterDetailsUseCase implements iUseCase<UpdateShelterDetailsUseCaseInput,UpdateShelterDetailsUseCaseOutput>
{
    run(input: UpdateShelterDetailsUseCaseInput): Promise<UpdateShelterDetailsUseCaseOutput> {
        throw new Error("Method not implemented.");
    }


}

