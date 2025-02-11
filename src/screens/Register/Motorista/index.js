import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Alert, ScrollView } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useNavigation } from '@react-navigation/native'
import { useDatabase } from '../../../database'
import axios from 'axios'
import {
  CustomLogo,
  CustomLabelText,
  ButtonCadastro,
  CustomInput,
  Line,
  Return,
} from '../../../components'
import {
  styles,
  Container,
  LogoContainer,
  Form,
  TitleText,
  ImgContainer,
  ImagePreview,
  CheckBoxContainer,
  TermsText,
  TermsText1,
} from './styles'

export const RegisterMotorista = () => {
  const navigation = useNavigation()
  const db = useDatabase()
  const [username, setUsername] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [end, setEnd] = useState('')
  const [cep, setCEP] = useState('')
  const [vagas, setVagas] = useState('')
  const [senha, setSenha] = useState('')
  const [confSenha, setConfirmeSenha] = useState('')
  const [cnhFrente, setCnhFrente] = useState(null)
  const [cnhVerso, setCnhVerso] = useState(null)
  const [isChecked, setIsChecked] = useState(false)

  if (!db) {
    Alert.alert('Erro', 'Banco de dados não está disponível.')
    return
  }

  // Ao selecionar a imagem, chame saveImageLocally e passe o caminho da imagem não criptografada
  const pickImage = async (setImage, filename) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert('Erro', 'É necessário permitir o acesso à galeria!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const savedPath = await saveImageLocally(result.assets[0].uri, filename)
      if (savedPath) {
        setImage(savedPath)
      } else {
        Alert.alert('Erro', 'Não foi possível salvar a imagem')
      }
    }
  }

  // Função para salvar a imagem localmente sem criptografá-la
  const saveImageLocally = async (imageUri, filename) => {
    try {
      // Diretório onde as imagens serão salvas
      const localDir = `${FileSystem.documentDirectory}images/`

      // Verifica se o diretório existe, se não, cria-o
      const dirInfo = await FileSystem.getInfoAsync(localDir)
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(localDir, { intermediates: true })
      }

      // Caminho completo para salvar o arquivo
      const localPath = `${localDir}${filename}`

      // Copia a imagem para o diretório local
      await FileSystem.copyAsync({ from: imageUri, to: localPath })

      return localPath
    } catch (error) {
      console.error('Erro ao salvar imagem localmente:', error)
      return null
    }
  }

  // Buscar endereço pelo CEP
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

  // Registrar motorista no banco de dados
  const handleRegister = async () => {


    if (
      username === '' ||
      telefone === '' ||
      email === '' ||
      end === '' ||
      cep === '' ||
      vagas === '' ||
      senha === '' ||
      confSenha === '' ||
      !cnhFrente ||
      !cnhVerso
    ) {
      Alert.alert(
        'Atenção!',
        'Preencha todos os campos e insira as imagens da CNH.'
      )
      return
    }

    if (senha !== confSenha) {
      Alert.alert('Erro', 'As senhas não coincidem')
      return
    }

    try {
      const existingMotorista = await db.getFirstAsync(
        'SELECT * FROM Motorista WHERE phone = ? OR email = ?',
        [telefone, email]
      )

      if (existingMotorista) {
        Alert.alert('Erro', 'Este número de telefone ou email já existe')
        return
      }

      await db.runAsync(
        `INSERT INTO Motorista 
          (name, phone, email, end, cep, vagas, password, cnhFrente, cnhVerso) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [username, telefone, email, end, cep, vagas, senha, cnhFrente, cnhVerso]
      )

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!')
      navigation.navigate('Splash', { user: username })
    } catch (error) {
      console.error('Erro ao cadastrar: ', error)
      Alert.alert('Erro', 'Erro ao cadastrar. Tente novamente.')
    }
  }

  useEffect(() => {
    if (cep.length === 8) {
      handleGetAddress(cep)
    }
  }, [cep])

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
          <TitleText>Registro Motorista</TitleText>
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

          <CustomLabelText>Insira a quantidade de vagas na van</CustomLabelText>
          <CustomInput
            placeholder="Insira a quantidades de assentos que a van possui"
            keyboardType="phone-pad"
            onChangeText={setVagas}
            value={vagas}
            maxLength={2}
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

          {/* Campo para imagem da CNH (frente) */}
          <CustomLabelText>Adicione a frente da CNH</CustomLabelText>
          <TouchableOpacity
            title={cnhFrente ? 'Alterar imagem' : 'Escolha uma imagem'}
            onPress={() => pickImage(setCnhFrente, 'cnhFrente.jpg')}
          >
            <ImgContainer>
              <CustomLabelText>Selecionar Imagem</CustomLabelText>
              {cnhFrente && (
                <ImagePreview source={{ uri: cnhFrente }} resizeMode="cover" />
              )}
            </ImgContainer>
          </TouchableOpacity>

          <CustomLabelText>Adicione o verso da CNH</CustomLabelText>
          <TouchableOpacity
            title={cnhVerso ? 'Alterar imagem' : 'Escolha uma imagem'}
            onPress={() => pickImage(setCnhVerso, 'cnhVerso.jpg')}
          >
            <ImgContainer>
              <CustomLabelText>Selecionar Imagem</CustomLabelText>
              {cnhVerso && (
                <ImagePreview source={{ uri: cnhVerso }} resizeMode="cover" />
              )}
            </ImgContainer>
          </TouchableOpacity>

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

          <ButtonCadastro onPress={handleRegister}>
            <CustomLabelText style={{ color: '#FFF' }}>
              Cadastrar
            </CustomLabelText>
          </ButtonCadastro>
        </Form>
      </ScrollView>
    </Container>
  )
}
