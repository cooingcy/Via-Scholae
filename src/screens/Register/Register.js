import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Alert, ScrollView} from 'react-native'
import {
  CustomLogo,
  CustomLabelText,
  ButtonCadastro,
  CustomInput,
  Line,
  Return,
} from '../../components'
import {
  styles,
  Container,
  LogoContainer,
  Form,
  TitleText,
  Motorista,
  TermsText,
  TermsText1,
  CheckBoxContainer,
} from './styles'
import { useNavigation } from '@react-navigation/native'
import { useDatabase } from '../../database'
import axios from 'axios'

export const Register = () => {
  const navigation = useNavigation()
  const db = useDatabase()

  const [username, setUsername] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [end, setEnd] = useState('')
  const [cep, setCEP] = useState('')
  const [senha, setSenha] = useState('')
  const [confSenha, setConfirmeSenha] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const handleGetAddress = async (cep) => {
    if (cep.length !== 8) {
      return
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const { logradouro, localidade, uf } = response.data

      if (logradouro) {
        setEnd(`${logradouro}, ${localidade} - ${uf}`)
      } else {
        Alert.alert('Erro', 'CEP não encontrado')
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar o endereço')
    }
  }

  useEffect(() => {
    if (cep.length === 8) {
      handleGetAddress(cep)
    }
  }, [cep])

  const handleRegister = async () => {


    if (
      username === '' ||
      telefone === '' ||
      email === '' ||
      end === '' ||
      cep === '' ||
      senha === '' ||
      confSenha === ''
    ) {
      Alert.alert('Atenção!', 'Preencha todos os campos.')
      return
    }

    if (senha !== confSenha) {
      Alert.alert('Erro', 'As senhas não coincidem')
      return
    }

    try {
      const existingResponsavel = await db.getFirstAsync(
        'SELECT * FROM Responsavel WHERE phone = ? OR email = ?',
        [telefone, email]
      )

      if (existingResponsavel) {
        Alert.alert('Erro', 'Este número de telefone ou email já existe')
        return
      }

      await db.runAsync(
        'INSERT INTO Responsavel (name, phone, email, end, cep, password) VALUES (?, ?, ?, ?, ?, ?)',
        [username, telefone, email, end, cep, senha]
      )

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!')
      navigation.navigate('Splash', { user: username })
    } catch (error) {
      console.error('Erro ao cadastrar: ', error)
      Alert.alert('Erro', 'Erro ao cadastrar. Tente novamente.')
    }
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LogoContainer>
          <TouchableOpacity style={styles.return}>
            <Return
              style={styles.return}
              onPress={() => navigation.navigate('Splash')}
            />
          </TouchableOpacity>
          <CustomLogo style={styles.img} />
        </LogoContainer>

        <Form>
          <TitleText>Registro Responsável</TitleText>
          <Line style={styles.line}></Line>

          <CustomLabelText>Digite seu nome completo</CustomLabelText>
          <CustomInput
            placeholder="Insira seu nome"
            onChangeText={setUsername}
            value={username}
            maxLength={30}
          />

          <CustomLabelText>Digite seu telefone</CustomLabelText>
          <CustomInput
            placeholder="Insira seu número de telefone"
            keyboardType="phone-pad"
            onChangeText={setTelefone}
            value={telefone}
            maxLength={11}
          />

          <CustomLabelText>Digite seu Email</CustomLabelText>
          <CustomInput
            placeholder="Insira seu Email"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            maxLength={100}
          />

          <CustomLabelText>Digite seu Endereço</CustomLabelText>
          <CustomInput
            placeholder="Insira seu Endereço"
            onChangeText={setEnd}
            value={end}
            maxLength={100}
          />

          <CustomLabelText>Digite seu CEP</CustomLabelText>
          <CustomInput
            placeholder="Insira seu CEP"
            onChangeText={setCEP}
            value={cep}
            maxLength={8}
            keyboardType="phone-pad"
          />

          <CustomLabelText>Digite uma senha</CustomLabelText>
          <CustomInput
            placeholder="Digite uma senha"
            secureTextEntry
            onChangeText={setSenha}
            value={senha}
            maxLength={16}
          />

          <CustomLabelText>Confirme sua senha</CustomLabelText>
          <CustomInput
            placeholder="Confirme sua senha"
            secureTextEntry
            onChangeText={setConfirmeSenha}
            value={confSenha}
            maxLength={16}
          />

          <CheckBoxContainer>
            {/*<CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              tintColors={{ true: '#E1B415', false: '#A7A6A6' }}
            />*/}

            <TermsText1>Aceito os </TermsText1>
            <TermsText onPress={() => navigation.navigate('TermosdeUso')}>
              Termos de Uso
            </TermsText>
          </CheckBoxContainer>

          <ButtonCadastro onPress={handleRegister}>Cadastre-se</ButtonCadastro>
          <Motorista onPress={() => navigation.navigate('RegisterMotorista')}>
            Sou Motorista
          </Motorista>
        </Form>
      </ScrollView>
    </Container>
  )
}
