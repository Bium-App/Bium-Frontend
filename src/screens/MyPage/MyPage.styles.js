import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #F5F6F8;
`;

export const ProfileSection = styled.View`
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const ProfileImageWrapper = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border-width: 1px;
  border-color: #000000;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  background-color: #FFFFFF;
  overflow: hidden;
`;

export const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const UserName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 12px;
`;

export const EditProfileButton = styled.TouchableOpacity`
  padding: 6px 16px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #FF7A00;
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
  margin: 0 20px 20px 20px;
  padding: 20px;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 3;
`;

export const CardTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 16px;
`;

export const MenuRow = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 12px;
`;

export const MenuText = styled.Text`
  font-size: 15px;
  color: #333333;
`;

export const ArrowIcon = styled.Text`
  font-size: 16px;
  color: #FF7A00;
  font-weight: 300;
`;

export const BottomPadding = styled.View`
  height: 40px;
`;