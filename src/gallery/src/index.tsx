import React from 'react'
import AwesomeGallery from 'react-native-awesome-gallery';
import type {GalleryProps as AwesomeGalleryProps,RenderItemInfo} from './type';
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
  }:RenderItemInfo<T>) =>{

    return (
      <Image
        source={{uri:item}}
        key={index+''}
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
      keyExtractor={(index) => index+''}
    />
  )
}

export default Gallery
