import { getTitleFromHTML } from ".";
import { routes } from "../constants";

export const handleLocation = async (): Promise<void> => {
  const path = window.location.pathname;
  const route = routes[path] || routes["/404"];

  try {
    const response = await fetch(route);
    if (!response.ok) {
      throw new Error("Failed to fetch HTML content");
    }

    const html = await response.text();
    const title = getTitleFromHTML(html);

    document.title = title;

    const mainPageElement = document.getElementById("main");
    if (mainPageElement) {
      mainPageElement.innerHTML = html;
    } else {
      console.error("Main page element not found");
    }
  } catch (error) {
    console.error(error);
  }
};
