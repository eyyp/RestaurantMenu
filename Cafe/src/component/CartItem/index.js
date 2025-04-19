import { View, TouchableOpacity, Text, Image, StyleSheet, ActivityIndicator} from "react-native";
import { useEffect, useState} from "react";
import { Find } from "../../services/methods/product";
import { GetImage } from "../../services/methods/product";
import { horizontalScale, verticalScale } from "../../config";
import { ItemProperty } from "../../services/methods/cart";
import PropertyText from "../PropertyText";
const CartItem = (props) =>{

    const [data,setData] = useState();
    const [imageUri,setImageUri] = useState();
    const [propertys,setPropertys] = useState([]);

    useEffect(()=>{
        Find(props.item.product_id,(err,data)=>{
            if(data){
                setData(data.data);
            }
        })
        GetImage(props.item.product_id,"0",(err,data)=>{
            if(data){
                setImageUri(data.data.image)
            }
        }),
        ItemProperty(props.item.item_id,(err,data)=>{
            if(data){
                setPropertys(data.data);
            }
        })
    },[])

    return( 
        <>
            <View style={styles.button}>
                {imageUri ? 
                    <Image 
                        style={styles.image}
                        source={{uri: `data:image/png;base64,${imageUri}`}}
                    />
                    : <View style={{backgroundColor:'black',width:horizontalScale(50),height:verticalScale(74),borderRadius:999,marginBottom:verticalScale(15)}}>
                        <ActivityIndicator 
                            style={{marginTop:verticalScale(25)}}
                            color="white"
                            size="large"
                        />
                    </View> 
                }
                <View style={{flexDirection:'row',justifyContent:'space-between',width:horizontalScale(240),paddingTop:verticalScale(5)}}>
                    <View style={{marginLeft:horizontalScale(10)}}>
                        <Text style={{fontSize:32,color:'black',fontFamily:'Impact-Stone'}}>{data?.title}</Text>
                        {propertys.map((item,index)=>
                            <PropertyText key={index} item={item}/>
                        )}
                        <Text style={{fontSize:24,color:'black',fontFamily:'Impact-Stone',marginLeft:horizontalScale(150)}}>{data?.price}₺</Text>
                        <Image 
                            style={{width:horizontalScale(40),height:verticalScale(10),marginLeft:horizontalScale(140)}}
                            source={require('../../assets/images/line.png')}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={()=>props.delete(props.item.item_id)}>
                        <Image 
                            style={{width:horizontalScale(20),height:verticalScale(30)}}
                            source={require('../../assets/images/trash.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{width:horizontalScale(350),height:verticalScale(3),backgroundColor:'black',borderRadius:15}}></View>
        </>
    )
}

const styles = StyleSheet.create({
    button:{
        marginTop:verticalScale(10),
        flexDirection:'row',
    },
    image:{
        width:horizontalScale(75),
        height:verticalScale(74),
        borderRadius:15,
        marginBottom:verticalScale(15)
    },
})

export default CartItem;