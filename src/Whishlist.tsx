import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './redux/Store'
import { IProducts ,whishlistItems } from './redux/ProductsSlicer'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from "react-native-vector-icons/Feather";
import { Rating } from 'react-native-ratings'

interface IProps {
    navigation: {
        goBack: () => void
    }
}

const Whishlist = (props: IProps) => {
    const [whishlistItem, setWhishListItems] = useState<IProducts[]>([])
    const { products } = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const updateList = products.filter((eachItem) => eachItem.whishList === true)
        setWhishListItems(updateList)
    }, [products])

    const handleRemoveWhishlist = (product:IProducts) =>{
        dispatch(whishlistItems(product))
    }

    const renderEachWhishlistItem = ({ item, index }: { item: IProducts, index: number }) => {
        return (
            <View style={styles.eachWhishList}>
                <View style={styles.imageContainer}>
                    <Image style={styles.imageStyles} resizeMode='cover' source={{ uri: item.image }} />
                </View>
                <Text numberOfLines={2} style={styles.titleStyles}>{item.title}</Text>
                <Text style={styles.brandStyles}>Brand: {item.brand}</Text>
                <View style={styles.ratingContainer}>
                    <Rating
                        type='star'
                        ratingColor='#3498db'
                        startingValue={item.rating}
                        ratingCount={5}
                        imageSize={10}
                        style={{ alignSelf: "flex-start", marginVertical: 3 }}
                    />
                    <Text style={styles.ratingText}>{item.rating}/5</Text>
                </View>
                <View style={styles.rowContainer}>
                <Text style={styles.price}>RS: {item.price}</Text>
                <Text style={styles.oldPrice}>RS: {item.oldPrice}</Text>
                </View>
                <Text style={styles.buyNowText}>Buy Now: <Text style={styles.discountPrice}>{item.discountedPrice}</Text></Text>
                <TouchableOpacity style={styles.removeContainer} onPress={()=>handleRemoveWhishlist(item)}>
                    <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderEmptyComponent = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text>NO WHISHLIST</Text>
            </View>
        )
    }

    const goBackHandler = () => {
        props.navigation.goBack()
    }
    const renderFooterComponent = () => {
        return (
            <View style={styles.footer} />
        )
    }
    return (
        <View style={styles.whishlistScreen}>
            <TouchableOpacity onPress={goBackHandler}>
                <Feather name="arrow-left" size={moderateScale(25)} color={"#000000"} />
            </TouchableOpacity>
            <FlatList
                numColumns={2}
                data={whishlistItem}
                renderItem={renderEachWhishlistItem}
                keyExtractor={(item) => item._id.toString()}
                ListEmptyComponent={renderEmptyComponent}
                ListFooterComponent={renderFooterComponent}
            />
        </View>
    )
}

export default Whishlist

const styles = StyleSheet.create({
    discountPrice:{
        fontFamily: "Poppins-Medium",
        fontSize: moderateScale(14),
        color: "#000000",
    },
    price:{
        fontFamily: "Poppins-Medium",
        fontSize: moderateScale(12),
        color: "#000000",
        textDecorationLine: "line-through",
    },
    rowContainer:{
        flexDirection:"row",
        alignItems:"center",
        gap:scale(10)
    },
    buyNowText:{
        fontFamily: "Poppins-Medium",
        fontSize: moderateScale(10),
        color: "#000000",
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
    oldPrice: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(10),
        color: "#000000",
        textDecorationLine: "line-through",
    },
    footer: {
        height: verticalScale(50)
    },
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(300)
    },
    removeText: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(12),
        color: "#FFFFFF",
        padding: moderateScale(8)
    },
    removeContainer: {
        backgroundColor: "#2874f0",
        borderRadius: moderateScale(4),
        justifyContent: "center",
        alignItems: "center",
    },
    brandStyles: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(10),
        color: "red",
    },
    titleStyles: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(14),
        color: "#000000",
    },
    imageContainer: {
        height: moderateScale(100),
        width: "100%",
        overflow: "hidden",
        borderRadius: moderateScale(5)
    },
    imageStyles: {
        height: "100%",
        width: "100%",
    },
    whishlistScreen: {
        flex: 1,
        padding: moderateScale(10),
    },
    eachWhishList: {
        height: verticalScale(260),
        width: moderateScale(150),
        margin: moderateScale(10),
        borderRadius: moderateScale(5),
        padding: moderateScale(10),
        borderWidth: 1,
        borderColor: "#00000050",
        backgroundColor:"#FFFFFF",
        justifyContent:"space-evenly"
    },

})