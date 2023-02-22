import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Button
                title={'About'}
                onPress={() => navigation.navigate('About')}
             />

            <Button
                title={'Search'}
                onPress={() => navigation.navigate('Search')}
            />
        </View>
    );
};
export default HomeScreen;