import React from 'react'
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };

let token;
let profilImage;

export const colors = {
    primary:'#6835F0',
    secondary:'#FF0074',
    OpenGray:'F3F6F6'
}

export const text = {
    bold:{
        fontFamily: 'Gilroy-Bold',
        color: 'black',
        fontSize: 16,
    },
    medium:{
        fontFamily: 'Gilroy-Medium',
        fontSize: 16,
    }
}

export const setProfilImage = (imageUri) =>{
    profilImage = imageUri;
}



export const getProfilImage = () => {
    return `data:image/png;base64,${profilImage}`;
}

export const setToken = (access_token) => {
    token = access_token
}

export const getToken = () =>{
    return token;
}

export const clearToken = () =>{
    token = '';
}

export const shadow = {
    shadowColor: "#000",
    shadowOffset:{
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
}

/*export const avatars = [
    {index:0,url:require('../assets/images/avatar/1.png')},
    {index:1,url:require('../assets/images/avatar/2.png')},
    {index:2,url:require('../assets/images/avatar/3.png')},
    {index:3,url:require('../assets/images/avatar/4.png')},
    {index:4,url:require('../assets/images/avatar/5.png')},
    {index:5,url:require('../assets/images/avatar/6.png')},
    {index:6,url:require('../assets/images/avatar/7.png')},
    {index:7,url:require('../assets/images/avatar/8.png')},
    {index:8,url:require('../assets/images/avatar/9.png')},
    {index:9,url:require('../assets/images/avatar/10.png')},
    {index:10,url:require('../assets/images/avatar/11.png')},
    {index:11,url:require('../assets/images/avatar/12.png')},
    {index:12,url:require('../assets/images/avatar/13.png')},
    {index:13,url:require('../assets/images/avatar/14.png')}, 
    {index:14,url:require('../assets/images/avatar/15.png')},
    {index:15,url:require('../assets/images/avatar/16.png')},
    {index:16,url:require('../assets/images/avatar/17.png')},
    {index:17,url:require('../assets/images/avatar/18.png')},
    {index:18,url:require('../assets/images/avatar/19.png')},
    {index:19,url:require('../assets/images/avatar/20.png')},
    {index:20,url:require('../assets/images/avatar/21.png')},
    {index:21,url:require('../assets/images/avatar/22.png')},
    {index:22,url:require('../assets/images/avatar/23.png')},
    {index:23,url:require('../assets/images/avatar/24.png')},
    {index:24,url:require('../assets/images/avatar/25.png')},
    {index:25,url:require('../assets/images/avatar/26.png')},
    {index:26,url:require('../assets/images/avatar/27.png')},
    {index:27,url:require('../assets/images/avatar/28.png')},
    {index:28,url:require('../assets/images/avatar/29.png')},
    {index:29,url:require('../assets/images/avatar/30.png')},
    {index:30,url:require('../assets/images/avatar/31.png')},
    {index:31,url:require('../assets/images/avatar/32.png')},
    {index:32,url:require('../assets/images/avatar/33.png')},
    {index:33,url:require('../assets/images/avatar/34.png')},
    {index:34,url:require('../assets/images/avatar/35.png')},
    {index:35,url:require('../assets/images/avatar/36.png')},
    {index:36,url:require('../assets/images/avatar/37.png')},
    {index:37,url:require('../assets/images/avatar/38.png')},
    {index:38,url:require('../assets/images/avatar/39.png')},
    {index:39,url:require('../assets/images/avatar/40.png')},
];*/ 