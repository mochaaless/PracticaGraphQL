import { Pet } from "../types.ts";
import { PetModelType } from "../db/pet.ts";
import { getPetModelType } from "../controllers/getPetModelType.ts";
import { GraphQLError } from "graphql";

export const Query = {
    pets: async (_parent:unknown, args: {breed?: string}):Promise<Pet[]> => {
        try{
            if(args.breed){
                const pets = await PetModelType.find({breed: args.breed});
                const petResponse: Pet[] = await Promise.all(pets.map(async (pet) => await getPetModelType(pet)));
                return petResponse;
            }
            const pets = await PetModelType.find();
            const petResponse: Pet[] = await Promise.all(pets.map(async (pet) => await getPetModelType(pet)));
            return petResponse;
        }catch(error){
            throw new GraphQLError(`Error getting all pets ${error}`);
        }
    },
    pet: async(_parent:unknown, args: {id: string}): Promise<Pet> => {
        try{
            const pet = await PetModelType.findById(args.id);
            if(!pet){
                throw new GraphQLError(`Pet not found`);
            }
            const petResponse:Pet = await getPetModelType(pet);
            return petResponse;
        }catch(error){
          throw new GraphQLError(`Error getting pet by ID ${error}`);
        }
    }
}