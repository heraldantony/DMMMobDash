import React, { Component } from "react";
import PropTypes from 'prop-types';

import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Alert
} from "react-native";

import { AreaChart, Grid } from "../../charts";
import MultiLineChart from '../../charts/MultiLineChart'
import * as shape from "d3-shape";
import SocketService from "../../utils/socket.api";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dashboardActions from '../../actions/dmmmobdash.actions';

class AccelerationChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    SocketService.init();
      SocketService.addListener("acceleration-response", this.accelerationResponseCB.bind(this));

  }
  componentWillUnmount() {
    SocketService.removeListener("acceleration-response");
  }
  accelerationResponseCB(data) {
    console.log(data);
    this.props.actions.getAccelerationDataSuccess({data: data})
    //   this.props.dispatch({})
   // this.setState({data: data})
  }
    render() {
      /*
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80
    ]; */
    
        let { data } = this.props;
        if (data && data.length) {
            //change time to "time difference"
            data.forEach((d, idx) => {
                if (idx > 0) data[idx][0] = (data[idx][0] - data[0][0]);
            })
            data[0][0] = 0;
            console.log(data)
        }
    return (
        <View>
            <Button
                onPress={() => {
                    // Alert.alert("You tapped the button!");
                     SocketService.emitEvent("acceleration-request", { durationInSeconds: 5, rateInHz: 25 });
                }}
                title="Get Data"
            />
        <MultiLineChart
          style={{ color: 'red', height: 300 }}
          linesData={data}
          names={['X','Y','Z']}
          colors={['red','blue','green']}
          contentInset={{ top: 30, bottom: 30 }}
          curve={shape.curveNatural}
          svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
        >
         </MultiLineChart>
        
      </View>
    );
  }
}

AccelerationChart.propTypes = {
	actions: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    console.log(state)
	return {
		data: (state.dmmmobdash.acceleration) || []
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(dashboardActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccelerationChart);

