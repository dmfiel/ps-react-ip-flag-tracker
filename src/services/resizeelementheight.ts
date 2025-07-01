// Used to update the map element to take up the remainder of the page
export function resizeElementHeight(element: HTMLElement, extra: number = 0) {
  var height = 0;
  var body = window.document.body;
  if (window.innerHeight) {
    height = window.innerHeight;
  } else if (body.parentElement && body.parentElement.clientHeight) {
    height = body.parentElement.clientHeight;
  } else if (body && body.clientHeight) {
    height = body.clientHeight;
  }
  element.style.height = height - element.offsetTop + extra + 'px';
}

// https://stackoverflow.com/questions/33080/setting-the-height-of-a-div-dynamically
// Thanks to Jason Bunting for the element resizing code
