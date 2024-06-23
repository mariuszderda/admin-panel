"use server";

export async function getData(data: string) {
  const resData = await fetch(`${process.env.API_HOST}/${data}`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error("Failed to fetch data");
    });

  if (!resData || resData.length === 0)
    throw new Error(`List of ${data} not found`);

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

  if (!resData || resData.length === 0)
    throw new Error(`List of product not found`);

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

  if (!resData || resData.length === 0)
    throw new Error(`List of product not found`);

  return resData;
}

// export async function postData(data: string, url: string) {
//   const url = `${process.env.API_HOST}/${u}`;
//   const response = await fetch(url, {
//     method: httpMethod,
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//       "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_API_HOST}`,
//     },
//   });
// }

// const onSubmit = async (data: CreateProductType) => {
//   const url = product
//     ? `${process.env.NEXT_PUBLIC_API_HOST}/products/${product._id}`
//     : `${process.env.NEXT_PUBLIC_API_HOST}/products/`;
//
//   const httpMethod = product ? "PUT" : "POST";
//
//   try {
//     const response = await fetch(url, {
//       method: httpMethod,
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//         "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_API_HOST}`,
//       },
//     });
//
//     if (!response.ok) throw new Error("Network response was not ok");
//
//     toast.success("Update successful");
//     window.location.reload();
//     router.back();
//   } catch (error) {
//     throw new Error("Failed to update product");
//   }
// };
