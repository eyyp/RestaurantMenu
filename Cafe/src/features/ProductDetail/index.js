import { Text, View, TouchableOpacity, ScrollView, Image, StyleSheet, Modal,ActivityIndicator} from "react-native";
import { useEffect, useState, useCallback, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Find } from "../../services/methods/product";
import { GetImage } from "../../services/methods/product";
import { Type } from "../../services/methods/property";
import YoutubePlayer from "react-native-youtube-iframe";
import PropertyTypeCard from "../../component/PropertyTypeCard";
import { Add } from "../../services/methods/cart";
import { horizontalScale, verticalScale } from "../../config";

const ProductDetail = (props) =>{

    const [imageUri,setImageUri] = useState();
    const [page,setPage] = useState("0");
    const [pageCount, setPageCount] = useState();
    const [check, setCheck] = useState(false);
    const [count, setCount] = useState(0);
    const [loader, setLoader] = useState(false);

    const [visible, setVisible] = useState(false);

    const [types, setTypes] = useState([]);
    const [propertyData, setPropertyData] = useState([]);

    const userReducer = useSelector(state=>state.UserCheck);
    const {userCheck, userStatus} = userReducer;

    const cartReducer = useSelector(state=>state.Cart_id);
    const {cart_id} = cartReducer;

    useEffect(()=>{
        GetImage(props.route.params.product_id,page,(err,data)=>{
            if(data){
                setImageUri(data.data.image)
                setPageCount(parseInt(data.data.count));
            }
        })

        Type(userCheck.restaurant_id,(err,data)=>{
            if(data){
                setTypes(data.data)
            }
        })
    },[])

    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const NextImage = () =>{
        const intPage = parseInt(page) + 1;
        if(intPage < pageCount){
            setPage(intPage);
            GetImage(props.route.params.product_id,intPage,(err,data)=>{
                if(data){
                    setImageUri(data.data.image)
                }
            })
        }
    }

    const BackImage = () =>{
        const intPage = parseInt(page) - 1;
        if(intPage > -1){
            setPage(intPage);
            GetImage(props.route.params.product_id,intPage,(err,data)=>{
                if(data){
                    setImageUri(data.data.image)
                }
            })
        }
    }

    const AddCart = () =>{
        setLoader(true);
        Add(props.route.params.product_id,cart_id,propertyData,(err,data)=>{
            if(data){
                setLoader(false);
                props.navigation.navigate("Home")
            }
            else{
                console.log(err)
            }
        })
    }

    return(
        <View style={styles.body}>
            <Image 
                style={{width:horizontalScale(390),height:verticalScale(1200),alignSelf:'center',position:'absolute',zIndex:0}}
                source={require('../../assets/images/paper.png')}
            />
            <View style={{width:horizontalScale(2),height:verticalScale(30),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(165),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(15),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(140),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(5),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(130),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(480),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(210),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(30),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(700),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(15),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(740),borderRadius:15,zIndex:999}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(5),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(5),marginTop:verticalScale(760),borderRadius:15,zIndex:999}}></View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={()=>props.navigation.navigate("Home")}>
                    <Image 
                        style={styles.arrowImage}
                        source={require("../../assets/images/back-arrow.png")}
                    />
                </TouchableOpacity>
                <View style={{flexDirection:'row',paddingHorizontal:horizontalScale(15),alignSelf:'center',marginTop:verticalScale(20)}}>
                <View style={{width:horizontalScale(5),height:verticalScale(3),backgroundColor:'black',borderRadius:15}}></View>
                <View style={{width:horizontalScale(15),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
                <View style={{width:horizontalScale(30),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(7)}}></View>
                <View style={{width:horizontalScale(200),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(10)}}></View>
                <View style={{width:horizontalScale(30),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(7)}}></View>
                <View style={{width:horizontalScale(15),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
                <View style={{width:horizontalScale(5),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
            </View>
                <TouchableOpacity style={{width:horizontalScale(300),height:verticalScale(200),borderColor:'black',borderWidth:3,borderRadius:15,alignSelf:'center',marginTop:verticalScale(15),backgroundColor:'#FF6C6C'}} onPress={()=>setVisible(true)}>
                    <Image
                        style={{width:horizontalScale(50),height:verticalScale(50),alignSelf:'center',marginTop:verticalScale(60),zIndex:4}}
                        source={require('../../assets/images/video-button.png')}
                    />
                        <Image 
                            style={styles.imageVideo}
                            source={{uri: `data:image/png;base64,${imageUri}`}}
                        />
                    <Image 
                        style={{width:horizontalScale(294.5),height:verticalScale(30),marginTop:verticalScale(57),marginLeft:horizontalScale(1),zIndex:4}}
                        source={require('../../assets/images/video-bar.png')}
                    />
                </TouchableOpacity>
                <View style={styles.bottomContainer}>
                    <View>
                        <Image 
                            style={styles.image}
                            source={{uri: `data:image/png;base64,${imageUri}`}}
                        />
                    </View>
                    <View style={styles.propertyRow}>
                        <Text style={styles.titleText}>{props.route.params.title}</Text>
                        <Text style={styles.expText}>{props.route.params.exp}</Text>
                        <Text style={styles.priceText}>{props.route.params.price}₺</Text>
                        <Image 
                            style={{width:horizontalScale(35),height:verticalScale(20),marginLeft:horizontalScale(105)}}
                            source={require('../../assets/images/line.png')}
                        />
                    </View>
                </View>
                <ScrollView>
                    <Text style={styles.tempText}>Lütfen seçenkelerden birini seçiniz...</Text>
                    {types.map((item,index)=>
                        <PropertyTypeCard key={index} item={item} setCount={(index)=>setCount(index)} count={count} check={check} product_id={props.route.params.product_id} setPropertys={property_id => setPropertyData(prevData => [...prevData,{property_id}])} />
                    )}
                </ScrollView>
                <TouchableOpacity style={styles.createButton} onPress={()=>{if(loader === false){AddCart()}}}>
                    {loader ?
                            <ActivityIndicator 
                            color="black"
                            size="large"
                        />
                        :<Text style={styles.createButtonText}>Sepete Ekle</Text>
                    }
                </TouchableOpacity>
                <View style={{flexDirection:'row',paddingHorizontal:horizontalScale(15),alignSelf:'center',marginTop:verticalScale(20)}}>
                    <View style={{width:horizontalScale(5),height:verticalScale(3),backgroundColor:'black',borderRadius:15}}></View>
                    <View style={{width:horizontalScale(15),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
                    <View style={{width:horizontalScale(30),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(7)}}></View>
                    <View style={{width:horizontalScale(200),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(10)}}></View>
                    <View style={{width:horizontalScale(30),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(7)}}></View>
                    <View style={{width:horizontalScale(15),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
                    <View style={{width:horizontalScale(5),height:verticalScale(3),backgroundColor:'black',borderRadius:15,marginLeft:horizontalScale(5)}}></View>
                </View>
                <View style={{width:horizontalScale(2),height:verticalScale(30),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(165),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(15),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(140),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(5),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(130),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(480),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(210),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(30),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(700),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(15),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(740),borderRadius:15}}></View>
            <View style={{width:horizontalScale(2),height:verticalScale(5),backgroundColor:'black',position:'absolute',marginLeft:horizontalScale(365),marginTop:verticalScale(760),borderRadius:15}}></View>
            </View>
            <Modal transparent visible={visible} >
                <View style={{backgroundColor:'black',opacity:0.5,height:'100%'}}>
                    <View style={{height:'100%',marginTop:'auto',alignSelf:'flex-end'}}>
                        <TouchableOpacity style={{width:horizontalScale(400),height:verticalScale(300)}} onPress={()=>setVisible(false)}>
                        </TouchableOpacity>
                        <YoutubePlayer
                            height={verticalScale(1200)}
                            width={horizontalScale(400)}
                            play={playing}
                            videoId={props.route.params.videoUrl}
                            onChangeState={onStateChange}
                            preventFullScreen={true}
                        />
                        <TouchableOpacity style={{width:horizontalScale(400),height:verticalScale(300)}} onPress={()=>setVisible(false)}>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        backgroundColor:'#161616',
        flex:1
    },
    container:{
        paddingHorizontal:horizontalScale(7),
        paddingVertical:verticalScale(7),
    },
    bottomContainer:{
        flexDirection:'row',
        paddingHorizontal:horizontalScale(20),
        marginTop:verticalScale(20),
        justifyContent:'space-between',
    },
    image:{
        width:horizontalScale(180),
        height:verticalScale(220),
        borderRadius:15,
    },
    imageVideo:{
        width:horizontalScale(155),
        height:verticalScale(190),
        borderRadius:15,
        position:'absolute',
        alignSelf:'center',
        zIndex:2
    },
    row:{
        flexDirection:'row'
    },
    imageNextButton:{
        backgroundColor:'#F4E6CD',
        borderRadius:10,
        width:horizontalScale(30),
        height:verticalScale(40), 
        marginLeft:horizontalScale(20),
        marginTop:verticalScale(20),
        alignItems:'center',
        justifyContent:'center'
    },
    backButton:{
    },
    arrowImage:{
        width:horizontalScale(32),
        height:verticalScale(45)
    },
    arrowBackImage:{
        width:horizontalScale(15),
        height:verticalScale(20),
        
    },
    createButton:{
        width:horizontalScale(320),
        height:verticalScale(50),
        borderRadius:10,
        borderWidth:3,
        borderColor:'black',
        alignSelf:'center',
        marginTop:verticalScale(10),
        alignItems:'center',
        justifyContent:'center'
    },
    createButtonText:{
        fontSize:30,
        color:'black',
        fontFamily:'Impact-Stone'
    },
    propertyRow:{
        marginTop:verticalScale(50),
    },
    dataRow:{
        paddingVertical:verticalScale(10), 
        flexDirection:'row',
        width:horizontalScale(150),
        justifyContent:'space-between'
    },
    titleText:{
        fontSize:35,
        color:"black",
        fontFamily:'Impact-Stone'
    },
    expText:{
        fontSize:20,
        color:"black",
        fontFamily:'Impact-Stone',
        alignSelf:'center',
        paddingRight:horizontalScale(145),
    },
    priceText:{
        fontSize:25,
        color:"black",
        fontFamily:'Impact-Stone',
        marginLeft:horizontalScale(110),
        marginTop:verticalScale(20)
    },
    tempText:{
        fontSize:22,
        color:'black',
        fontFamily:'Impact-Stone',
        alignSelf:'center'
    }
})

export default ProductDetail;