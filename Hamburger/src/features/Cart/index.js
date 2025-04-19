import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from "react-native";
import { User } from "../../services/methods/cart";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../../component/CartItem";
import { horizontalScale, verticalScale } from "../../config";
import { DeleteItem } from "../../services/methods/cart";
import { Create } from "../../services/methods/order";
import { Total } from "../../services/methods/cart";
import { Find } from "../../services/methods/tables";
import TextField from "../../component/TextField";

const Cart = (props)=>{

    const [data,setData] = useState([]);
    const [notes,setNotes] = useState("");
    const [total,setTotal] = useState(0);
    const [error,setError] = useState();
    const [tableTitle,setTableTitle] = useState();

    const userReducer = useSelector(state=>state.UserCheck);
    const {userCheck, userStatus} = userReducer;

    const cartReducer = useSelector(state=>state.Cart_id);
    const {cart_id} = cartReducer;

    const tableReducer = useSelector(state=>state.Table_id);
    const {table_id} = tableReducer;

    useEffect(()=>{
        User(cart_id,(err,data)=>{
            if(data){
                setData(data.data)
            }
        })
        TotalRequest();
    },[])

    useEffect(()=>{
        Find(table_id,(err,data)=>{
            if(data){
                setTableTitle(data.data.title)
            }
        })
    },[table_id])

    const TotalRequest = () =>{
        Total(cart_id,(err,data)=>{
            if(data){
                setTotal(parseInt(data.data.total, 10));
            }
        })
    }

    const CreateRequest = () =>{
        Create(userCheck.user_id,cart_id,userCheck.restaurant_id,table_id,total,data.length,notes,(err,newData)=>{
            if(newData){
                props.navigation.navigate("Order",{total:total,data:data,notes:notes})
            }
        })
    }

    const DeleteItemRequest = (cart_item_id) =>{
        if(cart_item_id !== null){
            DeleteItem(cart_item_id,(err,deleteData)=>{
                if(deleteData){
                    const tempData = data.filter(item => item.item_id !== cart_item_id);
                    setData(tempData);
                    TotalRequest();
                }
            });
        }
    }

    return(
        <View style={styles.body}>
            <View style={{width:horizontalScale(2),height:verticalScale(580),backgroundColor:'#FFF200',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(110),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(30),backgroundColor:'#FFF200',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(700),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(15),backgroundColor:'#FFF200',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(740),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(5),backgroundColor:'#FFF200',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(760),borderRadius:15,zIndex:999}}></View>
            <View style={{flexDirection:'row',marginBottom:verticalScale(20),height:verticalScale(70)}}>
                <TouchableOpacity style={styles.backButton} onPress={()=>props.navigation.goBack()}>
                    <Image 
                        style={styles.arrowImage}
                        source={require("../../assets/images/back-arrow.png")}
                    />
                </TouchableOpacity>
                <Text style={{fontSize:26,color:'white', fontFamily:'chawp',marginLeft: horizontalScale(100),marginTop:verticalScale(30)}}>{tableTitle !== undefined ? tableTitle :"Masa Numarası"}</Text>
            </View>
            <View style={{flexDirection:'row',paddingHorizontal:horizontalScale(15),alignSelf:'center',marginTop:verticalScale(20)}}>
                <View style={{width:horizontalScale(5),height:verticalScale(3),backgroundColor:'yellow',borderRadius:15}}></View>
                <View style={{width:horizontalScale(15),height:verticalScale(3),backgroundColor:'yellow',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
                <View style={{width:horizontalScale(30),height:verticalScale(3),backgroundColor:'yellow',borderRadius:15,marginLeft:horizontalScale(7)}}></View>
                <View style={{width:horizontalScale(200),height:verticalScale(3),backgroundColor:'yellow',borderRadius:15,marginLeft:horizontalScale(10)}}></View>
                <View style={{width:horizontalScale(30),height:verticalScale(3),backgroundColor:'yellow',borderRadius:15,marginLeft:horizontalScale(7)}}></View>
                <View style={{width:horizontalScale(15),height:verticalScale(3),backgroundColor:'yellow',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
                <View style={{width:horizontalScale(5),height:verticalScale(3),backgroundColor:'yellow',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
            </View>
            <View style={{backgroundColor:'#161616', paddingHorizontal:horizontalScale(25),paddingTop:verticalScale(20),paddingBottom:verticalScale(30),height:verticalScale(550)}}>
                <ScrollView>
                    {data.map((item,index)=>
                        <CartItem key={index} item={item} delete={(cart_item_id)=>DeleteItemRequest(cart_item_id)}/>
                    )}
                </ScrollView>
                <TextField
                    style={styles.textField}
                    value={notes}
                    multiline={true}
                    label="Sipariş Notu"
                    color="#341B0E"
                    errorText={error}
                    onChangeText={(text) => setNotes(text)}
                />
                <Image 
                    style={{width:horizontalScale(13),height:verticalScale(18),position:'absolute',marginTop:verticalScale(427),marginLeft:horizontalScale(329)}}
                    source={require("../../assets/images/edit.png")}
                />
            </View>
            <Text style={{fontSize:22,color:'white', fontFamily:'CoalhandLuke TRIAL',marginLeft: horizontalScale(140),marginTop:verticalScale(25)}}>Toplam Tutar=      {total} ₺</Text>
            <TouchableOpacity style={{backgroundColor:'#161616',borderWidth:1,borderColor:'yellow',width:horizontalScale(300),height:verticalScale(50),alignItems:'center',justifyContent:'center',alignSelf:'center',marginTop:verticalScale(10),borderRadius:10}} onPress={()=>CreateRequest()}>
                <Text style={{fontSize:24,color:'white',fontFamily:'chawp'}}>İşlemi Tamamla</Text>
            </TouchableOpacity>
            <View style={{width:horizontalScale(2),height:verticalScale(580),backgroundColor:'#FFF200',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(110),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(30),backgroundColor:'#FFF200',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(700),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(15),backgroundColor:'#FFF200',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(740),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(5),backgroundColor:'#FFF200',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(760),borderRadius:15}}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        backgroundColor:'#161616',
        flex:1
    },
    textField:{
        marginTop:verticalScale(20),
        height:verticalScale(100),
        backgroundColor:'#161616',
        borderColor:'white',
        borderWidth:1,
        borderRadius:5,
        opacity:0.5
    },
    backButton:{
        width:horizontalScale(30),
        height:verticalScale(40),
        marginLeft:horizontalScale(20),
        marginTop:verticalScale(20),
        alignItems:'center',
        justifyContent:'center'
    },
    arrowImage:{
        width:horizontalScale(45),
        height:verticalScale(45)
    }
})

export default Cart;