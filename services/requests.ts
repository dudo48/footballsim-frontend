export async function getRequest(url: string) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export async function postRequest(
  url: string,
  payload?:
    | { [key: string]: string | number }
    | { [key: string]: string | number }[]
) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
}

export async function putRequest(
  url: string,
  payload?: { [key: string]: string | number }
) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
}

export async function deleteRequest(url: string) {
  const response = await fetch(url, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result;
}
