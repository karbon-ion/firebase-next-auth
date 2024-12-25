import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification, User, UserCredential } from "firebase/auth";
import { auth } from "./config";


export const SignIn = async (email: string, password: string): Promise<UserCredential> => {
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

export const getCurrentUser = (): User | null => {
    return auth.currentUser;
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
}

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