
async function getToken(){
    fetch('/getToken', {
        method: 'GET', 
        headers: {'Content-Type': 'application/json'}
      }).then(response=> response.json())
      .then(response => {
        console.log(response.token.trim())
        return response.token.trim()
      })
      .catch(error => console.log(error))
    

}

export default getToken