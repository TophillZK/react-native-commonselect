
# React Native Common Select

<p align="center">
  <img src ="https://github.com/TophillZK/react-native-commonselect/blob/master/ExampleTree.png" />
  <img src ="https://github.com/TophillZK/react-native-commonselect/blob/master/ExampleListPanel.png" />
</p>

## Getting started
```bash
yarn add react-native-commonselect
```

## CommonSelectTree Usage
```javascript
import React from "react";
import {
  View,
  StyleSheet
} from "react-native";

import {
  CommonSelectTree
} from 'react-native-commonselect';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.normalLabel = [{
      label_id: 1,
      label_name: 'Tom',
      other_data: 'data1'
    }, {
      label_id: 2,
      label_name: 'Jack',
      other_data: 'data2'
    }, {
      label_id: 3,
      label_name: 'Rose',
      other_data: 'data3'
    }];
    this.normalLabelInit = [2];

    this.treeSingleLabel = [{
      tree_id: 1,
      tree_name: 'Level1 1',
      other_data: 'data1',
      tree_children: [{
        tree_id: 11,
        tree_name: 'Level2 11',
        other_data: 'data11',
      }, {
        tree_id: 12,
        tree_name: 'Level2 12',
        other_data: 'data12',
      }, ]
    }, {
      tree_id: 2,
      tree_name: 'Level1 2',
      other_data: 'data2',
      tree_children: [{
        tree_id: 21,
        tree_name: 'Level2 21',
        other_data: 'data21',
        tree_children: [{
          tree_id: 211,
          tree_name: 'Level3 211',
          other_data: 'data211',
        }, {
          tree_id: 212,
          tree_name: 'Level3 212',
          other_data: 'data212',
        }, ]
      }, {
        tree_id: 22,
        tree_name: 'Level2 22',
        other_data: 'data22',
        tree_children: [{
          tree_id: 221,
          tree_name: 'Level3 221',
          other_data: 'data221',
        }, {
          tree_id: 222,
          tree_name: 'Level3 222',
          other_data: 'data222',
        }, ]
      }, ]
    }, ];

    this.treeMutipleLabel = JSON.parse(JSON.stringify(this.treeSingleLabel));
    this.treeLabelSingleInit = [1, 2, 21, 212];
    this.treeLabelMutipleInit = [1, 11, 2, 21, 212];
  }

  selectNormal = (node, result) => {
    console.log(node, result);
  }

  selectTree = (node, result) => {
    console.log(node, result);
  }

  render() {
    return (
      <View style={styles.container}>
        <CommonSelectTree labelData={this.normalLabel}
            selectCode='label_id'
            selectName='label_name'
            selectResult={this.selectNormal}
            selectInit={this.normalLabelInit}
            treeStyle={{flexDirection:'row',flexWrap :'wrap'}}
        />
        <View style={{backgroundColor:'#677ca0',height:10}}/>
        <CommonSelectTree labelData={this.treeSingleLabel}
            selectCode='tree_id'
            selectName='tree_name'
            selectChildren='tree_children'
            selectResult={this.selectTree}
            selectInit={this.treeLabelSingleInit}
            treeStyle={{width:200}}
        />
        <View style={{backgroundColor:'#677ca0',height:10}}/>
        <CommonSelectTree labelData={this.treeMutipleLabel}
            selectCode='tree_id'
            selectName='tree_name'
            selectChildren='tree_children'
            selectResult={this.selectTree}
            selectInit={this.treeLabelMutipleInit}
            treeStyle={{width:200}}
            mutipleFlag={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
```
## CommonSelectList CommonSelectPanel Usage
```javascript
import React from "react";
import {
  View,
  StyleSheet
} from "react-native";

import {
  CommonSelectList,
  CommonSelectPanel
} from 'react-native-commonselect';
import CommonIcon from 'react-native-commonicon';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listVisible: false,
    }

    this.SelectData = [{
      student_code: '01',
      student_name: 'Tom',
      other_data: 'data1'
    }, {
      student_code: '02',
      student_name: 'Jack',
      other_data: 'data2'
    }, {
      student_code: '03',
      student_name: 'Rose',
      other_data: 'data3'
    }, {
      student_code: '04',
      student_name: 'David',
      other_data: 'data4'
    }, {
      student_code: '05',
      student_name: 'Peter',
      other_data: 'data5'
    }];

    this.SelectData0 = JSON.parse(JSON.stringify(this.SelectData));
    this.SelectData1 = JSON.parse(JSON.stringify(this.SelectData));
    this.SelectData2 = JSON.parse(JSON.stringify(this.SelectData));
    this.SelectData3 = JSON.parse(JSON.stringify(this.SelectData));
    this.SelectData4 = JSON.parse(JSON.stringify(this.SelectData));
    this.SelectData5 = JSON.parse(JSON.stringify(this.SelectData));

    this.SelectDataInit2 = ['02'];
    this.SelectDataInit4 = ['02', '04'];

  }

  selectedData = (res) => {
    console.log(res);
  }

  selectStudent = () => {
    this.setState({
      listVisible: !this.state.listVisible
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'#FFFFFF',height:10}}/>
        <View style={{alignItems:'flex-end'}}>
          <CommonIcon iconType='MaterialCommunityIcons' iconName='account' color={'#FF0000'} size={30} onPress={() => this.selectStudent()}/>
        </View>
        <CommonSelectList
            selectData={this.SelectData5}
            selectCode='student_code'
            selectName = 'student_name'
            selectResult={this.selectedData}
            listVisible={this.state.listVisible}
            listLeft={0}
            listTop={10+30}
            listWidth={150}
            listMaxHeight={300}
            listPosition={{alignItems: 'flex-end'}}
            listToolBarHeight={30}
        />
        <CommonSelectPanel
            selectData={this.SelectData0}
            selectCode='student_code'
            selectName='student_name'
            selectToolBar={false}
            selectWidth={300}
            selectStyle={{marginLeft: 10,height:25}}
            selectResult={res=>this.selectedData(res)}
            textPrompt='Please Select Student'
            listToolBarHeight={30}
        />
        <View style={{backgroundColor:'#FFFFFF',height:10}}/>
        <CommonSelectPanel
            selectData={this.SelectData1}
            selectCode='student_code'
            selectName='student_name'
            selectWidth={300}
            selectStyle={{marginLeft: 10,height:25}}
            selectResult={res=>this.selectedData(res)}
            textPrompt='Please Select Student'
            listToolBarHeight={30}
        />
        <View style={{backgroundColor:'#FFFFFF',height:10}}/>
        <CommonSelectPanel
            selectData={this.SelectData2}
            selectCode='student_code'
            selectName='student_name'
            selectWidth={300}
            selectStyle={{marginLeft: 10,height:25}}
            selectResult={res=>this.selectedData(res)}
            selectInit={this.SelectDataInit2}
            textPrompt='Please Select Student'
            listToolBarHeight={30}
        />
        <View style={{backgroundColor:'#FFFFFF',height:10}}/>
        <CommonSelectPanel
            selectData={this.SelectData3}
            selectCode='student_code'
            selectName='student_name'
            selectMuti={true}
            selectWidth={300}
            selectStyle={{marginLeft: 10,height:25}}
            selectResult={res=>this.selectedData(res)}
            textHead='You Have Selected'
            textTail='Students'
            listToolBarHeight={30}
        />
        <View style={{backgroundColor:'#FFFFFF',height:10}}/>
        <CommonSelectPanel
            selectData={this.SelectData4}
            selectCode='student_code'
            selectName='student_name'
            selectMuti={true}
            selectWidth={300}
            selectStyle={{marginLeft: 10,height:25}}
            selectResult={res=>this.selectedData(res)}
            selectInit={this.SelectDataInit4}
            textHead='You Have Selected'
            textTail='Students'
            listToolBarHeight={30}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
```

### CommonSelectTree Component props
| Prop | Required | Type | default | description |
| ---- | ---- | ----| ---- | ---- |
| labelData | NO | array | none | Label data Array |
| selectCode | NO | string | 'code' | |
| selectName | NO | string | 'name' | |
| selectChildren | NO | string | 'children' | |
| selectResult | NO | func | none | |
| selectInit | NO | array | none | |
| treeStyle | NO | array or object | none | |
| treeBackgroundColor | NO | '#42464b' | none | |
| treeSelectedBackgroundColor | NO | string | '#ff0000' | |
| iconColor | NO | string | '#FFF' | |
| iconSize | NO | number | 20 | |
| labelStyle | NO | array or object | {color: '#FFFFFF', fontSize: 16, margin: 4} | |
| mutipleFlag | NO | bool | false | |

### CommonSelectList Component props
| Prop | Required | Type | default | description |
| ---- | ---- | ----| ---- | ---- |
| selectData | YES | array | [] | Select data Array |
| selectCode | YES | string | none | |
| selectName | YES | string | none | |
| selectMuti | NO | bool | false | |
| selectToolBar | NO | bool | true | |
| selectResult | NO | func | (selectedItem) => {} | |
| selectInit | NO | array | none | |
| caseSensitive | NO | bool | true | |
| listVisible | NO | bool | false | |
| listPosition | NO | array or object | {} | |
| listLeft | NO | number | 0 | |
| listTop | NO | number | 0 | |
| listWidth | NO | number | 200 | |
| listMaxHeight | NO | number | 300 | |
| listToolBarHeight | NO | number | 20 | |
| listInputFocus | NO | bool | true | |
| listInputBgColor | NO | string | '#ececec' | |
| listItemDarkBgColor | NO | string | '#d4d8e9' | |
| listItemLightBgColor | NO | string | '#f0f0f0' | |
| listItemSeparatorColor | NO | string | '#42464b' | |

### CommonSelectPanel Component props
| Prop | Required | Type | default | description |
| ---- | ---- | ----| ---- | ---- |
| selectData | YES | array | [] | Select data Array |
| selectCode | YES | string | none | |
| selectName | YES | string | none | |
| selectMuti | NO | bool | false | |
| selectToolBar | NO | bool | true | |
| selectResult | NO | func | (selectedItem) => {} | |
| selectInit | NO | array | none | |
| caseSensitive | NO | bool | true | |
| selectWidth | NO | number | 200 | |
| selectStyle | NO | array or object | {} | |
| textPrompt | NO | string | '' | |
| textHead | NO | string | '' | |
| textTail | NO | string | '' | |
| listMaxHeight | NO | number | 300 | |
| listToolBarHeight | NO | number | 20 | |
| listInputFocus | NO | bool | true | |
| listInputBgColor | NO | string | '#ececec' | |
| listItemDarkBgColor | NO | string | '#d4d8e9' | |
| listItemLightBgColor | NO | string | '#f0f0f0' | |
| listItemSeparatorColor | NO | string | '#42464b' | |
