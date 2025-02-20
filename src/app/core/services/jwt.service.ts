import { Injectable } from "@angular/core";
import { JwtPayload } from "../models/jwt-payload.model";
import { Buffer } from "buffer";

@Injectable({
  providedIn: "root"
})
export class JwtService {
  getPayload(token: string): JwtPayload {
    const encodedPayload = token.split('.')[1];
    const decodedPayload = Buffer.from(encodedPayload, 'base64').toString('binary');
    const payload: JwtPayload = JSON.parse(decodedPayload);
    return payload;
  }
}