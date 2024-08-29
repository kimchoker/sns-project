"use client"
import { useState, useEffect } from 'react';
import FeedItem from '../components/feed/feedItem';
import { ScrollArea } from '../components/ui/scroll-area';
import Sibar from '../components/new-neo-sidebar';
import { Feed } from '../types/types';
import Spinner from '../components/ui/spinner';

const Home = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch feeds from the backend API
  const fetchFeeds = async () => {
    try {
      const response = await fetch('/api/getall');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Verify data structure
      console.log('Fetched data:', data);

      if (Array.isArray(data.feeds)) {
        setFeeds(data.feeds);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching feeds:', error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  // const loadMore = async () => {
  //   if (nextPage) {
  //     setLoading(true);
  //     try {
  //       const data = await fetchFeedData(nextPage);
  //       setFeedItems((prev) => [...prev, ...data.items]);
  //       setNextPage(data.next);
  //     } catch (error) {
  //       console.error('Error loading more feed:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  return (
    <div className="flex justify-center items-center h-screen bg-[#ffffff] font-nanum-barun-gothic">
      <Sibar />
      <ScrollArea className="w-[40%] h-[100%] overflow-y-auto">
      {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner /> {/* 로딩 스피너 표시 */}
            </div>
          ) : (
            feeds.map(feed => (
              <FeedItem
                key={feed.id}
                nickname={feed.nickname}
                userId={feed.email}
                content={feed.content}
                images={feed.images}
              />
            ))
          )}
       
      </ScrollArea>
    </div>
  );
};

export default Home;
