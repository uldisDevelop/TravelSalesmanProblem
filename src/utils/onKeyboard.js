import { useEffect } from 'react';
import keyboardKeyNames from './keyboardKeyNames';

export default function(keys, onKeyDown) {
  useEffect(() => {
    function onKeyboard(e) {
      const keyName = keyboardKeyNames(e.which);

      if (keys.includes(keyName)) {
        onKeyDown(keyName);
      }
    }

    document.addEventListener('keydown', onKeyboard);

    return () => {
      document.removeEventListener('keydown', onKeyboard);
    };
  }, []);
}
