import {View,Switch} from '@/modules'
import { useState } from 'react';

function SwitchView() {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    console.log('isEnabled',isEnabled)

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Switch 
                 onValueChange={toggleSwitch}
                 value={isEnabled}
                 style={{
                    width:100,
                    height:60
                 }}
            />
        </View>
    )
}

export default SwitchView