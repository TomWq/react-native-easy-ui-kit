import React  from 'react'
import type { ForwardedRef } from 'react';
import FastImage from "react-native-fast-image";
import type {FastImageProps} from 'react-native-fast-image'

const Image = React.forwardRef((props: FastImageProps, ref: ForwardedRef<any>) => {
  //@ts-ignore
  return <FastImage {...props} ref={ref} />;
});

// function Image(props:FastImageProps) {
//   return <FastImage {...props} />;
// }

export default Image
