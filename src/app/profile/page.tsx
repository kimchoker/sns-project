"use client"
import { ScrollArea } from '../../components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Profile, ProfileFallback, ProfileImage } from '../../components/ui/profile';

const MyPage = () => {
  return (
    <div className="flex justify-center items-center h-screen font-nanum-barun-gothic">
      <ScrollArea className="flex flex-col w-[40%] h-screen justify-center items-center bg-[#d6d6d6]">
        <div>
          {/* 유저 프로필 부분 */}
          <div className="flex flex-row justify-start ml-5 p-3 ">
            {/* 프로필 이미지 */}
            <Profile>
              <ProfileImage src="https://firebasestorage.googleapis.com/v0/b/snsproject-85107.appspot.com/o/images%2Fkuromi.jpg?alt=media&token=b82213e1-0e86-4146-b1f4-5454fcd6220e"/>
              <ProfileFallback/>
            </Profile>
            {/* 닉네임/아이디 */}
            <div className="flex flex-row justify-end ml-5 p-3 ">
              <div className="flex flex-col ml-3">
                <p className="font-bold text-2xl">최정화이팅</p>
                <p className="text-m">sample@naver.com</p>
                {/* 상태메시지 */}
                <div className='mt-3'>
                  <p>상태메시지입니다. 최대 40자까지 입력할 수 있으며 자신의 상태를 나타내는 간단한 문구를 입력하는 입력란입니다.</p>
                </div>
                {/* 팔로잉 팔로워 */}
                <div>

                </div>
              </div>
            </div>
            
          </div>
          
        </div>
        {/* 글 컴포넌트 */}
        <div className="w-[100%] border-b border-black">
          {/* 글 작성자 정보 부분 */}
          <div className="flex flex-row justify-start ml-5 p-3 ">
            <Avatar>
              <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/snsproject-85107.appspot.com/o/images%2Fkuromi.jpg?alt=media&token=b82213e1-0e86-4146-b1f4-5454fcd6220e" />
              <AvatarFallback />
            </Avatar>
            <div className="flex flex-col ml-3">
              <p className="font-bold">최정화이팅</p>
              <p className="text-xs">sample@naver.com</p>
            </div>
          </div>

          {/* 글&사진 부분 */}
          <div className="p-3 ml-3 mr-3">
            <p className=''>
              죽는 날까지 하늘을 우러러  
              한 점 부끄럼이 없기를,  
              잎새에 이는 바람에도  
              나는 괴로워했다.  

              별을 노래하는 마음으로  
              모든 죽어가는 것을 사랑해야지  
              그리고 나한테 주어진 길을  
              걸어가야겠다.  

              오늘 밤에도 별이 바람에 스치운다.
              죽는 날까지 하늘을 우러러  
              한 점 부끄럼이 없기를,  
              잎새에 이는 바람에도  
              나는 괴로워했다.  

              별을 노래하는 마음으로  
              모든 죽어가는 것을 사랑해야지  
              그리고 나한테 주어진 길을  
              걸어가야겠다.  

              오늘 밤에도 별이 바람에 스치운다.
            </p>
            <div className='overflow-hidden w-full h-full max-h-80'>
            <img
                src={'https://firebasestorage.googleapis.com/v0/b/snsproject-85107.appspot.com/o/images%2FIMG_4782.png?alt=media&token=319a254d-5205-4e66-84a2-b9925b21b9f6'}
                alt={'pic'}
                className="w-full h-full object-cover"
            />
            </div>
          </div>
          
        </div>
      </ScrollArea>
    </div>
  );
};

export default MyPage;
