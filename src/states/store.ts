import { create } from 'zustand';
import { AuthState, ModalState, useSidebarToggleStore, DrawerState } from "../types/types";
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';

const authStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      token: null,
      intervalId: null,
      uid: null,
      email: null,
      nickname: null,
      bio: null,
      follower: null,
      following: null,
      profileImage: null,

      // 로그인
      login: (token: string) => {
        set({ isLoggedIn: true, token });
        Cookies.set('token', token, { expires: 7 });
      },

      // 로그아웃
      logout: () => {
        set({
          isLoggedIn: false,
          token: null,
          uid: null,
          email: null,
          nickname: null,
          bio: null,
          follower: null,
          following: null,
          profileImage: null,
        });
        Cookies.remove('token'); // 쿠키에서 토큰 삭제
      },

      // 사용자 정보를 업데이트하는 메서드
      setUser: (userData) => {
        set({
          uid: userData.uid,
          email: userData.email,
          nickname: userData.nickname,
          bio: userData.bio,
          follower: userData.follower,
          following: userData.following,
          profileImage: userData.profileImage,
        });
      },

      // 닉네임 업데이트
      setNickname: (nickname: string) => {
        set({ nickname });
      },

      // 바이오 업데이트
      setBio: (bio: string) => {
        set({ bio });
      },

      // 프로필 이미지 업데이트
      setProfileImage: (profileImage :string) => {
        set({ profileImage });
      }
    }),
    {
      name: "auth-storage", // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // localStorage에 저장
    }
  )
);

const useSidebarToggle = create(
  persist<useSidebarToggleStore>(
    (set, get) => ({
      isOpen: true,
      setIsOpen: () => {
        set({ isOpen: !get().isOpen });
      }
    }),
    {
      name: 'sidebarOpen',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  modalContent: null,
  modalTitle: '',  // 추가: 모달 제목 상태
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setModalContent: (content) => set({ modalContent: content }),
  setModalTitle: (title: string) => set({ modalTitle: title }),  // 추가: 모달 제목 설정 함수
}));


// const useUserStore = create<UserState>((set) => ({
//   uid: null,
//   email: null,
//   nickname: null,
//   bio: null,
//   follower: null,
//   following: null,
//   profileImage: null,
//   setUser: (user) => set((state) => ({ ...state, ...user })),
// }));

const profileEditStore = create<DrawerState>((set) => ({
  isEditOpen: false,
  openEdit: () => set({ isEditOpen: true }),
  closeEdit: () => set({ isEditOpen: false }),
}))

export { authStore, useSidebarToggle, useModalStore, profileEditStore };
