import UpdatePetByIdOutput from './update.pet.usecase.output'

export default class UpdatePetPhotoByIdUseCaseOutput extends UpdatePetByIdOutput{

    constructor (data: Partial<UpdatePetPhotoByIdUseCaseOutput>){
        super(data)
        Object.assign(this,data)
    }
}
