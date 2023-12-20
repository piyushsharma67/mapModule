import React from 'react'
import { ActivityIndicator, View, StyleSheet, Modal, Dimensions, Text } from 'react-native'

const { width, height } = Dimensions.get("window")
const hf = 812 / height

interface modalProps {
    loading: boolean
}

const Loader = (props: modalProps) => (
    <Modal
        transparent
        animationType="none"
        visible={props.loading}
        onRequestClose={() => { ('close modal') }}>
        <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator
                    animating={props.loading}
                    color="#2E9E92"
                    size="large" />
                <Text style={{ color: 'black' }}>Please Wait!!</Text>
            </View>
        </View>
    </Modal>
)

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000020'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 50 * hf,
        width: width * 0.42,
        // borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
});

export default Loader