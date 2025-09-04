# Brainwave-matrix-intern
A real time chat application by using goggle firebase .

#  Real-Time Chat Application

![dashboard chat-app](https://github.com/user-attachments/assets/37527286-d729-41af-965d-420e54e6e363)


A **real-time chat application** built using **Firebase** and **Vanilla HTML, CSS, and JavaScript**.  
This project enables users to sign up, log in, and chat in real-time with responsive UI and Firebase integration.

---

## Features
- User authentication with **Firebase Authentication**  
- Real-time messaging using **Firebase Firestore / Realtime Database**  
- Secure **Firestore Security Rules** for safe chat data  
- Attractive and responsive UI built with **HTML, CSS, and JS**  
- Hosted using **Firebase Hosting**  

---

## 🛠Tech Stack
**Frontend:** HTML, CSS, JavaScript  
  **Backend & Database:** Firebase (Authentication + Firestore/Realtime DB)  
  *Hosting:** Firebase Hosting  



## ⚙Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)  
2. Create a new Firebase Project  
3. Enable the following services:
   - **Authentication → Email/Password**  
   - **Firestore Database** or **Realtime Database**  
   - **Firebase Hosting**  
 
  
  // config.js
const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_PROJECT_ID.appspot.com",
messagingSenderId: "SENDER_ID",
appId: "APP_ID"
};


{
"rules": {
"messages": {
".read": "auth != null",
".write": "auth != null"
},
"users": {
"$uid": {
".read": "auth != null && auth.uid == $uid",
".write": "auth != null && auth.uid == $uid"
}

## Screenshots

![chat-app](https://github.com/user-attachments/assets/d2679821-4eb7-46b4-a431-7918662b3e9d)





##  Future Improvements
- Add group chat functionality  
- Allow image/file sharing  
- Add push notifications  


🔗 Connect on mohdtarik0423@gmail.com


