import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type CreateImageProps = {
  prompt: string;
  amount: string;
  resolution: "256x256" | "512x512" | "1024x1024";
};

export const createImage = async ({
  prompt,
  amount,
  resolution,
}: CreateImageProps) => {
  if (!configuration.apiKey) {
    return new NextResponse("OpenAI API Key not configured.", { status: 500 });
  }

  const response = await openai.createImage({
    prompt,
    n: parseInt(amount, 10),
    size: resolution,
  });
  console.log(response);
  return response.data.data;
};
