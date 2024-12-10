import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    Image,
    ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { updateBike } from '../store/bikeSlice';

import { Picker } from '@react-native-picker/picker';


const UpdateProduct = ({ route, navigation }) => {
    const { item } = route.params;

    const dispatch = useDispatch();
    // Khởi tạo state cho name, price và type
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price.toString());
    const [type, setType] = useState(item.type);

    const handleUpdate = () => {

        const updatedProduct = {
            name,
            price: parseFloat(price),
            type,
        };

        dispatch(updateBike({ id: item.id, updatedData: updatedProduct }));

        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Cập nhật sản phẩm</Text>

            <Image source={{ uri: item.image }} style={styles.wImg} />

            <Text>Tên sản phẩm </Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text>Giá</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <Text>Loại</Text>
            <Picker
                selectedValue={type}
                style={styles.picker}
                onValueChange={(itemValue) => setType(itemValue)}>
                <Picker.Item label="Roadbike" value="Roadbike" />
                <Picker.Item label="Mountain" value="Mountain" />
                <Picker.Item label="Electric" value="Electric" />
            </Picker>

            <Button title="Cập nhật " onPress={() => handleUpdate()} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    picker: {
        height: 50,
        marginBottom: 20,
    },
    wImg: {
        width: 300,
        height: 300,
    },
});

export default UpdateProduct;
