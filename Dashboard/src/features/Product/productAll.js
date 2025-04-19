import { View, Text, FlatList} from "react-native";
import { useState,useEffect } from "react";
import { verticalScale, horizontalScale } from "../../config";
import { All, Delete} from "../../services/methods/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCart from "../../component/ProductCart";

const ProductAll = (props)=>{

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState();
    const [page, setPage] = useState("0");
    const [error, setError] = useState();

    const userReducer = useSelector(state=>state.UserCheck);
    const {userCheck, userStatus} = userReducer;

    useEffect(()=>{
        AllRequest();
    },[userCheck])

    const AllRequest = ()=>{
        All(userCheck.restaurant_id,page,(error,newData)=>{
            if(newData){
                setData(prevData => [...prevData, ...newData.data]);
                setPage(prevPage => prevPage + 3);
                setLoading(false);
            }
            else{
                console.log("All Product error:",error)
                setError(error);
                setLoading(false);
            }
        })
    }

    const handleLoadMore = () => {
        if (!loading) {
            AllRequest();
        }
    };

    const renderItem = ({ item }) => (
        <ProductCart item={item} delete={()=>{
            Delete(item.product_id,(err,deleteData)=>{
                if(deleteData.data){
                    const newData = data.filter(order => order.order_id !== item.order_id);
                    setData(newData);
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
                keyExtractor={item => item.product_id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </View>
    )
}

export default ProductAll;