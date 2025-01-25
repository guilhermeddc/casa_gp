import { auth, firestore } from "@/shared/lib/firebase";
import { User } from "@/shared/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const collectionName = "users";

class UserService {
  async store({ email, password }: User & { password: string }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(firestore, collectionName, user.uid), {
        uid: user.uid,
        email,
      });

      console.log("Usuário registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login bem-sucedido:", userCredential.user);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }
}

export const userService = new UserService();
