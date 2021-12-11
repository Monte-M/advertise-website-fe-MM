export async function postFetch(url, dataToSend) {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    const data = await resp.json();
    return data;
  } catch (error) {}
}

export async function postAuthenticatedFetch(url, dataToSend, token) {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });
    const data = await resp.json();
    return data;
  } catch (error) {}
}

export async function getFetchData(url) {
  try {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();

    return data;
  } catch (error) {}
}

export async function getAuthenticatedFetchData(url, token) {
  try {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();

    return data;
  } catch (error) {}
}

export async function deleteFetch(url, token) {
  try {
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();

    return data;
  } catch (error) {}
}
