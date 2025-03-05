import { CarTransmission } from "../../../../core/enums/car-transmission.enum";

export interface Car {
  id: number,
  type: string,
  brand: string,
  year: number,
  transmission: CarTransmission,
  seats: number,
  vin: string,
  price: number,
  status: string,
  photo: string
}