import { Pet } from "../types.ts";
import { PetModelType } from "../db/pet.ts";

export const getPetModelType = (pet:PetModelType):Pet => {
    const {_id, name, breed} = pet;

    const petResponse: Pet = {
        id: _id.toString(),
        name,
        breed
    }
    return petResponse;
}