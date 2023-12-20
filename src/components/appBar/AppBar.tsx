import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle, Text, TouchableOpacity } from 'react-native';


export interface IAppBarProps {
    children?: React.ReactNode,
    style?: StyleProp<ViewStyle>
}

export interface IAppBarContentProps {
    title: string,
    subtitle?: string,
    style?: StyleProp<ViewStyle>,
    titleStyle?: StyleProp<TextStyle>,
    subtitleStyle?: StyleProp<TextStyle>
}


const AppBarContent = React.memo((props: IAppBarContentProps) => (
    <View style={[styles.content, props.style]}>
        <Text style={[props.titleStyle, styles.title]}
            numberOfLines={1}>
            {props.title}
        </Text>
    </View>
));

class AppBar extends React.PureComponent<IAppBarProps> {

    /* constructor(props: IAppBarProps) {
        super(props);
    } */

    public static Content = AppBarContent;

    render() {
        return (
            <View style={[styles.appbar, this.props.style]}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    appbar: {
        width: "100%",
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingRight: 8,
        elevation: 4
    },
    content: {
        flexShrink: 1,
        flexGrow: 1,
        paddingHorizontal: 18
    },
    title: {
        color: 'purple',
        fontSize: 18,
        fontWeight: '700'

    }
});

export default AppBar;