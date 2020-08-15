import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  ScrollView,
  Linking,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Button,
} from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Articles">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Articles" component={ArticleList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function HomeScreen({ navigation }) {
  return (
    <ScrollView>
      <SafeAreaView>
        <Text style={styles.header}>{"General News"}</Text>
        <View style={styles.sidebyside}>
          <View style={styles.column}>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Global News"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Local News"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Weather"} </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.column}>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"National News"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"COVID-19 News"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Education"} </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.header}>{"Positivity"}</Text>
        <View style={styles.sidebyside}>
          <View style={styles.column}>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Meditation"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Workout"} </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.column}>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Healthy Food"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Positive News"} </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.header}>{"Science and Technology"}</Text>
        <View style={styles.sidebyside}>
          <View style={styles.column}>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Biology"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Climate"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Programming"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Astronomy"} </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.column}>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Chemistry"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Robotics"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Engineering"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Medicine"} </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.header}>{"Entertainment"}</Text>
        <View style={styles.sidebyside}>
          <View style={styles.column}>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Movies/TV"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Music"} </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Sports"} </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
              <View style={styles.item}>
                <Text style={styles.title}>{"Video Games"} </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

function LoadingScreen({ navigation }) {
  return <Text style={styles.header}>{"Entertainment"}</Text>;
}

function ArticleList({ navigation }) {
  return (
    <Button title="Go to HII" onPress={() => navigation.navigate("Home")} />
  );
}

const styles = StyleSheet.create({
  sidebyside: {
    flexDirection: "row",
    alignContent: "center",
  },
  item: {
    backgroundColor: "dodgerblue",
    padding: 20,
    textAlign: "center",
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  column: {
    alignContent: "center",
    width: "50%",
  },
});

export default App;
