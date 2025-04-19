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
        console.log("props:",props.route.params.data);
    },[])

    const TablesNavigation = () =>{
        Delete(cart_id,(err,data)=>{
            if(data){
                
            }
        })
    }

    return(
        <View style={styles.body}>
            <TouchableOpacity style={styles.backButton} onPress={()=>props.navigation.navigate("Tables")}>
                <Image 
                    style={styles.arrowImage}
                    source={require("../../assets/images/arrow.png")}
                />
            </TouchableOpacity>
            <Image 
                style={{width:horizontalScale(100),height:verticalScale(140), alignSelf:'center',marginBottom:verticalScale(30)}}
                source={require("../../assets/images/accept.png")}
            />
            <Text style={{fontSize:30,color:'#F4E6CD',alignSelf:'center'}}>Siparişinizi Aldık!</Text>
            <Text style={{fontSize:20,color:'#F4E6CD',alignSelf:'center',marginTop:verticalScale(10)}}>Tableti garsona verebilirsiniz.</Text>
            <Text style={{fontSize:20,color:'#F4E6CD',fontWeight:'700',marginTop:verticalScale(50)}}>Sipariş Detayları</Text>
            <ScrollView>
                {product.map((item,index)=> <OrderItem key={index} item={item} /> )}
            </ScrollView>
            <Text style={{fontSize:20,color:'#FE9870',fontWeight:'700',marginBottom:verticalScale(10),marginLeft:horizontalScale(290)}}>{props.route.params.total} ₺</Text>
            <Text style={{fontSize:20,color:'#F4E6CD',fontWeight:'700',marginBottom:verticalScale(10)}}>Sipariş Notu:</Text>
            <Text style={{backgroundColor:'#D1D2D7',opacity:0.2,minWidth:horizontalScale(350),minHeight:verticalScale(100),alignSelf:'center',borderRadius:20,paddingHorizontal:horizontalScale(15),paddingVertical:verticalScale(10),fontSize:18,fontWeight:'600',color:'#F4E6CD'}}>{props.route.params.notes}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        backgroundColor:'#341B0E',
        flex:1,
        paddingVertical:verticalScale(50),
        paddingHorizontal:horizontalScale(25)
    },
    textField:{

    },
    backButton:{
        backgroundColor:'#F4E6CD',
        borderRadius:10,
        width:horizontalScale(30),
        height:verticalScale(40),
        position:'absolute', 
        marginLeft:horizontalScale(20),
        marginTop:verticalScale(20),
        alignItems:'center',
        justifyContent:'center'
    },
    arrowImage:{
        width:horizontalScale(15),
        height:verticalScale(20)
    }
})

export default Order;