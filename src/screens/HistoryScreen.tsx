import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import GIFListItem from '../components/GIFListItem';
import {RootStackParamList} from '../Routes';
import {addToHistory} from '../store/HistorySlice';
import {RootState} from '../store/store';

type HistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'History'
>;

type HistoryScreenProps = {
  navigation: HistoryScreenNavigationProp;
};

const HistoryScreen: React.FC<HistoryScreenProps> = ({navigation}) => {
  const visitedGifs = useSelector((state: RootState) => state.history.visited);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{flex: 1}}>
      {visitedGifs.length > 0 ? (
        <FlatList
          data={visitedGifs}
          renderItem={({item}) => {
            return (
              <GIFListItem
                title={item.title}
                gifUrl={item.smallGifUrl}
                onPress={() => {
                  navigation.navigate('Details', {...item});
                  dispatch(addToHistory({gif: item}));
                }}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{color: 'gray'}}>Your history is empty</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HistoryScreen;
