import { isHTML } from './Utils';

// export const getMessage = async (messageId) => {
//   const response = await window.gapi.client.gmail.users.messages.get({
//     userId: 'me',
//     id: messageId,
//     format: 'full',
//   });

//   const { result } = response;

//   let body = getBody(result.payload, 'text/html');

//   if (body === '') {
//     body = getBody(result.payload, 'text/plain');
//     body = body
//       .replace(/(\r\n)+/g, '<br data-break="rn-1">')
//       .replace(/[\n\r]+/g, '<br data-break="nr">');
//   }

//   if (body !== '' && !isHTML(body)) {
//     body = body
//       .replace(
//         /(\r\n)+/g,
//         '<div data-break="rn-1" style="margin-bottom:10px"></div>'
//       )
//       .replace(/[\n\r]+/g, '<br data-break="nr">');
//   }

//   return {
//     body,
//     headers: response.headers,
//     result: {
//       ...result,
//       messageHeaders: response.result.payload.headers,
//       payload: undefined,
//     },
//   };
// };

export const sendMessage = ({ headers, body }) => {
  let email = '';

  const headersClone = { ...headers };
  headersClone['Content-Type'] = "text/html; charset='UTF-8'";
  headersClone['Content-Transfer-Encoding'] = 'base64';

  for (let header in headersClone) {
    email += `${header}: ${headersClone[header]}\r\n`;
  }

  email += `\r\n<html><body>${body}</body></html>`;
  const encodedEmail = unescape(encodeURIComponent(email));

  return window.gapi.client.gmail.users.messages.send({
    userId: process.env.REACT_APP_GMAIL_USER_ID,
    resource: {
      raw: window.btoa(encodedEmail).replace(/\+/g, '-').replace(/\//g, '_'),
    },
  });
};
