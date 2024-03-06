const BASE_ENDPOINT_URL = "https://2a4e-188-28-41-79.ngrok-free.app";

interface FetchClientProps {
  endpoint: string;
  payload?: any;
  method?: "GET" | "DELETE" | "POST" | "UPDATE" | "PUT"
}

export const FetchClient = async ({
  endpoint,
  method = "GET",
  payload,
}: FetchClientProps) => {
  try {
    const request = await fetch(`${BASE_ENDPOINT_URL}/${endpoint}`, {
      method,
      body: payload ? JSON.stringify(payload) : null,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (request.status === 200) {
      const response = await request.json();

      return response.data;
    }
  } catch (e) {
    console.error(e);
  }
};
