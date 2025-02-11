import axios from "axios";

export const refreshToken = async (token: string) => {
  const refresh_token = await axios.get(
    `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  );

  return refresh_token.data;
};

export const sendDM = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log("sending message");
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
    {
      recipient: {
        id: recieverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const sendPrivateMessage = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log("sending message");
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
    {
      recipient: {
        comment_id: recieverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const generateTokens = async (code: string) => {
  try {
    // Validate input
    if (!code) {
      throw new Error("Authorization code is required");
    }

    // Validate environment variables
    const requiredEnvVars = [
      "INSTAGRAM_CLIENT_ID",
      "INSTAGRAM_CLIENT_SECRET",
      "NEXT_PUBLIC_HOST_URL",
      "INSTAGRAM_TOKEN_URL",
      "INSTAGRAM_BASE_URL",
    ];

    requiredEnvVars.forEach((varName) => {
      if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
      }
    });

    const insta_form = new FormData();
    insta_form.append("client_id", process.env.INSTAGRAM_CLIENT_ID!);
    insta_form.append("client_secret", process.env.INSTAGRAM_CLIENT_SECRET!);
    insta_form.append("grant_type", "authorization_code");
    insta_form.append(
      "redirect_uri",
      `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
    );
    insta_form.append("code", code);

    const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL!, {
      method: "POST",
      body: insta_form,
    });

    if (!shortTokenRes.ok) {
      const errorText = await shortTokenRes.text();
      throw new Error(
        `Token request failed: ${shortTokenRes.status} - ${errorText}`
      );
    }

    const token = await shortTokenRes.json();

    if (!token || !token.access_token) {
      throw new Error("Invalid token response");
    }

    // Check permissions (if required)
    if (!token.permissions || token.permissions.length === 0) {
      throw new Error("Insufficient permissions");
    }

    console.log(token);
    const longTokenResponse = await axios.get(
      `${process.env.INSTAGRAM_BASE_URL}/access_token`,
      {
        params: {
          grant_type: "ig_exchange_token",
          client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
          access_token: token.access_token,
        },
      }
    );

    return longTokenResponse.data;
  } catch (error) {
    console.error("Instagram Token Generation Error:", error);

    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Unexpected error in token generation");
    }
  }
};
