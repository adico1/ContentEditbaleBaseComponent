const helpers = {
    setDefaultContent(element, content) {
        if (content && element.innerText !== content) {
            element.innerText = content;
        }
    },
    setAsContentEditable(element) {
        element.setAttribute('contenteditable', 'true');
    },
    addStyles() {
        const css = `
      :root {
        --contenteditable-border: 1px solid #d4d4d4;
        --contenteditable-focus-border-color: #7da2f4;
        --contenteditable-padding: 0.5em;
      }
      
      .contenteditable-default {
        border: var(--contenteditable-border);
        padding: var(--contenteditable-padding);
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
    }
};
class ContentEditableComponent {
    static addedStyles = false;
    element;
    constructor({ content = '', useDefaultStyle = false } = {
        content: '',
        useDefaultStyle: false
    }) {
        this.element = document.createElement('div'); // or any other element that supports contenteditable
        helpers.setDefaultContent(this.element, content);
        helpers.setAsContentEditable(this.element);
        this.setUseDefaultStyle(useDefaultStyle);
    }
    get content() {
        return this.element.innerText || '';
    }
    setUseDefaultStyle(useDefaultFont) {
        if (useDefaultFont) {
            if (!ContentEditableComponent.addedStyles) {
                helpers.addStyles();
                ContentEditableComponent.addedStyles = true;
            }
        }
    }
    render() {
        return this.element;
    }
}

export { ContentEditableComponent };
//# sourceMappingURL=content-editable-base.esm.js.map
