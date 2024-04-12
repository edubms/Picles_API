import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
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
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/config/multer.config';
import UpdatePetPhotoByIdUseCaseInput from './usecases/dtos/update.pet.photo.by.id.usecase.input';
import UpdatePetPhotoByIdUseCaseOutput from './usecases/dtos/update.pet.photo.by.id.usecase.output';
import GetPetsUseCaseInput from './usecases/dtos/get.pets.usecase.input';
import GetPetsUseCaseOutput from './dtos/get pets.usecase.output';

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
    @Inject(PetTokens.updatePetPhotoByIdUseCase)
    private readonly updatePetPhotoByIdUseCase: iUseCase<UpdatePetPhotoByIdUseCaseInput,UpdatePetPhotoByIdUseCaseOutput>
    @Inject(PetTokens.getPetsUseCase)
    private readonly getPetsUseCase: iUseCase<GetPetsUseCaseInput,GetPetsUseCaseOutput>

    @Get()
    async getPets(
        @Query('type') type?: string,
        @Query('size') size?: string,
        @Query('gender') gender?: string,
        @Query('page') page?: string,
        @Query('itemsPerPage') itemsPerPage?: string,
    ){
        const FIRST_PAGE = 1
        const DEFAULT_ITEMS_PER_PAGE = 10 
        const useCaseInput = new GetPetsUseCaseInput ({
            type: !!type ? type: null, 
            size: !!size ? size: null, 
            gender: !!gender ? gender: null, 
            page: !!page ? parseInt(page): FIRST_PAGE, 
            itemsPerPage: !!itemsPerPage ? parseInt(itemsPerPage): DEFAULT_ITEMS_PER_PAGE, 
        })
        return await this.getPetsUseCase.run(useCaseInput)
    }

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

    @Patch(':id/photo')
    @UseInterceptors(FileInterceptor('photo', multerConfig))
    async updatePhoto(@UploadedFile() photo: Express.Multer.File, @Param('id') id: string){
        try {
            const useCaseInput = new UpdatePetPhotoByIdUseCaseInput({
                id,
                photoPath: photo.path
            })
            return await this.updatePetPhotoByIdUseCase.run(useCaseInput)
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message))
        }
    }
}
