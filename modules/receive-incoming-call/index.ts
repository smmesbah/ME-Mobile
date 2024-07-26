import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ReceiveIncomingCall.web.ts
// and on native platforms to ReceiveIncomingCall.ts
import ReceiveIncomingCallModule from './src/ReceiveIncomingCallModule';
import ReceiveIncomingCallView from './src/ReceiveIncomingCallView';
import { ChangeEventPayload, ReceiveIncomingCallViewProps } from './src/ReceiveIncomingCall.types';

// Get the native constant value.
export const PI = ReceiveIncomingCallModule.PI;

export function hello(): string {
  return ReceiveIncomingCallModule.hello();
}

export function helloWorld(): string {
  return ReceiveIncomingCallModule.helloWorld();
}

export async function receiveIncomingCalls() {
  await ReceiveIncomingCallModule.receiveIncomingCalls()
}

export async function setValueAsync(value: string) {
  return await ReceiveIncomingCallModule.setValueAsync(value);
}

const emitter = new EventEmitter(ReceiveIncomingCallModule ?? NativeModulesProxy.ReceiveIncomingCall);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ReceiveIncomingCallView, ReceiveIncomingCallViewProps, ChangeEventPayload };
