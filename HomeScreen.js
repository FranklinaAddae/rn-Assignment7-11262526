import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';

import Logo from './assets/Logo.png';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      const cartItems = cart ? JSON.parse(cart) : [];
      const itemExists = cartItems.some((item) => item.id === product.id);
      if (!itemExists) {
        cartItems.push(product);
        await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
        alert("Product added to cart!");
      } else {
        alert("Product is already in the cart!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkCart = async () => {
      const cart = await AsyncStorage.getItem("cart");
      if (cart) {
        console.log("Cart:", JSON.parse(cart));
      }
    };

    checkCart();
  }, []);

  const renderShortDescription = (description) => {
    return description.length > 50 ? `${description.substring(0, 50)}...` : description;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="bars" size={22} color="black" />
        </TouchableOpacity>
        <Image source={Logo} style={styles.companyIcon} />
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="search" size={22} color="#868686" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.iconButton}>
            <Icon name="shopping-cart" size={22} color="#868686" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ourStory}>
        <Text style={styles.ourStoryText}>OUR STORY</Text>
        <View style={styles.categoryFilterIcons}>
          <TouchableOpacity style={styles.circleIcon}>
            <Icon name="list-ul" size={20} color="#aaa" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleIcon}>
            <Icon name="filter" size={20} color="rgb(221, 80, 28)" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.product}
            onPress={() => navigation.navigate('ProductDetail', { product: item, image: item.image })}
          >
            <View style={styles.imagesContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item)}
              >
                <Icon name="plus" size={15} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productInfo}>{renderShortDescription(item.description)}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    backgroundColor: "white",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  companyIcon: {
    position: 'absolute',
    left: '40%'
  },
  rightIcons: {
    flexDirection: 'row',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'serif'
  },
  productInfo: {
    fontSize: 16,
    fontFamily: 'serif',
    color: '#666'
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: '#ff6347',
    marginTop: 5,
  },
  ourStory: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 10,
  },
  ourStoryText: {
    fontSize: 22,
    letterSpacing: 3,
    fontFamily: 'serif',
  },
  categoryFilterIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  circleIcon: {
    backgroundColor: '#dfdcdca2',
    borderRadius: 20,
    height: 40,
    width: 40,
    padding: 10,
    marginHorizontal: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
  },
  product: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
    objectFit: "contain",
  },
  imagesContainer: {
    position: "relative",
    backgroundColor: "white",
  },
  infoContainer: {
    marginTop: 10,
    textAlign: "left",
    paddingLeft: 2,
    backgroundColor: 'white',
  },
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 6,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
