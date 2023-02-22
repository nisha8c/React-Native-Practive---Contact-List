import {Button, View, Text, SafeAreaView, FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomerData} from "../../../types/types";
import React, {useEffect, useState} from "react";
const HomeScreen = ({ navigation }) => {

    const [list, setList] = useState<CustomerData[]>([]);

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
        return(
            <View>
                <Text>testing</Text>
            </View>
        );
    };

    return (
        <SafeAreaView>
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
});
export default HomeScreen;