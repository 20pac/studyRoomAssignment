import React from 'react';
import {GestureResponderEvent, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface GIFListItemProps {
  title: string;
  gifUrl: string;
  onPress?: () => void;
}

const GIFListItem: React.FC<GIFListItemProps> = ({title, gifUrl, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: 'white',
        }}>
        <FastImage
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 20,
          }}
          source={{
            uri: gifUrl,
          }}
        />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          textBreakStrategy="simple"
          style={{flex: 1, color: 'gray'}}>
          {title ? title : 'Giphy GIF'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GIFListItem;
