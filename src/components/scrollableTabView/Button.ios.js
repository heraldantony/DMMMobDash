import React from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity
} from 'react-native';

const Button = props => (
	<TouchableOpacity {...props}>
		{props.children}
	</TouchableOpacity>
);

Button.propTypes = {
	children: PropTypes.object
};

module.exports = Button;