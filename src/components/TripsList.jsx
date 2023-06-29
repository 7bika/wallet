import React from "react"
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { colors, shadow, sizes, spacing } from "./../constants/theme"
import FavoriteButton from "./shared/FavoriteButton"
import { useNavigation } from "@react-navigation/native"
import { SharedElement } from "react-native-shared-element"

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2)
const CARD_HEIGHT = 220

const TripsList = ({ list }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {list.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.cardContainer}
            key={item.id}
            onPress={() => {
              navigation.navigate("TourDetails", { trip: item })
            }}
          >
            <View style={[styles.card, shadow.light]}>
              <SharedElement id={`trip.${item.id}.image`}>
                <View style={styles.imageBox}>
                  <Image style={styles.image} source={item.image} />
                </View>
              </SharedElement>
              <View style={styles.footer}>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.location}>{item.location}</Text>
                </View>
                <FavoriteButton />
              </View>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

// import React from 'react';
// import {View, StyleSheet, Text} from 'react-native';
// import {colors, sizes, spacing} from '../constants/theme';
// import FavoriteButton from './shared/FavoriteButton';
// import {useNavigation} from '@react-navigation/native';
// import {SharedElement} from 'react-navigation-shared-element';
// import Card from './shared/Card/Card';
// import CardMedia from './shared/Card/CardMedia';
// import CardContent from './shared/Card/CardContent';

// const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);
// const CARD_HEIGHT = 220;

// const TripsList = ({list}) => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.container}>
//       {list.map((item, index) => {
//         return (
//           <Card
//             key={item.id}
//             style={styles.card}
//             onPress={() => {
//               navigation.navigate('TripDetails', {trip: item});
//             }}>
//             <SharedElement id={`trip.${item.id}.image`} style={styles.media}>
//               <CardMedia source={item.image} />
//             </SharedElement>
//             <CardContent style={styles.content}>
//               <View style={styles.titleBox}>
//                 <Text style={styles.title}>{item.title}</Text>
//                 <Text style={styles.location}>{item.location}</Text>
//               </View>
//               <FavoriteButton />
//             </CardContent>
//           </Card>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   cardContainer: {
//     marginLeft: spacing.l,
//     marginBottom: spacing.l,
//   },
//   card: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//     marginLeft: spacing.l,
//     marginBottom: spacing.l,
//   },
//   media: {
//     flex: 1,
//   },
//   content: {
//     paddingRight: spacing.m / 2,
//   },
//   titleBox: {
//     flex: 1,
//   },
//   title: {
//     marginVertical: 4,
//     fontSize: sizes.body,
//     fontWeight: 'bold',
//     color: colors.primary,
//   },
//   location: {
//     fontSize: sizes.body,
//     color: colors.lightGray,
//   },
// });

// export default TripsList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardContainer: {
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    overflow: "hidden",
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    resizeMode: "cover",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: 16,
    marginRight: 10,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    marginVertical: 4,
    fontSize: sizes.body,
    fontWeight: "bold",
    color: colors.primary,
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
})

export default TripsList
