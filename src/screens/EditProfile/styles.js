import { StyleSheet } from 'react-native'
import styled from 'styled-components'

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background: ${(props) => props.theme.background};
`

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 25px;
`

export const ProfileContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`

export const FormContainer = styled.View`
  margin-top: 20px;
`

export const TitleText = styled.Text`
  position: absolute;
  font-size: 35px;
  font-weight: 700;
  margin-left: 35px;
  color: ${props => props.theme.text};
`

export const EditPictureText = styled.Text`
  color: ${props => props.theme.yellow};
`

export const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.yellow};
  margin-bottom: 20px;
  font-size: 16px;
`

export const styles = StyleSheet.create({
  back: {
    marginTop: 3,
  },
})
