export default (url: string, socketOpt: object) => {
  const on = () => {}
  const isReady = () => true
  const disconnect = () => true
  const request = async (body: any) => {
    const init = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...socketOpt,
    }

    const res = await fetch(url, init)
    const jsonData = await res.json()
    return jsonData
  }

  return { on, isReady, disconnect, request }
}
