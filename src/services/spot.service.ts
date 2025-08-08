import type { SpotModel } from "@/models/spot.model";
import { MainService } from "./main.service";

export class SpotService {
    static async getSpots(){
        return await MainService.useAxios<SpotModel[]>('/spot')
    }

    static async getSpotByID(id: number) {
        return await MainService.useAxios<SpotModel>(`/spot/${id}`)
    }
}