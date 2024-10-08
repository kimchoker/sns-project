import { collection, query, where, getDocs, setDoc, doc, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { UserData } from '../../types/types';
import Cookies from "js-cookie";
import axios from "axios";
import axiosInstance from './axiosInstance';

// 아이디 중복확인
const checkIDExists = async (id: string) => {
  const usersRef = collection(db, "user"); 
  const q = query(usersRef, where("email", "==", id));
  const querySnapshot = await getDocs(q);

  // true면 중복된 아이디가 존재
  return !querySnapshot.empty; 
};

// 회원가입
async function signUp(email: string, password: string, nickname: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const now = Timestamp.now();

    const userData: UserData = {
      bio: "",
      createdAt: now,
      email: email,
      nickname: nickname,
      profileImage: "",
      updatedAt: now,
    };

    // Firestore에 사용자 데이터 저장 (문서 ID를 uid로)
    await setDoc(doc(db, "user", user.uid), userData);

    console.log("DB에 회원정보 저장 성공:");
  } catch (error) {
    console.error("DB에 회원정보 저장 실패:", error);
  }
}

// 로그인
const login = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw new Error('로그인에 실패했습니다.');
  }
};

// 글 작성을 위한 유저 정보 받아오기
const fetchUserInfo = async (token: string) => {
  try {
    if (!token) throw new Error('토큰이 없습니다. 로그인이 필요합니다.');

    const response = await axios.post("/api/useruid", {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("유저 정보 가져오기 실패:", error);
    throw error;
  }
};

const fetchUserProfile = async (userId: string) => {
  try {
    const response = await axios.get(`/api/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('유저 프로필 정보를 가져오는 중 오류 발생');
  }
};

export { checkIDExists, signUp, login, fetchUserInfo, fetchUserProfile };
