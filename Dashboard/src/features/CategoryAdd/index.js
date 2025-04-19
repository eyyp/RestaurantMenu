import { View,Text, ScrollView, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import TextField from "../../component/TextField";
import {colors, horizontalScale, verticalScale } from '../../config/index'
import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Create } from "../../services/methods/category";

const CategoryAdd = (props)=>{

    const [title, setTitle] = useState("");
    const [errorTitle, setErrorTitle] = useState();

    const [faddback, setFaddback] = useState("");
    const [faddbackType, setFaddbackType] = useState("success");

    const reducer = useSelector(state =>state.UserCheck);
    const { userCheck, userStatus} = reducer;

    const CreateRequest = ()=>{
        if(title === "" || title === null || title === undefined){
            setErrorTitle("Lütfen bir isim giriniz");
        }
        else{
            Create(userCheck.restaurant_id,title,(err,data)=>{
                if(data){
                    setFaddback("Kayıt işlemi başarı ile gerçekleştirildi");
                    setFaddbackType("success");
                    console.log(data.data);
                }
                else{
                    setFaddback("Kayıt işlemi başarı ile gerçekleştirildi");
                    setFaddbackType("error");
                }
            })
        }
    }

    return(
        <View style={styles.content}>
            <Text style={[styles.faddbackText,{color:faddbackType === "success" ? 'green' :'red'}]}>{faddback}</Text>
            <Text>Kategori Ekle</Text>
            <TextField
                style={styles.textField} 
                value={title}
                label="Kategori İsmi"
                errorText={errorTitle}
                onChangeText={(text) => setTitle(text)}
            />
            <TouchableOpacity style={styles.button} onPress={()=>CreateRequest()}>
                <Text style={styles.buttonText}>Kayıt Et</Text>
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
        width:horizontalScale(15),
        height:verticalScale(18),
        borderWidth:1,
        borderColor:'#B8B8B8',
        backgroundColor:'white',
        alignSelf:'center',
        borderRadius:4
    }
  })

export default CategoryAdd;