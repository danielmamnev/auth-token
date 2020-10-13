import React from 'react'

export default function SendEmail() {



async function sendGmail(e) {

  e.preventDefault();
  const url = "https://gmail.googleapis.com/gmail/v1/users/danielmamnev@gmail.com/messages/send";
  const res = await fetch(url, {
    headers: {
      "Content-type": "application/json",
      "clientId": "70209985143-n7mak3jgvaqppe5uk2a4d3a911hh59to.apps.googleusercontent.com",
      "apiKey": "AIzaSyDfmraNZhFNkxHpbvYL-cUjdSzrP2fnJcA",
      "scope": "https://www.googleapis.com/auth/gmail.send",
      
    },
    method: "POST",
    body: JSON.stringify({
      ...formData,
      from: 'danielmamnev@gmail.com',
    }),
  });
  const json = await res.json();
  console.log(json)
}
let formData = {};

  function onChange(e) {
    formData[e.target.name] = e.target.value;
  }



  return (
    <div>
      <form onSubmit={sendGmail}>
        <input name="text" type="text" onChange={onChange}/>
        <button type="submit">submit email</button>
        
        </form>
    </div>
  )
}
