/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-22 19:03:05
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-22 20:41:05
 * @FilePath     : /react-native-easy-ui-kit/app/(drawer)/modal.tsx
 * @Description  : /
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import {View,Text,Button,useStyles,createStyleSheet,BottomSheet,BottomSheetRef,ModalTextInput} from '@/modules'
import { useCallback, useMemo, useRef } from 'react'


function ModalView(){

    const {styles} = useStyles(stylesheet)

    const ref = useRef<BottomSheetRef>(null)

    const scrollRef = useRef<BottomSheetRef>(null)

    const inputRef =  useRef<BottomSheetRef>(null)

    const bgRef = useRef<BottomSheetRef>(null)

    const data = useMemo(
        () =>
          Array(50)
            .fill(0)
            .map((_, index) => `index-${index}`),
        []
      );
    
     const renderItem = useCallback(
        (item:string) => (
          <View key={item} style={styles.itemContainer}>
            <Text>{item}</Text>
          </View>
        ),
        []
      );

    return(
        <View style={styles.constainer}>
            <Button label={'普通模态框'} onPress={()=>{
                ref.current?.presentModal()
            }} style={styles.button}/>
             <Button label={'ScrollView模态框'} onPress={()=>{
                scrollRef.current?.presentModal()
            }} style={styles.button}/>
             <Button label={'带输入框的模态框'} onPress={()=>{
                inputRef.current?.presentModal()
            }} style={styles.button}/>
             <Button label={'带背景模态框'} onPress={()=>{
                bgRef.current?.presentModal()
            }} style={styles.button}/>

            <BottomSheet ref={ref} snapPoints={['1%','50%','80%']}>
                <View style={styles.modal}>
                    <Text>这是一个普通模态</Text>
                </View>
            </BottomSheet>
            <BottomSheet ref={scrollRef} snapPoints={['1%','50%','80%']} type='ScrollView'>
                <View style={styles.modal}>
                    {data.map(renderItem)}
                </View>
            </BottomSheet>
            <BottomSheet ref={inputRef} snapPoints={['1%','30%']}>
                <View style={styles.modal}>
                   <ModalTextInput placeholder='输入内容' style={styles.input} />
                   <View style={styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                    </View>
                </View>
            </BottomSheet>
            <BottomSheet ref={bgRef} snapPoints={['1%','50%','80%']} enableBackdrop>
                <View style={styles.modal}>
                    <Text>这是一个带背景的模态框模态</Text>
                </View>
            </BottomSheet>
        </View>
    )
}

const stylesheet = createStyleSheet({
    constainer : {
      flex:1,
      justifyContent:'center',
      alignItems:'center'  
    },
    button : {
        width:200,
        height:40,
        marginBottom:10
    },
    modal:{
        flex:1,
        width:'100%',
        backgroundColor:'red'
       
    },
    itemContainer:{
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },
    input: {
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        backgroundColor: 'rgba(151, 151, 151, 0.25)',
      },
      contentContainer: {
        flex: 1,
        alignItems: 'center',
      },
})

export default ModalView
