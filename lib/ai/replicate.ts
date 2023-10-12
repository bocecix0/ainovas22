type EditImageProps = {
  prompt: string;
  amount: string;
  imgUrl: string;
  // this resolutions need to change to match the ones in the replicate format
  resolution: "256x256" | "512x512" | "1024x1024";
};

export const editImage = async ({
  prompt,
  amount,
  imgUrl,
  resolution,
}: EditImageProps) => {
  let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_TOKEN,
    },
    body: JSON.stringify({
      version:
        "b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df",
      input: {
        image_path: imgUrl,
        prompt: prompt,
        image_num: amount ? parseInt(amount) : 1,
        pixel: "768 * 768",
        product_size: "0.4 * width",
      },
    }),
  });

  let jsonStartResponse = await startResponse.json();
  console.log(jsonStartResponse);
  let endpointUrl = jsonStartResponse.urls.get;

  // GET request to get the status of the image restoration process & return the result when it's ready
  let editedImage: string | null = null;
  while (!editedImage) {
    // Loop in 1s intervals until the alt text is ready
    console.log("polling for result...");
    let finalResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_TOKEN,
      },
    });
    let jsonFinalResponse = await finalResponse.json();

    if (jsonFinalResponse.status === "succeeded") {
      editedImage = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  console.log(editedImage);
  return editedImage ? editedImage : "Failed to restore image";
};
