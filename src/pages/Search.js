import React, {  Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	ListView,
	TextInput
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as dashboardActions from '../actions/dmmmobdash.actions';
import styles from './styles/Search';
import { iconsMap } from '../utils/AppIcons';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			currentPage: 1,
			searchResults: {
				results: []
			},
			query: null
		};

		this._handleTextInput = this._handleTextInput.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	_handleTextInput(event) {
		const query = event.nativeEvent.text;
		this.setState({ query });
		if (!query) this.setState({ query: '' });

		setTimeout(() => {
			if (query.length) {
			}
		}, 500);
	}

	_retrieveNextPage() {
		if (this.state.currentPage !== this.props.searchResults.total_pages) {
			this.setState({
				currentPage: this.state.currentPage + 1
			});

			let page;
			if (this.state.currentPage === 1) {
				page = 2;
				this.setState({ currentPage: 2 });
			} else {
				page = this.state.currentPage + 1;
			}
                 }
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.searchbox}>
					<View style={styles.searchboxBorder}>
						<TextInput
							style={styles.textInput}
							autoFocus
							returnKeyType={'search'}
							value={this.state.query}
							onChange={this._handleTextInput}
							underlineColorAndroid="transparent"
						/>
					</View>
				</View>
			</View>

		);
	}
}

Search.propTypes = {
	actions: PropTypes.object.isRequired,
	searchResults: PropTypes.object.isRequired,
	navigator: PropTypes.object
};

Search.navigatorStyle = {
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarBackgroundColor: '#0a0a0a',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state, ownProps) {
	return {
		searchResults: state.acceleration.searchResults
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(dashboardActons, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
