// Import the necessary modules and types
import '@testing-library/jest-dom';

describe('instanceof checks with Jest and JSDOM', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('div is an instance of HTMLElement', () => {
    const div = document.createElement('div');
    div.innerHTML = '<div class="newElement">Hello World</div>';
    document.body.appendChild(div);
    // This will pass because 'div' is an instance of HTMLDivElement, which inherits from HTMLElement.
    expect(div).toBeInstanceOf(HTMLElement);

    let newElement = div.querySelector('.newElement');
    expect(newElement).toBeInstanceOf(HTMLElement);
  });

  it('div is an instance of HTMLDivElement', () => {
    const div = document.createElement('div');
    div.innerHTML = '<div class="newElement">Hello World</div>';
    document.body.appendChild(div);
    // This will also pass because 'div' is specifically an instance of HTMLDivElement.
    expect(div).toBeInstanceOf(HTMLDivElement);
  });

  it('test HTMLElement', () => {
    let div = document.createElement('div');
    div.innerHTML = '<div class="newElement">Hello World</div>';
    document.body.appendChild(div);
    expect(div).toBeInstanceOf(HTMLElement);

    // If you want to check the newly created element inside div, you should query for it.
    let newElement = div.querySelector('.newElement');

    // Now, check if newElement is an instance of HTMLElement.
    // This should pass because newElement is a div element, which is an HTMLElement.
    expect(newElement).toBeInstanceOf(HTMLElement);
  });
});
