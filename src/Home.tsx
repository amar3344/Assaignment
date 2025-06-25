import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addITemToCart, getProductsApi, IProducts } from './redux/ProductsSlicer'
import { AppDispatch, RootState } from './redux/Store'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Rating } from 'react-native-ratings';
import Feather from "react-native-vector-icons/Feather";

export default function Home() {

  const dispatch = useDispatch<AppDispatch>()
  const { loading, products, currentPage, hasMore, cart } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(getProductsApi({ currentPage: currentPage }))
  }, [])

  const addToCart = (product: IProducts) => {
    const exists = cart.some((eachItem: IProducts) => eachItem._id === product._id)
    if (exists) {
      const updateCart = cart.map(eachItem => eachItem._id === product._id ? { ...product, count: eachItem.count + 1 } : eachItem)
      dispatch(addITemToCart({ cart: updateCart }))
    } else {
      const updateProduct = { ...product, count: 1 }
      const updateCart = [...cart, updateProduct]
      dispatch(addITemToCart({ cart: updateCart }))
    }
  }


  const renderEachProduct = ({ item, index }: { item: IProducts, index: number }) => {
    return (
      <View key={item._id + index} style={styles.productCard}>
        <View>
          {item.isNew && <View style={styles.bestSellerStyles}>
            <Text style={styles.bestSellerText}>BESTSELLER</Text>
          </View>}
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} resizeMode='cover' style={styles.allImageStyles} />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.titleStyles}>{item.title}</Text>
          <Text style={styles.brandStyle}>Brand : {item.brand}</Text>
          <View style={styles.ratingContainer}>
            <Rating
              type='star'
              ratingColor='#3498db'
              startingValue={item.rating}
              ratingCount={5}
              imageSize={15}
              style={{ alignSelf: "flex-start" }}
            />
            <Text style={styles.ratingText}>{item.rating}/5</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.priceStyles}>RS : {item.price}</Text>
            <Text style={styles.originalPrice}> <FontAwesome name="rupee" />{item.oldPrice}</Text>
          </View>
          <Text style={styles.discountPrice}>Discount Price : <Text style={styles.priceStyles2}>{item.discountedPrice}</Text></Text>
          <View style={styles.sizeContainer}>
            {item.size.map((eachSize, index) => <View key={eachSize + index} style={styles.eachSize}><Text>{eachSize}</Text></View>)}
          </View>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => addToCart(item)}>
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.absoluteStyle}>
          <FontAwesome name='heart' color={"red"} size={moderateScale(15)} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.absoluteStyle2}>
          <FontAwesome name='share' color={"grey"} size={moderateScale(15)} />
        </TouchableOpacity>
      </View>
    )
  }

  const getExtraData = () => {
    if (!loading && hasMore) {
      dispatch(getProductsApi({ currentPage: currentPage + 1 }));
    }
  };

  const renderFooterComponent = () => {
    return loading && (<ActivityIndicator size="large" color={"blue"} />)
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        initialNumToRender={10}
        numColumns={1}
        data={products}
        renderItem={renderEachProduct}
        keyExtractor={(item, index) => item._id.toString() + index}
        onEndReached={getExtraData}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooterComponent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: moderateScale(10),
    marginTop: verticalScale(7)
  },
  inputStyles: {
    width: "85%",
    fontFamily: "Poppins-Medium",
    fontSize: moderateScale(12),
    color: "#000000",
  },
  searchInputContainer: {
    borderWidth: 1,
    borderColor: "#000000",
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
    borderRadius: moderateScale(5),
    paddingHorizontal: scale(4),
    marginBottom: verticalScale(8)
  },
  absoluteStyle2: {
    position: "absolute",
    top: verticalScale(40),
    right: scale(10),
  },
  absoluteStyle: {
    position: "absolute",
    top: verticalScale(10),
    right: scale(10),
  },
  priceStyles2: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(14),
    color: "#000000",
  },
  discountPrice: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    color: "#000000",
  },
  priceStyles: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(15),
    color: "grey",
    textDecorationLine: "line-through",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10)
  },
  originalPrice: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(15),
    color: "grey",
    textDecorationLine: "line-through",
  },
  ratingText: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(12),
    color: "#000000",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5)
  },
  brandStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(9),
    color: "red",
  },
  titleStyles: {
    fontFamily: "Poppins-Medium",
    fontSize: moderateScale(12),
    color: "#000000",
  },
  rightContainer: {
  },
  bestSellerText: {
    fontFamily: "Poppins-Regular",
    padding: moderateScale(1),
    fontSize: moderateScale(8),
    color: "#FFFFFF",
  },
  bestSellerStyles: {
    backgroundColor: " rgb(0, 160, 152)",
    borderRadius: moderateScale(4),
    width: scale(55),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(1)
  },
  addToCartText: {
    fontFamily: "Poppins-Regular",
    padding: moderateScale(8),
    fontSize: moderateScale(10),
    color: "#FFFFFF",
  },
  buttonContainer: {
    backgroundColor: "blue",
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  eachSize: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  allImageStyles: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: scale(100),
    width: scale(120),
    overflow: "hidden",
    borderRadius: moderateScale(10)
  },
  productCard: {
    height: verticalScale(160),
    backgroundColor: "#FFFFFF",
    margin: moderateScale(10),
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    flexDirection: "row",
    gap: scale(10),
    alignItems: 'center'
  }
})