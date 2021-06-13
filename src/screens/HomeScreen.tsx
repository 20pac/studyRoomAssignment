import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import GIFListItem from '../components/GIFListItem';
import {Gif} from '../models/Models';
import {fetchGifs as fetchGifs} from '../services/giphy';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Routes';
import {useDispatch} from 'react-redux';
import {addToHistory} from '../store/HistorySlice';
import {ActivityIndicator, TextInput} from 'react-native-paper';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [gifs, setGifs] = useState<Gif[]>();
  const [searchText, setSearchText] = React.useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const gifs = await fetchGifs(0);

      setGifs(gifs);
    })();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {gifs ? (
        <>
          <TextInput
            value={searchText}
            onChangeText={text => setSearchText(text)}
            right={<TextInput.Icon name="text-search" />}
          />
          <FlatList
            data={gifs.filter(gif =>
              gif.title.toLowerCase().includes(searchText.toLowerCase()),
            )}
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
            keyExtractor={item => item.smallGifUrl}
            onEndReached={async () => {
              if (searchText !== '') return;
              const newGifs = await fetchGifs(currentPage);
              if (newGifs) {
                setGifs([...gifs, ...newGifs]);
                setCurrentPage(currentPage + 1);
              }
              return;
            }}
            onEndReachedThreshold={0}
          />
        </>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator color="black" size="large" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
