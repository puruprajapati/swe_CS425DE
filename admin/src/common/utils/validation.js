export const hasWhiteSpace = (str) => {
  return /\s/g.test(str);
};

export const isUsernameValid = (username) => {
  // eslint-disable-next-line no-control-regex
  return username && !hasWhiteSpace(username) && /^[\x00-\x7F]{1,30}$/.test(username);
};

export const isEmailValid = (email) => {
  return email && /^[^@]+@.+\..+$/.test(email);
};

export const isMobileNumberValid = (mobile) => {
  return mobile && /^0(8|9|6)\s*\d{4}\s*\d{4}$/.test(mobile);
};

export const isValidUrl = (url) => {
  const pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  return url && pattern.test(url);
};