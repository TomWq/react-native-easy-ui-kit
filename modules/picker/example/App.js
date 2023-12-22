import {ShowTimePicker,ShowNormalPicker,ShowCityPicker,ShowLinkagePicker} from 'react-native-ui-kit-picker'
import {View,Button,StyleSheet} from 'react-native' 

let defaultArray  = [
    {
        "label":'河北省',
        'value':[
            {
                "label":'石家庄市',
                'value':'1'
            },
            {
                "label":'唐山市',
                'value':'2'
            },
            {
                "label":'秦皇岛市',
                'value':'3'
            }
        ]
    },
    {
        "label":'山西省',
        'value':[
            {
                "label":'太原市',
                'value':'1'
            },
            {
                "label":'大同市',
                'value':'2'
            },
            {
                "label":'阳泉市',
                'value':'3'
            }
        ]
    }
]

export default function App() {

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Button label={'时间选择器'} onPress={()=>{
                ShowTimePicker({
                    pattern:'yyyy-MM-dd'
                }).then(res=>{
                    console.log('res',res)
                })
            }} style={styles.button}/>
            <Button label={'普通选择器'} onPress={()=>{
                ShowNormalPicker({
                    array:[
                        {label:'男',value:'1'},
                        {label:'女',value:'2'},
                    ]
                }).then(res=>{
                    console.log('res',res.label)
                })
            }} style={styles.button}/>

            <Button label={'城市选择器'} onPress={()=>{
                ShowCityPicker().then(res=>{
                    console.log('res',res)
                })
            }} style={styles.button}/>

            <Button label={'多级联动选择器'} onPress={()=>{
                ShowLinkagePicker({
                    array:defaultArray
                }).then(res=>{
                    console.log('res',res)
                }).catch(err=>{
                    console.log('err',err)
                })
            }} style={styles.button}/>
          
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        width:200,
        marginBottom:10
    }
})
