export const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
// 2022-09-23T08:50:03.000Z
export const formatDate = (dateStr) => {
  const splitedDate = dateStr.split("T");
  const dateLeft = splitedDate[0];
  const dateRight = splitedDate[1].split(".")[0];
  return dateLeft.split("-").reverse().join("/") + " à " + dateRight;
};
