import {View, Alert, TouchableOpacity, Image, Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import KMap from './kmap/map';
import Bori from './kmap/Bori';
import Search from './kmap/Search';

export default function App() {
  const webviewRef = useRef();
  return (    
    <View style={{flex: 1}}>
      <KMap webviewRef={webviewRef}/>
      <Bori />
      <Search webviewRef={webviewRef}/>
    </View>
  );
}