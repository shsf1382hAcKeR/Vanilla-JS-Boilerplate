import { handleLocation } from "./utils";

interface CustomWindow extends Window {
  route?: (event?: Event) => void;
}

const route = (event?: Event): void => {
  const evt = event || window.event!;
  evt.preventDefault();
  window.history.pushState({}, "", (evt.target as HTMLAnchorElement).href);
  handleLocation();
};

// Cast window to the custom interface
const customWindow = window as CustomWindow;
// Assign route function to the customWindow object
customWindow.route = route;

// Add event listener to handle popstate
window.onpopstate = handleLocation;

// Initial page load
handleLocation();
