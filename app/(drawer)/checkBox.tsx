import {View,CheckBox,Text} from '@/modules'
import { useState } from 'react';

function CheckBoxView() {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    console.log('isEnabled',isEnabled)

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
           <CheckBox  
            onValueChange={toggleSwitch}
            checked={isEnabled}
            checkColor={'red'}
            />
           
        </View>
    )
}

export default CheckBoxView