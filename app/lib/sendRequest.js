export async function sendRequest(data, url, token = "") {
  const res = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token && token}`,
    },

    body: JSON.stringify({ data: data, token }),
  });

  return res;
}
