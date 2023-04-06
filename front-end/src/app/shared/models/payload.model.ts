export interface JwtPayload {
  id: number;
  username: string;
  email: string;
  is_superuser: boolean;
  exp: number;
  iat: number;
}
