import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Image, FlatList, ScrollView, Text } from 'react-native';
import { Entypo } from "@expo/vector-icons";

import { Background } from '../../components/Background';
import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const route = useRoute();
  const navigation = useNavigation()
  const game = route.params as GameParams;
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setdiscordDuoSelected] = useState<string>('');

  useEffect(() => {
    fetch(`http://192.168.15.11:3000/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data));
  }, []);

  async function getDiscordUser(adId: string) {
    await fetch(`http://192.168.15.11:3000/games/${adId}/discord`)
    .then(response => response.json())
    .then(data => setdiscordDuoSelected(data.discord));
  }

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 48}}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={goBack}
              >
                <Entypo 
                  name="chevron-thin-left"
                  color={THEME.COLORS.CAPTION_300}
                  size={20}
                />
              </TouchableOpacity>
              <Image 
                source={logoImg}
                style={styles.logo}
              />
              <View style={styles.right}/>
            </View>
            <Image 
              source={{ uri: game.bannerUrl }}
              style={styles.cover}
              resizeMode="cover"
            />
            <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
            
        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>(
            <DuoCard 
              data={item}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
          horizontal={true}
          style={styles.containerList}
          contentContainerStyle={[ duos.length > 0 ? styles.contentList : styles.emptyListContentText ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyList}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
        </ScrollView>
        <DuoMatch 
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setdiscordDuoSelected("")}
        />
        </SafeAreaView>
    </Background>
  );
}