import { View, TouchableOpacity, Text, Image, StyleSheet,ActivityIndicator} from "react-native";
import { useEffect, useState} from "react";
import { Find } from "../../services/methods/product";
import { GetImage } from "../../services/methods/product";
import { horizontalScale, verticalScale } from "../../config";
const ProductCard = (props) =>{

    const [data,setData] = useState();
    const [imageUri,setImageUri] = useState();

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
        })
    },[])

    return( 
        <TouchableOpacity style={styles.button} onPress={()=>props.navigation()}>
            {imageUri ? 
                <Image 
                    style={styles.image}
                    source={{uri: `data:image/png;base64,${imageUri}`}}
                />
                :   <View style={{backgroundColor:'black',width:horizontalScale(100),height:verticalScale(146),borderRadius:999}}>
                        <ActivityIndicator 
                            style={{marginTop:verticalScale(50)}}
                            color="white"
                            size="large"
                        />
                    </View> 
            }
            <View style={{marginTop:verticalScale(20),width:horizontalScale(182)}}>
                <View style={{alignItems:'center',width:horizontalScale(182)}}>
                    <Text style={{fontSize:30,fontFamily:'Impact-Stone',color:'black'}}>{data?.title}</Text>
                    <View style={{width:horizontalScale(150),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginBottom:verticalScale(10)}}></View>
                </View>
                <Text style={{fontSize:22,fontFamily:'Impact-Stone',textAlign:'center',color:'black'}}>{data?.exp}</Text>
                <Text style={{fontSize:26,fontFamily:'Impact-Stone',alignSelf:'flex-end',color:'black'}}>{data?.price}₺</Text>
                <Image 
                    style={{width:horizontalScale(35),height:verticalScale(10),marginLeft:horizontalScale(155)}}
                    source={require('../../assets/images/line.png')}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        flexDirection:'row',
        marginBottom:verticalScale(10),
        width:horizontalScale(320),
        height:verticalScale(210),
        paddingHorizontal:horizontalScale(2),
        paddingVertical:verticalScale(3),
        marginLeft:horizontalScale(15),
        zIndex:1,
        position: 'relative',
        paddingBottom:verticalScale(15)
    },
    image:{
        width:horizontalScale(150),
        height:verticalScale(146),
        borderRadius:15,
        marginBottom:verticalScale(15),
    },

})

export default ProductCard;