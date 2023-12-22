/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 12:56:07
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-21 09:23:34
 * @FilePath     : /react-native-easy-ui-kit/modules/image/src/index.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import React, { ForwardedRef } from 'react'
import FastImage,{FastImageProps} from "react-native-fast-image";

const Image = React.forwardRef((props: FastImageProps, ref: ForwardedRef<any>) => {
  return <FastImage {...props} ref={ref} />
})

// function Image(props:FastImageProps) {
//   return <FastImage {...props} />;
// }

export default Image