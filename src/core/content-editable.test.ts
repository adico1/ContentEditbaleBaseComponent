// Import the necessary modules and types
import '@testing-library/jest-dom';
import { ContentEditableComponent } from './content-editable'; // Adjust the import based on your actual file structure

// contentEditableComponent.test.ts
describe('ContentEditableComponent - initialization', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    // Set up a DOM element as a render target
    container = document.createElement('div');
    container.id = 'testinit';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should be instantiated without any parameters', () => {
    const instantiate = () => {
      const component = ContentEditableComponent.create();
      return component;
    };

    // Assert that instantiation does not throw an error
    expect(instantiate).not.toThrow();

    // Further assertions can be made to check if the instantiated component
    // is in the expected initial state, for example:
    const component = instantiate();
    expect(component).toBeInstanceOf(ContentEditableComponent);
    // a default state or property, should be initialized to those values
    // property 'content' should default to an empty string:
    container.appendChild(component.render());

    const contentEditableElement = document.querySelector(
      '#testinit [contenteditable]',
    );
    expect(contentEditableElement?.innerHTML).toBe('');
  });

  // Test instantiation with an initial value
  it('should be instantiated with an initial value', () => {
    const initialValue = 'Hello, World!';
    const contentEditable = new ContentEditableComponent({
      content: initialValue,
    });

    container.appendChild(contentEditable.render());
    const contentEditableElement = document.querySelector(
      '#testinit [contenteditable]',
    );
    expect(contentEditableElement?.innerHTML).toBe(initialValue);
  });
});

describe('ContentEditableComponent - defaults', () => {
  let component: ContentEditableComponent;
  let container: HTMLDivElement;
  let contentEditableElement: HTMLElement;

  beforeEach(() => {
    // Set up a DOM element as a render target
    container = document.createElement('div');
    container.id = 'test-defaults';
    document.body.appendChild(container);

    // Instantiate the component
    component = ContentEditableComponent.create();
    container.appendChild(component.render());

    contentEditableElement = container.querySelector(
      '#test-defaults [contenteditable]',
    ) as HTMLElement;
    if (!contentEditableElement) {
      throw new Error('Test Exception - contentEditableElement cannot be null');
    }
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('renders a contenteditable element when attached to the DOM', () => {
    // Check that the element is not null or undefined
    expect(contentEditableElement).toBeDefined();

    // Check that the scontenteditable attribute is 'true' (the element is editable)
    expect(contentEditableElement).toHaveAttribute('contenteditable', 'true');
    // Check that the element is an instance of HTMLElement
    expect(contentEditableElement).toBeInstanceOf(HTMLElement);
  });

  // it('has a non-default background color when focused', () => {
  //   const editableElement = container.querySelector('.contenteditable');
  //   // Trigger focus on the element
  //   editableElement.focus();
  //   // Assuming the focus triggers a style change
  //   expect(window.getComputedStyle(editableElement).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  // });
});

describe('ContentEditableComponent - default styles', () => {
  let component: ContentEditableComponent;
  let container: HTMLDivElement;
  let contentEditableElement: HTMLElement;

  beforeEach(() => {
    // Set up a DOM element as a render target
    container = document.createElement('div');
    container.id = 'test-defaults-styles';
    document.body.appendChild(container);

    // Instantiate the component
    const useDefaultFont = true;
    component = new ContentEditableComponent({ useDefaultStyle: true });
    container.appendChild(component.render());

    contentEditableElement = container.querySelector(
      '#test-defaults-styles [contenteditable]',
    ) as HTMLElement;
    if (!contentEditableElement) {
      throw new Error('Test Exception - contentEditableElement cannot be null');
    }
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('renders a contenteditable element when attached to the DOM', () => {
    // Check that the element is not null or undefined
    expect(contentEditableElement).toBeDefined();

    // Check that the contenteditable attribute is 'true' (the element is editable)
    expect(contentEditableElement).toHaveAttribute('contenteditable', 'true');
    // Check that the element is an instance of HTMLElement
    expect(contentEditableElement).toBeInstanceOf(HTMLElement);
  });

  it('renders with default styles', () => {
    // Define default styles:
    const defaultStyles = {
      'min-height': '2em',
      border: '1px solid #d4d4d4',
      padding: '0.5em',
      'background-color': '#fff',
      'font-family': 'Arial, sans-serif',
      'font-size': '1rem',
      'line-height': '1.5',
    };

    // Get the rendered element, assumed to have a method 'getRootElement' that returns the top-level DOM node
    // Assuming the focus triggers a style change
    const computedStyles = window.getComputedStyle(contentEditableElement);

    // Check if the rendered element's style matches the default styles
    for (const [key, value] of Object.entries(defaultStyles)) {
      console.log(key, value, computedStyles);
      expect(computedStyles[key as any]).toBe(value);
      expect(contentEditableElement.style[key as any]).toBe(value);
    }
  });

  // it('has a non-default background color when focused', () => {
  //   const editableElement = container.querySelector('.contenteditable');
  //   // Trigger focus on the element
  //   editableElement.focus();
  //   // Assuming the focus triggers a style change
  //   expect(window.getComputedStyle(editableElement).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  // });
});
