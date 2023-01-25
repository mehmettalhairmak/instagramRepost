import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

interface LoadingProps {
  visible: boolean;
}

const Loading: React.FC<LoadingProps> = ({ visible }) => {
  return (
    <Modal animationType="fade" visible={visible}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

export default Loading;
