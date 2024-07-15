import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import getIcon from '../../utils/icons';


/////////////////////////// Try to add as a tabs.screen the singleRoom and hide just that tab from the tab bar


const TabIcon = ({localIcon, color, name, focused, iconName }) => {

  return (
    <View
      style={[{
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center",
        // width: 100,
        gap: 10 
      }, focused ? {} : {}]}  // Here must find solution about the expanding on focus tab
    >
      {getIcon(iconName, color)}
      {/* <Image
        source={localIcon}
        style={{ resizeMode: "contain", height: 35, tintColor: color }}
      /> */}
      <Text style={[styles.tabIconText, {color: color}]}>
        {focused ? name : null}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const { width, height } = Dimensions.get("window");
  const [showTitle, setShowTitle] = React.useState(true)
  React.useEffect(() => {
    if(width <= 760){
      setShowTitle(false);
    }
    // console.log(width)
  }, [])

  return (
    <Tabs
      screenOptions={{
        headerTransparent: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) =>
            <TabIcon
              color={color}
              name={showTitle ? "Home" : null}
              showTitle
              iconName={'home'}
              focused={focused}
            />
        }}
      />
      <Tabs.Screen
        name="tips/index"
        options={{
          title: "Tips",
          tabBarIcon: ({ color, focused }) =>
            <TabIcon
              color={color}
              name={showTitle ? "Tips" : null}
              iconName={'droplet'}
              focused={focused}
            />
        }}
      />
      <Tabs.Screen
        name="user/index"
        options={{
          title: "User",
          tabBarIcon: ({ color, focused }) =>
            <TabIcon
              color={color}
              iconName={'user'}
              name={showTitle ? "Users" : null}
              focused={focused}
            />
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) =>
            <TabIcon
              iconName={'settings'}
              color={color}
              name={showTitle ? "Settings" : null}
              focused={focused}
            />
        }}
      />
      <Tabs.Screen
        name="statistic/index"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color, focused }) =>
            <TabIcon
              iconName={'bar-chart'}
              color={color}
              name={showTitle ? "Statistics" : null}
              focused={focused}
            />
        }}
      />
      <Tabs.Screen
        name="troubleshoot/index"
        options={{
          title: "Trouble",
          tabBarIcon: ({ color, focused }) =>
            <TabIcon
              iconName={'emergency-share'}
              color={color}
              name={showTitle ? "Breakdown" : null}
              focused={focused}
            />
        }}
      />
      <Tabs.Screen 
        name="singleRoom/index"
        options={{
          title: 'SingleRoomView',
          tabBarIcon: ({ color, focused }) =>
          <TabIcon
            // iconName={'emergency-share'}
            color={color}
            name={showTitle ? "SingleRoomView" : null}
            focused={focused}
          />,
          href: null
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabBar: {
    display: "flex",
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopWidth: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  tabBarItem: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  tabIconText: {
     fontSize: 15,
  }
});
