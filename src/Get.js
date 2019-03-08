export const get = (url) => {
  return new Promise((resolve) => {
    const controller = new AbortController()

    let timer = setTimeout(() => {
      controller.abort()
      console.log(`Timeout: (${url})`)
    }, 3000)

    fetch(url, {
      signal: controller.signal,
      method: 'GET',
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(`${error} (${url})`)
    }).finally(() => {
      clearTimeout(timer)
      resolve()
    })
  })
}
