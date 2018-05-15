import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function (state = initialState.devices, action) {
	switch (action.type) {

	  case types.GET_ACCELERATION_DATA_SUCCESS:
      console.log(action)
			return {
				...state,
				acceleration: action.data
			};

	  case types.GET_FFT_DATA_SUCCESS:
			return {
				...state,
				fft: action.data
			};

		
		default:
			return state;
	}
}
