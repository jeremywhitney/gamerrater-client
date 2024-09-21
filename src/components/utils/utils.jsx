export const getFullImageURL = (relativeURL) => {
  const baseURL = "http://localhost:8000";
  return relativeURL.startsWith("http")
    ? relativeURL
    : `${baseURL}${relativeURL}`;
};
