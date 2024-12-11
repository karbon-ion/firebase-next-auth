import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification, User } from "firebase/auth";
import { app } from "./config";

const auth = getAuth(app);

export const SignIn = async (email: string, password: string) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response;
    } catch (error) {
        throw error;
    }
};

export const SignUp = async (email: string, password: string) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        await sendVerificationEmail(response.user);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      }, reject);
    });
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw error;
    }
};

export const sendVerificationEmail = async (user: User) => {
    try {
        await sendEmailVerification(user);
    } catch (error) {
        throw error;
    }
};

export default auth;