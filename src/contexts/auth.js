import React, { createContext, useEffect, useState } from "react";
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { set, ref, onValue } from 'firebase/database';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {

            if (user) {

                onValue(ref(db, 'users/' + user.uid), (snapshot) => {
                    let data = {
                        uid: user.uid,
                        email: user.email,
                        nome: snapshot.val().nome,
                        saldo: snapshot.val().saldo
                    }

                    setUser(data);
                    setLoading(false);
                });

                return;
            }

            setLoading(false);
        })

    }, []);

    //Login Usuário
    async function signIn(email, password) {
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                let uid = userCredential.user.uid;

                await onValue(ref(db, 'users/' + uid), (snapshot) => {
                    let data = {
                        uid: uid,
                        nome: snapshot.val().nome,
                        email: userCredential.user.email,
                        saldo: snapshot.val().saldo
                    }

                    setUser(data);
                    setLoadingAuth(false);

                }, {
                    onlyOnce: true
                })
            })
            .catch((error) => {
                alert(error.message);
                setLoadingAuth(false);
            })
    }

    async function signOutFb() {
        await signOut(auth)
        .then(() => {
            setUser(null);
        }).catch((error) => {
            alert(error.message);
        });
    }

    //Cadastrar Usuário
    async function signUp(email, password, nome) {
        setLoadingAuth(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                let uid = userCredential.user.uid;

                await set(ref(db, 'users/' + uid), {
                    saldo: 0,
                    nome: nome
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: userCredential.user.email,
                            saldo: 0
                        }

                        setUser(data);
                        setLoadingAuth(false);
                    })
            })
            .catch((error) => {
                alert(error.message);
                setLoadingAuth(false);
            })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, loadingAuth, signUp, signIn, signOutFb }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;