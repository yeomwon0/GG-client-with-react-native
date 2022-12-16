import { useEffect, useRef, useState } from "react";
import { Alert, Dimensions, Image, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import Bori from "./Bori";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function KMap({webviewRef}:any) {
    const html = `
  <!DOCTYPE html>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <style type="text/css">
    html, body {width:100%;height:100%;margin:0;padding:0;} 
  </style>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
      <title>지도 생성하기</title>
  </head>
  <body>
    <div id="map" style="width:100%; height:100%; "></div>
    <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=5062efd19b7a53b5ded087c3ff4ba608&libraries=services"></script>
    <script>
      
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = { 
        center: new kakao.maps.LatLng( 36.33705543447485, 127.44507203436675), // 지도의 중심좌표
        level: 1 // 지도의 확대 레벨
    };
    
    var map = new kakao.maps.Map(mapContainer, mapOption);

    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    
    var arr1 = {}

    
    document.addEventListener("message", (e) => {
        var latlng = JSON.parse(e.data)

        for(var i = 0; i < latlng.length; i++)
        {
          mark(latlng[i].name, latlng[i].lat, latlng[i].lng)
        }
    })

    function mark(name, lat, lng)
    {
      var markerPosition = new kakao.maps.LatLng(lat, lng);
      var marker = new kakao.maps.Marker({ position: markerPosition });
      marker.setMap(map);
      // info1();
      kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, name));
      arr1[name] = marker
    }
    
  function makeOverListener(map, marker, name) {
    let _infowindow = new kakao.maps.InfoWindow({
      content : name,
      removable : true,
      
    })
      return function() {
            _infowindow.open(map, marker);
        }
    }

    //내가추가한 마커
    var position = new kakao.maps.LatLng(36.33705543447485, 127.44507203436675);
    var marker2 = new kakao.maps.Marker({ 
      position: position,
      clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    }); 
    marker2.setMap(map);
      // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
    var iwContent = '<button onclick="print()">Send</button>', 
      // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
    
    kakao.maps.event.addListener(marker2, 'click', function () {
      // 마커 위에 인포윈도우를 표시합니다
      infowindow.open(map, marker2);
    });
  </script>
  </body>
  </html>
  `;

  /** 웹뷰 ref */
  const handleSetRef = (_ref:any) => {
    webviewRef.current = _ref;
  };

  //웹뷰에서 rn으로 값을 보낼때 함수
  const handleOnMessage = (e:any) => {
    // postMessage 담겨있는 결과 값이 웹뷰에서 값을 출력
    console.log('콘솔', e.nativeEvent.data);
    Alert.alert(e.nativeEvent.data);
  };

 const sendMessage = async () => {
   const sendData = JSON.stringify([
     {
       name: 'w1',
       lat: 36.3330648,
       lng: 127.4139117,
      },
      {
        name: 'w2',
        lat: 36.300378,
        lng: 127.333443
      },
      {
      name: 'w3',
      lat: 36.33775543447485,
      lng: 127.44547203436675
    }
  ]);
  sleep(1000)
  await webviewRef.current.postMessage(sendData);
};
useEffect(() => {
  sendMessage()
}, []);
function sleep(ms:number) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

  return(
    <WebView onMessage={handleOnMessage} source={{html}} ref={handleSetRef} />
  )
}

export default KMap;