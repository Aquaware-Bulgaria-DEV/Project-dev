import MaterialCommunityIconsI from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIconsI from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIconsI from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeI from 'react-native-vector-icons/FontAwesome'
import FoundationI from 'react-native-vector-icons/Foundation'
import EvilIconsI from 'react-native-vector-icons/EvilIcons'
import OcticonsI from 'react-native-vector-icons/Octicons'
import IoniconsI from 'react-native-vector-icons/Ionicons'
import FeatherI from 'react-native-vector-icons/Feather'
import EntypoI from 'react-native-vector-icons/Entypo'
import ZocialI from 'react-native-vector-icons/Zocial'
import AntDesignI from 'react-native-vector-icons/AntDesign'
import React from 'react'

export const MaterialCommunityIcons = props => (
    <MaterialCommunityIconsI {...props} />
)
 const SimpleLineIcons = props => <SimpleLineIconsI {...props} />
 const MaterialIcons = props => <MaterialIconsI {...props} />
 const FontAwesome = props => <FontAwesomeI {...props} />
 const Foundation = props => <FoundationI {...props} />
 const EvilIcons = props => <EvilIconsI {...props} />
 const Ionicons = props => <IoniconsI {...props} />
 const Octicons = props => <OcticonsI {...props} />
 const Feather = props => <FeatherI {...props} />
 const Entypo = props => <EntypoI {...props} />
 const Zocial = props => <ZocialI {...props} />
 const AntDesign = props => <AntDesignI {...props} />

const getIcon = (name,color, size) => {
    switch (name) {
      case 'home':
        return (
          <Octicons name={name} size={size? size : 35} color={color} />
        );
      case 'droplet':
        return (
          <Feather name={name} size={size? size : 35} color={color} />
        );
      case 'user':
        return (
          <AntDesign name={name} size={size? size : 35} color={color} />
        );
      case 'settings':
        return (
          <SimpleLineIcons name={name} size={size? size : 35} color={color} />
        );
      case 'bar-chart':
        return (
          <MaterialIcons name={name} size={size? size : 35} color={color} />
        );
      case 'emergency-share':
        return (
          <MaterialIcons name={name} size={size? size : 35} color={color} />
        );
      case 'plus':
        return (
          <AntDesign name={name} size={size? size : 25} color={color} />
        );
      case 'trash':
        return (
          <EvilIcons name={name} size={size? size : 35} color={color} />
        );
      case 'pencil':
        return (
          <SimpleLineIcons name={name} size={size? size : 20} color={color} />
        );
      case 'refresh':
        return (
          <EvilIcons name={name} size={size? size : 20} color={color} />
        );
      default:
        break;
    }
}

export default getIcon;