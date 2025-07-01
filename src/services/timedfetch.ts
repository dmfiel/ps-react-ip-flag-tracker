const TIMEOUT_SEC = 10;
export async function timedFetch(url: string, uploadData = undefined) {
  let timeoutHandle: NodeJS.Timeout | undefined = undefined;
  function timeout(s: number): Promise<Response> {
    return new Promise(function (_, reject) {
      timeoutHandle = setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} seconds`));
      }, s * 1000);
    });
  }
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(uploadData)
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    if (timeoutHandle) clearTimeout(timeoutHandle);
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }
    const data = await res.json();
    if (!data) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
}
