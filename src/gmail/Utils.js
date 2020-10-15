export const getBody = (message, mimeType) => {
  let encodedBody = '';
  if (typeof message.parts === 'undefined') {
    encodedBody = message.body.data;
  } else {
    encodedBody = getHTMLPart(message.parts, mimeType);
  }
  encodedBody = encodedBody
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .replace(/\s/g, '');
  return decodeURIComponent(escape(window.atob(encodedBody)));
};

const getHTMLPart = (arr, mimeType) => {
  for (let x = 0; x < arr.length; x++) {
    if (typeof arr[x].parts === 'undefined') {
      if (arr[x].mimeType === mimeType) {
        return arr[x].body.data;
      }
    } else {
      return getHTMLPart(arr[x].parts, mimeType);
    }
  }
  return '';
};

export const isHTML = (str) => {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};

export const getValidEmails = (emailInput) => {
  let result = [];
  if (!emailInput || emailInput.trim() === '') {
    return result;
  }
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emails = emailInput.trim().replace(/[;\s]/g, ',').split(',');

  for (let i = 0; i < emails.length; i++) {
    const e = emails[i];
    if (e === '') {
      continue;
    }

    if (regex.test(e)) {
      result.push(e);
    } else {
      result = [];
      break;
    }
  }

  return result;
};
