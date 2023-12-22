import React, { useEffect, useMemo } from 'react'
import { createStyleSheet,useStyles } from 'react-native-unistyles';
import {StyleSheet,Alert, Pressable,Platform} from 'react-native'
import View from '../../view';
import Text from '../../text';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming,interpolateColor } from 'react-native-reanimated';
import RootSiblings from 'react-native-root-siblings';
import { FullWindowOverlay } from 'react-native-screens';
import {GestureDetector,Gesture} from 'react-native-gesture-handler'

interface DialogButton {
  text?: string | undefined
  onPress?: ((value?: string) => void) | undefined
  style?: 'default' | 'cancel' | 'destructive' | undefined;
}

type DialogViewProps = {
  type?:'input' | 'normal'
  position?:'left' | 'center' | 'bottom' | 'right' // 打开方式
  swipeClose?:boolean  //是否开启滑动关闭
  title:string //标题
  message?:string //消息
  buttons?: DialogButton[] //按钮
  hideDialog?:()=>void
}

//最小间距
export const pixelWidth: number = StyleSheet.hairlineWidth

function DialogView({
  type = 'normal',
  title = '标题',
  message = '',
  position = 'center',
  swipeClose = false,
  buttons = [{
    text:'取消',
    style:'cancel',
    onPress:()=>{}
  },{
    text:'确定',
    style:'destructive',
    onPress:()=>{}
  }],
  hideDialog= ()=>{}
}:DialogViewProps):JSX.Element {

  const {styles} = useStyles(stylesheet)
  const opacity = useSharedValue(0.5)
  const scale = useSharedValue(position==='center'? 0.5 : 1)
  const translateY = useSharedValue(position === 'bottom' ?300 : 0)
  const translateX = useSharedValue(position === 'left' ? -300 : position === 'right' ? 300 : 0)

  useEffect(()=>{
    startAnimation()
  },[])


  const dialogAnimatedStyle = useAnimatedStyle(()=>{
    return{
      transform: [{scale: scale.value},{translateY: translateY.value},{translateX: translateX.value}],
      opacity: opacity.value,
    }
  })

  const bgColor = useAnimatedStyle(()=>{
    return{
      backgroundColor:interpolateColor(opacity.value,[0.5,1],['transparent','rgba(0,0,0,0.1)'],'RGB'),
    }
  })

  /**
   * Starts the animation by setting the opacity and scale values using the withTiming function.
   * @return {none} This function does not return any value.
   */
  const startAnimation = ():void => {
    opacity.value = withTiming(1, {duration: 300});
    scale.value = withTiming(1, {duration: 300});
    if (position === 'bottom'){
      translateY.value = withTiming(0, {duration: 300});
    }else if (position === 'left'){
      translateX.value = withTiming(0, {duration: 300});
    }else if (position === 'right'){
      translateX.value = withTiming(0, {duration: 300});
    }else{
      opacity.value = withTiming(1, {duration: 300});
      scale.value = withTiming(1, {duration: 300});
    }
  }

  /**
   * Stops the animation by setting the opacity and scale values using the withTiming function. 
   * If the scale animation finishes, it runs the hideDialog function using the runOnJS function.
   *
   * @return {void} No return value.
   */
  const stopAnimation = ():void => {
    opacity.value = withTiming(0, {duration: 300});
    scale.value = withTiming(0.8, {duration: 300},(finished)=>{
        if(finished){
            runOnJS(hideDialog)();
        }
    });
    if (position === 'bottom'){
      translateY.value = withTiming(300, {duration: 300});
    }
    else if (position === 'left'){
      translateX.value = withTiming(-300, {duration: 300});
    }
    else if (position === 'right'){
      translateX.value = withTiming(300, {duration: 300});
    }
  }

  const gesture = Gesture.Pan()
  .onBegin(()=>{
    console.log('开始')
  }).onUpdate((e)=>{
    //弹框随着滑动移动消失
    if(position === 'bottom'){
      translateY.value = e.translationY
    }else if(position === 'left'){
      translateX.value = e.translationX
    }else if(position === 'right'){
      translateX.value = e.translationX
    }
  }).onEnd((e)=>{
    console.log('结束')
    if(position === 'bottom'){
      if(e.translationY > 200){
        // stopAnimation()
        runOnJS(stopAnimation)();
      }else{
        translateY.value = withTiming(0, {duration: 300});
      }
    }else if(position === 'left'){
      if(e.translationX < -200){
        // stopAnimation()
        runOnJS(stopAnimation)();
      }else{
        translateX.value = withTiming(0, {duration: 300});
      }
    }else if(position === 'right'){
      if(e.translationX > 200){
        // stopAnimation()
        runOnJS(stopAnimation)();
      }else{
        translateX.value = withTiming(0, {duration: 300});
      }
    }
  })

  const defaultGesture = Gesture.Tap()

  /**
   * Renders the children of the component.
   *
   * @return {JSX.Element} The rendered children.
   */
  const children = ():JSX.Element =>{
    return(
      <GestureDetector gesture={ swipeClose ? gesture : defaultGesture }>
      <Animated.View style={[styles.container,bgColor]}>
        <Animated.View style={[styles.dialogView,dialogAnimatedStyle]}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          {message && <Text style={styles.message} numberOfLines={2}>{message}</Text>}
          <View style={styles.buttons}>
            {
              buttons && buttons.map((item,index)=>{
                return(
                  <Pressable 
                  key={index+''}
                  style={styles.buttonItem(index)}
                  onPress={()=>{
                    if(item.onPress){
                      if(index === 0){
                        stopAnimation()
                      }else{
                        stopAnimation()
                        item.onPress()
                      }
                    }
                  }}>
                    <Text style={styles.itemTitle(index)}>{item.text}</Text>
                  </Pressable>
                )
              })
            }
          </View>
        </Animated.View>
      </Animated.View>
      </GestureDetector>
    )
  }

  if(Platform.OS === 'ios'){
    return(
      <FullWindowOverlay>
        {children()}
      </FullWindowOverlay>
    )
  }

  return children()
}

const Dialog = {
  sibling: null as RootSiblings | null,
  
  /**
   * Show the dialog view with the given props.
   *
   * @param {DialogViewProps} props - The props to pass to the dialog view.
   */
  show(props:DialogViewProps) {
    this.sibling = new RootSiblings(
      <DialogView
        {...props}
        hideDialog={() => {
          this.hide();
        }}
      />
    )
  },
  /**
   * Hides the sibling element by destroying it and setting the sibling reference to null.
   *
   */
  hide(){
    this.sibling?.destroy();
    this.sibling = null;
  }
}

export default Dialog

const stylesheet = createStyleSheet(theme=>({
    container:{
       
        ...StyleSheet.absoluteFillObject,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        ...Platform.select({
          android:{
            zIndex:99
          },
          web:{
            zIndex:99
          },
          ios:{
            zIndex:0
          }
        })
        
    },
    dialogView:{
       backgroundColor:theme.colors.card,
       borderWidth:pixelWidth,
       borderColor:theme.colors.border,
       borderRadius:10,
       overflow:'hidden',
       alignItems:'center',
       width:300,
       shadowColor:'#000',
       shadowOffset : {
           width:0,
           height:2,
       },
       shadowOpacity:0.25,
       shadowRadius:3.84,
       elevation:0,
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:theme.colors.card,
        overflow:'visible',
        height:50,
        borderTopWidth:pixelWidth,
        borderTopColor:theme.colors.border,
        width:'100%',
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        color:theme.colors.text,
        marginBottom:10,
        textAlign:'center',
        maxWidth:200 ,
        height:40,
        lineHeight:50
    },
    message:{
        fontSize:14,
        color:theme.colors.text,
        textAlign:'center' ,
        maxWidth:200,
        height:40,
        marginBottom:10,
    },
    buttonItem : (index:number)=>({
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      borderRightWidth:index % 2 === 0 ? pixelWidth:0,
      borderRightColor:theme.colors.border,
      height:45,
  }),
    input:{
      width:'90%',
      marginBottom:20
    },
    itemTitle: (index:number) => ({
      fontSize:16,
      color:theme.colors.text,
      fontWeight:index % 2 !== 0 ?'bold':'normal'
    })
}))