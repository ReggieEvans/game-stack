export type JWTPayload = {
  id: string;
  email: string;
  username: string;
  role: "user" | "admin";
};
