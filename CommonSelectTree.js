import React, {
	Component,
} from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import CommonIcon from 'react-native-commonicon';

type Props = {};
export default class CommonSelectTree extends Component < Props > {
	constructor(props) {
		super(props);
		this.labelComponents = [];
		this.key = 0;
		this.openState = [];
		this.initFlag = true;
		this.state = {
			selectedFlag: false,
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.labelData != this.props.labelData) {
			if (__DEV__)
				console.log('++++++++++', 'CommonSelectTree selectDataChange');
			this.initFlag = true;
		}
		return true;
	}

	componentDidMount() {}

	selectLabel = (node) => {
		if (!this.props.mutipleFlag && !node[this.props.selectChildren])
			this.recursionClearLeaf(this.props.labelData);

		this.recursionSelect(this.props.labelData, node[this.props.selectCode]);
		this.openState = [];
		this.searchResultCode(this.props.labelData);
		this.props.selectResult(node, this.openState);
		this.setState({
			selectedFlag: true
		});
	}

	searchResultCode = (data) => {
		data.map((val, ind) => {
			if (val.selected)
				this.openState.push(val[this.props.selectCode]);

			if (val[this.props.selectChildren])
				this.searchResultCode(val[this.props.selectChildren]);
		});
	}

	recursionSelect = (data, code) => {
		if (!code)
			return;

		for (let i = 0; i < data.length; i++) {
			if (data[i][this.props.selectCode] === code) {
				data[i].selected = !data[i].selected;
				break;
			}

			if (data[i][this.props.selectChildren])
				this.recursionSelect(data[i][this.props.selectChildren], code);
		}

		return;
	}

	recursionClearLeaf = (data) => {
		data.map((val) => {
			if (val[this.props.selectChildren])
				this.recursionClearLeaf(val[this.props.selectChildren]);
			else
				val.selected = false;
		});
	}

	recursionCloseNode = (data) => {
		data.map((val) => {
			val.selected = false;
			if (val[this.props.selectChildren])
				this.recursionCloseNode(val[this.props.selectChildren]);
		});
	}

	recursionInit = (data, code) => {
		if (!code)
			return;

		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < code.length; j++) {
				if (data[i][this.props.selectCode] === code[j])
					data[i].selected = true;
			}

			if (data[i][this.props.selectChildren])
				this.recursionInit(data[i][this.props.selectChildren], code);
		}
		return;
	}

	recursionComp = (data, level) => {
		data.map((val, ind) => {
			this.labelComponents[this.key] =
				<TouchableOpacity key={this.key} onPress={()=>this.selectLabel(val)} style={{margin:3,marginLeft:10*level}}>
        	<View pointerEvents={'none'} style={[{flexDirection:'row',alignItems: 'center',borderRadius:4,
        			backgroundColor:val.selected&&!val[this.props.selectChildren]?this.props.treeSelectedBackgroundColor:this.props.treeBackgroundColor}]}>
          	{val[this.props.selectChildren]?
          		(val.selected?
								<CommonIcon iconType='FontAwesome' iconName='caret-down' style={{paddingLeft:5}} color={this.props.iconColor} size={this.props.iconSize}/>:
          			<CommonIcon iconType='FontAwesome' iconName='caret-right' style={{paddingLeft:5}} color={this.props.iconColor} size={this.props.iconSize}/>
          		):
          		(<View/>)
          	}
          <Text style={this.props.labelStyle}>{val[this.props.selectName]}</Text>
          </View>
        </TouchableOpacity>

			this.key++;
			if (val[this.props.selectChildren] && val.selected)
				this.recursionComp(val[this.props.selectChildren], level + 1);
		})
	}

	render() {
		if (__DEV__)
			console.log('++++++++++', 'CommonSelectTree');

		if (this.props.labelData) {
			if (this.initFlag && this.props.selectInit) {
				this.recursionInit(this.props.labelData, this.props.selectInit);
				this.initFlag = false;
			}

			this.labelComponents = [];
			this.key = 0;
			this.recursionComp(this.props.labelData, 1);

			return (
				<View style={this.props.treeStyle}>
        	{this.labelComponents}
      	</View>
			);
		} else return (<View/>)
	}
}

CommonSelectTree.propTypes = {
	labelData: PropTypes.array,
	selectCode: PropTypes.string,
	selectName: PropTypes.string,
	selectChildren: PropTypes.string,
	selectResult: PropTypes.func,
	selectInit: PropTypes.array,
	treeStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	treeBackgroundColor: PropTypes.string,
	treeSelectedBackgroundColor: PropTypes.string,
	iconColor: PropTypes.string,
	iconSize: PropTypes.number,
	labelStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	mutipleFlag: PropTypes.bool,
}
CommonSelectTree.defaultProps = {
	selectCode: 'code',
	selectName: 'name',
	selectChildren: 'children',
	treeBackgroundColor: '#42464b',
	treeSelectedBackgroundColor: '#ff0000',
	iconColor: '#FFF',
	iconSize: 20,
	labelStyle: {
		color: '#FFFFFF',
		fontSize: 16,
		margin: 4,
	},
	mutipleFlag: false,
};