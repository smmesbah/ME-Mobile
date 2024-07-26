import * as React from 'react';

import { ReceiveIncomingCallViewProps } from './ReceiveIncomingCall.types';

export default function ReceiveIncomingCallView(props: ReceiveIncomingCallViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
