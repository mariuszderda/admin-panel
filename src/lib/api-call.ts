"use server";

export async function getData(data: string) {
  const resData = await fetch(`${process.env.API_HOST}/${data}`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error("Failed to fetch data");
    });

  if (!resData) throw new Error(`List of ${data} not found`);

  return resData;
}
export async function getDataById(data: string, id: string) {
  const resData = await fetch(`${process.env.API_HOST}/${data}/${id}`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error("Failed to fetch data");
    });

  if (!resData) throw new Error(`List of product not found`);

  return resData;
}
export async function getDataWithToken(data: string, token: string) {
  const resData = await fetch(`${process.env.API_HOST}/${data}/`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_API_HOST}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error("Failed to fetch data");
    });

  if (!resData) throw new Error(`List of ${data} not found`);

  return resData;
}

export async function getDataByIdWithToken(
  data: string,
  id: string,
  token: string
) {
  const resData = await fetch(`${process.env.API_HOST}/${data}/${id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_API_HOST}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error("Failed to fetch data");
    });

  if (!resData) throw new Error(`List of product not found`);

  return resData;
}
