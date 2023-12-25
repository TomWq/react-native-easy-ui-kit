import {View,Text,Button,useStyles,createStyleSheet,BottomSheetRef,Modal} from '@/modules'
import { useRef } from 'react'

function ModalView(){

    const {styles} = useStyles(stylesheet)
    const ref = useRef<BottomSheetRef>(null)

    return(
            <View style={styles.constainer}>
                <Button label={'普通模态框'} onPress={()=>{
                    ref.current?.presentModal()
                }} style={styles.button}/>
               <Modal ref={ref} snapPoints={['1%','50%']} enableBlurBackdrop>
                    <View style={styles.modal}>
                        <Text>这是一个Modal</Text>
                    </View>
               </Modal>
            </View>
       
    )
}

const stylesheet = createStyleSheet(theme=>({
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
        
    }
}))

export default ModalView 