import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderItem from "../../component/OrderItem";
import { horizontalScale, verticalScale } from "../../config";
import { Delete } from "../../services/methods/cart";
const Order = (props)=>{

    const [product,setProduct] = useState([]);

    const userReducer = useSelector(state=>state.UserCheck);
    const {userCheck, userStatus} = userReducer;

    const cartReducer = useSelector(state=>state.Cart_id);
    const {cart_id} = cartReducer;

    const tableReducer = useSelector(state=>state.Table_id);
    const {table_id} = tableReducer;

    useEffect(()=>{
        setProduct(props.route.params.data)
        TablesNavigation();
    },[])

    const TablesNavigation = () =>{
        Delete(cart_id,(err,data)=>{
            if(data){
                
            }
        })
    }

    return(
        <View style={styles.body}>
            <Image 
                style={{width:horizontalScale(390),height:verticalScale(1200),alignSelf:'center',position:'absolute',zIndex:0}}
                source={require('../../assets/images/paper.png')}
            />
            <View style={{width:horizontalScale(2),height:verticalScale(30),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(165),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(15),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(140),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(5),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(130),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(480),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(210),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(30),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(700),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(15),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(740),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(5),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(760),borderRadius:15,zIndex:999}}></View>
            <TouchableOpacity style={styles.backButton} onPress={()=>props.navigation.navigate("Login")}>
                <Image 
                    style={styles.arrowImage}
                    source={require("../../assets/images/back-arrow.png")}
                />
            </TouchableOpacity>
            <View style={{flexDirection:'row',paddingHorizontal:horizontalScale(15),alignSelf:'center',marginTop:verticalScale(20)}}>
                <View style={{width:horizontalScale(5),height:verticalScale(3),backgroundColor:'black',borderRadius:15}}></View>
                <View style={{width:horizontalScale(15),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
                <View style={{width:horizontalScale(30),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(7)}}></View>
                <View style={{width:horizontalScale(200),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(10)}}></View>
                <View style={{width:horizontalScale(30),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(7)}}></View>
                <View style={{width:horizontalScale(15),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
                <View style={{width:horizontalScale(5),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
            </View>
            <Image 
                style={{width:horizontalScale(100),height:verticalScale(140), alignSelf:'center',marginVertical:verticalScale(30)}}
                source={require("../../assets/images/accept.png")}
            />
            <Text style={{fontSize:30,color:'black',alignSelf:'center',fontFamily:'Impact-Stone'}}>Siparişinizi Aldık!</Text>
            <Text style={{fontSize:20,color:'black',alignSelf:'center',marginTop:verticalScale(10),fontFamily:'Impact-Stone'}}>Tableti garsona verebilirsiniz.</Text>
            <Text style={{fontSize:20,color:'black',fontFamily:'Impact-Stone',marginTop:verticalScale(50)}}>Sipariş Detayları:</Text>
            <ScrollView>
                {product.map((item,index)=> <OrderItem key={index} item={item} /> )}
            </ScrollView>
            <Text style={{fontSize:20,color:'black',fontFamily:'Impact-Stone',marginBottom:verticalScale(10),marginLeft:horizontalScale(290)}}>{props.route.params.total} ₺</Text>
            <Text style={{fontSize:20,color:'black',fontFamily:'Impact-Stone',marginBottom:verticalScale(10)}}>Sipariş Notu:</Text>
            <Text style={{minWidth:horizontalScale(350),minHeight:verticalScale(100),alignSelf:'center',borderRadius:20,paddingHorizontal:horizontalScale(15),paddingVertical:verticalScale(10),fontSize:18,color:'black'}}>{props.route.params.notes}</Text>
            <View style={{width:horizontalScale(2),height:verticalScale(30),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(165),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(15),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(140),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(5),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(130),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(480),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(210),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(30),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(700),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(15),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(740),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(5),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(760),borderRadius:15}}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        backgroundColor:'white',
        flex:1,
        paddingHorizontal:horizontalScale(25)
    },
    textField:{

    },
    backButton:{
        marginTop:verticalScale(15)
    },
    arrowImage:{
        width:horizontalScale(37),
        height:verticalScale(50)
    }
})

export default Order;