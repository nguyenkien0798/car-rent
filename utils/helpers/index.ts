// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serialize = (params: any) => {
  const str = [];
  for (const p in params)
    if (Object.prototype.hasOwnProperty.call(params, p)) {
      if (params[p] !== '') {
        str.push(encodeURIComponent(p) + '=' + params[p]);
      }
    }
  return str.join('&');
};