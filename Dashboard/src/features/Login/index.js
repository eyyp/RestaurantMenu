import { View,Text, ScrollView, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import TextField from "../../component/TextField";
import {colors, horizontalScale, verticalScale, setToken} from '../../config/index'
import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { UserCheck } from "../../store/actions/user/user_check";

const Login = (props)=>{

    const [user_name, setUserName] = useState("artukbeyyönetim")
    const [password, setPassword] = useState("Artukbey")
    const [error, setError] = useState(null)
    const [security, setSecurity] = useState(true);

    const reducer = useSelector(state =>state.UserCheck)
    const {userCheck,userStatus} = reducer;
    const dispatch = useDispatch()

    const login = async ()=>{
        
        dispatch(UserCheck(user_name,password));
    }

    useEffect(()=>{
        if(userStatus == 'response'){
            if(userCheck.status != 'dont'){
                if(userCheck.user_id){
                    props.navigation.navigate("DrawerNavigator")
                }
                else{
                    setError('Kullanıcı adı veya şifreniz hatalı')
                }
            }
            else{
                setError('Kullanıcı adı veya şifreniz hatalı')
            }
        }
    },[userCheck])

    return(
        <View style={styles.content}>
           
            <Image 
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
            />
            <Text style={styles.title}>Menü Yönetim Paneli</Text>
            <Text style={styles.lower}></Text>
            <TextField
                style={styles.textField}
                value={user_name}
                label="Kullanıcı Adı"
                errorText={error}
                onChangeText={(text) => setUserName(text)}
            />
            <TextField
                style={styles.textField}
                value={password}
                label="Şifre"
                errorText={error}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={security}
            />
            <TouchableOpacity style={styles.button} onPress={()=>login()}>
                {userStatus === 'onLoader' ?
                    <ActivityIndicator 
                        color="white"
                        size="large"
                    />
                    : <Text style={styles.buttonText}>Giriş Yap</Text>
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
        alignItems:'center' 
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
    }
  })

export default Login;