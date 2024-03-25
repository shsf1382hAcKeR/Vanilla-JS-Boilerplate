// Define a custom interface for the extended window object
interface CustomWindow extends Window {
  route?: (event?: Event) => void;
}

// Cast window to the custom interface
const customWindow = window as CustomWindow;

const routes: Record<string, string> = {
  "/": "/pages/home.html",
  "/about": "/pages/about.html",
  "/404": "/pages/404.html",
};

const getTitleFromHTML = (html: string): string => {
  const match = html.match(/<title>(.*?)<\/title>/i);
  return match ? match[1] : "Untitled";
};

const handleLocation = async (): Promise<void> => {
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

const route = (event?: Event): void => {
  const evt = event || window.event!;
  evt.preventDefault();
  window.history.pushState({}, "", (evt.target as HTMLAnchorElement).href);
  handleLocation();
};

// Assign route function to the customWindow object
customWindow.route = route;

// Add event listener to handle popstate
window.onpopstate = handleLocation;

// Initial page load
handleLocation();
