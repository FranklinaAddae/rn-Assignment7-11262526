import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import doNotBleachIcon from "./assets/Do Not Bleach.png";
import doNotTumbleIcon from "./assets/Do Not Tumble Dry.png";
import doNotWashIcon from "./assets/Do Not Wash.png";
import ironIcon from "./assets/Iron Low Temperature.png";
import shippingIcon from "./assets/Shipping.png";
import upIcon from "./assets/Up.png";

const ProductDetailScreen = ({ route }) => {
  const { product, image } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>

      {/* Materials Section */}
      <View style={styles.materialsContainer}>
        <Text style={styles.materialsTitle}>MATERIALS</Text>
        <Text style={styles.materialsBody}>
          We work with monitoring programmes to ensure compliance with safety,
          health and quality standards for our products.
        </Text>
      </View>

      {/* Cautions Section */}
      <View style={styles.cautionSection}>
        <View style={styles.caution}>
          <Image style= {styles.icon} source={doNotBleachIcon} />
          <Text>Do not use bleach</Text>
        </View>
        <View style={styles.caution}>
          <Image style= {styles.icon} source={doNotTumbleIcon} />
          <Text>Do not tumble dry</Text>
        </View>
        <View style={styles.caution}>
          <Image style= {styles.icon} source={doNotWashIcon} />
          <Text>Dry clean with tetrachloroethylene</Text>
        </View>
        <View style={styles.caution}>
          <Image style= {styles.icon} source={ironIcon} />
          <Text>Iron at a maximum of 110°C/230°F</Text>
        </View>
      </View>

      <View style= {styles.shippingContainer}>
        <View style= {styles.shippingIconSection}>
          <Image source={shippingIcon}/>
        </View>
        <View style= {styles.textSection}>
          <View style= {styles.textWithUp}>
          <Text style= {styles.textBeforeUP}>Free Flat Rate Shipping</Text>
          <Image source={upIcon}/>
          </View>
          <Text style= {styles.subText}>Estimated to be delivered on</Text>
          <Text style= {styles.subText}>09/11/2021 - 12/11/2021.</Text>
        </View>
      </View>

      <View style= {styles.footer}>
        <View style= {styles.plus}><Icon name="plus" size={20} color="white" /></View>
        <View>
          <Text style= {styles.textIn}>Add to basket</Text>
          </View>
        <View><Icon name="heart" size={15} color="white" /></View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
  },

  infoContainer: {
    paddingHorizontal: 10,
  },

  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  price: {
    marginTop: 5,
    fontSize: 24,
    color: "#FF6347",
    fontWeight: "bold",
  },
  materialsContainer: {
    marginTop: 20,
    paddingTop: 20,
  },
  materialsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  materialsBody: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    paddingHorizontal: 10,
  },
  cautionSection: {
    width: "90%",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    paddingBottom: 15,
  },
  caution: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },

  textWithUp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 30,
  },
  textBeforeUP: {
    fontSize: 16,
    fontWeight: "500",
  },

  subText: {
    marginBottom: 6,
    fontSize: 16,
    color: "#666",
  },
  shippingContainer: {
    display: "flex",
    flexDirection: "row",
    width: '90%',
    marginTop: 30,
  },
  textSection: {
    marginLeft: 10,
  },

  footer: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: "black",
    width: "98%",
    marginTop: 30,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 20,
    borderBottomColor: "white",
    marginRight: 10,
  },

  textIn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 30,
    marginRight: 120,
    textTransform: "uppercase",
  },
  plus: {
    paddingLeft: 10,
  },
});

export default ProductDetailScreen;
