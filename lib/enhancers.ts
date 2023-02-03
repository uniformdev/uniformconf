import { enhance, EnhancerBuilder } from "@uniformdev/canvas";

export default async function runEnhancers(composition: any, token: string) {
  await enhance({
    composition,
    enhancers: getEnhancers(token),
    context: { preview: true },
  });
  return composition;
}

function getEnhancers(token: string) {
  return new EnhancerBuilder().component("featuredProducts", (component: any) =>
    component.parameterName("products", async (data: any) =>
      sampleFetchEnhancer(data, token)
    )
  );
}

const sampleFetchEnhancer = async (data: any, token: string) => {
  let response;
  try {
    response = await fetch("https://your-api-fetching-data", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("There was an error", error);
    // returning original value
    return data.parameter.value;
  }

  if (response?.ok) {
    return await response.json();
  } else {
    console.log(`HTTP Response Code: ${response?.status}`);
    // returning original value
    return data.parameter.value;
  }
};
