import dotenv from 'dotenv';
dotenv.config();

export const clientId = process.env.CLIENT_ID;
export const clientSecret = process.env.CLIENT_SECRET;
export const tenantId = process.env.TENANT_ID;
export const authority = process.env.AUTHORITY;
export const scope = process.env.SCOPE;
export const myUserId = process.env.MY_USER_ID;