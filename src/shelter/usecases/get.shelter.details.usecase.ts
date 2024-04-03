import { iUseCase } from "src/domain/iusecase.interface";
import GetShelterDetailsUseCaseOutput from "./dtos/get.shelter.details.usecase.output";

export default class GetShelterDetailsUseCase implements iUseCase<null,GetShelterDetailsUseCaseOutput>{
    run(input: null): Promise<GetShelterDetailsUseCaseOutput> {
        return Promise.resolve(new GetShelterDetailsUseCaseOutput({
            shelterEmail:"bichos@bichos.com",
            shelterName:"bichineos",
            shelterPhone:"1999999999",
            shelterWhatsapp:"1999999999",
            createdAt: new Date(),
            updatedAt: new Date()
        }))
    }
}