import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { oAuthProxy } from "better-auth/plugins";
import { UserRole, UserStatus } from "../../generated/prisma/enums";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",

  }),
  baseURL: process.env.APP_URL!,
  trustedOrigins: [
    "https://medi-nest-server-beta.vercel.app",
    "https://medinest-client-pearl.vercel.app",
    "http://localhost:3000",
    "http://localhost:5000"



  ],

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.USER,
        required: false
      },
      status: {
        type: "string",
        defaultValue: UserStatus.active,
        required: false

      }
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      accessType: "offline",
      prompt: "select_account consent",
    },
  },
  advanced: {
    cookies: {
      session_token: {
        name: "session_token", // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true,
        },
      },
      state: {
        name: "session_token", // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true,
        },
      },
    },
  },

  plugins: [oAuthProxy()],

});




