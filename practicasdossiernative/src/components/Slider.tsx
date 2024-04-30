import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppContext } from '../contexts/TokenContextProvider';
import { ip } from '../../global';



type SliderProps = {
  images: { id: number; source: any }[];
  valoracion: number;
  email: string;
};

const Slider: React.FC<SliderProps> = ({ images, valoracion, email }: SliderProps) => {
  const { token, usuario, settoken } = useAppContext();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const imagenDefecto = "../resources/default.jpg";
  const [erroresImagen, setErroresImagen] = useState(new Set<number>());

  const ruta = "http://" + ip + "/api/v2/usuarios/" + email + "/images/";
  console.log(ruta);
  console.log(images);


  const goToNextSlide = () => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: (currentIndex + 1) % images.length,
    });
  };

  const goToPrevSlide = () => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: (currentIndex - 1 + images.length) % images.length,
    });
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const handleImageError = (id: number) => {
    setErroresImagen(prev => new Set(prev.add(id)));
  };




  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            {!erroresImagen.has(item.id) ? (
              <Image
                source={{
                  uri: ruta + item.source,
                  method: "GET",
                  headers: { 'Authorization': `Bearer ${token}` }
                }}
                style={styles.image}
                resizeMode="cover"
                onError={() => handleImageError(item.id)}
              />
            ) : (
              <Image source={require(imagenDefecto)} style={styles.image} />
            )}
          </View>
        )}
        
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
      <Text style={styles.rating}>{valoracion}⭐</Text>
      <Icon name='map-marker' style={styles.location} ></Icon>
      <Text style={styles.pageCount} >{currentIndex + 1 + "/" + images.length}</Text>
      <TouchableOpacity style={[styles.controlButton, styles.prevButton]} onPress={goToPrevSlide}>
        <Text style={styles.controlButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.controlButton, styles.nextButton]} onPress={goToNextSlide}>
        <Text style={styles.controlButtonText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
    position: 'relative'
  },

  rating: {
    position: 'absolute',
    fontSize: 17,
    top: 10,
    right: 10,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Color del sombreado
    textShadowOffset: { width: 2, height: 2 }, // Desplazamiento del sombreado
    textShadowRadius: 5, // Radio del sombreado
  },

  location: {
    position: 'absolute',
    color: "white",
    fontSize: 30,
    bottom: 10,
    left: 10,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Color del sombreado
    textShadowOffset: { width: 2, height: 2 }, // Desplazamiento del sombreado
    textShadowRadius: 5, // Radio del sombreado
  },

  pageCount: {
    position: 'absolute',
    color: "white",
    fontSize: 12,
    bottom: 10,
    right: 10,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Color del sombreado
    textShadowOffset: { width: 2, height: 2 }, // Desplazamiento del sombreado
    textShadowRadius: 5, // Radio del sombreado
  },

  controlButton: {
    position: 'absolute',
    top: '40%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButton: {
    left: 16,
  },
  nextButton: {
    right: 16,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default Slider;
