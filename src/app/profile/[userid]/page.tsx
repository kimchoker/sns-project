'use client';

import React, { useRef, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import MainProfile from '../../../components/profile/mainprofile';
import FeedItem from '../../../components/feed/feedItem';
import { ScrollArea } from '../../../components/ui/feed-scroll-area';
import Sibar from '../../../components/sidebar/new-neo-sidebar';
import Spinner from '../../../components/ui/spinner';
import { authStore } from '../../../states/store';

// 유저 피드를 가져오는 API 요청
const fetchUserFeeds = async (userId: string, { pageParam }) => {
  const response = await fetch(`/api/feed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: userId, pageParam }),
  });
  if (!response.ok) {
    throw new Error('피드를 불러오는 데 실패했습니다.');
  }
  return response.json();
};

const UserProfilePage = () => {
  const { email, nickname, bio, profileImage } = authStore((state) => ({
    email: state.email,
    nickname: state.nickname,
    bio: state.bio,
    profileImage: state.profileImage,
  })); // zustand에서 유저 정보 가져오기

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 피드 가져오기
  const {
    data: feedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['feeds', email],
    queryFn: ({ pageParam = null }) => fetchUserFeeds(email as string, { pageParam }),
    getNextPageParam: (lastPage) => {
      const lastFeed = lastPage.feeds[lastPage.feeds.length - 1];
      return lastFeed ? lastFeed.createdAt : undefined;
    },
    enabled: !!email,
    initialPageParam: null,
  });

  const feeds = feedData?.pages.flatMap(page => page.feeds) || [];

  useEffect(() => {
    if (!email) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollRef.current,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, email]);

  // 유저 정보가 없을 때 처리
  if (!email || !nickname || !bio || !profileImage) return <p>유저 정보를 가져오는 중 오류가 발생했습니다.</p>;

  return (
    <div className="flex justify-center items-center h-screen font-nanum-barun-gothic p-0 mt-0 mb-0">
      <div className="w-[40%] min-w-[500px] h-[100%] bg-[#d6d6d6] justify-center">
        <Sibar />

        {/* 프로필 정보 표시 */}
        <MainProfile
          email={email}
          nickname={nickname || ''}
          bio={bio || ''}
          follower={0}  // 팔로워, 팔로잉 정보가 없다면 기본값으로 0 설정
          following={0}
          profileImage={profileImage || ''}
          isCurrentUser={true} // 현재 로그인한 유저인지 확인
        />

        {/* 유저의 피드 표시 */}
        <ScrollArea
          ref={scrollRef}
          className="w-full min-w-[500px] h-[calc(100vh-160px)] overflow-auto"
        >
          {feeds.map(feed => (
            <FeedItem
              key={feed.postId}
              profileImage={feed.profileImage}
              postId={feed.postId}
              nickname={feed.nickname}
              userId={feed.email}
              content={feed.content}
              images={feed.images}
              time={feed.createdAt}
              commentCount={feed.commentCount}
              likeCount={feed.likeCount}
            />
          ))}
          {isFetchingNextPage && (
            <div className="flex justify-center items-center p-10">
              <Spinner />
            </div>
          )}
          <div ref={loadMoreRef} className="h-1" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default UserProfilePage;
