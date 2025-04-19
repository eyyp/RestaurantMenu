import { View,Text, ScrollView, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import TextFieldForm from "../../component/TextFieldForm";
import {colors, horizontalScale, verticalScale, setToken} from '../../config/index'
import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { UserCheck } from "../../store/actions/user/user_check";
import BootSplash from "react-native-bootsplash";

const Login = (props)=>{

    const [user_name, setUserName] = useState("burger")
    const [password, setPassword] = useState("burgerdemo")
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
        <View style={styles.content}>
            <Image 
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
            />
            <Image 
                style={{width:horizontalScale(115),height:verticalScale(120),position:'absolute',marginTop:verticalScale(70)}}
                source={require("../../assets/images/hamburger.png")}
            />
            <Image 
                style={{width:horizontalScale(100),height:verticalScale(100),position:'absolute',marginLeft:horizontalScale(280)}}
                source={require("../../assets/images/Pata.png")}
            />
            <Image 
                style={{width:horizontalScale(20),height:verticalScale(26),position:'absolute',marginTop:verticalScale(290),marginLeft:horizontalScale(270)}}
                source={require("../../assets/images/hamburger2.png")}
            />
            <Image 
                style={{width:horizontalScale(15),height:verticalScale(25),position:'absolute',marginTop:verticalScale(290),marginLeft:horizontalScale(292)}}
                source={require("../../assets/images/pato2.png")}
            />
            <Image 
                style={{width:horizontalScale(10),height:verticalScale(50),position:'absolute',marginTop:verticalScale(264),marginLeft:horizontalScale(315)}}
                source={require("../../assets/images/cola.png")}
            />
            <Image 
                style={{width:horizontalScale(270),height:verticalScale(150),position:'absolute',marginTop:verticalScale(650),marginLeft:horizontalScale(80)}}
                source={require("../../assets/images/taco.png")}
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
                {userStatus === 'basic' ?
                    <Text style={styles.buttonText}>GİRİŞ YAP</Text>
                    :<ActivityIndicator 
                        color="white"
                        size="large"
                    />
                }
            </TouchableOpacity>
        </View>  
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
        fontFamily: 'EraserDust',
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
        backgroundColor:'#161616',
        borderColor:'#FFF200',
        borderWidth:5,
        width:horizontalScale(305),
        height:verticalScale(60),
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center' 
    },
    buttonText:{
        color:'white',
        fontFamily:'zai_SeagullFelt-tipPen',
        fontSize:30,
        lineHeight:35,
        alignSelf:'center'
    },
    bottomRow:{
        marginTop:'1%'
    },
    logo:{
        width:horizontalScale(100),
        height:verticalScale(150),
        alignSelf:'center',
        borderRadius:15
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