'use client'
import React, { useRef, useState, useEffect } from 'react';
import { ScrollArea } from '../../../components/ui/feed-scroll-area';
import { profileEditStore, authStore } from '../../../states/store';
import { post } from '../../../types/types';
import MainProfile from '../../../components/profile/mainprofile';
import ProfileEdit from '../../../components/profile/new-neo-profileEdit';
import Sibar from '../../../components/new-neo-sidebar';
import FeedItem from '../../../components/feed/feedItem';
import Spinner from '../../../components/ui/spinner';

const MyPage = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { isEditOpen } = profileEditStore();
  const { uid } = authStore();
  const [feeds, setFeeds] = useState<post[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollToTop = () => {
    if(scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  const fetchMyFeeds = async () => {
    try {
      const response = await fetch(`/api/myfeed`, {
        method: 'POST',  
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: uid }),
      });
  
      if (!response.ok) {
        throw new Error("서버에서 피드를 불러오는 데 실패했습니다.");
      }
  
      const data = await response.json();
      console.log("서버에서 받아온 데이터:", data);
  
      if (Array.isArray(data.feeds)) {
        setFeeds(data.feeds);
      } else {
        throw new Error("데이터가 array 형식이 아닙니다.");
      }
    } catch (error) {
      console.log("피드 데이터 받아오기 입구컷");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyFeeds();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen font-nanum-barun-gothic p-0 mt-0 mb-0">
      <div className="w-[40%] min-w-[500px] h-[100%] bg-[#d6d6d6] justify-center">
        <Sibar />
        <ProfileEdit isOpen={isEditOpen} />
        <MainProfile />
        <ScrollArea ref={scrollRef} className="w-full h-[calc(100vh-160px)] overflow-auto ">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner /> {/* 로딩 스피너 표시 */}
            </div>
          ) : (
            feeds.map(feed => (
              <FeedItem
                key={feed.postId} // `key`를 여기서 지정하고 FeedItem 내부에서는 사용하지 않음
                postId={feed.postId}
                nickname={feed.nickname}
                userId={feed.email}
                content={feed.content}
                images={feed.images}
              />
            ))
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default MyPage;
