import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';

const Screen = () => {

    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBikes = async () => {
        try {
            const response = await fetch('https://67319d4c7aaf2a9aff113592.mockapi.io/bike');
            const data = await response.json();
            setBikes(data);
        } catch (error) {
            console.error("Error fetching bikes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBikes();
    }, []);



    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: "600", color: "red", marginBottom: 20 }}>THE WORLD BEST BIKE</Text>

            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter bike name"
                    // value={name}
                    // onChangeText={setName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter bike price"
                    // value={price}
                    // onChangeText={setPrice}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter bike image URL"
                    // value={image}
                    // onChangeText={setImage}
                />

                <Picker
                    // selectedValue={type}
                    style={styles.picker}
                    // onValueChange={(itemValue) => setType(itemValue)}
                >
                    <Picker.Item label="Roadbike" value="Roadbike" />
                    <Picker.Item label="Mountain" value="Mountain" />
                    <Picker.Item label="Electric" value="Electric" />
                </Picker>

                <Button title="Add Bike" />
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
        </View>
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