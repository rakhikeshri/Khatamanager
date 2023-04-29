import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  FlatList
} from "react-native";
// import Nav_Head from "../../Nav_Head";
import { customStyles } from "../../Generic_Styles";
import { connect } from "react-redux";
import { getUnitDetails, updateUnitDetails } from '../../../../../actions/unitaction'


@connect((store) => {
  return {
    user: store.auth.user,
    unitDetails: store.unit.unitDetails
  }
})

export default class Add_Update_Units extends Component {
  state = {
    toggleEdit: false,
    isEdit: false,
    activeId: "",
    data: {
      name: "",
      label: "",
      cfactor: "",
      id: ""
    },
    list: []

  };

  componentDidMount() {
    const { user } = this.props
    console.log(user.accessToken)
    this.props.dispatch(getUnitDetails(user.accessToken)).then(() => {
      console.log(this.props.unitDetails)
      this.setState({ list: this.props.unitDetails })
    })
  }

  toggleEdit = () => {
    this.setState({
      toggleEdit: !this.state.toggleEdit,
    });
  };


  changeHandler = (value, type) => {
    let { data } = this.state;
    data[type] = value
    this.setState({ ...data });
  };


  addItem = () => {
    const { data } = this.state
    // const {activeId, isEdit, list} = this.state
    // const id = Date.now()
    // if (!name || !label || !cfactor) {
    //   alert("fill the fields")
    // } else if(isEdit){
    //   this.setState({
    //     list: list.map(item=>{
    //       if(item.id === activeId){
    //         return {
    //           ...item,name,label,cfactor
    //         }
    //       }
    //       return item
    //     })
    //   })
    //   this.toggleEdit()
    //   this.setState({
    //     data: {
    //       name: "",
    //       label: "",
    //       cfactor: ""
    //     }
    //   })
    //   this.setState({
    //     isEdit:false,
    //     activeId : null
    //   })
    // }
    // else {
    //   const newValue = { id, name, label, cfactor };
    //   this.setState(prevState => ({ list: [...prevState.list, newValue] }));
    //   this.toggleEdit()
    //   this.setState({
    //     data: {
    //       name: "",
    //       label: "",
    //       cfactor: ""
    //     }
    //   })
    // }
    const { user } = this.props
    const { isEdit } = this.state
    this.toggleEdit()
    let body = {}
    let type = ""
    if (isEdit) {
      body = {
        "where": {
          "_id": data.id
        },
        "data": {
          "name": data.name
        }
      };
      type="put"
    }
    else {
      body = {
        name: data.name,
        label: data.label,
        cfactor: Number(data.cfactor)
      };
      type="post"
    }

    this.props.dispatch(updateUnitDetails(user.accessToken, body, type)).then(() => {
      console.log(this.props.unitDetails)
    })
  }

  update = (item) => {
    this.toggleEdit()
    this.setState({ data: { name: item.name, label: item.label, cfactor: item.cfactor, id: item.id } , isEdit:true})
    console.log("item:-", item)
  }

  cancleBtn = () => {
    this.toggleEdit()
    this.setState({
      data: {
        name: "",
        label: "",
        cfactor: ""
      }
    })
  }


  render() {
    const { list, isEdit } = this.state
    const { name, label, cfactor } = this.state.data
    return (
      <View style={customStyles.container}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <View style={{ marginTop: 10, gap: 12 }}>
              <View style={[customStyles.genericList, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 700 }}>{item.name} </Text>
                  <Text>{`( ${item.label} )`}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => this.update(item)}>
                  <Image source={require("../../../../../../assets/images/Product_img/editIcon.png")} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <TouchableOpacity style={[customStyles.genericBtn, { backgroundColor: '#1CBC9B', marginTop: 50 }]} activeOpacity={0.8} onPress={this.toggleEdit} >
          <Text style={[customStyles.genericBtnText, { color: '#FFFFFF' }]} >+Add Units</Text>
        </TouchableOpacity>

        {
          this.state.toggleEdit === true ? (
            <Modal transparent={true}>
              <View style={customStyles.genericTransparentModal} >
                <View style={customStyles.genericModalBox}>

                  <View style={{ paddingHorizontal: 22, paddingVertical: 32, gap: 15 }}>

                    <View style={customStyles.centerView}>
                      <Text style={{ fontWeight: 700 }}>Name</Text>
                      <TextInput placeholder="name" style={styles.modelInputBox} value={name} onChangeText={(e) => this.changeHandler(e, 'name')}></TextInput>
                    </View>

                    <View style={customStyles.centerView}>
                      <Text style={{ fontWeight: 700 }}>Label</Text>
                      <TextInput placeholder="label" style={styles.modelInputBox} value={label} onChangeText={(e) => this.changeHandler(e, 'label')} ></TextInput>
                    </View>

                    <View style={customStyles.centerView}>
                      <Text style={{ fontWeight: 700 }}>Conversion Factor</Text>
                      <TextInput placeholder="conversion factor" style={styles.modelInputBox} value={cfactor.toString()} onChangeText={(e) => this.changeHandler(e, 'cfactor')} keyboardType="numeric"></TextInput>
                    </View>

                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={[customStyles.genericModalBtn, { backgroundColor: '#EDF2F3', borderBottomStartRadius: 8, }]}
                      activeOpacity={0.7} onPress={this.cancleBtn}>
                      <Text style={[customStyles.genericModalBtnText, { color: "#3C3C3C" }]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[customStyles.genericModalBtn, { backgroundColor: '#1CBC9B', borderBottomEndRadius: 8, }]} activeOpacity={0.7} onPress={this.addItem}>
                      <Text style={[customStyles.genericModalBtnText, { color: "#FFFFFF" }]}>{isEdit ? "Update" : "Create"}</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </Modal>
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modelInputBox: {
    minWidth: 150,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#BDC6C8',
    paddingHorizontal: 10
  }
});
