import { CarStatus } from "../../../../core/enums/car-status.enum";
import { CarTransmission } from "../../../../core/enums/car-transmission.enum";
import { CarType } from "../../../../core/enums/car-type.enum";

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