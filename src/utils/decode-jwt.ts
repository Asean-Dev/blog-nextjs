import { CONFIG } from "@/config";
import { jwtVerify } from "jose";

export async function verifyJWT(token: string) {
  const secret = CONFIG.jwt_key;
  const secretUint8 = new TextEncoder().encode(secret);

  try {
    const { payload, protectedHeader } = await jwtVerify(token, secretUint8);
    console.log("✅ Verified payload:", payload);
    console.log("✅ Header:", protectedHeader);
    return payload;
  } catch (error) {
    console.error("❌ Invalid token:", error);
    return null;
  }
}
