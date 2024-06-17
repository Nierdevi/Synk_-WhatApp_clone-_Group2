import firebase  from  'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig= {
  
        apiKey: "AIzaSyDurup7_MujpouVOlRHTlF6KESzJpI7uSY",
        authDomain: "synk-3f759.firebaseapp.com",
        projectId: "synk-3f759",
        storageBucket: "synk-3f759.appspot.com",
        messagingSenderId: "712176177750",
        appId: "1:712176177750:web:274cdd26ca84e540b961f7",
        measurementId: "G-NRBYKXNZ0B"
      }
       
if (!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}
