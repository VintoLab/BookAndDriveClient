import { UserRole } from "../enums/user-role.enum"

export interface JwtPayload {
  userId: number
  role: UserRole
  email: string
}