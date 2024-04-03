import { Body, Controller, Get, Inject, Patch, Post } from '@nestjs/common';
import GetShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import { iUseCase } from 'src/domain/iusecase.interface';
import ShelterTokens from './usecases/shelter.tokens';
import UpdateShelterControllerInput from './usecases/dtos/update.shelter.controller.input';

@Controller('shelter')
export class ShelterController {

    @Inject(ShelterTokens.getShelterDetailsUseCase)
    private readonly getShelterDetailsUseCase: iUseCase<null, GetShelterDetailsUseCaseOutput>
    @Get()
    async getShelterDetails(): Promise<GetShelterDetailsUseCaseOutput> {
        return this.getShelterDetailsUseCase.run(null)
    }
    @Patch()
    async updateShelterDetails(@Body() input: UpdateShelterControllerInput){
        console.log(input)
    }
}