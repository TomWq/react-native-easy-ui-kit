import AwesomeGallery, {
  RenderItemInfo,
} from 'react-native-awesome-gallery';
import type {GalleryProps as AwesomeGalleryProps} from './type';
import Image from '../../image'
import { StyleSheet } from 'react-native';


type GalleryProps<T> = AwesomeGalleryProps<T> & {
  initialIndex: number;
}

function Gallery<T extends string> (porps:GalleryProps<T>){

  const {initialIndex,...otherProps} = porps

  const renderItem = ({
    index,
    item,
    setImageDimensions,
  }:RenderItemInfo<T>) =>{
  
    return (
      <Image
        source={{uri:item}}
        style={StyleSheet.absoluteFillObject}
        resizeMode="contain"
      />
    );
  }

  return (
    <AwesomeGallery
      {...otherProps}
      renderItem={renderItem}
      initialIndex={initialIndex}
      keyExtractor={(item,index) => index+''}
    />
  )

}

export default Gallery