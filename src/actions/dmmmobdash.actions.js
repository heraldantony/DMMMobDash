import * as types from '../constants/actionTypes';


export function getAccelerationDataSuccess(res) {
	return {
		type: types.GET_ACCELERATION_DATA_SUCCESS,
		data: res.data
	};
}
export function getAccelerationDataFailure(err) {
	return {
		type: types.GET_ACCELERATION_DATA_FAILURE,
		error: err
	};
}
export function getFFTDataSuccess(res) {
	return {
		type: types.GET_FFT_DATA_SUCCESS,
		data: res.data
	};
}
export function getFFTDataFailure(err) {
	return {
		type: types.GET_FFT_DATA_FAILURE,
		error: err
	};
}

export const prepareSocketForResponses = (socket) => {
   return (dispatch) => {
       socket.on('acceleration-response', (res) => {
           console.log(res);
           dispatch(getAccelerationDataSuccess(res))
       }); 
       socket.on('fft-response', (res) => {
           console.log(res);
           dispatch(getFFTDataSuccess(res))
       }); 
    }
}

export const getAccelerationData = (socket, options) => {
   return (dispatch) => {
      socket.emit('acceleration-request', options);
   }
}

export const getFFTData = (socket, options) => {
   return (dispatch) => {
      socket.emit('fft-request', options);
   }
}
