import { View, StyleSheet} from "react-native";
import { horizontalScale, verticalScale } from "../../config";
import Skeleton from "./index";

const SkeletonCard = () =>{
    return(
        <View style={styles.shareTabRow}>
            <View style={styles.container}>
                <View style={styles.tabRow}>
                    <Skeleton width={horizontalScale(45)} height={verticalScale(50)} style={{borderRadius:999}}/>
                    <View style={{marginLeft:15}}>
                        <Skeleton width={horizontalScale(80)} height={verticalScale(25)} style={{marginBottom:10,borderRadius:4}}/>
                        <Skeleton width={horizontalScale(60)} height={verticalScale(20)} style={{borderRadius:4}}/>
                    </View>
                </View>
                <Skeleton width={horizontalScale(300)} height={100} style={{borderRadius:4,marginTop:verticalScale(25),marginLeft:horizontalScale(10)}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shareTabRow:{
        width:'100%',
        height: verticalScale(200),
        borderRadius:10,
        borderColor:'#C0C0C0',
        alignSelf:'center',
    },
    line:{
        width:horizontalScale(390),
        height:verticalScale(1),
        backgroundColor:'gray',
        marginVertical:verticalScale(5)
    },
    container:{
        paddingHorizontal:horizontalScale(15),
        marginBottom:verticalScale(10)
    },
    tabRow:{
        flexDirection:'row',
        height:verticalScale(60),
        paddingTop:verticalScale(10)
    },
})

export default SkeletonCard;