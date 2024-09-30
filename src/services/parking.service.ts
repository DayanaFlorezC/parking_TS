import { Parking } from '../entity/Parking';
import {
    createParking,
    deleteParking,
    getParking,
    getParkings,
    updateParking
} from '../repository/parking.repository';

export const getParkingService = async (query: object, id: number) =>{
        return await getParking(query, id) 
}

export const getParkingsService = async (query : object) =>{
        return await getParkings(query)
}

export const createParkingService = async (data: Parking) =>{
    try {
        return await createParking(data)
    } catch (error) {
        throw new Error("Error en el servicio de crear parqueadero");
    }
       
}

export const updateParkingService = async (updateData: Parking, id: number) =>{
    try {
        const parking = await getParking({}, id)

        if(!parking) return null

        const capacity = parking.capacity

        if(updateData.capacity > parking.vehicles.length) return {
            exception : true,
            msg: 'No se puede modificar la capacidad de un parqueadero menor a la cantidad actual que tiene'
        }

        return await updateParking(updateData, id)
    } catch (error) {
        console.log(error)
        throw new Error("Error en servicio update parking");
        
    }
        
}

export const deleteParkingService = async (id: number) =>{
        return await deleteParking(id)
}