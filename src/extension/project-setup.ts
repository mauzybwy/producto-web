/*****************************************************************************
 * Import
 *****************************************************************************/
import ReactDOM, { Renderer } from "react-dom";

/*****************************************************************************
 * Types
 *****************************************************************************/
type AppElement = Parameters<Renderer>["0"][0];

interface AppSetupConfig {
  appElement: AppElement;
  injectionSelector: string;
}

/*****************************************************************************
 * Public Functions
 *****************************************************************************/

export const setupProject = (config: AppSetupConfig) => {
  if (config.appElement) {
    // Spin until injection element is available
    const interval = setInterval(() => {
      let injectionElement = document.querySelector<HTMLElement>(config.injectionSelector);
      if (injectionElement) {
        try {
          injectExtensionToDOM(config.appElement, injectionElement);
        } catch(e) {
          console.log("ERROR injecting into DOM:");
          console.log(e);
        }
        clearInterval(interval);
      }
    }, 100);
  }
};

/*****************************************************************************
 * Private Functions
 *****************************************************************************/

function injectExtensionToDOM (
  appElement: AppElement,
  injectionElement: HTMLElement
) {
  const appContainerId = "producto-root";

  const appContainer = document.createElement("div");
  appContainer.id = appContainerId;

  if (injectionElement) {
    injectionElement.appendChild(appContainer);
    let appContainerElement = injectionElement.querySelector(`#${appContainerId}`)
    ReactDOM.render(appElement, appContainerElement);
  }
};
