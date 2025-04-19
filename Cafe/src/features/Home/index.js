import React, { useState, useCallback, useRef , useEffect} from "react";
import { View, Text ,ScrollView,Button, TouchableOpacity, FlatList, StyleSheet, Image} from "react-native";
import { useSelector, useDispatch} from "react-redux";
import YoutubePlayer from "react-native-youtube-iframe";
import ProductCard from "../../component/ProductCard";
import SkeletonCard from "../../component/SkeletonCard/card";
import { verticalScale, horizontalScale } from "../../config";
import { All, Category} from "../../services/methods/product";
import { Create, Count} from "../../services/methods/cart";
import { Cart_id } from "../../store/actions/cart/cart_id";
import { All as CategoryAll } from "../../services/methods/category";
import { useFocusEffect } from '@react-navigation/native';
import ProductRightCard from "../../component/ProductRightCard";

const Home = (props) =>{

    const userReducer = useSelector(state=>state.UserCheck);
    const {userCheck, userStatus} = userReducer;

    const tableReducer = useSelector(state => state.Table_id);
    const {table_id} = tableReducer;

    const [cartId, setCartId] = useState(null);
    const [count, setCount] = useState("0");

    const [categoys, setCategorys] = useState([]);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    const [selectCategory, setSelectCategory] = useState();

    const cartReducer = useSelector(state=>state.Cart_id);
    const {cart_id} = cartReducer;

    const dispatch = useDispatch();

    const [scrollX, setScrollX] = useState(0); 
  
    const handleScroll = (event) => {
      
     //setScrollX(event.nativeEvent.contentOffset.x);
    };
    
    useEffect(()=>{
        All(userCheck.restaurant_id,(err,data)=>{
            if(data){
                setData(data.data);
            }
        })
        CategoryAll(userCheck.restaurant_id,(err,data)=>{
            if(data){
                setCategorys(data.data);
            }
        })   
    },[])

    useFocusEffect(
        React.useCallback(() => {
            CountRequest();
            return () => {
                CountRequest();     
            };
        }, [])
    )

    useEffect(()=>{
        if(table_id !== undefined){
            Create(userCheck.user_id,userCheck.restaurant_id,table_id,(err,data)=>{
                if(data){
                    setCartId(data.data.cart_id);
                    dispatch(Cart_id(data.data.cart_id));
                }
                else{
                    props.navigation.navigate("Tables");
                }
            })
        }
    },[table_id])

    const ProductCategoryRequest = (category_id) =>{
        setSelectCategory(category_id);
        Category(category_id,userCheck.restaurant_id,(err,data)=>{
            if(data){
                setData(data.data);
            }
        })
    }

    const CountRequest = () =>{
        if(cartId !== null){
            Count(cartId,(err,data)=>{
                if(data){
                    setCount(data.data.count)
                }
            })
        }
    }

    useEffect(()=>{
        if(cart_id !== null){
            Count(cart_id,(err,data)=>{
                if(data){
                    console.log(data.data.count)
                    setCount(data.data.count)
                }
            })
        }
    },[cart_id])

    const renderItem = ({item,index}) =>{
        if(index % 2 === 0){
            return <ProductCard item={item} navigation={()=>props.navigation.navigate("ProductDetail",{...item})} />;
        }
        else{
            return <ProductRightCard item={item} navigation={()=>props.navigation.navigate("ProductDetail",{...item})} />;
        }
    }

    const headerItem = () =>{
        return(
        <View style={styles.container}>
            <View style={styles.topRow}>
                <TouchableOpacity onPress={()=>props.navigation.navigate("Tables")}>
                    <Image 
                        style={{width:horizontalScale(22),height:verticalScale(30)}}
                        source={require("../../assets/icon/home.png")}
                    />
                </TouchableOpacity>
                <Image 
                    style={styles.logo}
                    source={require('../../assets/images/logo.png')}
                />
                <TouchableOpacity style={styles.cartButton} onPress={()=>props.navigation.navigate("Cart")}>
                    <Image 
                        style={styles.cart}
                        source={require('../../assets/icon/cart.png')}
                    />
                    {count !== "0" &&
                        <View style={styles.cartCountRow}>
                            <Text style={styles.countText}>{count}</Text>
                        </View>
                    }
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',paddingHorizontal:horizontalScale(15),alignSelf:'center',marginBottom:verticalScale(20)}}>
                <View style={{width:horizontalScale(5),height:verticalScale(3),backgroundColor:'black',borderRadius:15,}}></View>
                <View style={{width:horizontalScale(15),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
                <View style={{width:horizontalScale(30),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(7)}}></View>
                <View style={{width:horizontalScale(200),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(10)}}></View>
                <View style={{width:horizontalScale(30),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(7)}}></View>
                <View style={{width:horizontalScale(15),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
                <View style={{width:horizontalScale(5),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
            </View>
            <ScrollView 
                horizontal
                scrollEnabled={true}
                onScroll={handleScroll}
                overScrollMode="always"
                scrollEventThrottle={16}
            >
                <Image 
                    style={styles.topImage}
                    source={require('../../assets/images/banner1.png')}
                />
                <Image 
                    style={styles.topImage}
                    source={require('../../assets/images/banner2.png')}
                />
            </ScrollView>
            <View style={{flexDirection:'row',marginBottom:verticalScale(20),justifyContent:'center'}}>
                <View style={{width:horizontalScale(5),height:verticalScale(6), backgroundColor:'black',borderRadius:999,opacity:0.6}}></View>
                <View style={{width:horizontalScale(50),height:verticalScale(6), backgroundColor:'black',borderRadius:999,marginLeft:horizontalScale(10)}}></View>
                <View style={{width:horizontalScale(5),height:verticalScale(6), backgroundColor:'black',borderRadius:999,marginLeft:horizontalScale(10),opacity:0.6}}></View>
            </View>
            <ScrollView horizontal>
                {categoys.map((item,index)=>                       
                    <TouchableOpacity style={{borderRadius:10,alignItems:'center',justifyContent:'center',marginLeft:horizontalScale(20)}} key={index} onPress={()=>ProductCategoryRequest(item.category_id)}>
                        <Text style={{fontSize:26,fontFamily:'Impact-Stone',color: selectCategory === item.category_id ? 'black' : 'gray'}}>{item.title}</Text>
                        <View style={{width:horizontalScale(110),height:verticalScale(3),backgroundColor:selectCategory === item.category_id ? 'black' : 'gray' ,borderRadius:10,marginTop:verticalScale(7)}}></View>
                    </TouchableOpacity>)
                }
            </ScrollView>
        </View>
        )
    }

    return(
        <View style={styles.body}>
            <Image 
                style={{width:horizontalScale(390),height:verticalScale(1200),alignSelf:'center',position:'absolute',zIndex:0}}
                source={require('../../assets/images/paper.png')}
            />
            <View style={{width:horizontalScale(2),height:verticalScale(500),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(10),marginTop:verticalScale(190),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(30),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(10),marginTop:verticalScale(700),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(15),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(10),marginTop:verticalScale(740),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(5),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(10),marginTop:verticalScale(760),borderRadius:15}}></View>
            {data.length > 0 ?
                <>
                    <FlatList 
                        data={data}
                        ListHeaderComponent={headerItem}
                        renderItem={renderItem}
                        keyExtractor={(item)=>item.product_id.toString()}
                        numColumns={1}
                    />
                </>
                :<>
                    <FlatList 
                        data={data}
                        ListHeaderComponent={headerItem}
                        renderItem={renderItem}
                        keyExtractor={(item)=>item.product_id.toString()}
                        numColumns={1}
                    />
                    <Text>Hiç Ürün Bulunmadı</Text>
                </>
            }
            <View style={{width:horizontalScale(2),height:verticalScale(500),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(190),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(30),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(700),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(15),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(740),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(5),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(760),borderRadius:15}}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'#161616',
    },
    container:{
        paddingVertical:verticalScale(30),
    },
    logo:{
        width:horizontalScale(60),
        height:verticalScale(80),
        borderRadius:5
    },
    cart:{
        width:horizontalScale(30),
        height:verticalScale(38)
    },
    topRow:{
        flexDirection:'row',
        paddingHorizontal:horizontalScale(30),
        justifyContent:'space-between',
        marginBottom:verticalScale(30)
    },
    cartButton:{
    },
    cartCountRow:{
        width:horizontalScale(20),
        height:verticalScale(27),
        backgroundColor:'#161616',
        borderColor:'white',
        borderWidth:1,
        borderRadius:999,
        position:'absolute',
        marginTop:verticalScale(25),
        marginLeft:horizontalScale(20),
        alignItems:'center',
        justifyContent:'center'
    },
    countText:{
        fontSize:20,
        fontFamily:'Impact-Stone',
        color:'white'
    },
    topImage:{
        width:horizontalScale(320),
        height:verticalScale(200),
        borderRadius:10,
        marginBottom:verticalScale(25),
        marginLeft:horizontalScale(30),
        marginRight:horizontalScale(25)
    }
})

export default Home;