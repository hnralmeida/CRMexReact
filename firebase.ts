// Firebase
import {
  FirebaseApp,
  initializeApp
} from "@firebase/app";
import {
  Firestore,
  getFirestore,
  collection,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
}
  from "@firebase/auth";

import useController from "react-hook-form";
import { companyData } from "./src/types/authentication";
import Api from "./src/services/api";

const _config = {

  apiKey: "AIzaSyAlXotajqC1ZajDanA5Dc6iOaPWCL4iesU",
  authDomain: "forcavendas-32833.firebaseapp.com",
  projectId: "forcavendas-32833",
  storageBucket: "forcavendas-32833.appspot.com",
  messagingSenderId: "683846648564",
  appId: "1:683846648564:web:06a2cb41ff8ccf444a14a1",
  measurementId: "G-5H1FB2VRWW"

};

class ExternalAuthService {

  private static instance: ExternalAuthService;

  app: FirebaseApp;
  fs: Firestore;
  auth: Auth;

  private constructor() {
    this.app = initializeApp(_config);
    this.fs = getFirestore(this.app);
    this.auth = getAuth();
  }

  public static getInstance(): ExternalAuthService {
    if (!ExternalAuthService.instance) {
      ExternalAuthService.instance = new ExternalAuthService();
    }

    return ExternalAuthService.instance;
  }

  initialize() {
    return;
  }

  getAuth() {
    return this.auth;
  }

  async createEmpresaWithEmailAndPassword(form: useController.FieldValues, id: number) {
    console.log(form, id);

    createUserWithEmailAndPassword(this.auth, form.email, form.senha);
    const docRef = collection(this.fs, "empresas");
    await setDoc(doc(docRef, form.email), {
      id: id,
      cnpj: form.cnpj,
      razao_social: form.razao_social,
      nome_fantasia: form.nome_fantasia,
      email: form.email
    });

  }

  async createUserWithEmailAndPassword(form: useController.FieldValues, id: number) {
    console.log(form, id);

    createUserWithEmailAndPassword(this.auth, form.email, form.senha);
    const docRef = collection(this.fs, "usuarios");
    await setDoc(doc(docRef, form.email), {
      id: id,
      id_empresa: form.id_empresa,
      nome_empresa: form.nome_empresa,
      mac_auth: form.mac_auth,
      nome_usuario: form.nome_usuario,
      email: form.email,
      codigo_usuario: form.codigo_usuario
    });

  }

  async signInWithEmailAndPassword(user: string, password: string): Promise<companyData | undefined> {

    console.log("SignIn", user);

    return new Promise<companyData>((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, user, password).then((res) => {
        console.log("SignIn ", res)

        const docRef = collection(this.fs, "empresas");

        getDoc(doc(docRef, user)).then((res) => {
          console.log(res);
          if (res.data() as companyData) {
            return resolve(res.data() as companyData);
          }else{
            return reject(new Error("Erro de Login: Área restrita à empresas"));
          }
        }).catch((error) => {
          console.log(res);
          return reject(error);
        });

      }).catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            return reject(new Error('Erro de Login: ' + 'Insira um email válido'));
          case 'auth/user-not-found':
            return reject(new Error('Erro de Login: ' + 'Usuário não registrado'));
          case 'auth/wrong-password':
            return reject(new Error('Erro de Autenticação: ' + 'Senha incorreta'));
          case 'auth/too-many-requests':
            return reject(new Error('Erro de Autenticação: ' + 'Login desabilitado devido a tentativas excessivas de login. Tente mais tarde ou redefina sua senha'));
          default:
            return reject(new Error('Erro desconhecido: ' + 'Consulte o administrador para mais detalhes'));
        }
      })
    })
  }

  // Deleta da Coleção do firestore, mas não do firebase
  async deleteUser(user: string): Promise<boolean> {

    const docRef = doc(this.fs, 'empresas', user);

    console.log("deleteUser", docRef);

    return new Promise<boolean>((resolve, reject) => {
      deleteDoc(docRef).then(() => {
        return resolve(true);
      }).catch((error) => {
        return reject(error);
      })
    })
  }

  async updateUser(form: useController.FieldValues) {
    //const docRef = collection(this.fs, "users");

    const endpoint = "/empresas/" + form.id;

    Api.put(endpoint, form).then(() => {
      console.log("Firebase update", form);

      updateDoc(doc(this.fs, "empresas", form.email), form).then(() => {
        console.log("faça login novamente");
      }).catch((error) => {
        return error;
      });
    }).catch((error) => {
      return error;
    });

  }

  // ******************************** Fim da classe ********************************
}



export { ExternalAuthService }; 