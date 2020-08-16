import React, { useEffect, Component } from "react";
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
  ActivityIndicator,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { setCustomText, setCustomTextInput } from "react-native-global-props";
import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading } from "expo";
import Geocoder from "react-native-geocoding";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

let latitude, longitude;
let url = "HI";
const Stack = createStackNavigator();
let location = "";

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Articles" component={ArticleList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

class HomeScreen extends Component {
  state = { errorMessage: " " };

  componentDidMount() {
    this.getLocation();
  }

  getLocation = async () => {
    Geocoder.init("AIzaSyC9KDkw1L9uwMacnF6KRK-_C-CwbTSP6XA");
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission not granted",
      });
    }

    location = await Location.getCurrentPositionAsync();

    this.setState({
      location: location,
    });
  };

  render() {
    function getLatitude() {
      return location.coords.latitude;
    }

    function getLongitude() {
      return location.coords.longitude;
    }

    return (
      <ScrollView>
        <SafeAreaView>
          <View>
            <ImageBackground
              style={styles.logo}
              source={{
                uri:
                  "https://cdn.discordapp.com/attachments/541038982956580882/744275943526367312/Screenshot_20200815-152647.png",
              }}
            ></ImageBackground>
          </View>
          <Text style={styles.header}>{"General News"}</Text>
          <View style={styles.sidebyside}>
            <View style={styles.column}>
              <TouchableOpacity //global news
                onPress={() => {
                  url = "globalnews";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://www.clipartkey.com/mpngs/m/4-49122_globe-clipart-globe-clip-art-image-globe-clipart.png",
                  }}
                >
                  <Text style={styles.title}>{"Global News"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //localnews
                onPress={() => {
                  url =
                    "localnews/" +
                    location.coords.latitude
                      .toString()
                      .substring(
                        0,
                        location.coords.latitude.toString().indexOf(".") + 1
                      ) +
                    "," +
                    location.coords.longitude
                      .toString()
                      .substring(
                        0,
                        location.coords.longitude.toString().indexOf(".") + 1
                      );
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://thumbs.dreamstime.com/b/map-red-pin-locator-concept-clipart-design-illustrator-vector-map-pin-location-address-company-isolated-159529757.jpg",
                  }}
                >
                  <Text style={styles.moreopaque}>{"Local News"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //weather
                onPress={() => {
                  url = "weather";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "data:image/png;base64,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",
                  }}
                >
                  <Text style={styles.title}>{"Weather"} </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View style={styles.column}>
              <TouchableOpacity //national news
                onPress={() => {
                  url = "nationalnews";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRudGms2K4LG1DcLy0P6-PkevaqCHwQtV-q_Q&usqp=CAU",
                  }}
                >
                  <Text style={styles.title}>{"National News"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //covidnews
                onPress={() => {
                  url = "covidnews";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://img.mlo-online.com/files/base/ebm/mlo/image/2020/05/Pixabay_coronavirus_5107715_1280.5eb16e6f5f05a.png?auto=format&fit=max&w=1200",
                  }}
                >
                  <Text style={styles.title}>{"COVID-19 News"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //education
                onPress={() => {
                  url = "education";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://i.pinimg.com/originals/c6/86/25/c6862564f8c1f69f2e6cc71acf8e3600.png",
                  }}
                >
                  <Text style={styles.title}>{"Education"} </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.header}>{"Positivity"}</Text>
          <View style={styles.sidebyside}>
            <View style={styles.column}>
              <TouchableOpacity //meditation
                onPress={() => {
                  url = "meditation";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://www.pngitem.com/pimgs/m/171-1716082_buddhist-meditation-buddhism-silhouette-clip-art-meditation-clipart.png",
                  }}
                >
                  <Text style={styles.moreopaque}>{"Meditation"}</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //workout
                onPress={() => {
                  url = "workout";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://t4.ftcdn.net/jpg/01/44/48/59/240_F_144485947_omMceItN4n4xpMFbloGASmOxOH2zLrXz.jpg",
                  }}
                >
                  <Text style={styles.moreopaque}>{"Workout"} </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View style={styles.column}>
              <TouchableOpacity //healthyfood
                onPress={() => {
                  url = "healthyfood";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://www.clipartkey.com/mpngs/m/82-827734_healthy-clipart-food-pyramid-food-pyramid-easy-drawing.png",
                  }}
                >
                  <Text style={styles.title}>{"Healthy Food"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //positivenews
                onPress={() => {
                  url = "positivenews";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://www.freeiconspng.com/uploads/youtube-like-png-9.jpg",
                  }}
                >
                  <Text style={styles.moreopaque}>{"Positive News"} </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.header}>{"Science and Technology"}</Text>
          <View style={styles.sidebyside}>
            <View style={styles.column}>
              <TouchableOpacity //biology
                onPress={() => {
                  url = "biology";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://www.clipartkey.com/mpngs/m/37-374607_dna-clipart-dna-ladder.png",
                  }}
                >
                  <Text style={styles.title}>{"Biology"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //climate
                onPress={() => {
                  url = "climate";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://www.clipartkey.com/mpngs/m/75-754214_download-climate-change-png-pic-climate-change-image.png",
                  }}
                >
                  <Text style={styles.title}>{"Climate"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //programming
                onPress={() => {
                  url = "programming";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "data:image/png;base64,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",
                  }}
                >
                  <Text style={styles.longtitle}>{"Programming"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //astronomy
                onPress={() => {
                  url = "astronomy";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://www.clipartkey.com/mpngs/m/123-1232483_telescope-png-transparent-background-telescope-icon.png",
                  }}
                >
                  <Text style={styles.moreopaque}>{"Astronomy"} </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View style={styles.column}>
              <TouchableOpacity //chemistry
                onPress={() => {
                  url = "chemistry";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://www.netclipart.com/pp/m/282-2824647_chemistry-flask-clipart.png",
                  }}
                >
                  <Text style={styles.moreopaque}>{"Chemistry"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //robotics
                onPress={() => {
                  url = "robotics";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://banner2.cleanpng.com/20180204/ake/kisspng-robotic-arm-robotics-icon-robot-arm-cliparts-5a76f9663a7805.7559436615177465342395.jpg",
                  }}
                >
                  <Text style={styles.moreopaque}>{"Robotics"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //engineering
                onPress={() => {
                  url = "engineering";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://www.clipartkey.com/mpngs/m/22-222062_gear-engineering-png-mechanical-engineering-clipart.png",
                  }}
                >
                  <Text style={styles.longtitle}>{"Engineering"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //medicine
                onPress={() => {
                  url = "medicine";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADlCAMAAAAP8WnWAAAAflBMVEX39/cAAAD////6+vr19fXx8fHt7e3g4ODa2trDw8OLi4vS0tLm5ubr6+v29vaxsbGoqKiAgICRkZG9vb2goKCamppycnJ7e3tOTk5lZWU3NzctLS3Ozs5YWFgnJyciIiJubm5PT09HR0c+Pj4cHBwNDQ0VFRW1tbVdXV07OzvHWNSeAAAMeUlEQVR4nO1da1cisRKENCissOrig4eKgs///wcvJJ2hah5MuFdvYs7Up91RPNMzSXdXdafp9Tp06NChQ4cOkSAisW/hp2B6s8uJiX0XPwNz2d/hNkvrZNa3uM/ROrNyxvUXGW68s77HPDvrZFIY1/8a5mbd4GBcf32WmXXOWXqc52bdP7RulJnTNH/QuofcrKN3N87Nulu07iM3667QuqvcrPtA63JLNM0MrfuTm3VjtO46N+su0Lq73KwboXWLrK17zIwkyDlaN+/lbN12kJd1hqxb5UXwzA0alxfBY3K3w/skG+s4TXH4BfRVzA5tt2kerDnL4R1alzx9NQ/Xi8+7q+P+QVOU1UDM/S+yrsj5L47cp4y8bb+KnAOfmTXep4a4J/d2mb4mTM6Jq9003KdM3sj3c0xofiaRUXKB/2rvU87W+x++TotdyeQ8UemBeVq/vuIhA1sxeMOoxrLRZYrWqXtHVMmM9Jb2J2Rb6YMJCivMQBVlMiOytdcxXlc/2LRbo6HWtn5/85esk7m9OoKLGhde8FOJyUbIPtfvcJ9LDOfyaa9hDNTaz5zpa70vigSBW3ubTtC6p0O6bxb2CkZqmdpLX7sFe/4Gn0pIFCPmORE5W8H/C8donu3/MU7LmX0ONleR6WuK1mFZ0foKGWxwkbmU0bgkGeOYDG3MW7ulK0N8JolIfjKFBeV8hfQe0br9QjTX9p/o52Vg48K7j+cy2KZmnZzBcvK+QmSB1n0YTZDRy0tvq+v4cGUOH0qg60GGT/yKFIao2q2zjbygbIp1XFwSfOPRrdN0yoFyel2HCFpp5gXW8eHqoun3//+Q3tfhXkoZPaeM5TdhqjHPXcc3fhlTefDplLuTyn2ywEVFgZqY538C9DXqwjTg8mvyXSYz6Ez0/dSyN3gmMdelge1fmw8ywzu4E5VOGrjb4VPjeMsSN39DRlFfi1PbGrmNz8Ij1n80nTq+fpisuW2nfvRI7i9nm7iLEt3ac/NtMBdaGPG2Hc0exZxfDCPaBmHs89htcMVjPlBv2OYIY9bs0GHPj9+HEAVaXsfeTq1AtfGrrXQo03W/hE3CdQEMz0/thUMZLtm21d90jcPg/D4NuM8SwXtPuNSItbW3sMJTieClW/GgtOOoowSUCN6xOklMlITlYLeHMT9V6yrCcui763EtLsVqFSYcb24fPbYWUv1nqRaXXrWKtNMLzZxfQrMJrsWlVq0igXK3sHQfbUI7gJjgpVXPIYHSLivdR8EdQNyhkVI9R7VvWlSaPy9DwzLT13TqOap9l5aUykBPoR1AHElSqXiQQAkLSvPM19AOII4ladQEVPt2IBKtXiIwESvT1xSs89p33Q15LxFs3Sgx6wTS+oq24b1EaD7MzZbR9x1q+DUd195LhGaMTM4jV4lRxKvNlL2XCM2pmJxHjeaY0Dfkyd5LBFtH1dfBN97sicB0/qXJaXiRK7QDiKSHeMoyinjb5ixSe7qCcyqUHqJVc5CorI5lyH4fheZUUGn4iGQc0pT18fzYV+zDfDtu5EgdwCjivbblj75iHxKXaUHE8ZYkdLVnj6Kxvr1oSIXJUZQXRwQlZO34iv2Ryoj7w8jr4sgpRE8CH6/G++OiGP3hOHIDkZNgLU5LW8eOVtEfjkPHiZq0LB20RONis7CCbXCRyDjdQktWZUYfYJ6S86bpEsQJ4hAeuoWWnEp2y2wNfEdj46o2dFCrWJxeDBK62rJ2F7PgCSg5r5MetFPPoc2p/gzkDB5v65YX59iBlzWSc2qnClbivxX0eAO4pO4y2EAN5JzaqRoZxo+CxKCgLa/JFJB0H8rYzQr0HB5hGD8IEoMCm0FMpY5fR86x5WgV55wqPt7gI+r67iB2+zh5yEBQrWjNwn8G+HhP6KhQ6yB2ewnPO1tsy3kLKaV/P/DxPp7iztSrQFHEx8ob7IpyiMPg8PGe2C2iNAaORXvpYU9fqfQYieSgYHJqi5LGbjgWLVMnUP4xVHiMUxEnfny6O9PTgUBrfe/6NZYd41SMSTAJLrmhr9fodojdVBxyiETgsDMo2FVf3yIj0Oj2ANat2LY4+jJx/+By23WJEVSk51LnVyRyeqpg4lDeRV56PlyiMn+cqsd/I5j0ijuH9+E9pH8+9IfjkFMSFVpctWBbjcZuUGJVvtTshgSTSOQURYUWwcRcPqP1Ghohw3ZdbI6tURk1EjlF4t3iqmVc2jpqHebY+8VqlyWpFXF6f0nXaCtCid1lOBi2ynd6ZmBTAHpoj3E4DhLvAFdtf3szqFhX0SqpdSW4iepbQcQ7QEfUpYbilqZtpUm4MoDsZBmlr1l60KkQVH5Sz4qTddRnbtA6+QsP7SlOXzN2KgSGIR83ziuNRHDGgB5aUJ/39wMJXHAY8tZh3nVZ8iryAs4kzvgkzI1OCEM+fOEp1TE5JD3aqK84zpoEX32SRuqtw6zSXvrSxAS70SO12gPzPkkwOUgIEPLtyTDXmUBHT2M1a5siEG1PvQM/bwD4mZjZuCoGxWvVPtzDyUTLdwHRqX333vCgcbxGbQPichDVwollPvqXAz+JQREbuwTZd3sEl+HLFnaQ717gx0LkNGobM56Gbi8M2N9G6qYOn45Jn/a8fhIyxCErbVHcrWJiBHelxUdqRew2WGIlbXFcOe18UMmZL+pEheijI4qA5fBZkZnNoCpMLpER2C32UiMqxCHeDG7KLX+Bxy7VuMZl6KxbT0uX9Ag4KjFpHLolslo6u2Ld6WpSsQ7TRXN2f+d+GUWFEzOen0LpvB+Ps3LrDBQhv/JG6DTtv2n7JnKgWMoDyVZIvrQJGBNk/f2yAEi2faVxoJjdpQU1kGilFTKNGr7TKw0jSmR2MW84D5oM9GIvQaD2e4vmk2E5J5XJxTiMBoA7SjsAMDNRB3tYmfIXijmRKt4V8JQnwAVa51YmisrKCPwbpu6ZSKJCBYJB96zpy1dERwCCqKyd8xq7Bc/6JDORGevEE2k+MauqwTMavG8v36hxeIA/mTPg0AC/32XN8111+aLOsv/lB0dOUQxK5wS4jhYr3gp/+QpybFUO8Ny0EZfMkBiU0Plv9Cc2F+RshXiaNtFUJH/ySSmd/ha0xa45PlOKZFNF5WWphYPGEqR19puWlC3T8JlSJOfKsdk66gxK6eT3HoIByu4oPlNKNcVZxToSuhKbdFtqzHVFND5TSjVF91YPGT8Fj9iiQg2oPOfeim9IgMWqMG6ubTF7DUNHErNEy+Bxpzaf1wnnCpRMZLp/FGsVFVDoSvSrkeQvJk9P+6yX2362QGCkt/AviYSuNESFGgh2/jo2V3qdSGHMbOZiN4aRRESFOvAwVzevmKbXUmVUCwIYEFumtkUGxTubZ9YYTB/AcBinjT4UvO00s68afAAFw3LSkhakwsfdoBpisiQqoG2ROhVCYeb9MmwGzOOsoIcSw3x432kUqMB1U2VzPI3Zp/wsmCUimDRA99aNqWFz/O4uq+JrKoJJA5SN77Nenu5k82BDTbx7gsfJWZwjAqHQd+OYG2++fSZs2I3+M5yaJSOY1ILm1/K0v32+yMtyh2sScdMRTOqgXFOTxYqI+bgoXyEkJJjUQPmYK4HqW7p9P2YPIiXBpAqVRWh49JWZBFqX6Fc7KZRrPrNtOzZXOaJSh7TEoDKoixC/6KJyRGVn8+itfCVt2xzX1BZ5J/SoxCODL7bk0vBIpATFIIJyzRfs1ipkSqFWUPuWeF5x9FFkR6Fc03Ulq9Ok3qBntu1Q6/kFtjmuubWla3WaLM0dVLvC4xciZdq+RPmYY5nqNMvSnLmwG+8T27QnN4vt/N8kbdvwSyUbbNsvzdFsPKFhv/ZrVEPH/8aBchbHMjUg1PZpify67/r2w2GnYFuikurJ8A0jlmUqP83GtiE0IqhtKfTXfQf8CRvLoDVJSVYKPxFexHPCJCZgGUAbRh5ytE1FvDHU9hMuYZwGFfFmYFucSUA/AGwlV9vSLs+cAPyCLbVt8+sykAaojnCTpW0HPirS1A30S3HgbGLGTgBKpA/5f4fymnuz4zFaMU27ZHgCivzYTL2q/JWNbWPNIQe+U2v9kTblDEdhm68uvl3l4ia9GPQ48/WZ214uKVdRnPc1/T8Rv03xu8E9eP37aT6m8bfp9BeTXPzIHjSS5HGUk2nUKrp5yMo07AxajvMyDcZ2vGYTswsUtYyr7Ezz7HSXjmTk/Qvsj0Q8XeWTjjDM6CLLt+aQTX7coUOHDh06dOjQoUOHDh06dOjQoUOHDh06dAjCfwAHeIirSkYI7gAAAABJRU5ErkJggg==",
                  }}
                >
                  <Text style={styles.moreopaque}>{"Medicine"} </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.header}>{"Entertainment"}</Text>
          <View style={styles.sidebyside}>
            <View style={styles.column}>
              <TouchableOpacity //movies and tv
                onPress={() => {
                  url = "moviesandtv";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "data:image/png;base64,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",
                  }}
                >
                  <Text style={styles.moreopaque}>{"Movies/TV"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity //music
                onPress={() => {
                  url = "music";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "https://www.netclipart.com/pp/m/85-857076_headphones-clipart-svg-transparent-headphones-clipart.png",
                  }}
                >
                  <Text style={styles.title}>{"Music"} </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={styles.column}>
              <TouchableOpacity //sports
                onPress={() => {
                  url = "sports";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "data:image/jpeg;base64,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",
                  }}
                >
                  <Text style={styles.title}>{"Sports"} </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  url = "videogames";
                  this.props.navigation.navigate("Articles");
                }}
              >
                <ImageBackground
                  style={styles.image}
                  source={{
                    uri:
                      "data:image/png;base64,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",
                  }}
                >
                  <Text style={styles.title}>{"Video Games"} </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

function getURL() {
  return url;
}
class ArticleList extends Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state;
  }
  state = {
    isReady: false,
  };

  loadAPI = async () => {
    <ActivityIndicator> </ActivityIndicator>;
    const localhost = "https://d943db2c6405.ngrok.io";
    let res = await fetch(localhost + "/" + getURL());
    let data = await res.json();
    this.title = data.title;
    this.link = data.link;
    this.image = data.image;
    this.setState({ isLoading: false });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadAPI}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={articleStyles.fullArticle}>
        <TouchableOpacity
          style={articleStyles.container}
          onPress={() => {
            Linking.openURL(this.link);
          }}
        >
          <Text style={articleStyles.text}>{this.title}</Text>
          <ImageBackground
            source={{ uri: this.image }}
            style={articleStyles.image}
          ></ImageBackground>
          <Text style={articleStyles.text}> </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sidebyside: {
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowOpacity: 0.4,
  },
  header: {
    fontSize: 32,
    backgroundColor: "rgb(32, 179, 90)",
    padding: 20,
    textAlign: "center",
    color: "blue",
    opacity: 0.75,
    fontFamily: Platform.OS === "ios" ? "Trebuchet MS" : "serif",
  },
  title: {
    fontSize: 20,
    backgroundColor: "#fff",
    color: "teal",
    width: "100%",
    height: 120,
    opacity: 0.75,
    padding: 30,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Trebuchet MS" : "serif",
    flexWrap: "wrap",
  },
  longtitle: {
    fontSize: 20,
    backgroundColor: "#fff",
    color: "teal",
    width: "100%",
    height: 120,
    opacity: 0.75,
    padding: 20,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Trebuchet MS" : "serif",
  },
  moreopaque: {
    fontSize: 20,
    backgroundColor: "#fff",
    color: "teal",
    width: "100%",
    height: 120,
    opacity: 0.85,
    padding: 30,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Trebuchet MS" : "serif",
    flexWrap: "wrap",
  },
  column: {
    width: "50%",
  },
  image: {
    width: "100%",
  },
  logo: {
    height: 200,
    width: "100%",
  },
});

const articleStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  image: {
    height: 300,
    width: 300,
    alignSelf: "center",
    fontFamily: Platform.OS === "ios" ? "Trebuchet MS" : "serif",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Trebuchet MS" : "serif",
    color: "blue",
    padding: 10,
  },
  fullArticle: {
    backgroundColor: "rgb(32, 179, 90)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Platform.OS === "ios" ? "10" : 0,
    top: Platform.OS === "ios" ? "10%" : "2%",
  },
});

export default App;
