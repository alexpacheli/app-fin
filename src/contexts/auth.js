import React, { createContext, useEffect, useState } from "react";
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { set, ref, onValue } from 'firebase/database';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
                }, {
                    onlyOnce: true
                })

                return;
            }

            setLoading(false);
        })

    }, []);

    //Login Usuário
    async function signIn(email, password) {
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

                }, {
                    onlyOnce: true
                })
            })
            .catch((error) => {
                alert(error.message)
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
                        }

                        setUser(data);
                    })
            })
            .catch((error) => {
                alert(error.message);
            })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signUp, signIn, signOutFb }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;