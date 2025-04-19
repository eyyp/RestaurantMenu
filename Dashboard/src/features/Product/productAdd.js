import { View,Text, ScrollView, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import TextField from "../../component/TextField";
import {colors, horizontalScale, verticalScale, setToken} from '../../config/index'
import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import PropertyAddCart from "../../component/PropertyAddCart";
import CategorySelectCard from "../../component/CategorySelectCard";
import { Create } from "../../services/methods/product";
const ProductAdd = (props)=>{

    const [title, setTitle] = useState("");
    const [errorTitle, setErrorTitle] = useState();

    const [exp, setExp] = useState("");
    const [expError, setExpError] = useState();

    const [price, setPrice] = useState("");
    const [priceError,setPriceError] = useState();

    const [summary, setSummary] = useState("");
    const [summaryError, setSummaryError] = useState();

    const [video_url, setVideoUrl] = useState("");
    const [video_urlError, setVideoUrlError] = useState();

    const [category_id, setCategoryId] = useState("");
    const [categoryError, setCategoryIdError] = useState();
    const [property, setProperty] = useState([]);

    const [faddback, setFaddback] = useState("");
    const [faddbackType, setFaddbackType] = useState("success");

    const reducer = useSelector(state =>state.UserCheck)
    const { userCheck, userStatus} = reducer;

    const CreateRequest = ()=>{
        if(title === "" || title === null || title === undefined){
            setErrorTitle("Başlık alanını doldurulmak zorunludur.");
        }
        else if(exp === "" || exp === null || exp === undefined) {
            setExpError("Kısa açıklama alanını doldurulmak zorunludur.");
        }
        else if(price === "" || price === null || price === undefined){
            setPriceError("Fiyat alanını doldurulmak zorunludur.");
        }
        else if(summary === "" || summary === null || summary === undefined){
            setSummaryError("Uzun açıklama alanını doldurmak zorunludur.");
        }
        else if(video_url === "" || video_url === null || video_url === undefined){
            setVideoUrlError("Video Url alanını doldurmak zorunludur.");
        }
        else if(category_id.length < 0){
            setCategoryIdError("Lütfen bir kategori seçin");
        }
        else 
        {
            Create(title,exp,price,summary,userCheck.restaurant_id,video_url,category_id,property,(err,data)=>{
                if(data){
                    setFaddbackType("success");
                    setFaddback("Ürün eklendi");
                    setErrorTitle(null);
                    setExpError(null);
                    setPriceError(null);
                    setSummaryError(null);
                    setVideoUrlError(null);
                    setCategoryIdError(null);
                }
                else{
                    setFaddbackType("error");
                    setFaddback("Ürün eklenirken bir hata oluştu");
                }
            })
        }
    }


    return(
        <ScrollView style={styles.content}>
            <Text style={[styles.faddbackText,{color:faddbackType === "success" ? 'green' :'red'}]}>{faddback}</Text>
            <Text>Ürün eklendi</Text>
            <TextField
                style={styles.textField}
                value={title}
                label="Ürün Başlığı"
                errorText={errorTitle}
                onChangeText={(text) => setTitle(text)}
            />
            <TextField
                style={styles.textField}
                value={exp}
                label="Kısa Açıklama"
                errorText={expError}
                onChangeText={(text) => setExp(text)}
            />
            <TextField
                style={styles.textField}
                value={price}
                label="Fiyat"
                errorText={priceError}
                onChangeText={(text) => setPrice(text)}
            />
            <TextField
                style={styles.textField}
                value={summary}
                label="Uzun Açıklama"
                errorText={summaryError}
                onChangeText={(text) => setSummary(text)}
            />
            <TextField
                style={styles.textField}
                value={video_url}
                label="Video url"
                errorText={summaryError}
                onChangeText={(text) => setVideoUrl(text)}
            />
            <PropertyAddCart setPropertys={(data)=>setProperty(data)}/>
            <CategorySelectCard setCategory={(id)=>setCategoryId(id)}/>
            {categoryError && <Text>{categoryError}</Text>}
            <TouchableOpacity style={styles.button} onPress={()=>CreateRequest()}>
                <Text style={styles.buttonText}>Kayıt Et</Text>
            </TouchableOpacity>
        </ScrollView>  
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

export default ProductAdd;