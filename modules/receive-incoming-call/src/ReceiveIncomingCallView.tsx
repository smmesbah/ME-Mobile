import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ReceiveIncomingCallViewProps } from './ReceiveIncomingCall.types';

const NativeView: React.ComponentType<ReceiveIncomingCallViewProps> =
  requireNativeViewManager('ReceiveIncomingCall');

export default function ReceiveIncomingCallView(props: ReceiveIncomingCallViewProps) {
  return <NativeView {...props} />;
}
