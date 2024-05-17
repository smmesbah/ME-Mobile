import { ReactNode } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'

const { width, height } = Dimensions.get("screen");

export type TextInputCompProps = {
    labelText: string;
    placeholder?: string;
    onChangeFunc: (value: any) => void;
    value: any;
    secureTextEntry?: boolean;
    icon?: ReactNode;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
}
const TextInputComp: React.FC<TextInputCompProps> = ({ labelText, placeholder, onChangeFunc, value, secureTextEntry, icon, autoCapitalize }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                {labelText}
            </Text>
            <View>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(text) => onChangeFunc(text)}
                    value={value}
                    placeholder={placeholder ? placeholder : ""}
                    placeholderTextColor={"#696969"}
                    autoComplete="username"
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={autoCapitalize}
                />
                {icon && <View style={styles.iconContainer}>{icon}</View>}
            </View>
        </View>
    )
}

export default TextInputComp

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 16,
        color: '#2A2A2A',
        fontFamily: 'Regular',
        fontWeight: 400,
    },
    textInputStyle: {
        height: 50,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        padding: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        fontFamily: "Regular",
        color: "#696969"
    }
})