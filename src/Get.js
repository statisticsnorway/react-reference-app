export const get = (url) => {
  return new Promise((resolve) => {
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }).then(response => {
      console.log(response)

      if (response.status === 200) {
        response.json().then(json => {
          console.log(json)
          console.log(json)
          resolve()
        })
      } else {
        resolve()
      }
    }).catch(error => {
      console.log(`${error} (${url})`)

      resolve()
    })
  })
}
