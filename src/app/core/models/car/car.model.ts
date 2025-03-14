import { CarStatus } from "../../enums/car-status.enum";
import { CarTransmission } from "../../enums/car-transmission.enum";
import { CarType } from "../../enums/car-type.enum";

export interface Car {
  id: number;
  carTypeName: string;
  carTypeId: CarType
  brand: string;
  year: number;
  transmission: CarTransmission;
  seats: number;
  vin: string;
  price: number;
  carStatusName: string;
  carStatusId: CarStatus;
  photo: string;
}