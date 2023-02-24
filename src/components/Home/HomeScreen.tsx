import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Modal, Image, TextInput
} from 'react-native';
import {CustomerData} from "../../../types/types";
import React, {useEffect, useState} from "react";
import {AddNewCustomer} from "../index";

const HomeScreen = () => {

    const [list, setList] = useState<CustomerData[]>([]);
    const [visible, setVisible] = useState(false);
    const [showDetailsModalVisible, setShowDetailsModalVisible] = useState(false);
    const [customer, setCustomer] = useState<CustomerData | null>();

    useEffect(() => {
        const getData = async () => {
            const response = await fetch ('http://localhost:8080/api/customers');
            const data = await response.json();
            setList(data);
        };
        getData();
    }, [list]);

    const handleDisplayCustomerInfo = (customerInfo: CustomerData | null) => {
        setShowDetailsModalVisible(!showDetailsModalVisible);
        setCustomer(customerInfo);
    };

    const deleteCustomer = async (customer: CustomerData) => {
        const customerId = customer.id.value;
        await fetch("http://localhost:8080/api/customers/"+ customerId, { method: "DELETE" })
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
                    <View style={styles.form}>
                        <TouchableOpacity onPress={handleVisibleModal}>
                            <Text style={styles.txtClose}>
                                Close
                            </Text>
                        </TouchableOpacity>

                        <AddNewCustomer />
                    </View>
                </SafeAreaView>
            </Modal>

            <Modal
                animationType="slide"
                visible={showDetailsModalVisible}
            >
                <SafeAreaView style={styles.info_container}>
                    <TouchableOpacity
                        onPress={() => handleDisplayCustomerInfo(null)}
                    >
                        <Text style={styles.txtClose}>
                            Close
                        </Text>

                        <Image
                            style={{ width: 250, height: 250 }}
                            resizeMode='contain'
                            source={{
                                uri: customer?.picture.medium,
                            }}

                        />
                        <Text style={styles.txt_name}>
                            {customer?.name.title.toString()} {customer?.name.first.toString()} {customer?.name.last.toString()}
                        </Text>
                        <Text>Gender: {customer?.gender}</Text>
                        <Text>Location: {customer?.location.street.number},
                            {customer?.location.street.name}
                            {customer?.location.city}
                            {customer?.location.state}
                            {customer?.location.country}
                            {customer?.location.postcode}
                            {customer?.location.coordinates.longitude}
                            {customer?.location.coordinates.latitude}
                            {customer?.location.timezone.offset}, {customer?.location.timezone.description}
                        </Text>
                        <Text>Email: {customer?.email}</Text>
                        <Text>Date of Birth: {customer?.dob.date}</Text>
                        <Text>Age: {customer?.dob.age}</Text>
                        <Text>Phone: {customer?.phone}</Text>
                        <Text>Cell: {customer?.cell}</Text>
                        <Text>Nationality: {customer?.nat}</Text>
                    </TouchableOpacity>
                </SafeAreaView>

            </Modal>

            <ScrollView contentContainerStyle={{  }}>
                {
                    list.map((item, index) => {
                        return(
                            <TouchableOpacity style={styles.item_info} key={index} onPress={() => handleDisplayCustomerInfo(item)}>
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
    txtClose:{
        fontSize:18,
        fontWeight : "bold",
        marginVertical : 10,
        textAlign : "right"
    },
    text_input:{
        padding :10,
        borderWidth :1,
        borderColor : "gray",
        borderRadius : 10,
        marginTop :10
    },
    info_container:{
        flex: 1,
        margin: 2,
        alignItems: "center",
        justifyContent: "center"
    },
});
export default HomeScreen;