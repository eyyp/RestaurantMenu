import { View,Text, ScrollView, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import TextFieldForm from "../../component/TextFieldForm";
import {colors, horizontalScale, verticalScale, setToken} from '../../config/index'
import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { UserCheck } from "../../store/actions/user/user_check";
import BootSplash from "react-native-bootsplash";

const Login = (props)=>{

    const [user_name, setUserName] = useState("artukbey")
    const [password, setPassword] = useState("artukbey1910")
    const [error, setError] = useState(null)
    const [security, setSecurity] = useState(true);

    const reducer = useSelector(state =>state.UserCheck)
    const {userCheck,userStatus} = reducer;
    const dispatch = useDispatch()

    const login = async ()=>{
        dispatch(UserCheck(user_name,password));
    }

    useEffect(() => {
        const init = async () => {
          // …do multiple sync or async tasks
        };
    
        init().finally(async () => {
          await BootSplash.hide({ fade: true });
        });
      }, []);

    useEffect(()=>{
        if(userStatus == 'response'){
            if(userCheck.status != 'dont'){
                if(userCheck.user_id){
                    props.navigation.navigate("Tables")
                }
                else{
                    setError('Kullanıcı adı veya şifreniz hatalı');
                }
            }
            else{
                setError('Kullanıcı adı veya şifreniz hatalı');
            }
        }
    },[userCheck])

    return(
        <>
            <View style={styles.content}>
                <Image 
                    style={{width:horizontalScale(390),height:verticalScale(1200),alignSelf:'center',position:'absolute',zIndex:0}}
                    source={require('../../assets/images/paper.png')}
                />
                <Image 
                    style={styles.logo}
                    source={require('../../assets/images/logo.png')}
                />
                <TextFieldForm
                    style={styles.textField}
                    value={user_name}
                    label="Kullanıcı Adı..."
                    errorText={error}
                    onChangeText={(text) => setUserName(text)}
                />
                <TextFieldForm
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
                            color="black"
                            size="large"
                        />
                        :<Text style={styles.buttonText}>Giriş Yap</Text>
                    }
                </TouchableOpacity>
            </View> 
            <Image 
                style={{width:horizontalScale(160),height:verticalScale(200)}}
                source={require('../../assets/images/cafe.png')}
            /> 
        </>
    );   
}

const styles = StyleSheet.create({

    content: {
        paddingTop: verticalScale(20),
        paddingHorizontal: horizontalScale(35),
        flex:1,
        backgroundColor:'#161616'
    },
    title: {
        fontFamily: 'Impact-Stone',
        color: '#F4E6CD',
        fontSize: 70,
        marginTop: verticalScale(20),
        alignSelf:'center',
        marginBottom:verticalScale(70)
    },
    signUpButton:{
        flexDirection:'row',
        marginTop:'30%',
        alignSelf:'center'
    },
    signText:{
        fontSize:16,
        fontFamily:'Impact-Stone',
        color:'black'
    },
    signText2:{
        color:colors.primary,
        fontSize:16,
        marginLeft:'2%',
        fontFamily:'Impact-Stone'
    },
    lower: {
        fontFamily: 'Impact-Stone',
        fontSize: 14,
        alignSelf:'center',
        marginBottom:verticalScale(110),
    },
    textField: {
        marginBottom:verticalScale(60)
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
        borderColor:'black',
        borderWidth:5,
        width:horizontalScale(305),
        height:verticalScale(60),
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center' 
    },
    buttonText:{
        color:'black',
        fontFamily:'Impact-Stone',
        fontSize:35,
        lineHeight:35,
        alignSelf:'center'
    },
    bottomRow:{
        marginTop:'1%'
    },
    logo:{
        width:horizontalScale(150),
        height:verticalScale(210),
        alignSelf:'center',
        borderRadius:15,
        marginBottom:verticalScale(80)
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
        fontFamily:'Impact-Stone',
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