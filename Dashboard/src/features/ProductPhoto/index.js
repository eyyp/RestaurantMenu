import { View,Text, ScrollView, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import {colors, horizontalScale, verticalScale, setToken} from '../../config/index'
import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import ProductSelectCard from "../../component/ProductSelectCard";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { SetImage } from "../../services/methods/product";

const ProductPhotoAdd = (props)=>{
    
    const [product_id, setProductId] = useState();
    const [photo,setPhoto] = useState();
    const [faddback, setFaddback] = useState("");
    const [faddbackType, setFaddbackType] = useState("success");
    const [status,setStatus] = useState("default");

    const reducer = useSelector(state =>state.UserCheck)
    const { userCheck, userStatus} = reducer;

    handleChoosePhoto = () => {
        const options = {
          noData: true,
        };
        launchImageLibrary(options, (response) => {
          if (response?.assets[0].uri) {
            setPhoto(response);
          }
        });
    };

    const SetImageRequest = ()=>{
        if(photo !== undefined || photo === null){
            const formData = new FormData();
            formData.append('image', {
                uri: photo.assets[0].uri,
                type: photo.assets[0].type, 
                name: photo.assets[0].fileName, 
            });
    
            SetImage(product_id,formData,(err,data)=>{
                if(data){
                    setFaddbackType("success");
                    setFaddback("Ürün fotoğrafı eklendi");
                    setPhoto(undefined);
                    setProductId(undefined);
                }
                else{
                    setFaddbackType("error");
                    setFaddback("Ürün fotoğrafı eklenirken hata oluştu");
                    setPhoto(undefined);
                    setProductId(undefined);
                }
            })
        }
        else{
            setFaddbackType("error");
            setFaddback("Ürün fotoğrafı eklenirken hata oluştu");
            setPhoto(undefined);
            setProductId(undefined);
        }
    }


    return(
        <View style={styles.content}>
            
            <Text>Ürün Fotoğrafı Ekle</Text>
            <ProductSelectCard setProduct={(id)=>setProductId(id)}/>
            {product_id === undefined 
                ? <Text>Lütfen Önce Ürünü seç</Text>
                : <TouchableOpacity onPress={()=>handleChoosePhoto()}>
                    <Text>Fotoğraf seç</Text>
                  </TouchableOpacity>
            }
            <Image 
                style={styles.image}
                source={photo ? { uri: photo.assets[0].uri} : require('../../assets/images/examplePhoto.png')}
            />
            <Text style={[styles.faddbackText,{color:faddbackType === "success" ? 'green' :'red'}]}>{faddback}</Text>
            <TouchableOpacity style={styles.button} onPress={()=>SetImageRequest()}>
                {status === "default" 
                    ? <Text style={styles.buttonText}>Kayıt Et</Text> 
                    : <ActivityIndicator 
                            color="white"
                        />
                }
                
            </TouchableOpacity>
        </View>  
    );   
}

const styles = StyleSheet.create({

    content: {
      paddingVertical: verticalScale(20),
      paddingHorizontal: horizontalScale(35),
      flex:1,
      backgroundColor:'white'
    },
    title: {
      fontFamily: 'Gilroy-Bold',
      color: 'black',
      fontSize: 32,
      marginLeft:horizontalScale(60)
    },
    signUpButton:{
        flexDirection:'row',
        marginTop:'30%',
        alignSelf:'center'
    },
    signText:{
        fontSize:16,
        fontFamily:'Gilroy-Medium',
        color:'black'
    },
    image:{
        width:'80%',
        height:'40%',
        alignSelf:'center',
        borderRadius:4
    },
    signText2:{
        color:colors.primary,
        fontSize:16,
        marginLeft:'2%',
        fontFamily:'Gilroy-Medium'
    },
    lower: {
      fontFamily: 'Gilroy-Bold',
      fontSize: 14,
      alignSelf:'center',
      marginBottom:verticalScale(110),
    },
    textField: {
      marginBottom: '5%',
    },
    backArrow:{
        width:horizontalScale(22),
        height:verticalScale(20),
        marginBottom:'5%'
    },
    line:{
        width:'100%',
        height:'0.1%',
        backgroundColor:'gray'
    },
    button:{
        backgroundColor:colors.primary,
        width:horizontalScale(305),
        height:verticalScale(50),
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:verticalScale(15)
    },
    buttonText:{
        color:'white',
        fontFamily:'Gilroy-Bold',
        fontSize:16,
        lineHeight:16,
        alignSelf:'center'
    },
    bottomRow:{
        marginTop:'1%'
    },
    logo:{
        width:'27%',
        height:'20%',
        marginLeft:'35%'
    },
    check:{
        width:horizontalScale(20),
        height:verticalScale(20),
    },
    checkButton:{
        marginTop:verticalScale(10),
        flexDirection:'row',
    },
    checkText:{
        color:'black',
        fontFamily:'Gilroy-Medium',
        fontSize:16,
        lineHeight:16,
        marginTop:verticalScale(4),
        marginLeft:horizontalScale(5),
        marginRight:horizontalScale(15)
    },
    box:{
        width:horizontalScale(18),
        height:verticalScale(18),
        borderWidth:1,
        borderColor:'#B8B8B8',
        backgroundColor:'white',
        alignSelf:'center',
        borderRadius:4
    },
    forgotButton:{
        alignSelf:'flex-end', 
    },
    forgotText:{
        fontSize:16,
        lineHeight:16,
        color:'black'
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    faddbackText:{
        fontSize:16,
        fontWeight:'600'
    }
  })

export default ProductPhotoAdd;