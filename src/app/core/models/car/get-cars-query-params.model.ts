import { CarStatus } from "../../enums/car-status.enum";
import { CarTransmission } from "../../enums/car-transmission.enum";
import { CarType } from "../../enums/car-type.enum";

export interface GetCarsQueryParams {
  transmission: CarTransmission | string;
  type: CarType | string;
  status: CarStatus | string;
}