import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Button,
    Image,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { addBike, fetchBikes, deleteBike } from '../store/bikeSlice';

export default function Screen({ navigation }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('https://i.ibb.co/7kvPXdT/xe-dap-2.jpg');
    const [type, setType] = useState('Roadbike');
    const [selectedType, setSelectedType] = useState('ALL');

    const dispatch = useDispatch();
    const { bikes } = useSelector((state) => state.bike);

    useEffect(() => {
        dispatch(fetchBikes());
    }, [dispatch]);

    const handleAddBike = () => {
        const newBike = { name, price, image, type };
        dispatch(addBike(newBike));
        setName('');
        setPrice('');
        // setImage('');
        setType('Roadbike');
    };

    const handleDeleteBike = (id) => {
        dispatch(deleteBike(id));
    };

    const filteredBikes =
        selectedType === 'ALL'
            ? bikes
            : bikes.filter((bike) => bike.type === selectedType);

    const getButtonStyle = (type) => {
        return [styles.btnType, selectedType === type && styles.btnTypeActive];
    };

    return (
        <ScrollView>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: 'red',
                    marginBottom: 20,
                }}>
                THE WORLD BEST BIKE{' '}
            </Text>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: 'red',
                    marginBottom: 20,
                }}>
                NGUYEN VAN PHONG{' '}
            </Text>

            <View style={styles.boxAdd}>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color: 'black',
                        marginBottom: 20,
                        textAlign: 'center',
                    }}>
                    ADD BIKE
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter bike name"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter bike price"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter bike image URL"
                    value={image}
                    onChangeText={setImage}
                />

                <Picker
                    selectedValue={type}
                    style={styles.picker}
                    onValueChange={(itemValue) => setType(itemValue)}>
                    <Picker.Item label="Roadbike" value="Roadbike" />
                    <Picker.Item label="Mountain" value="Mountain" />
                    <Picker.Item label="Electric" value="Electric" />
                </Picker>

                <Button title="Add Bike " onPress={handleAddBike} />
            </View>

            <View>
                <View style={styles.lineType}>
                    <TouchableOpacity
                        style={getButtonStyle('ALL')}
                        onPress={() => setSelectedType('ALL')}>
                        <Text>ALL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={getButtonStyle('Roadbike')}
                        onPress={() => setSelectedType('Roadbike')}>
                        <Text>Roadbike</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={getButtonStyle('Mountain')}
                        onPress={() => setSelectedType('Mountain')}>
                        <Text>Mountain</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={styles.lineItem}>
                        {filteredBikes.map((item) => (
                            <View key={item.id} style={styles.item}>
                                <Image source={{ uri: item.image }} style={styles.wImg} />
                                <Text style={styles.name}>Tên xe: {item.name}</Text>
                                <Text style={styles.price}>${item.price} VND</Text>
                                <View style={styles.lineAction}>
                                    <TouchableOpacity
                                        style={styles.btnAction}
                                        onPress={() =>
                                            navigation.navigate('ProductDetail', { item: item })
                                        }>
                                        <Text style={{ color: '#fff' }}>UPDATE</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.btnAction}
                                        onPress={() => handleDeleteBike(item.id)}>
                                        <Text style={{ color: '#fff' }}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    boxAdd: {
        padding: 10,
        borderWidth: 1,
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        paddingLeft: 10,
    },

    lineType: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    btnType: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
    },
    lineItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        marginTop: 50,
    },
    item: {
        flexBasis: '48%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
    },
    wImg: {
        width: '100%',
        height: 100,
    },
    btnTypeActive: {
        backgroundColor: 'red',
    },
    lineAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnAction: {
        padding: 5,
        backgroundColor: 'green',
        margin: 3,
        fontWeight: '700',
    },
});
