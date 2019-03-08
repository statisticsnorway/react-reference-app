export const get = (url) => {
  return new Promise((resolve) => {
    const controller = new AbortController()

    const cookieItem = 'kc-access'
    const cookieToken = document.cookie.split(';')
      .filter(item => item.includes(`${cookieItem}=`))[0]
      .replace(`${cookieItem}=`, '')

    let timer = setTimeout(() => {
      controller.abort()
      console.log(`Timeout: (${url})`)
    }, 3000)

    fetch(url, {
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${cookieToken}`
      }
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
