import React, { useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import NetInfo from "@react-native-community/netinfo";
// import { getBooks } from '../redux/actions';
import { getBooks, addBookmark, removeBookmark } from '../redux/actions';
export default function BooksList() {
  const { books, bookmarks } = useSelector(state => state.booksReducer);

  const dispatch = useDispatch();
  const addToBookmarkList = book => dispatch(addBookmark(book));
  const removeFromBookmarkList = book => dispatch(removeBookmark(book));
  const fetchBooks = () => {
    NetInfo.fetch().then(networkState => {
      // console.log("Connection type - ", networkState.type);
      // console.log("Is connected? - ", networkState.isConnected);
      if(networkState.isConnected && networkState.isInternetReachable){
        console.log('hi here')
        dispatch(getBooks())
      }else{
        console.log("no Connection");
      }
    })
  };
  const handleAddBookmark = book => {
    
    addToBookmarkList(book);
  };

  const handleRemoveBookmark = book => {
    
    removeFromBookmarkList(book);
  };
  const ifExists = book => {
    if (bookmarks.filter(item => item.id === book.id).length > 0) {
      return true;
    }
  
    return false;
  };
  useEffect(() => {
        fetchBooks();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 12 }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* Book Cover */}
          <Image
            source={{ uri: item.image_url }}
            resizeMode='cover'
            style={{ width: 100, height: 150, borderRadius: 10 }}
          />
          {/* Book Metadata */}
          <View style={{ flex: 1, marginLeft: 12 }}>
            {/* Book Title */}
            <View>
              <Text style={{ fontSize: 22, paddingRight: 16, color: 'white' }}>
                {item.title}
              </Text>
            </View>
            {/* Meta info */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center'
              }}
            >
              <FontAwesomeIcons
                color='#64676D'
                name='eye'
                size={20}
              />
              <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
                {item.num_pages}
              </Text>
              <FontAwesomeIcons
                color='#64676D'
                name='star'
                size={20}
                style={{ paddingLeft: 16 }}
              />
              <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
                {item.rating}
              </Text>
            </View>
            {/* Buttons */}
            <View style={{ marginTop: 14 }}>
              <TouchableOpacity
                onPress={() => ifExists(item)? handleRemoveBookmark(item):handleAddBookmark(item)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  padding: 2,
                  backgroundColor: '#2D3038',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40
                }}
              >
                <FontAwesomeIcons
                  color={ifExists(item) ? 'white' : '#64676D'}
                  size={24}
                  name={ifExists(item) ? "remove" : 'bookmark'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={{ color: 'white', fontSize: 22 }}>Bestsellers</Text>
        <TouchableOpacity
                onPress={() => fetchBooks()}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  padding: 2,
                  backgroundColor: '#2D3038',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40
                }}
              >
                <FontAwesomeIcons
                  color='#64676D'
                  size={24}
                  name='bookmark'
                />
        </TouchableOpacity>
        <View style={{ flex: 1, marginTop: 8 }}>
          <FlatList
            data={books}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
