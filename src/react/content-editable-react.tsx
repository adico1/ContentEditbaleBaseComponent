// file: ./src/react/content-editable-react.js
import React, {
  FC,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import ContentEditableComponent from '../core/content-editable';

interface ContentEditableReactProps {
  value: string;
  onChange: (value: string) => {};
}
const ContentEditableReact = forwardRef<HTMLElement, ContentEditableReactProps>(
  ({ value, onChange }: ContentEditableReactProps, ref) => {
    const contentEditableInstanceRef = useRef<ContentEditableComponent | null>(
      null,
    );

    // Ensure the ref provided is of the correct type
    const contentEditableRef =
      ref as React.MutableRefObject<HTMLElement | null>;

    // Use imperative handle to expose the contentEditableComponent's methods to the parent component
    // useImperativeHandle(ref, () => ({
    //   focus: () => {
    //     contentEditableInstanceRef.current?.element.focus();
    //   },
    // }));

    useEffect(() => {
      // Instantiate the vanilla component when the component mounts
      contentEditableInstanceRef.current = new ContentEditableComponent({
        useDefaultStyle: true,
        content: value,
      });

      console.log(contentEditableRef);

      // Append the contentEditableElement to the DOM
      if (contentEditableRef && contentEditableRef.current) {
        contentEditableRef.current.appendChild(
          contentEditableInstanceRef.current.render(),
        );
      }

      // Cleanup function to destroy the vanilla component when the component unmounts
      return () => {
        contentEditableInstanceRef.current?.destroy();
      };
    }, []); // Empty array ensures this effect runs once on mount and once on unmount

    useEffect(() => {
      // Update the vanilla component when the 'value' prop changes
      if (contentEditableInstanceRef?.current) {
        contentEditableInstanceRef.current.updateText(value);
      }
    }, [value]); // This effect runs every time the 'value' prop changes

    // The component does not render any additional DOM element itself
    // It relies on the ref provided by the parent to insert the content editable element
    return null;
  },
);

export default ContentEditableReact;
