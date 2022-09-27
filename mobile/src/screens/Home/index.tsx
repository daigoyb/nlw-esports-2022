import { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';

export function Home() {
  const [gamesBanner, setGamesBanner] = useState<GameCardProps[]>();
  const navigation = useNavigation();
  
  useEffect(() => {
    fetch('http://192.168.15.11:3000/games')
    .then(response => response.json())
    .then(data => setGamesBanner(data))
  }, []);

  const handleGameOnPress = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate('game', {
      id,
      title,
      bannerUrl,
    });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          contentContainerStyle={{ alignItems: "center", paddingBottom: 48, }}
          showsVerticalScrollIndicator={false}
        >
          <Image 
            source={logoImg}
            style={styles.logo}
          />
          <Heading 
            title="Encontre seu duo!"
            subtitle="Selecione o game que deseja jogar..."
          />
          <FlatList 
            data={gamesBanner}
            keyExtractor={item => item.id}
            renderItem={({ item }) => 
              <GameCard 
                data={item}
                onPress={() => handleGameOnPress(item)}
              />
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentsList}
          />
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}