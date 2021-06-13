import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Gif} from '../models/Models';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../Routes';
import {Card} from 'react-native-paper';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type DetailsScreenProps = {
  route: HomeScreenRouteProp;
};

const GifDetailsScreen: React.FC<DetailsScreenProps> = ({route}) => {
  const gif = route.params;

  return (
    <SafeAreaView
      style={{alignItems: 'center', flex: 1, paddingHorizontal: 20}}>
      <Text style={{fontSize: 24, marginTop: 20, fontWeight: 'bold'}}>
        {gif.title}
      </Text>
      <FastImage
        source={{uri: gif.largeGifUrl}}
        style={{height: 300, width: 300, marginVertical: 20}}
        resizeMode="contain"
      />
      <Text style={{fontSize: 18, color: 'gray'}}>{`ID: ${gif.id}`}</Text>
      <Text
        style={{
          fontSize: 18,
          color: 'gray',
        }}>{`Created By: ${gif.createdBy ? gif.createdBy : 'Anonymous'}`}</Text>
    </SafeAreaView>
  );
};

export default GifDetailsScreen;
