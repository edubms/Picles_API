import IPetRepository from "./interfaces/pet.repository.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Pet } from "./schemas/pet.schema";
import { Model } from "mongoose";

export default class PetRepository implements IPetRepository{
    constructor(
        @InjectModel(Pet.name)
        private readonly petModel: Model<Pet>,
    ){}

    async create(data: Partial<Pet>): Promise<Pet> {
        return await this.petModel.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),

        })
    }

    async getById(id:string): Promise<Pet>{
        return await this.petModel.findById(id)
    }
}