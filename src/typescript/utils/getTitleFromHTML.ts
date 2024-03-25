export const getTitleFromHTML = (html: string): string => {
  const match = html.match(/<title>(.*?)<\/title>/i);
  return match ? match[1] : "Untitled";
};
