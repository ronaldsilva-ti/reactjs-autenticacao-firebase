import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBn67BNGYSLJRY-l0ZEZgfV10_c358RPs8",
    authDomain: "crud-react-264e4.firebaseapp.com",
    databaseURL: "https://crud-react-264e4.firebaseio.com",
    projectId: "crud-react-264e4",
    storageBucket: "crud-react-264e4.appspot.com",
    messagingSenderId: "360024703840",
    appId: "1:360024703840:web:5ad01c2db4261c473e5405"
  };

  // Initialize Firebase
  app.initializeApp(firebaseConfig);

  const db = app.firestore();//abrindo o "banco de dados"
  const auth =  app.auth();//autentificação


  export  {db,auth}