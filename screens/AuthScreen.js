import React, {useState} from 'react'
import { StyleSheet, View, TextInput, KeyboardAvoidingView} from 'react-native'
import {Text, Input, Button} from 'react-native-elements'

const API_URL = 'http://192.168.1.107:5000/users/'

const AuthScreen = ({navigation}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pic, setPic] = useState('')

    const [isError, setIsError] = useState('')
    const [message, setMessage] = useState('')

    
    const register = () => {
       const payload ={
            name,
            email,
            password,
            pic
       }

       fetch(`${API_URL}/signup`, {
           method:'POST',
           headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
       })
       .then(async res => { 
        try {
            const jsonRes = await res.json();
            if (res.status !== 200) {
                setIsError(true);
                setMessage(jsonRes.message);
            } else {
                onLoggedIn(jsonRes.token);
                setIsError(false);
                setMessage(jsonRes.message);
            }
        } catch (err) {
            console.log(err);
        };
    })
    .catch(err => {
        console.log(err);
    });
    }

    return (
        <KeyboardAvoidingView>
            
            <Input placeholder="Fullname" value={name} onChangeText={(text) => setName(text)} />
            <Input placeholder="Email" value={email} onChangeText={(text) => setEmail(text)}  />
            <Input  placeholder="Password" value={password} secureTextEntry onChangeText={(text) => setPassword(text)} />
            <Input  placeholder="Profile Picture"  value={pic} onChangeText={(text) => setPic(text)} onSubmitEditing={register} />

            <Button title="SignUp" onPress={register} />
       
        </KeyboardAvoidingView>
         
        
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    
    
})
