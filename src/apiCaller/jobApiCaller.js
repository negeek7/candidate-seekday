export async function jobApiCaller(url, payload = {}) {
    const response = await fetch(url, {
        method: "POST",
        header: "application/json",
        body: !Object.keys(payload).length ? JSON.stringify({ limit: 10, offset: 0 }) : JSON.stringify(payload)
    })
    const data = response.json()
    return data
}