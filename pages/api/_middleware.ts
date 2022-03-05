import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  if (
    req.nextUrl.pathname.startsWith("/api/auth/user") &&
    req.method === "POST"
  ) {
    console.log(
      "middleware: path to auth/user with POST method, passing request."
    );
    return NextResponse.next();
  }
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const auth = basicAuth.split(" ")[1];
    const [user, pwd] = Buffer.from(auth, "base64").toString().split(":");

    if (user === "admin" && pwd === "testpwd123") {
      return NextResponse.next();
    }
  }

  // Fail to authenticate
  //@ts-ignore
  return NextResponse.rewrite(new URL("/api/auth/fail", req.url));
}

// TODO: Auth with JWT
// TODO: Handle JWT expire
