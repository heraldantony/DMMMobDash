import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,TextInput,ScrollView,Image,
  View, Button, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, Alert
} from 'react-native';
import io from 'socket.io-client'

const socket = io('http://192.168.1.102:3000', {
  transports: ['websocket'],
})


socket.on('data-response', (data) => {
  console.log(data);
});
import { AreaChart, Grid } from '../charts'
import * as shape from 'd3-shape'

class AreaChartExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
        <View>
            <AreaChart
                style={{ height: 200 }}
                data={ data }
                contentInset={{ top: 30, bottom: 30 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
                <Grid/>
            </AreaChart>
            <Button
                onPress={() => {
                  Alert.alert('You tapped the button!');
                  socket.emit('data-request', { durationInSeconds: 5, rateInHz: 25});
                  }}
                title="Press Me"
              />
            </View>
        )
    }
}

export default AreaChartExample

