import { iUseCase } from "src/domain/iusecase.interface";
import CreatePetUseCaseInput from "./dtos/create.pet.usecase.input";
import CreatePetUseCaseOutput from "./create.pet.usecase.output";

export default class CreatePetUseCase implements iUseCase<CreatePetUseCaseInput,CreatePetUseCaseOutput>{

    run(input: CreatePetUseCaseInput): Promise<CreatePetUseCaseOutput> {
        throw new Error("Not implemented method")
    }
}