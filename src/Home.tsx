import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsApi, IProducts } from './redux/ProductsSlicer'
import { AppDispatch, RootState } from './redux/Store'
import Feather from "react-native-vector-icons/Feather";
import { scale, ModerateScale, VerticalScale, verticalScale, moderateScale } from "react-native-size-matters";
import { Rating } from 'react-native-ratings'

export default function Home() {

  const dispatch = useDispatch<AppDispatch>()
  const { loading, products } = useSelector((state: RootState) => state.products)


  useEffect(() => {
    dispatch(getProductsApi())
  }, [])

  const renderEachProduct = ({ item, index }: { item: IProducts, index: number }) => {
    return (
      <View key={item._id} style={styles.productCard}>
        <View>
          {item.isNew && <Text>BESTSELLER</Text>}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} resizeMode='cover' style={styles.allImageStyles} />
        </View>
        </View>
        <View>
        <Text style={{ color: "red" }}>{item.brand}</Text>
          <Rating
            type='star'
            ratingColor='#3498db'
            startingValue={item.rating}
            ratingCount={5}
            imageSize={10}
            // style={{ paddingVertical: 10 }}
          />
          <Text>{item.discountedPrice}</Text>
          <Text>{item.oldPrice}</Text>
          <Text>{item.price}</Text>
          <Text>{item.category}</Text>
          <View style={styles.sizeContainer}>
          {item.size.map((eachSize)=><View style={styles.eachSize}><Text>{eachSize}</Text></View>)}
          </View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View>
      <FlatList
        numColumns={1}
        data={products}
        renderItem={renderEachProduct}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  addToCartText:{
    
  },
  buttonContainer:{
    backgroundColor:"blue",
    borderRadius:moderateScale(5),
  },
  eachSize:{
    height:moderateScale(20),
    width:moderateScale(20),
  },
  sizeContainer:{
    flexDirection:"row",
    alignItems:"center",
  },
  allImageStyles: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: scale(100),
    width: scale(120),
    overflow: "hidden",
    borderRadius:moderateScale(10)
  },
  productCard: {
    height: verticalScale(150),
    backgroundColor: "#FFFFFF",
    margin: moderateScale(10),
    borderRadius: moderateScale(8),
    padding:moderateScale(10),
    flexDirection:"row",
  }
})