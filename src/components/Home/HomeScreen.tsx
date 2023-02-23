import {
    Button,
    View,
    Text,
    SafeAreaView,
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Modal
} from 'react-native';
import {CustomerData} from "../../../types/types";
import React, {useEffect, useState} from "react";
import {SearchBar} from "react-native-elements";
const HomeScreen = ({ navigation }) => {

    const [list, setList] = useState<CustomerData[]>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch ('http://localhost:8000/api/customers');
            const data = await response.json();
            setList(data);
        };
        getData();
    }, [list]);

    const displayCustomerInfo = (customer: CustomerData) => {
        console.log('displayCustomerInfo...', customer.name);
        // navigation.navigate('IndividualContactScreen');
    };

    const deleteCustomer = async (customer: CustomerData) => {
        console.log('deleteCustomer...');
        const customerId = customer.id.value;
        await fetch("http://localhost:8000/api/customers/"+ customerId, { method: "DELETE" })
            .then(response => {  console.log(response.status); });

    };

    const handleVisibleModal = () => {
        setVisible(!visible);
    };

    return (
        <SafeAreaView>

            <View style={styles.header_container}>
                <View>
                    <Text style={styles.txt_main}>Contact List</Text>
                    <Text>Displaying all {list.length} contacts.</Text>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={handleVisibleModal}
                        style={styles.btnNewContainer}
                    >
                        <Text style={styles.textButton}>+  </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                visible={visible}
            >
                <SafeAreaView>
                    <View>
                        <Text>Form will be here</Text>
                    </View>
                </SafeAreaView>
            </Modal>

            <ScrollView>
                {
                    list.map((item, index) => {
                        return(
                            <TouchableOpacity style={styles.item_info} key={index} onPress={() => displayCustomerInfo(item)}>
                                <View>
                                    <Text style={styles.txt_name}>
                                        {item.name.title} {item.name.first} {item.name.last}
                                    </Text>
                                    <Text style={styles.txt_item}>
                                        Birthdate: {item.dob.date}
                                    </Text>
                                    <Text style={styles.txt_item}>
                                        Age: {item.dob.age}
                                    </Text>
                                </View>

                                <View>
                                    <TouchableOpacity
                                        onPress={() => deleteCustomer(item)}
                                    >
                                        <Text style={styles.txt_delete}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    txt_name : {
        fontSize : 18,
        marginTop : 5,
        fontWeight : "bold"
    },
    txt_item : {
        fontSize : 14,
        marginTop : 5
    },
    item_info : {
        padding :15,
        borderBottomWidth: 1,
        borderBottomColor : "#e2e2e2",
        flexDirection : "row",
        justifyContent:"space-between"
    },
    txt_delete : {
        borderStyle : "solid",
        borderRadius: 8,
        borderWidth: 2,
        fontSize: 14,
        color: 'red',
        padding: 6,
    },
    header_container : {
        padding : 20,
        backgroundColor : "#f7f1e4",
        justifyContent : "space-between",
        flexDirection: 'row',
    },
    btnNewContainer : {
        padding :10,
        backgroundColor : "#000",
        justifyContent: 'space-around',
        flexDirection: "row",
    },
    textButton : {
        textAlign : "center",
        color : "#FFF"
    },
    txt_main : {
        fontSize : 22,
        fontWeight : "bold"
    },
});
export default HomeScreen;