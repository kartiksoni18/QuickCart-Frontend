import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export default function useKeyboardOffsetHeight() {
  const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);

  useEffect(() => {
    // the first two functions are for android and the other are for ios
    const keyboardWillAndroidShowListner = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      },
    );
    const keyboardWillAndroidHideListner = Keyboard.addListener(
      'keyboardDidHide',
      e => {
        setKeyboardOffsetHeight(0);
      },
    );

    //for ios
    const keyboardWillShowListner = Keyboard.addListener(
      'keyboardWillShow',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      },
    );
    const keyboardWillHideListner = Keyboard.addListener(
      'keyboardWillHide',
      e => {
        setKeyboardOffsetHeight(0);
      },
    );

    return () => {
      keyboardWillAndroidShowListner.remove();
      keyboardWillAndroidHideListner.remove();
      keyboardWillShowListner.remove();
      keyboardWillHideListner.remove();
    };
  }, []);

  return keyboardOffsetHeight;
}
