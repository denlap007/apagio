export default (str, mapObj) => {
  const re = new RegExp(Object.keys(mapObj).join("|"), "gi");

  return str.replace(re, (matched) => mapObj[matched.toLowerCase()]);
};
