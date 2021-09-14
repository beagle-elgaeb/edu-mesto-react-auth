import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Card from "./Card";

import loader from "../images/loader.gif";
import buttonEditImg from "../images/button-edit.svg";
import buttonAddCard from "../images/button-add.svg";
import buttonEditAvatar from "../images/button-edit-avatar.svg";

function Main({
  cards,
  currentUser,
  onEditProfile,
  onEditAvatar,
  onAddCard,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  return (
    <>
      <ProfileContainer>
        <EditAvatarButton onClick={onEditAvatar}>
          <Avatar src={currentUser.avatar ?? loader} alt="Фото профиля" />
        </EditAvatarButton>
        <Info>
          <FullNameAndButtonEdit>
            <FullName id="fullName">{currentUser.name}</FullName>
            <EditProfileButton type="button" aria-label="Изменить" onClick={onEditProfile}>
              <EditProfileButtonIcon src={buttonEditImg} alt="Кнопка редактирования профиля" />
            </EditProfileButton>
          </FullNameAndButtonEdit>
          <Profession id="profession">{currentUser.about}</Profession>
        </Info>
        <AddCardButton type="button" aria-label="Добавить фото" onClick={onAddCard}>
          <AddCardButtonIcon src={buttonAddCard} alt="Кнопка добавления места" />
        </AddCardButton>
      </ProfileContainer>
      <PhotoGalleryContainer>
        <CardsList>
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onClick={onCardClick}
              onLikeClick={onCardLike}
              onDeleteClick={onCardDelete}
            />
          ))}
        </CardsList>
      </PhotoGalleryContainer>
    </>
  );
}

Main.propTypes = {
  cards: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
  onEditAvatar: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  onAddCard: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default Main;

const ProfileContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 40px 0 0 0;

  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

const EditAvatarButton = styled.button`
  width: 120px;
  height: 120px;
  overflow: hidden;
  position: relative;
  background: transparent;
  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  margin: 0 30px 0 0;
  padding: 0;
  z-index: 0;

  @media (max-width: 980px) {
    margin: 0 0 0 auto;
  }

  @media (max-width: 680px) {
    margin: 0 auto;
  }

  ::after {
    content: "";
    width: 120px;
    height: 120px;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    background: #000000;
    background-position: center;
    opacity: 0;
    outline: none;
    transition: opacity 0.3s linear, visibility 0.3s linear;
    margin: 0;
    z-index: 2;
  }

  :hover::after {
    visibility: visible;
    background-image: url(${buttonEditAvatar});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 26px;
    opacity: 0.8;
    z-index: 1;
  }
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin: 0;
  padding: 0;
  z-index: 1;

  @media (max-width: 980px) {
    margin: 0 0 0 auto;
  }

  @media (max-width: 680px) {
    margin: 0 auto;
  }
`;

const Info = styled.div`
  width: calc(100% - 350px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 0;

  @media (max-width: 980px) {
    max-width: calc(100% - 200px);
    min-width: calc(100% - 300px);
    margin: 0 auto;
  }

  @media (max-width: 680px) {
    max-width: 282px;
    min-width: 282px;
    width: 282px;
    margin: 0;
  }
`;

const FullNameAndButtonEdit = styled.div`
  display: flex;
  align-items: flex-end;

  @media (max-width: 680px) {
    margin: 26px auto 0;
  }
`;

const FullName = styled.h1`
  font-size: 42px;
  line-height: 48px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;

  @media (max-width: 680px) {
    min-width: 50px;
    max-width: 243px;
    font-size: 28px;
    line-height: 33px;
  }
`;

const EditProfileButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 1px solid #ffffff;
  outline: none;
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  margin: 0 0 9px 18px;

  @media (max-width: 680px) {
    width: 18px;
    height: 18px;
  }

  :hover {
    opacity: 0.6;
  }
`;

const EditProfileButtonIcon = styled.img`
  width: 10px;
  height: 10px;

  @media (max-width: 680px) {
    width: 8px;
    height: 8px;
  }
`;

const Profession = styled.p`
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 16px 0 0 0;

  @media (max-width: 680px) {
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    margin: 14px 0 0 0;
  }
`;

const AddCardButton = styled.button`
  width: 150px;
  height: 50px;
  background: transparent;
  border: 2px solid #ffffff;
  outline: none;
  border-radius: 2px;
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  margin: 0 0 0 auto;

  @media (max-width: 980px) {
    width: 282px;
    margin: 49px auto 0 auto;
  }

  @media (max-width: 680px) {
    margin: 36px 0 0 0;
  }

  :hover {
    opacity: 0.6;
  }
`;

const AddCardButtonIcon = styled.img`
  width: 22px;
  height: 22px;
  margin: auto;
`;

const PhotoGalleryContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 49px 0 0 0;

  @media (max-width: 980px) {
    margin: 29px 0 0 0;
  }

  @media (max-width: 680px) {
    margin: 36px 0 0 0;
  }
`;

const CardsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 282px);
  grid-template-rows: repeat(auto-fill, 361px);
  grid-column-gap: 17px;
  grid-row-gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 282px);
  }

  @media (max-width: 680px) {
    grid-template-columns: repeat(1, 282px);
  }
`;
