export interface JwtPayload {
  id: string;
}

export interface JwtResponse {
  token: string;
  refreshTokenId: string;
  refreshToken: string;
}
