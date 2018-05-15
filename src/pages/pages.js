/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from '../components/Drawer';
import AccelerationChart from './AccelerationChart';
import AreaChartExample from '../area-chart'
//import FFTChart from './FFTChart';
//import Search from './Search';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('dmmmobdash.AreaChartExample', () => AreaChartExample, store, Provider);
	Navigation.registerComponent('dmmmobdash.AccelerationChart', () => AccelerationChart, store, Provider);
	//Navigation.registerComponent('dmmmobdash.FFTChart', () => FFTChart, store, Provider);
	//Navigation.registerComponent('dmmmobdash.Search', () => Search, store, Provider);
	Navigation.registerComponent('dmmmobdash.Drawer', () => Drawer);
}
