import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform,
    Modal,
    TextInput,
    ScrollView,
} from "react-native";
import list from './List'
import list2 from "./List2";
import { createProductUploadSession } from "../../../../../actions/stageProductAction"
import { customStyles } from "../../Generic_Styles"
import { Checkbox } from 'expo-checkbox';
import { connect } from "react-redux";

@connect((store) => {
    return {
        user: store.auth.user,
        productUploadSession: store.stageProduct.productUploadSession
    }
})

export default class Add_Products extends Component {
    state = {
        checkBox1: false,
        list1: list,
        list2: list2,
        showInputFields: false,
        // populateFields: false,
        
        stagedProduct: [],
        fields: [],
        fieldsObjArr: [],
        fieldMap: {
            "Name *": "name",
            "CGST *": "cgst",
            "SGST *": "sgst",
            "Available Quantity *": "availableQuantity",
            "Available Units *": "available units",
            "Manufacturer": "manufacture",
            "Weight": "weight",
            "MFG": "mfg",
            "Expiry": "expiry",
            "Dimension": "dimension",
            "Batch No.": "batch no",
            "Model No.": "model no",
            "SKU": "sku",
            "MPN": "mpn",
            "ISBN": "isbn"
        },
        addUnitPopup:false
    };

    addMore = () => {
        this.setState({
            checkBox1: !this.state.checkBox1,
        });
    };

    done = () => {
        const { fieldsObjArr, fieldMap } = this.state
        const { user } = this.props
        this.setState({
            showInputFields: true,
            checkBox1: false
        })
        let fieldsList = []
        this.state.list1.forEach((item) => {
            if (item.checked == true) {
                fieldsList.push(item.value)
            }
        })
        let body = {
            "fields": fieldsList
        }
        this.props.dispatch(createProductUploadSession(user.accessToken, body)).then(() => {
            this.setState({ fields: this.props.productUploadSession.fields })
        }).then(() => {
            obj = {}
            this.state.fields.forEach((field) => {
                obj[fieldMap[field]] = "";
            })
            fieldsObjArr.push(obj)
            this.setState({ fieldsObjArr })
        })
    }

    addUnitPopup(){
        this.setState({addUnitPopup : true })
    }

    onChecked(id) {
        const checkData1 = this.state.list1
        const index = checkData1.findIndex(checkbox => checkbox.id === id)

        if (checkData1[index].disabled != true) {
            checkData1[index].checked = !checkData1[index].checked
        }
        this.setState({ checkData1 })
        // console.warn(selectedCheckedValue)
    }

    // onChecked2(id) {
    //     const checkData2 = this.state.list2
    //     const index = checkData2.findIndex(checkbox => checkbox.id === id)

    //     checkData2[index].checked = !checkData2[index].checked
    //     // const val = checkData2[index].value
    //     // if (checkData1[index].checked === true) {
    //     //     selectedCheckedValue.push(val)
    //     // } else {
    //     //     selectedCheckedValue = selectedCheckedValue.filter(item => item !== val)
    //     // }

    //     this.setState({ list2: checkData2 })
    //     console.log(selectedCheckedValue)
    // }

    populateFields = () => {
        const { fieldsObjArr, fieldMap } = this.state;

        obj = {}
        this.state.fields.forEach((field) => {
            obj[fieldMap[field]] = "";
        })
        fieldsObjArr.push(obj)
        this.setState({ fieldsObjArr })
    }

    submit = () => {
        this.setState({
            showInputFields: false,
            populateFields: false
        })

        this.state.list1.map(item => {
            if (item.disabled === false) {
                item.checked = false
            }
        })

        selectedCheckedValue = []
        this.state.addingNewFields = []
    }

    changeHandler = (index,key,e) => {
        let { fieldsObjArr } = this.state;
        fieldsObjArr[index][key] = e
        this.setState({ ...fieldsObjArr });
    };
    
    render() {
        
        const { checkBox1, addUnitPopup, list1, showInputFields, fieldsObjArr } = this.state
        console.log(fieldsObjArr)

        return (
            <View>
                <ScrollView>

                    {/* initial page view toggle */}

                    {
                        showInputFields === true ? (
                            fieldsObjArr.map((item, index) => {
                                return (
                                    <View style={styles.mainContainer} key={index}>
                                        {
                                            Object.keys(item).map((key, i) =>
                                                <>
                                                    <TextInput placeholder={key}
                                                        key={i}
                                                        // onChange={(text)=> this.handleInputChange(key, text)}
                                                        // value={key} 
                                                        onChangeText={(e) => this.changeHandler(index,key,e)}
                                                        style={customStyles.inputBox} />
                                                </>
                                            )
                                        }

                                        <View style={styles.innerContainer}>

                                            {/* <View style={customStyles.centerView}>
                                                <Text style={{ width: '70%' }}>- Tablet - Rs 2 - Cfactor 1</Text>
                                                <Text style={[customStyles.draft_complete_box, styles.smallest_pink]}>Smallest</Text>
                                            </View>

                                            <View style={customStyles.centerView}>
                                                <Text style={{ width: '70%' }}>- Tablet - Rs 2 - Cfactor 1</Text>
                                                <Text style={[customStyles.draft_complete_box, styles.smallest_white]}>Smallest</Text>
                                            </View> */}

                                            <Text style={[customStyles.draft_complete_box, styles.add_unit]} onPress={this.addUnitPopup}>+ Add Unit</Text>
                                        </View>

                                    </View>
                                )
                            })


                        ) : (
                            <>
                                <View style={{ marginTop: 10, marginBottom: 30, gap: 12 }}>
                                    <View style={[customStyles.genericList, customStyles.centerView, { borderRadius: 8 }]}>
                                        <View style={{ gap: 12, width: '70%' }}>
                                            <Text>Session of (04/04/2023 04:00 PM) </Text>
                                            <Text style={{ fontWeight: 500 }}>54 Products added currently</Text>
                                            <Text style={[customStyles.draft_complete_box, { backgroundColor: '#BAC5C8', width: '40%' }]} >Drafts</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', gap: 15, width: '30%' }}>
                                            <TouchableOpacity>
                                                <Image source={require("../../../../../../assets/images/Product_img/addProducts_editIcon.png")} />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Image source={require("../../../../../../assets/images/Product_img/addProducts_copyIcon.png")} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={[customStyles.genericList, customStyles.centerView, { borderRadius: 8 }]}>
                                        <View style={{ gap: 12, width: '70%' }}>
                                            <Text>Session of (04/04/2023 04:00 PM)</Text>
                                            <Text style={{ fontWeight: 500 }}>54 Products added currently</Text>
                                            <Text style={[customStyles.draft_complete_box, { backgroundColor: '#1CBC9B', width: '50%' }]}>Completed</Text>
                                        </View>
                                    </View>

                                </View>
                            </>
                        )
                    }

                    {/* initial addmore button   */}

                    {
                        showInputFields === false ? (
                            <TouchableOpacity style={[customStyles.genericBtn, { backgroundColor: '#1CBC9B', marginHorizontal: 10, marginVertical: 100 }]} activeOpacity={0.8} onPress={this.addMore}>
                                <Text style={[customStyles.genericBtnText, { color: '#FFFFFF' }]} >+Add More</Text>
                            </TouchableOpacity>
                        ) : null
                    }

                    {/* add more button for the next slide */}

                    {
                        showInputFields === true ? (
                            <TouchableOpacity style={[customStyles.genericBtn, { backgroundColor: '#1CBC9B', marginHorizontal: 10 }]} activeOpacity={0.8} onPress={this.populateFields}>
                                <Text style={[customStyles.genericBtnText, { color: '#FFFFFF' }]} >+Add More2</Text>
                            </TouchableOpacity>
                        ) : null
                    }

                    {/* showing model with checkboxes */}

                    {
                        checkBox1 === true ? (
                            <Modal transparent={true}>
                                <View style={customStyles.genericTransparentModal} >
                                    <View style={customStyles.genericModalBox}>
                                        <View style={{ paddingHorizontal: 22, paddingVertical: 32, gap: 15 }}>
                                            {
                                                list1.map((item, key) => {
                                                    return (
                                                        <TouchableOpacity
                                                            key={key}
                                                            style={{ flexDirection: "row", gap: 10 }}
                                                            onPress={() => { this.onChecked(item.id) }}
                                                            activeOpacity={.7}
                                                        >
                                                            <Checkbox
                                                                value={item.checked}
                                                                style={{ borderRadius: 4 }}
                                                                onValueChange={() => { this.onChecked(item.id) }}
                                                            />
                                                            <Text>{item.value}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity style={[customStyles.genericModalBtn, { backgroundColor: '#EDF2F3', borderBottomStartRadius: 8, }]}
                                                activeOpacity={0.7} onPress={this.addMore}>
                                                <Text style={[styles.genericModalBtnText, { color: "#3C3C3C" }]}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[customStyles.genericModalBtn, { backgroundColor: '#1CBC9B', borderBottomEndRadius: 8, }]} onPress={this.done} activeOpacity={0.7}>
                                                <Text style={[styles.genericModalBtnText, { color: "#FFFFFF" }]}>Done</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>
                            </Modal>
                        ) : null
                    }
                    {
                        addUnitPopup === true ?(
                            <Modal transparent={true}>
                            <View style={customStyles.genericTransparentModal} >
                            <View style={customStyles.genericModalBox}>
                                <View style={{ paddingHorizontal: 22, paddingVertical: 32, gap: 15 }}>
                                    {
                                        list2.map((item, key) => {
                                            if (item.checked === true) {
                                                return (
                                                    <View style={[customStyles.checkBoxContainer, { justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 10 }]}>
                                                        <TouchableOpacity key={key} style={{ flexDirection: "row", alignItems: "center", gap: 10 }} onPress={() => { this.onChecked2(item.id) }} activeOpacity={.7}>
                                                            <Checkbox value={item.checked} style={{ borderRadius: 4 }} onValueChange={() => { this.onChecked2(item.id) }} />
                                                            <Text>{item.valueDark}</Text>
                                                            <Text>{item.valueLight}</Text>
                                                        </TouchableOpacity>
                                                        <TextInput style={[customStyles.inputBox, { borderWidth: 1, maxWidth: 100 }]} placeholder={item.valueDark} />
                                                    </View>
                                                )
                                            } else {
                                                return (
                                                    <View style={[customStyles.checkBoxContainer, { justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 10 }]}>
                                                        <TouchableOpacity key={key} style={{ flexDirection: "row", alignItems: "center", gap: 10 }} onPress={() => { this.onChecked2(item.id) }} activeOpacity={.7}>
                                                            <Checkbox value={item.checked} style={{ borderRadius: 4 }} onValueChange={() => { this.onChecked2(item.id) }} />
                                                            <Text>{item.valueDark}</Text>
                                                            <Text>{item.valueLight}</Text>
                                                        </TouchableOpacity>
                                                    </View>

                                                )
                                            }

                                        })
                                    }
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={[customStyles.genericModalBtn, { backgroundColor: '#EDF2F3', borderBottomStartRadius: 8, }]}
                                        activeOpacity={0.7} >
                                        <Text style={[customStyles.genericModalBtnText, { color: "#3C3C3C" }]}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[customStyles.genericModalBtn, { backgroundColor: '#1CBC9B', borderBottomEndRadius: 8, }]} activeOpacity={0.7}>
                                        <Text style={[customStyles.genericModalBtnText, { color: "#FFFFFF" }]}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </View>
                            </Modal>
                        ):null
                    }

                    {/* draft and submit button  */}

                    {
                        showInputFields === true ? (
                            <View style={{ flexDirection: 'row', marginTop: 30, marginHorizontal: 10 }}>
                                <TouchableOpacity style={[customStyles.genericModalBtn, { backgroundColor: '#EDFDF3', borderBottomStartRadius: 8, }]}
                                    activeOpacity={0.7} onPress={this.addMore}>
                                    <Text style={[styles.genericModalBtnText, { color: "#3C3C3C" }]}>Save as draft</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[customStyles.genericModalBtn, { backgroundColor: '#1CBC9B', borderBottomEndRadius: 8, }]} onPress={this.submit} activeOpacity={0.7}>
                                    <Text style={[styles.genericModalBtnText, { color: "#FFFFFF" }]}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null
                    }

                </ScrollView>
            </View>
        );

    }
}


const styles = StyleSheet.create({
    mainContainer: {
        marginVertical: 25,
        borderRadius: 8,
        gap: 12,
        backgroundColor: '#EDF2F3',
        padding: 14,
    },

    innerContainer: {
        backgroundColor: '#D8E2E4',
        padding: 10,
        gap: 6,
        alignItems: 'center'
    },

    checkBoxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EBF0F1",
        padding: 8,
        height: 42
    },

    smallest_pink: {
        backgroundColor: '#D43D69', width: '30%', color: '#FFFFFF'
    },

    smallest_white: {
        backgroundColor: '#FFFFFF', width: '30%', color: '#000'
    },

    add_unit: {
        backgroundColor: '#1CBC9B', marginTop: 15, color: '#FFFFFF', width: '35%'
    },
    btns_container: {
        flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'
    }

});
