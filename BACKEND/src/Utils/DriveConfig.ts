import { google } from "googleapis"
import path from "path"
import fs from "fs"

const ID_CLIENT_OAUTH = process.env.ID_CLIENT_OAUTH;
const SECRET_CLIENT_OAUTH = process.env.SECRET_CLIENT_OAUTH;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const GOOGLE_REFRESH_token = process.env.GOOGLE_REFRESH_token;

const oauth2Client = new google.auth.OAuth2(
    ID_CLIENT_OAUTH,
    SECRET_CLIENT_OAUTH,
    GOOGLE_REDIRECT_URI
)

oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_token });

export const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});