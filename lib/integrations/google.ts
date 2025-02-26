import "server-only";
import { Readable } from "node:stream";
import { google } from "googleapis";
import { connect } from "@/db/mongoose";

import Tokens from "@/models/Tokens.model";

export interface GoogleTokenPropsModel {
  accessToken: string;
  refreshToken: string;
  scope: string;
  tokenType: string;
  expiryDate: number;
}
export interface GoogleTokenProps {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

const oauth2Client = new google.auth.OAuth2(
  process.env.DRIVE_CLIENT_ID,
  process.env.DRIVE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL}/integrations`
);


export async function getAuthUrl(scope: string) {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scope,
  });
}

//Called when first adding a scope or adding new scope ie after consent screen
export async function exchangeCodeForToken(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  // oauth2Client.setCredentials(tokens);
  return tokens;
}

//Get token from DB, if expired refresh and return new token
export async function getTokens(userId: any, scope: string) {
  await connect();
  try {
    const tokens = await Tokens.findOne({ user: userId });
    const tokenData = tokens.googleTokens.find(
      (token: any) => token.scope === scope
    );

    const currentTime = new Date();
    const expiryDate = new Date(tokenData.expiryDate);
    const isTokenExpiring =
      expiryDate.getTime() - currentTime.getTime() <= 60000; // Token is expiring in the next minute

    if (isTokenExpiring) {
      // oauth2Client.setCredentials({
      //   refresh_token: tokenData.refreshToken,
      // });
      const { credentials } = await oauth2Client.refreshAccessToken();

      oauth2Client.setCredentials(credentials);
      // const res = await Tokens.updateOne(
      //   { user: userId },
      //   {
      //     $set: {
      //       "google.accessToken": credentials.access_token,
      //       "google.refreshToken": credentials.refresh_token,
      //       "google.scope": credentials.scope,
      //       "google.tokenType": credentials.token_type,
      //       "google.expiryDate": credentials.expiry_date,
      //     },
      //   }
      // );

      const res = await Tokens.updateOne(
        { user: userId, "googleTokens.scope": scope },
        {
          $set: {
            "googleTokens.$.accessToken": credentials.access_token,
            "googleTokens.$.refreshToken": credentials.refresh_token,
            "googleTokens.$.tokenType": credentials.token_type,
            "googleTokens.$.expiryDate": credentials.expiry_date,
          },
        }
      );

      console.log("UPDATED TOKENS:", res);

      return credentials.access_token;
    }
    return tokenData.accessToken;
  } catch (error: any) {
    console.log("ERROR GETTING TOKEN:", error);
  }
}

export async function saveTokens(
  userId: string,
  newToken: GoogleTokenPropsModel
) {
  await connect();
  // TODO: Update to match other providers to match by constructing dynamic objects
  // const res = await Tokens.findOneAndUpdate(
  //   { user: userId },
  //   {
  //     "google.accessToken": tokens.access_token,
  //     "google.refreshToken": tokens.refresh_token,
  //     "google.scope": tokens.scope,
  //     "google.tokenType": tokens.token_type,
  //     "google.expiryDate": tokens.expiry_date,
  //   },
  //   { upsert: true, new: true }
  // );

  const existingTokens = await Tokens.findOne({ user: userId });
  if (existingTokens) {
    const tokenIndex = existingTokens.googleTokens.findIndex(
      (token: GoogleTokenProps) => token.scope === newToken.scope
    );

    if (tokenIndex > -1) {
      existingTokens.googleTokens[tokenIndex] = newToken;
    } else {
      existingTokens.googleTokens.push(newToken);
    }

    await existingTokens.save();
  } else {
    const tokenData = new Tokens({
      user: userId,
      googleTokens: [newToken],
    });
    await tokenData.save();
  }
}

export async function googleDriveUpload(
  userId: string,
  options: Record<string, any>
) {
  //Get access token
  const accessToken = await getTokens(
    userId,
    "https://www.googleapis.com/auth/drive"
  );
  oauth2Client.setCredentials({ access_token: accessToken });
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  const fileMetadata = {
    name: options.name,
    // parents: ["FENDOUS_AI"],  Optional .. Folder ID to which file should be added
  };
  const media = {
    mimeType: options.mimeType,
    body: Readable.from(options.body),
  };
  try {
    const res = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, name, mimeType, parents", // Fields to be included in the response
    });
    console.log("UPLOADED FILE:", res.data);
  } catch (error: any) {
    console.log("ERROR UPLOADING FILE:", error);
  }
}

export async function googleDocumentUpload() {}

export async function newgoogleCalendarEvent(
  userId: string,
  event: Record<string, any>
) {
  //Get access token
  const accessToken = await getTokens(
    userId,
    "https://www.googleapis.com/auth/calendar"
  );
  oauth2Client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
  }
}

export async function sendEmail(userId: string, encodedMessage: string) {
  const accessToken = await getTokens(
    userId,
    "https://www.googleapis.com/auth/gmail.send"
  );
  oauth2Client.setCredentials({ access_token: accessToken });
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  try {
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log("SEND EMAIL RESPONSE:", res.data);
    return res.data;
  } catch (error: any) {
    console.log("ERROR SENDING EMAIL:", error.message);
  }
}
