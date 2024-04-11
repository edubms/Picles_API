import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import PetTokens from './pet.tokens';
import { iUseCase } from 'src/domain/iusecase.interface';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import CreatePetUseCaseOutput from './usecases/create.pet.usecase.output';
import GetPetByIdUseCaseInput from './usecases/dtos/get.pet.by.id.usecase.input';
import GetPetByIdUseCaseOutput from './usecases/dtos/get.pet.by.id.usecase.output';
import UpdatePetControllerInput from './dtos/update.pet.controller.input';
import UpdatePetByIdUseCaseOutput from './usecases/dtos/update.pet.usecase.output';
import UpdatePetByIdUseCaseInput from './usecases/dtos/update.pet.usecase.input';
import DeletePetByIdUsecaseInput from './usecases/dtos/delete.pet.by.id.usecase.input';
import DeletePetByIdUsecaseOutput from './usecases/dtos/delete.pet.by.id.usecase.output';

@Controller('pet')
export class PetController {
    @Inject(PetTokens.createPetUseCase)
    private readonly createPetUseCase: iUseCase<CreatePetUseCaseInput,CreatePetUseCaseOutput>
    @Inject(PetTokens.getPetUseCase)
    private readonly getPetUseCase: iUseCase<GetPetByIdUseCaseInput,GetPetByIdUseCaseOutput>
    @Inject(PetTokens.updatePetByIdUseCase)
    private readonly updatePetByIdUseCase: iUseCase<UpdatePetByIdUseCaseInput,UpdatePetByIdUseCaseOutput>
    @Inject(PetTokens.deletePetByIdUseCase)
    private readonly deletePetByIdUseCase: iUseCase<DeletePetByIdUsecaseInput,DeletePetByIdUsecaseOutput>

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

    @Put(':id')
    async updatePetById(@Body() input: UpdatePetControllerInput, @Param('id') id: string): Promise<UpdatePetByIdUseCaseOutput>{
        const useCaseInput = new UpdatePetByIdUseCaseInput({
            ...input,
            id
        })
        return await this.updatePetByIdUseCase.run(useCaseInput)
    }

    @Delete(':id')
    async deletePetById(@Param('id') id: string){
        try {
            const useCaseInput = new DeletePetByIdUsecaseInput({
                id})
            return await this.deletePetByIdUseCase.run(useCaseInput)
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message))
        }
    }
}
