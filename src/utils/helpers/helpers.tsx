export const removeProtocol = (url: string) => {
  const urlObject = new URL(url); // Parse the URL
  return `${urlObject.hostname}:${urlObject.port}`; // Get hostname and port
};

export const genratePostImageUrl = (tenantId: string, filename: string) => {
  const url = `${
    "http://" +
    tenantId +
    "." +
    removeProtocol(String(process.env.NEXT_PUBLIC_API_URL))
  }`;
  return `${url}/post/${filename}`;
};
