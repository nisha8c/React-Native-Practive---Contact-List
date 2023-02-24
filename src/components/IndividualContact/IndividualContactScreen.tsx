import React from "react";
import {Text, Modal, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import { CustomerData } from "../../../types/types";

interface IndividualContactProps {
    customer: CustomerData | null;
    visible: boolean;
    onCustomerPress(event: React.MouseEvent<HTMLButtonElement>): void
}
const IndividualContactScreen = ({customer, visible, onCustomerPress}: IndividualContactProps) => {
    return(
        <Modal
            animationType="slide"
            visible={visible}
        >
            <SafeAreaView style={styles.info_container}>
                <TouchableOpacity
                    onPress={() => onCustomerPress}
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
                    <Text>Name: {customer?.name.title.toString()} {customer?.name.first.toString()} {customer?.name.last.toString()}</Text>
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
    );
}

export default IndividualContactScreen;