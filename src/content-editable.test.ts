// Import the necessary modules and types
import '@testing-library/jest-dom';
import { ContentEditableComponent } from './content-editable'; // Adjust the import based on your actual file structure

// contentEditableComponent.test.ts
describe('ContentEditableComponent', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should be instantiated without any parameters', () => {
    const instantiate = () => {
      const component = new ContentEditableComponent();
      return component;
    };

    // Assert that instantiation does not throw an error
    expect(instantiate).not.toThrow();

    // Further assertions can be made to check if the instantiated component
    // is in the expected initial state, for example:
    const component = instantiate();
    expect(component).toBeInstanceOf(ContentEditableComponent);
    // If there's a default state or property, you can expect them to be initialized to those values
    // For example, if your component has a property 'content' that should default to an empty string:
    expect(component.content).toBe('');
  });

  // Test instantiation with an initial value
  it('should be instantiated with an initial value', () => {
    const initialValue = 'Hello, World!';
    const contentEditable = new ContentEditableComponent(initialValue);

    // Check if the contentEditable component's value equals the initial value
    expect(contentEditable.content).toBe(initialValue);

    // If your component renders to the DOM, you may want to append it to a document body
    // and then check if the innerHTML of the contenteditable element matches the initial value.
    // This would be more of an integration test rather than a pure unit test.
    // Example:
    // document.body.appendChild(contentEditable.render());
    // const contentEditableElement = document.querySelector('[contenteditable]');
    // expect(contentEditableElement.innerHTML).toBe(initialValue);
  });

  it('renders a contenteditable element when attached to the DOM', () => {
    const initialValue = 'Hello, World!';
    const contentEditable = new ContentEditableComponent(initialValue);
    container.appendChild(contentEditable.render());
    const contentEditableElement = container.querySelector(
      '[contenteditable]',
    ) as HTMLElement | null;

    // Check that the element is not null or undefined
    expect(contentEditableElement).toBeDefined();

    // Check that the contenteditable attribute is 'true' (the element is editable)
    expect(contentEditableElement).toHaveAttribute('contenteditable', 'true');
    console.log(contentEditableElement);
    // Check that the element is an instance of HTMLElement
    expect(contentEditableElement).toBeInstanceOf(HTMLElement);

    // Now we can safely check the isContentEditable property because we've asserted the element is an HTMLElement.
    expect((contentEditableElement as HTMLElement).isContentEditable).toBe(
      true,
    );
  });
});
