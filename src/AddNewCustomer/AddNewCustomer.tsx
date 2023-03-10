import {SafeAreaView, Text, TextInput, StyleSheet, View, ScrollView, TouchableOpacity, Button, Alert} from "react-native";
import {
    CoordinatesData,
    CustomerData,
    DobRegData,
    IdData,
    LocationData,
    NameData,
    PictureData,
    StreetData, TimezoneData
} from "../../types/types";
import {useForm, Controller, SubmitErrorHandler} from "react-hook-form";
import React, {useState} from "react";

const AddNewCustomer = () => {

    const [newCustomer, setNewCustomer] = useState<CustomerData>();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            gender: '',
            name: {
                title: '',
                first: '',
                last: ''
            },
            location: {
                street: {
                    number: 0,
                    name: ''
                },
                city: '',
                state: '',
                country: '',
                postcode: '',
                coordinates: {
                    latitude: '',
                    longitude: ''
                },
                timezone: {
                    offset: '',
                    description: ''
                }
            },
            email: '',
            dob: {
                date:  '',
                age: 0
            },
            registered: {
                date:  '',
                age: 0
            },
            phone: '',
            cell: '',
            id: {
                name: '',
                value: 0,
            },
            picture: {
                large: '',
                medium: '',
                thumbnail: '',
            },
            nat: ''
        }
    });
    const onSubmit = (data: CustomerData) => {
        console.log(JSON.stringify(data));

        fetch('http://localhost:8080/api/customers/', {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(data)
        });

    }

    return(
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.txt_main}>
                    Add New Contact
                </Text>
            </View>

            <View style={{  }}>

                <ScrollView>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder={'Title: Mr, Mrs or Miss'}
                                style={styles.text_input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="name.title"
                    />
                    {/*
                        errors.lastName && <Text>This is required.</Text>
                        */
                    }

                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder={'First Name'}
                                style={styles.text_input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="name.first"
                    />


                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder={'Last Name'}
                                style={styles.text_input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="name.last"
                    />

                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder={'Gender: Male / Female / Prefer not to say'}
                                style={styles.text_input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="gender"
                    />


                    <Button title="Submit" onPress={handleSubmit(onSubmit)} />
                </ScrollView>

            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        padding : 20,
        backgroundColor : "#f7f1e4",
        flexDirection: 'row',
    },
    txt_main : {
        fontSize : 22,
        fontWeight : "bold"
    },
    text_input:{
        padding :10,
        borderWidth :1,
        borderColor : "gray",
        borderRadius : 10,
        marginTop :10
    },
    label: {
        fontSize: 18,
        marginTop: 10,
    },
});

export default AddNewCustomer;