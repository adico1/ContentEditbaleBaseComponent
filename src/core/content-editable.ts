// file: ./src/core/content-editable.ts
interface ContentEditableComponentProps {
  content?: string;
  useDefaultStyle?: boolean;
}

const helpers = {
  setDefaultContent(element: HTMLElement, content: string): void {
    if (content && element.innerHTML !== content) {
      element.innerHTML = content;
    }
  },
  setAsContentEditable(element: HTMLElement): void {
    element.setAttribute('contenteditable', 'true');
  },
  addStyles(): void {
    const css = `
      :root {
        --contenteditable-border: 1px solid #d4d4d4;
        --contenteditable-focus-border-color: #7da2f4;
        --contenteditable-padding: 0.5em;
        --contenteditable-min-height: 2em;
        --contenteditable-background-color: #fff;

        --contenteditable-font-family: 'Arial, sans-serif';
        --contenteditable-font-size: 1rem;
        --contenteditable-line-height: 1.5;
      }
      
      .contenteditable-default {
        border: var(--contenteditable-border);
        padding: var(--contenteditable-padding);
        'min-height': var(--contenteditable-min-height),
        'background-color': var(--contenteditable-background-color),
        'font-family': var(--contenteditable-font-family),
        'font-size': var(--contenteditable-font-size),
        'line-height': var(--contenteditable-line-height),
      }
      
      .contenteditable-default:focus {
        border-color: var(--contenteditable-focus-border-color);
        box-shadow: 0 0 0 1px var(--contenteditable-focus-border-color);
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);
  },
};

export default class ContentEditableComponent {
  private static addedStyles = false;
  private element: HTMLElement;

  constructor({
    content = '',
    useDefaultStyle = false,
  }: ContentEditableComponentProps) {
    this.element = document.createElement('div'); // or any other element that supports contenteditable
    this.element.classList.add('contenteditable-default');
    helpers.setDefaultContent(this.element, content);
    helpers.setAsContentEditable(this.element);
    this.setUseDefaultStyle(useDefaultStyle);

    this.element.addEventListener('input', this.handleInput);
  }

  public destroy(): void {
    // Remove event listeners
    this.element.removeEventListener('input', this.handleInput);

    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

  // Example event handler method
  private handleInput = (event: Event) => {
    // Handle the input event
    console.log('Input event fired:', event);
  };

  updateText(newText: string) {
    this.element.textContent = newText;
  }

  setUseDefaultStyle(useDefaultStyle: boolean): void {
    if (useDefaultStyle) {
      if (!ContentEditableComponent.addedStyles) {
        helpers.addStyles();
        ContentEditableComponent.addedStyles = true;
      }
    }
  }

  public static create() {
    return new ContentEditableComponent({
      content: '',
      useDefaultStyle: false,
    });
  }

  public render(): HTMLElement {
    return this.element;
  }
}
