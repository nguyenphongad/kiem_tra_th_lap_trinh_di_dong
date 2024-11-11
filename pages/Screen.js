import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { addBike, fetchBikes } from '../store/bikeSlice';

const Screen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('Roadbike');

    const dispatch = useDispatch();
    const { bikes, loading } = useSelector((state) => state.bike);

    useEffect(() => {
        dispatch(fetchBikes());
    }, [dispatch]);

    const handleAddBike = () => {
        const newBike = { name, price, image, type };
        dispatch(addBike(newBike));
        setName('');
        setPrice('');
        setImage('');
        setType('Roadbike');
    };

    return (
        <ScrollView>
            <Text style={{ fontSize: 20, fontWeight: "600", color: "red", marginBottom: 20 }}>THE WORLD BEST BIKE</Text>

            <View>
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
                    onValueChange={(itemValue) => setType(itemValue)}
                >
                    <Picker.Item label="Roadbike" value="Roadbike" />
                    <Picker.Item label="Mountain" value="Mountain" />
                    <Picker.Item label="Electric" value="Electric" />
                </Picker>

                <Button title="Add Bike" onPress={handleAddBike} />
            </View>




            <View>
                <View style={styles.lineType}>
                    <TouchableOpacity style={styles.btnType}>
                        <Text>ALL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnType}>
                        <Text>Roadbike</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnType}>
                        <Text>Mountain</Text>
                    </TouchableOpacity>
                </View>


                <View>
                    {loading ? (
                        <Text>loading...</Text>
                    ) : (
                        <View style={styles.lineItem}>
                            {bikes.map((item) => (
                                <View key={item.id} style={styles.item}>
                                    <Image source={{ uri: item.image }} style={styles.wImg} />
                                    <Text style={styles.name}>Tên xe: {item.name}</Text>
                                    {/* <Text style={styles.model}>Mẫu xe: {item.model}</Text> */}
                                    <Text style={styles.price}>${item.price} VND</Text>
                                </View>
                            ))}
                        </View>
                    )}


                </View>

            </View>
        </ScrollView>
    )
}

export default Screen

const styles = StyleSheet.create({
    lineType: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop:50
    },
    btnType: {
        padding: 10,
        borderWidth: 1,
        borderColor: "red",
        borderRadius: 10
    },
    lineItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        marginTop: 50
    },
    item: {
        flexBasis: "48%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 10,
    },
    wImg: {
        width: "100%",
        height: 100
    }
})