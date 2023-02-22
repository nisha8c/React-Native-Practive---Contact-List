import {Button, View, Text, SafeAreaView, FlatList, ScrollView, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import customers from "../../../server/customers";
import {CustomerData} from "../../../types/types";
import React, {useEffect, useState} from "react";
const HomeScreen = () => {

    const [list, setList] = useState<CustomerData[]>([]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch ('http://localhost:8000/api/customers');
            const data = await response.json();
            setList(data);
        };
        getData();
    }, [list]);
    return (
        <SafeAreaView>
            <ScrollView>
                {
                    list.map((item, index) => {
                        return(
                            <View style={styles.item_info} key={index}>
                                <View>
                                    <Text style={styles.txt_name}>{item.name.title} {item.name.first} {item.name.last}</Text>
                                    <Text style={styles.txt_item}>{item.dob.date} {item.dob.age}</Text>
                                </View>
                            </View>
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
    scrollView: {
        height: '20%',
        width: '80%',
        margin: 20,
        alignSelf: 'center',
        padding: 20,
        borderWidth: 5,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: 'lightblue'
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        paddingBottom: 50
    }

});
export default HomeScreen;