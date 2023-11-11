// ContentEditableReact.js
import React, { useEffect, useRef } from 'react';
import { ContentEditableComponent } from '../dist/content-editable-base.esm';

const ContentEditableReact = ({ value, onChange }) => {
  const divRef = useRef(null);
  const vanillaComponentRef = useRef(null);

  useEffect(() => {
    // Instantiate the vanilla component when the component mounts
    vanillaComponentRef.current = new ContentEditableComponent({ 
        useDefaultStyle: true,
        ref: divRef.current, 
        content: value,
    });

    // Set up a change listener or use other methods to propagate changes to the parent
    divRef.current.addEventListener('input', onChange);

    // Cleanup function to destroy the vanilla component when the component unmounts
    return () => {
      vanillaComponentRef.current.destroy();
      divRef.current.removeEventListener('input', onChange);
    };
  }, []); // Empty array ensures this effect runs once on mount and once on unmount

  useEffect(() => {
    // Update the vanilla component when the 'value' prop changes
    if (vanillaComponentRef.current) {
      vanillaComponentRef.current.updateText(value);
    }
  }, [value]); // This effect runs every time the 'value' prop changes

  return <div ref={divRef} />;
};

export default ContentEditableReact;
