import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import getUserById from "../lib/getMatchedUserInfo";
import { RootStackParamList } from "../StackNavigator";
import { Match, Profile } from "../lib/typesInterfaces";

export interface MessageScreenProps {
  matchDetails: Match;
}

type MessageProps = NativeStackScreenProps<RootStackParamList, "Message">;

const MessageScreen = ({ route, navigation }: MessageProps) => {
  const { user } = useAuth();
  const { matchDetails } = route.params;

  const [input, setInput] = useState("");
  const [matchedUserInfo, setMatchedUserInfo] = useState<Profile>();

  const sendMessage = () => {};

  useEffect(() => {
    (async function () {
      const otherUserId = matchDetails.usersMatched.filter(
        (id) => id === user?.uid
      );
      setMatchedUserInfo(await getUserById(otherUserId[0]));
    })();
  }, [matchDetails, user]);

  return (
    <SafeAreaView>
      <Header title={matchedUserInfo?.displayName || "User"} callEnabled />
      <Text>MessageScreen</Text>

      <View
        className="
          flex-row
          justify-between
          items-center
          border-t
          border-gray-200
          px-5 py-2
        "
      >
        <TextInput
          className="h-10 text-lg"
          placeholder="Send Message..."
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          value={input}
        />
        <Button title="Send" color="#FF5864" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

export default MessageScreen;
