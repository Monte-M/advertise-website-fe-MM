const baseUrl = process.env.REACT_APP_BE_URL;
export async function postFetch(url, dataToSend) {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    // console.log('resp ===', resp);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log("catch block error", error);
  }
}

export async function getFetchData(urlEndPoint) {
  try {
    const resp = await fetch(`${baseUrl}${urlEndPoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();

    console.log("data ===", data);
    return data;
  } catch (error) {
    console.log("getFetchData catch block error", error);
  }
}
