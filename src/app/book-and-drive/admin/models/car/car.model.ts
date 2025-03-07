import { CarTransmission } from "../../../../core/enums/car-transmission.enum";

export interface Car {
  id: number;
  carTypeName: string;
  brand: string;
  year: number;
  transmission: CarTransmission;
  seats: number;
  vin: string;
  price: number;
  carStatusName: string;
  photo: string;
}