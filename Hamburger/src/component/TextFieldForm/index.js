import React, { useEffect, useRef, useState } from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native'
import { verticalScale } from '../../config'

const TextFieldForm = (props) => {
  const {
    label,
    errorText,
    succesText,
    value,
    style,
    onBlur,
    onFocus,
    ...restOfProps
  } = props
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef(null)
  const focusAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start()
  }, [focusAnim, isFocused, value])

  let color = isFocused ? '#F4E6CD' : '#F4E6CD'
  if (errorText) {
    color = '#B00020'
  }
  else{
    if(succesText){
      color = '#2EFF00'
    }
  }

  return (
    <View style={style}>
      <TextInput
        style={styles.input}
        ref={inputRef}
        {...restOfProps}
        value={value}
        onBlur={(event) => {
          setIsFocused(false)
          onBlur?.(event)
        }}
        onFocus={(event) => {
          setIsFocused(true)
          onFocus?.(event)
        }}
      />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [15, -40],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color,
              },
            ]}
          >
            {label}
            {errorText ? '*' : ''}
            {succesText ? '*' : ''}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
      {!!succesText && <Text style={styles.success}>{succesText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderRadius: 4,
    borderWidth:5,
    borderColor:'white',
    fontFamily: 'zai_SeagullFelt-tipPen',
    fontSize: 35,
    color:'#F4E6CD',
    height:verticalScale(60),
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 8,
    backgroundColor: '#161616',
  },
  label: {
    fontFamily: 'zai_SeagullFelt-tipPen',
    fontSize: 35,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: '#B00020',
    fontFamily: 'Gilroy-Medium',
  },
  success: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: '#2EFF00',
    fontFamily: 'Gilroy-Medium',
  },
})

export default TextFieldForm;