"use client"
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

const FeedItem = ({ nickname, userId, content, images }) => {
  return (
    <div className="w-[100%] border-b border-black">
      <div className="flex flex-row justify-start ml-5 p-3 ">
        <Avatar>
          <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/snsproject-85107.appspot.com/o/images%2Fkuromi.jpg?alt=media&token=b82213e1-0e86-4146-b1f4-5454fcd6220e" />
          <AvatarFallback />
        </Avatar>
        <div className="flex flex-col ml-3">
          <p className="font-bold">{nickname}</p>
          <p className="text-xs">{userId}</p>
        </div>
      </div>
      {/* 글&사진 부분 */}
      <div className="p-3 ml-3 mr-3">
        <p>{content}</p>
        <div className="overflow-hidden w-50 h-50 max-h-80">
          {images && images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.fileName}
              className="w-50 h-50 object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
