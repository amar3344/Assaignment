import { View, Text, FlatList, TextInput, Image, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, Alert, } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addITemToCart, IProducts, whishlistItems } from './redux/ProductsSlicer'
import { AppDispatch, RootState } from './redux/Store'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Rating } from 'react-native-ratings';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useState } from 'react';
import RazorpayCheckout, { CheckoutOptions } from 'react-native-razorpay';


export default function Cart() {
  const [isDisplayDropDown, setDisplayDropDown] = useState<boolean>(false)
  const [indexDropdown, setIndexDropDown] = useState<number>(-1)
  const [isModalDisplay, setQuantityModalDisplay] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<IProducts>()
  const [quantity, setQuantity] = useState<string>()
  const dispatch = useDispatch<AppDispatch>()
  const { cart } = useSelector((state: RootState) => state.products)
  const handleDropDown = (item: number) => {
    setDisplayDropDown(true)
    setIndexDropDown(item)
  }
  const handleQuantity = (product: IProducts, quantity: number) => {
    const updateCart = cart.map(eachItem => eachItem._id === product._id ? { ...product, count: quantity } : eachItem)
    dispatch(addITemToCart({ cart: updateCart }))
    setDisplayDropDown(false)
  }
  const handleTextInputModal = (product: IProducts) => {
    setDisplayDropDown(false)
    setQuantityModalDisplay(true)
    setSelectedProduct(product)
  }
  const closeModal = () => {
    setQuantityModalDisplay(false)
  }
  const applyQuantity = () => {
    closeModal()
    const count = Number(quantity)
    selectedProduct && handleQuantity(selectedProduct, count)
  }
  const addQuantity = (text: string) => {
    setQuantity(text)
  }
  const renderTextInputModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalDisplay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Quantity</Text>
            <TextInput
              placeholder='Quantity'
              placeholderTextColor={"#00000050"}
              style={styles.inputStyles}
              value={quantity}
              keyboardType='numeric'
              onChangeText={addQuantity}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButContainer} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={quantity ? false : true} style={{ ...styles.cancelButContainer, borderRightColor: "#FFFFFF", }} onPress={applyQuantity}>
                <Text style={quantity ? { ...styles.applyButtonText, color: "blue" } : styles.applyButtonText}>APPLY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
  const removeItemFromCart = (product: IProducts) => {
    const updatedCartItems = cart.filter((eachProduct: IProducts) => eachProduct._id !== product._id)
    dispatch(addITemToCart({ cart: updatedCartItems }))
  }
  const handleSaveForLater = (product: IProducts) => {
    dispatch(whishlistItems(product))
  }
  const renderCartItem = ({ item, index }: { item: IProducts, index: number }) => {
    return (
      <View style={styles.cartItemCard}>
        <View style={styles.productCard}>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} resizeMode='cover' style={styles.allImageStyles} />
            </View>
            {isDisplayDropDown && indexDropdown === index && (
              <View style={styles.quantityDropDown}>
                <Text onPress={() => handleQuantity(item, 1)}>1</Text>
                <Text onPress={() => handleQuantity(item, 2)}>2</Text>
                <Text onPress={() => handleQuantity(item, 3)}>3</Text>
                <Text onPress={() => handleTextInputModal(item)}>more</Text>
              </View>
            )}
            <TouchableOpacity style={styles.quantityContainer} onPress={() => handleDropDown(index)}>
              <Text>Qty: <Text>{item.count}</Text></Text>
              <Ionicons name='caret-down-outline' size={moderateScale(15)} color={"#000000"} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.titleStyles}>{item.title}</Text>
            <Text style={styles.brandStyle}>Brand : {item.brand}</Text>
            <View style={styles.ratingContainer}>
              <Rating
                type='star'
                ratingColor='#3498db'
                startingValue={item.rating}
                ratingCount={5}
                imageSize={10}
                ratingBackgroundColor='red'
                style={{ alignSelf: "flex-start", marginVertical: 3 }}
              />
              <Text style={styles.ratingText}>{item.rating}/5</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.priceStyles}>RS : {item.price}</Text>
              <Text style={styles.originalPrice}> <FontAwesome name="rupee" />{item.oldPrice}</Text>
            </View>
            <Text style={styles.discountPrice}>Discount Price : <Text style={styles.priceStyles2}>{item.discountedPrice}</Text></Text>
            <View style={styles.sizeContainer}>
              <Text style={styles.eachSize}>Selected Size: {item.size[1]}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.rowContainer2} onPress={() => handleSaveForLater(item)}>
            <FontAwesome6 name="cart-arrow-down" />
            <Text>Save for later</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.rowContainer2} onPress={() => removeItemFromCart(item)}>
            <FontAwesome6 name="trash-can" />
            <Text>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.rowContainer2, borderRightColor: "#FFFFFF" }}>
            <Ionicons name="flash-outline" />
            <Text>Buy this now</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  const renderEmptyContainer = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyStyles}>Cart is Empty</Text>
      </View>
    )
  }
  const renderListFooterComponent = () => {
    return (
      <View style={styles.listfooterContainer} />
    )
  }
  let totalPrice: number = 0;
  let checkoutPrice: number = 0;
  if (cart.length > 0) {
    totalPrice = cart.map(item => item.price * item.count).reduce((acc, item) => acc + item)
    checkoutPrice = cart.map(item => item.discountedPrice * item.count).reduce((acc, item) => acc + item)
  }

  const proceedCheckout = async () => {
    var options: CheckoutOptions = {
      order_id: "",
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: checkoutPrice*100,
      name: 'foo',
      prefill: {
        email: 'akshay@razorpay.com',
        contact: '8955806560',
        name: 'Akshay Bhalotia'
      },
      theme: { color: '#F37254' }
    }
    RazorpayCheckout.open(options).then((data) => {
      console.log(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      console.log(`Error: ${error.code} | ${error.description}`);
    });
    RazorpayCheckout.onExternalWalletSelection((data: any) => {
      console.log(`External Wallet Selected: ${data.external_wallet} `);
    });
  }
  return (
    <View style={styles.cartScreen}>
      <FlatList
        initialNumToRender={10}
        numColumns={1}
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item, index) => item._id.toString() + index}
        ListEmptyComponent={renderEmptyContainer}
        ListFooterComponent={renderListFooterComponent}
      />
      <View style={styles.footerContainer}>
        <View>
          <Text style={styles.totalPriceText}>{totalPrice.toFixed(2)}</Text>
          <Text style={styles.checkoutPriceText}><FontAwesome name="rupee" /> {checkoutPrice.toFixed(2)}/-</Text>
        </View>
        <TouchableOpacity disabled={checkoutPrice === 0 ? true : false} style={checkoutPrice === 0 ?
          { ...styles.placeOrderContainer, backgroundColor: "#00000040" } : styles.placeOrderContainer}
          onPress={proceedCheckout}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
      {renderTextInputModal()}
    </View>
  )
}

const styles = StyleSheet.create({
  emptyStyles: {
    fontFamily: "Poppins-Medium",
    fontSize: moderateScale(14),
    color: "#000000",
  },
  applyButtonText: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    color: "#00000080",
  },
  cancelButtonText: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    color: "#000000",
  },
  cancelButContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    borderRightColor: "#00000050",
    borderRightWidth: 0.2,
    paddingHorizontal: 55,
  },
  modalButtons: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 0.2,
    borderColor: "#00000050",
  },
  modalText: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    color: "#000000",
    padding: moderateScale(5),
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000010",
    paddingHorizontal: scale(20)
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  listfooterContainer: {
  },
  quantityDropDown: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: scale(80),
    height: verticalScale(100),
    justifyContent: "space-evenly",
    alignItems: "center",
    top: verticalScale(80),
    zIndex: 1,
    borderWidth: 1,
    borderColor: "#00000050",
  },
  checkoutPriceText: {
    fontFamily: "Poppins-Medium",
    fontSize: moderateScale(18),
    color: "#000000",
  },
  totalPriceText: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(8),
    color: "#000000",
    textDecorationLine: "line-through",
  },
  placeOrderText: {
    fontFamily: "Poppoins-Medium",
    fontSize: moderateScale(14),
    paddingHorizontal: scale(50),
    paddingVertical: verticalScale(10),
  },
  placeOrderContainer: {
    backgroundColor: "rgb(255, 194, 0)",
    borderRadius: 10,
  },
  rowContainer2: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
    borderRightWidth: 0.4,
    borderRightColor: "#00000050",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#00000050",
    borderRadius: moderateScale(4)
  },
  cartItemCard: {
    height: verticalScale(160),
    backgroundColor: "#FFFFFF",
    margin: moderateScale(10),
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
  },
  cartScreen: {
    flex: 1,
    justifyContent: "space-between",
  },
  footerContainer: {
    height: verticalScale(50),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scale(10)
  },
  quantityContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#00000050",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(1),
    marginTop: verticalScale(4),
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: verticalScale(250)
  },
  inputStyles: {
    width: "100%",
    fontFamily: "Poppins-Medium",
    fontSize: moderateScale(12),
    color: "#000000",
    paddingHorizontal: scale(5)
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
  priceStyles2: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(14),
    color: "#000000",
  },
  discountPrice: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(12),
    color: "#000000",
  },
  priceStyles: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    color: "grey",
    textDecorationLine: "line-through",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  originalPrice: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(12),
    color: "grey",
    textDecorationLine: "line-through",
  },
  ratingText: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(10),
    color: "#000000",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
  },
  brandStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(9),
    color: "red",
  },
  titleStyles: {
    fontFamily: "Poppins-Medium",
    fontSize: moderateScale(10),
    color: "#000000",
  },
  eachSize: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(10),
    color: "#000000",
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
    height: scale(80),
    width: scale(80),
    overflow: "hidden",
    borderRadius: moderateScale(10)
  },
  productCard: {
    flexDirection: "row",
    gap: scale(10),
    alignItems: 'center'
  }
})