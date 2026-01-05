// import { NextResponse } from "next/server";

// export function middleware(request) {
//   // You can add middleware logic here if needed
//   console.log("Middleware executed for request:", request);
//   return NextResponse.redirect(new URL("/about", request.url));
// }
import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
