import "next-auth";

declare module "next-auth" {
  interface User {
    userId: string | number;
    token: string | number;
  }

  interface Session {
    session: {
      user: User;
    };
  }
}
