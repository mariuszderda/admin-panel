"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 days from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(data: any) {
  // Verify credentials && get the user
  try {
    let resp = null;

    const { email, password } = data;

    // logic to salt and hash password
    const url = `${process.env.API_HOST}/auth/login`;
    // logic to verify if user exists
    resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: email,
        password,
      }),
    });
    const user = await resp.json();

    if (!user || user.statusCode === 401)
      return { error: "Invalid email or password" };

    // return json object with the user data

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });

    return { success: "Login successfully." };
  } catch (error) {
    if (error instanceof ZodError)
      // Return `null` to indicate that the credentials are invalid
      return { error: error.message };
  }
  return { error: "Something went wrong!" };
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return decrypt(session);
}
