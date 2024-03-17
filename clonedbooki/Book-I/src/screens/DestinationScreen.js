import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  ClockIcon,
  HeartIcon,
  MapPinIcon,
  SunIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";
import { RadioButton } from "react-native-paper";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-10";

export default function DestinationScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);

  const [radioValue, setRadioValue] = useState("option1");

  return (
    <View className="bg-white flex-1">
      {/* destination image */}
      <Image source={item.image} style={{ width: wp(100), height: hp(55) }} />
      <StatusBar style={"light"} />

      {/* back button */}
      <SafeAreaView
        className={
          "flex-row justify-between items-center w-full absolute " + topMargin
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-4"
          style={{ backgroundColor: "#C9DBE3" }}
        >
          <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFavourite(!isFavourite)}
          className="p-2 rounded-full mr-4"
          style={{ backgroundColor: "#C9DBE3" }}
        >
          <HeartIcon
            size={wp(7)}
            strokeWidth={4}
            color={isFavourite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* title & descritpion & booking button */}
      <View
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
          <View className="flex-row justify-between items-start">
            <Text
              style={{ fontSize: wp(7) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {item?.title}
            </Text>
            {/* <Text style={{fontSize: wp(7), color: '#000000'}} className="font-semibold">
                            $ {item?.price}
                        </Text> */}
          </View>
          <Text
            style={{ fontSize: wp(3.7) }}
            className="text-neutral-700 tracking-wide mb-2"
          >
            {item?.longDescription}
          </Text>
          <View className="flex-row justify-between mx-1">
            <View className="flex-row space-x-2 items-start">
              <ClockIcon size={wp(7)} color="skyblue" />
              <View className="flex space-y-2">
                <Text
                  style={{ fontSize: wp(4.5) }}
                  className="font-bold text-neutral-700"
                >
                  {item.duration}
                </Text>
                <Text className="text-neutral-600 tracking-wide">
                  Operating Hours
                </Text>
              </View>
            </View>
            <View className="flex-row space-x-2 items-start">
              <MapPinIcon size={wp(7)} color="#f87171" />
              <View className="flex space-y-2">
                <Text
                  style={{ fontSize: wp(4.5) }}
                  className="font-bold text-neutral-700"
                >
                  {item.distance}
                </Text>
                <Text className="text-neutral-600 tracking-wide">Distance</Text>
              </View>
            </View>
            {/* <View className="flex-row space-x-2 items-start">
                            <SunIcon size={wp(7)} color="orange" />
                            <View className="flex space-y-2">
                                <Text style={{fontSize: wp(4.5)}} className="font-bold text-neutral-700">{item.weather}</Text>
                                <Text className="text-neutral-600 tracking-wide">Sunny</Text>
                            </View>
                        </View> */}
          </View>
          {/* Radio button */}
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton
                            value="option1"
                            status={ radioValue === 'option1' ? 'checked' : 'unchecked' }
                            onPress={() => setRadioValue('option1')}
                        />
                        <Text>Option 1</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton
                            value="burat"
                            status={ radioValue === 'option2' ? 'checked' : 'unchecked' }
                            onPress={() => setRadioValue('option2')}
                        />
                        <Text>Option 2</Text>
                    </View> */}
          {/* Rendering radio buttons from options */}
          {item.options.map((option, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <RadioButton
                value={option.value}
                status={radioValue === option.value ? "checked" : "unchecked"}
                onPress={() => setRadioValue(option.value)}
              />
              <Text>{option.label}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("Calendar")}
          style={{ backgroundColor: "#C9DBE3", height: wp(15), width: wp(50) }}
          className="mb-6 mx-auto flex justify-center items-center rounded-full"
        >
          <Text className="text-white font-bold" style={{ fontSize: wp(5.5) }}>
            Book now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
