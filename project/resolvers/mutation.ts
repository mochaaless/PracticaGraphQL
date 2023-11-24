import { Pet } from "../types.ts";
import { PetModelType } from "../db/pet.ts";
import { getPetModelType } from "../controllers/getPetModelType.ts";
import { GraphQLError } from "graphql";

export const Mutation = {
    addPet: async (_parent:unknown, args: {name: string, breed: string}):Promise<Pet> => {
        try{
            const pet = new PetModelType({
                name: args.name,
                breed: args.breed
            });
    
            await pet.save();
            const petResponse:Pet = await getPetModelType(pet);
            return petResponse;
            
        }catch(error){
            throw new GraphQLError(`Error while adding new pet: ${error}`);
        }
    },
    deletePet: async (_parent:unknown, args: {id: string}):Promise<Pet> => {
        try{
            const petDelete = await PetModelType.findByIdAndDelete(args.id);

            if(!petDelete){
                throw new GraphQLError(`Pet not found by ID`);
            }
            const petResponse = await getPetModelType(petDelete);

            return petResponse;
        }catch(error){
            throw new GraphQLError(`Error while updating pet: ${error}`);
        }
    },
    updatePet: async (_parent:unknown, args: {id: string, name: string, breed: string}):Promise<Pet> => {
        try{
            const petUpdate = await PetModelType.findById(args.id);
            if(!petUpdate){
                throw new GraphQLError(`Pet not found by ID`);
            }

            petUpdate.name = args.name;
            petUpdate.breed = args.breed;

            await petUpdate.save();
            
            const petResponse = await getPetModelType(petUpdate);
            
            return petResponse;
        }catch(error){
            throw new GraphQLError(`Error while updating pet: ${error}`);
        }
    },
}