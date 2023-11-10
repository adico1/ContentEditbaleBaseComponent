// ContentEditableComponent.ts
export class ContentEditableComponent {
  private element: HTMLElement;

  constructor(content?: string) {
    this.element = document.createElement('div'); // or any other element that supports contenteditable
    if (content && this.element.innerText !== content) {
      this.element.innerText = content;
    }
    this.element.setAttribute('contenteditable', 'true');
  }

  get content() {
    return this.element.innerText || '';
  }
  public render(): HTMLElement {
    return this.element;
  }
}
