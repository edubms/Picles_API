import { iUseCase } from "src/domain/iusecase.interface";
import DeletePetByIdUsecaseInput from "./dtos/delete.pet.by.id.usecase.input";
import DeletePetByIdUsecaseOutput from "./dtos/delete.pet.by.id.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import { Pet } from "../schemas/pet.schema";

@Injectable()
export default class DeletePetByIdUsecase implements iUseCase<DeletePetByIdUsecaseInput,DeletePetByIdUsecaseOutput>{
    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
    ){}
    async run(input: DeletePetByIdUsecaseInput): Promise<DeletePetByIdUsecaseOutput> {
        const pet = await this.getPetById(input.id)
        if(!pet){
            throw new PetNotFoundError()
        }

        await this.petRepository.deleteById(input.id)

        return new DeletePetByIdUsecaseOutput()
    }

    private async getPetById(id: string): Promise<Pet>
    {
        try{
            return await this.petRepository.getById(id)
        } catch (error){
            return null
        }
        
    }
}