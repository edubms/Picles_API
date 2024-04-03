export default class GetShelterDetailsUseCaseOutput{
    shelterName: string
    shelterWhatsapp: string
    shelterEmail: string
    shelterPhone: string
    createdAt: Date
    updatedAt: Date

    constructor(data: Partial<GetShelterDetailsUseCaseOutput>){
        Object.assign(this, data)
    }

}