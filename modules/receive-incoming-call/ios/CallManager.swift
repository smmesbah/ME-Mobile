//
//  callManager.swift
//  callResponse
//
//  Created by Samina Tasneem on 16/7/24.
//

import Foundation
import CallKit
import UserNotifications
import PushKit

@available(iOS 14.0, *)
final class CallManager: NSObject, CXProviderDelegate, PKPushRegistryDelegate, ObservableObject, CXCallObserverDelegate {
    func pushRegistry(_ registry: PKPushRegistry, didUpdate pushCredentials: PKPushCredentials, for type: PKPushType) {
        
    }

    let provider = CXProvider(configuration: CXProviderConfiguration())
    let callController = CXCallController()
    let callObserver = CXCallObserver()
    
    override init() {
        super.init()
        provider.setDelegate(self, queue: nil)
        callObserver.setDelegate(self, queue: nil)
    }
    public func helloWold() -> String {
        let text = "Hello world! 👋"
        return text
      }
    public func answerIncomingCall(id: UUID){
        let action = CXAnswerCallAction(call: id)
        let transaction = CXTransaction(action: action)
//        print(transaction.isComplete, transaction.uuid, transaction.actions)
        callController.request(transaction) { error in
            if let error = error {
                print("Transaction is complete: ", transaction.isComplete)
                print("Failed to answer incoming call: ", error.localizedDescription)
            }
            else {
                print("Incoming call answered successfully")
            }
        }
    }
    public func reportIncomingCall(id: UUID, handle: String){
        print("Reporting call")
        let update = CXCallUpdate()
        update.remoteHandle = CXHandle(type: .generic, value: handle)
        print("handle: ", update)
//        answerIncomingCall(id: id)
        provider.reportNewIncomingCall(with: id, update: update){error in
            if let error = error {
                print(String(describing: error))
            }else {
                print("call reported")
                self.answerIncomingCall(id: id)
                
            }
        }
    }
    public func startCall(id: UUID, handle: String){
        print("Starting call to: ", handle)
        let handle = CXHandle(type: .phoneNumber, value: "+8801317615115")
        let action = CXStartCallAction(call: id, handle: handle)
        let transaction = CXTransaction(action: action)
        callController.request(transaction) {error in
            if let error = error {
                print(String(describing: error))
            }else {
                print("call started")
//                self.reportIncomingCall(id: id, handle: "Samina")
            }
        }
    }
    public func endCall(id: UUID) {
            let action = CXEndCallAction(call: id)
            let transaction = CXTransaction(action: action)
            
            callController.request(transaction) { error in
                if let error = error {
                    print("Failed to end call: \(error.localizedDescription)")
                } else {
                    print("Call ended")
                }
            }
        }
    
    func pushRegistry(_ registry: PKPushRegistry,
              didReceiveIncomingPushWith payload: PKPushPayload,
              for type: PKPushType,
              completion: @escaping () -> Void) {
        print("Push notification is working")
       if type == .voIP {
          // Extract the call information from the push notification payload
          if let handle = payload.dictionaryPayload["handle"] as? String,
                let uuidString = payload.dictionaryPayload["callUUID"] as? String,
                let callUUID = UUID(uuidString: uuidString) {


             // Configure the call information data structures.
             let callUpdate = CXCallUpdate()
             let phoneNumber = CXHandle(type: .generic, value: handle)
             callUpdate.remoteHandle = phoneNumber
                    
             // Report the call to CallKit, and let it display the call UI.
             provider.reportNewIncomingCall(with: callUUID,
                         update: callUpdate, completion: { (error) in
                if error == nil {
                   // If the system allows the call to proceed, make a data record for it.
//                   let newCall = VoipCall(callUUID, phoneNumber: phoneNumber)
//                   self.callManager.addCall(newCall)
                }


                // Tell PushKit that the notification is handled.
                completion()
             })
                    
             // Asynchronously register with the telephony server and
             // process the call. Report updates to CallKit as needed.
//             establishConnection(for: callUUID)
          }
       }
    }
    
    func provider(_ provider: CXProvider, perform action: CXAnswerCallAction) {
        print("From provider: call has been answered")
        action.fulfill()
        return
    }
    func provider(_ provider: CXProvider, perform action: CXEndCallAction){
        print("From provider: call has been canceled")
        action.fail()
        return
    }
    func providerDidReset(_ provider: CXProvider) {
        print("Provider did reset")
    }
    // CXCallObserverDelegate
    @objc func callObserver(_ callObserver: CXCallObserver, callChanged call: CXCall) {
        if call.hasEnded {
            print("From observer: Call has ended")
        } else if call.isOutgoing {
            print("From observer: Outgoing call")
        } else if call.isOnHold {
            print("From observer: Call is on hold")
        } else if call.hasConnected {
            print("From observer: Call has connected")
        } else if !call.isOutgoing && !call.hasEnded {
            print("From observer: Incoming call")
//            self.reportIncomingCall(id: UUID(), handle: "+8801826700175")
        }
    }
}
