import React, {
	Component
} from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	NativeModules,
	StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

import CommonIcon from 'react-native-commonicon';
import CommonSelectList from './CommonSelectList'

type Props = {};

export default class CommonSelectPanel extends Component < Props > {
	constructor(props) {
		super(props);
		this.selectResult = this.selectResult.bind(this);
		this.listLeft = 0;
		this.listTop = 0;
		this.listWidth = 0;
		this.selectedItem = [];
		this.initFlag = true;
		this.state = {
			listVisible: false,
			selectedFlag: false,
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.selectData != this.props.selectData) {
			if (__DEV__)
				console.log('++++++++++', 'CommonSelectPanel selectDataChange');

			this.selectedItem = [];
			this.initFlag = true;
		}
		return true;
	}

	recursionInit = (data, code) => {
		if (!code)
			return;
		this.selectedItem = [];
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < code.length; j++) {
				if (data[i][this.props.selectCode] === code[j])
					this.selectedItem.push(data[i]);
			}
		}
		return;
	}

	selectResult = (selectedItem) => {
		this.selectedItem = selectedItem;
		this.props.selectResult(selectedItem);
		this.setState({
			selectedFlag: true
		});
	}

	_onLayout = (event) => {
		NativeModules.UIManager.measure(event.target, (x, y, width, height, pageX, pageY) => {
			this.listLeft = pageX;
			this.listTop = pageY + height;
			this.listWidth = width;
		})
	}

	render() {
		if (__DEV__)
			console.log('++++++++++', 'CommonSelectPanel');

		if (this.initFlag && this.props.selectInit) {
			this.recursionInit(this.props.selectData, this.props.selectInit);
			this.initFlag = false;
		}

		return (
			<View onLayout={(event) => this._onLayout(event)}  style={[{width:this.props.selectWidth,borderWidth: 1,borderColor:'#ff0000'},this.props.selectStyle]}>
				<TouchableOpacity onPress={() => {this.setState({listVisible:!this.state.listVisible})}}>
					<View pointerEvents='none' style={{flexDirection: 'row',justifyContent:'space-between'}}>
						<View style={{flexDirection: 'row',justifyContent:'flex-start'}}>
							<Text style={styles.middleText}>{this.props.textHead}</Text>
							{this.props.selectMuti?(<Text style={[styles.middleText,{color:'#ff0000'}]}>{' '+this.selectedItem.length.toString()+' '}</Text>):(<Text style={styles.middleText}>{this.selectedItem.length==0?this.props.textPrompt:this.selectedItem[0][this.props.selectName]}</Text>)}
							<Text style={styles.middleText}>{this.props.textTail}</Text>
						</View>
						<CommonIcon iconType='MaterialCommunityIcons' iconName='chevron-down' color={'#121917'}/>
					</View>
				</TouchableOpacity>

				<CommonSelectList
						selectData={this.props.selectData}
						selectCode={this.props.selectCode}
						selectName={this.props.selectName}
						selectMuti={this.props.selectMuti}
						selectToolBar={this.props.selectToolBar}
						selectResult={this.selectResult}
						selectInit={this.props.selectInit}
						caseSensitive={this.props.caseSensitive}
						listVisible={this.state.listVisible}
						listLeft={this.listLeft}
						listTop={this.listTop}
						listWidth={this.listWidth}
						listMaxHeight={this.props.listMaxHeight}
						listToolBarHeight={this.props.listToolBarHeight}
						listInputFocus={this.props.listInputFocus}
						listInputBgColor={this.props.listInputBgColor}
						listItemDarkBgColor={this.props.listItemDarkBgColor}
						listItemLightBgColor={this.props.listItemLightBgColor}
						listItemSeparatorColor={this.props.listItemSeparatorColor}
						/>
		</View>
		);
	}
}

CommonSelectPanel.propTypes = {
	selectData: PropTypes.array.isRequired,
	selectCode: PropTypes.string.isRequired,
	selectName: PropTypes.string.isRequired,
	selectMuti: PropTypes.bool,
	selectToolBar: PropTypes.bool,
	selectResult: PropTypes.func,
	selectInit: PropTypes.array,
	caseSensitive: PropTypes.bool,
	selectWidth: PropTypes.number,
	selectStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	textPrompt: PropTypes.string,
	textHead: PropTypes.string,
	textTail: PropTypes.string,
	listMaxHeight: PropTypes.number,
	listToolBarHeight: PropTypes.number,
	listInputFocus: PropTypes.bool,
	listInputBgColor: PropTypes.string,
	listItemDarkBgColor: PropTypes.string,
	listItemLightBgColor: PropTypes.string,
	listItemSeparatorColor: PropTypes.string,
}
CommonSelectPanel.defaultProps = {
	selectData: [],
	selectMuti: false,
	selectToolBar: true,
	selectResult: (selectedItem) => {},
	caseSensitive: true,
	selectWidth: 200,
	selectStyle: {},
	textPrompt: '',
	textHead: '',
	textTail: '',
	listMaxHeight: 300,
	listToolBarHeight: 20,
	listInputFocus: true,
	listInputBgColor: '#ececec',
	listItemDarkBgColor: '#d4d8e9',
	listItemLightBgColor: '#f0f0f0',
	listItemSeparatorColor: '#42464b',
};

const styles = StyleSheet.create({
	middleText: {
		color: '#121917',
		fontSize: 18
	},
});