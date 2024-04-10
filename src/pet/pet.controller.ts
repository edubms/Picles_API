import { BadRequestException, Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import PetTokens from './pet.tokens';
import { iUseCase } from 'src/domain/iusecase.interface';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import CreatePetUseCaseOutput from './usecases/create.pet.usecase.output';
import GetPetByIdUseCaseInput from './usecases/dtos/get.pet.by.id.usecase.input';
import GetPetByIdUseCaseOutput from './usecases/dtos/get.pet.by.id.usecase.output';

@Controller('pet')
export class PetController {
    @Inject(PetTokens.createPetUseCase)
    private readonly createPetUseCase: iUseCase<CreatePetUseCaseInput,CreatePetUseCaseOutput>
    @Inject(PetTokens.getPetUseCase)
    private readonly getPetUseCase: iUseCase<GetPetByIdUseCaseInput,GetPetByIdUseCaseOutput>

    @Get(':id')
    async getPetById(@Param('id')id: string): Promise<GetPetByIdUseCaseOutput> {
        try{
            const useCaseInput = new GetPetByIdUseCaseInput({id})
            return await this.getPetUseCase.run(useCaseInput)
        }catch(error){
            throw new BadRequestException(JSON.parse(error.message))
        }

    }

    @Post()
    async createPet(@Body() input: CreatePetControllerInput){
        const useCaseInput = new CreatePetUseCaseInput({...input})
        await this.createPetUseCase.run(useCaseInput)
    }
}
