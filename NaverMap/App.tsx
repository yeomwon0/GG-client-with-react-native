import {View, Alert, TouchableOpacity, Image, Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import * as kko from '../NaverMap/customHTML';
import KMap from './map';
import Bori from './Bori';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function App() {

 
  const webviewRef = useRef();


  return (    
    <View style={{flex: 1}}>
      <KMap webviewRef={webviewRef}/>
      <Bori webviewRef={webviewRef} />
    </View>
  );
}