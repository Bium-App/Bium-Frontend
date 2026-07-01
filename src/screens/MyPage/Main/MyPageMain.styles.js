import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  flex: 1; 
  background-color: #FFFFFF; 
`;

export const ProfileSection = styled.View`
  align-items: center; 
  margin-top: 16px; 
  margin-bottom: 30px; 
`;

export const ProfileImageWrapper = styled.View`
  width: 80px; 
  height: 80px; 
  border-radius: 40px; 
  background-color: #F0F0F0; 
  justify-content: center; 
  align-items: center; 
  margin-bottom: 12px; 
  overflow: hidden; 
`;

export const UserName = styled.Text`
  font-size: 18px; 
  font-weight: 500;
  color: #000000; 
  margin-bottom: 12px; 
`;

export const EditProfileButton = styled.TouchableOpacity`
  padding-horizontal: 16px; 
  padding-vertical: 6px; 
  border-radius: 20px;
  border-width: 1px;
  border-color: #FF8933; 
  background-color: #FFFFFF; 
`;

export const EditProfileText = styled.Text`
  font-size: 14px; 
  font-weight: 500; 
  color: #000000; 
`;

export const Card = styled.View`
  background-color: #FFFFFF; 
  border-radius: 12px; 
  margin-horizontal: 20px; 
  margin-bottom: 20px; 
  padding: 16px 20px; 
  shadow-color: #6B6EA1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 2;
`;

export const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000000; 
  margin-bottom: 12px; 
`;

export const MenuRow = styled.TouchableOpacity`
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center; 
  padding-vertical: 8px; 
`;

export const MenuText = styled.Text`
  font-size: 14px; 
  color: #000000;
`;

export const BottomPadding = styled.View`
  height: 40px; 
`;