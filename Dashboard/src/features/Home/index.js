import { View, Text, FlatList} from "react-native";
import { useState,useEffect } from "react";
import { verticalScale, horizontalScale } from "../../config";
import OrderCart from "../../component/OrderCart";
import { Pull, Delete} from "../../services/methods/order";
import { useSelector } from "react-redux";
const Home = (props)=>{

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState();
    const [page, setPage] = useState("0");
    const [error, setError] = useState();

    const userReducer = useSelector(state=>state.UserCheck);
    const {userCheck, userStatus} = userReducer;

    useEffect(()=>{
        PullRequest();
    },[userCheck])

    const PullRequest = ()=>{
        Pull(userCheck.restaurant_id,"order",page,(error,newData)=>{
            if(newData){
                setData(prevData => [...prevData, ...newData.data]);
                setPage(prevPage => prevPage + 3);
                setLoading(false);
            }
            else{
                console.log("Pull order error:",error)
                setError(error);
                setLoading(false);
            }
        })
    }

    const handleLoadMore = () => {
        if (!loading) {
            PullRequest();
        }
    };

    const renderItem = ({ item }) => (
        <OrderCart item={item} delete={()=>{
            Delete(item.order_id,(err,deleteData)=>{
                if(deleteData.data){
                    const newData = data.filter(order => order.order_id !== item.order_id);
                    setData(newData);
                    console.log(newData)
                }
            })
        }}/>
    );

    const renderFooter = () => {
        return loading ? (
            <SkeletonCard />
        ) : null;
    };

    return(
        <View>
            <FlatList
                style={{height:verticalScale(610)}}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.order_id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </View>
    )
}

export default Home;