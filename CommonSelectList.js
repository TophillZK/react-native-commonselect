import React, {
	Component
} from 'react';
import {
	FlatList,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Modal,
	StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

import CommonIcon from 'react-native-commonicon';

type Props = {};

export default class CommonSelectList extends Component < Props > {
	constructor(props) {
		super(props);
		this.selectData = [];
		this.searchData = [];
		this.selectState = [];
		this.initFlag = true;
		this.state = {
			selectedFlag: false,
			modalVisible: false,
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.selectData != this.props.selectData) {
			if (__DEV__)
				console.log('++++++++++', 'CommonSelectList selectDataChange');
			this.initFlag = true;
		}

		if (nextProps.listVisible != this.props.listVisible) {
			if (__DEV__)
				console.log('++++++++++', 'CommonSelectList Toggle');

			this.selectData = nextProps.selectData;
			this.searchData = this.selectData;
			this.setState({
				modalVisible: true
			});
		}
		return true;
	}

	selectResult = () => {
		let selectedItem = [];
		this.selectData.map((val, ind) => {
			if (this.selectData[ind].selected)
				selectedItem.push(val);
		})
		return selectedItem;
	}

	onSingleSelect = (item) => {
		this.setState({
			modalVisible: false
		});
		this.selectState = [item];
		this.props.selectResult(this.selectState);
	}

	onMutiSelect = (item) => {
		this.searchData.map((val, ind) => {
			if (val[this.props.selectCode] === item[this.props.selectCode])
				this.searchData[ind].selected = !this.searchData[ind].selected;
		});
		this.setState({
			selectedFlag: true
		});
		this.selectState = [];
		this.selectState = this.selectResult();
		this.props.selectResult(this.selectState);
	}

	selectAll() {
		this.searchData.map((val, ind) => {
			this.searchData[ind].selected = true;
		});
		this.setState({
			selectedFlag: true
		});
		this.selectState = this.selectResult();
		this.props.selectResult(this.selectState);
	}

	clearAll() {
		this.searchData.map((val, ind) => {
			this.searchData[ind].selected = false;
		});
		this.setState({
			selectedFlag: true
		});
		this.selectState = this.selectResult();
		this.props.selectResult(this.selectState);
	}

	searchItem = (text) => {
		this.searchData = [];
		this.selectData.map((val, ind) => {
			if (this.props.caseSensitive) {
				if (val[this.props.selectName] && val[this.props.selectName].indexOf(text) >= 0)
					this.searchData.push(val);
			} else {
				if (val[this.props.selectName] && val[this.props.selectName].toLowerCase().indexOf(text.toLowerCase()) >= 0)
					this.searchData.push(val);
			}
		})

		this.setState({
			selectedFlag: true
		})
	}

	_keyExtractor = (item, index) => item[this.props.selectCode].toString();

	_renderItemSingle = (item, index) => {
		return (
			<View>
				<TouchableOpacity style={{backgroundColor:index % 2 === 0?this.props.listItemDarkBgColor:this.props.listItemLightBgColor}} onPress={()=>this.onSingleSelect(item)}>
					<Text style={styles.bigText}>{item[this.props.selectName]}</Text>
				</TouchableOpacity>
				<View style={{height:1,backgroundColor:this.props.listItemSeparatorColor}}/>
			</View>
		)
	};

	_renderItemMuti = (item, index) => {
		return (
			<View>
				<TouchableOpacity style={{backgroundColor:index % 2 === 0?this.props.listItemDarkBgColor:this.props.listItemLightBgColor}} onPress={() => this.onMutiSelect(item)}>
					<View style={{flexDirection: 'row',alignItems: 'center'}} pointerEvents='none'>
						{item.selected?
							<CommonIcon iconType='MaterialCommunityIcons' iconName='checkbox-marked-outline' color={'#121917'} size={30}/>:
							<CommonIcon iconType='MaterialCommunityIcons' iconName='checkbox-blank-outline' color={'#121917'} size={30}/>
						}
						<Text style={styles.bigText}>{item[this.props.selectName]}</Text>
					</View>
				</TouchableOpacity>
				<View style={{height:1,backgroundColor:this.props.listItemSeparatorColor}}/>
			</View>
		)
	};

	_separator = (item, index) => {
		return <View style={{height:1,backgroundColor:this.props.listItemSeparatorColor}}/>;
	}

	recursionInit = (data, code) => {
		if (!code)
			return;

		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < code.length; j++) {
				if (data[i][this.props.selectCode] === code[j])
					data[i].selected = true;
			}
		}
		return;
	}

	render() {
		if (__DEV__)
			console.log('++++++++++', 'CommonSelectList');

		if (this.initFlag && this.props.selectInit) {
			this.recursionInit(this.props.selectData, this.props.selectInit);
			this.initFlag = false;
		}

		return (
			<View>
				<Modal
						animationType='none'
						transparent={true}
						visible={this.state.modalVisible}
						onRequestClose={() => this.setState({modalVisible: false})}
				>
					<TouchableOpacity style={{flex:1}} onPress={()=>this.setState({modalVisible: false})}>
						<View style={[this.props.listPosition,{left:this.props.listLeft,top:this.props.listTop}]}>
							{this.props.selectToolBar&&(
								<View style={{width:this.props.listWidth,backgroundColor: this.props.listInputBgColor,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',borderWidth: 1,borderColor:'#42464b'}}>
									<View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}}>
										<CommonIcon iconType='MaterialCommunityIcons' iconName='filter-outline' color={'#121917'} size={this.props.listToolBarHeight}/>
										<TextInput autoFocus={this.props.listInputFocus}
												style={[styles.bigText,{width:this.props.listWidth-5-(this.props.selectMuti?this.props.listToolBarHeight*3:this.props.listToolBarHeight),height:this.props.listToolBarHeight-3,padding: 0,borderWidth: 0.5,borderColor:'#42464b'}]}
												onChangeText={(text)=>this.searchItem(text)}
												underlineColorAndroid='transparent'/>
									</View>
									{this.props.selectMuti&&(
										<View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
											<CommonIcon iconType='MaterialCommunityIcons' iconName='checkbox-multiple-marked-outline' color={'#121917'} size={this.props.listToolBarHeight} onPress={()=>this.selectAll()}/>
											<CommonIcon iconType='MaterialCommunityIcons' iconName='checkbox-multiple-blank-outline' color={'#121917'} size={this.props.listToolBarHeight} onPress={()=>this.clearAll()}/>
										</View>
										)}
								</View>
							)}
							<FlatList style={{maxHeight: this.props.listMaxHeight,width:this.props.listWidth,backgroundColor: '#677ca0',borderWidth: 1,borderColor:'#42464b'}}
									data={this.searchData} keyExtractor={this._keyExtractor} renderItem={({item,index})=>this.props.selectMuti?this._renderItemMuti(item,index):this._renderItemSingle(item,index)}
							/>
						</View>
					</TouchableOpacity>
				</Modal>
		</View>
		);
	}
}

CommonSelectList.propTypes = {
	selectData: PropTypes.array.isRequired,
	selectCode: PropTypes.string.isRequired,
	selectName: PropTypes.string.isRequired,
	selectMuti: PropTypes.bool,
	selectToolBar: PropTypes.bool,
	selectResult: PropTypes.func,
	selectInit: PropTypes.array,
	caseSensitive: PropTypes.bool,
	listVisible: PropTypes.bool,
	listPosition: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	listLeft: PropTypes.number,
	listTop: PropTypes.number,
	listWidth: PropTypes.number,
	listMaxHeight: PropTypes.number,
	listToolBarHeight: PropTypes.number,
	listInputFocus: PropTypes.bool,
	listInputBgColor: PropTypes.string,
	listItemDarkBgColor: PropTypes.string,
	listItemLightBgColor: PropTypes.string,
	listItemSeparatorColor: PropTypes.string,
}
CommonSelectList.defaultProps = {
	selectData: [],
	selectMuti: false,
	selectToolBar: true,
	selectResult: (selectedItem) => {},
	caseSensitive: true,
	listVisible: false,
	listPosition: {
		// justifyContent: 'flex-start', //flex-start,center,flex-end
		// alignItems: 'center', //flex-start,center,flex-end
	},
	listLeft: 0,
	listTop: 0,
	listWidth: 200,
	listMaxHeight: 300,
	listToolBarHeight: 20,
	listInputFocus: true,
	listInputBgColor: '#ececec',
	listItemDarkBgColor: '#d4d8e9',
	listItemLightBgColor: '#f0f0f0',
	listItemSeparatorColor: '#42464b',
};

const styles = StyleSheet.create({
	bigText: {
		color: '#121917',
		fontSize: 24
	},
});