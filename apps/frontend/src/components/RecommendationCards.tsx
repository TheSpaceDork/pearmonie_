import React, { useMemo, useState } from "react";
import { Recommendation } from "../../store/slices/saveRecommendations";
import Image from "next/image";
import { getRandomColor } from "../../lib/colorGenerator";
import { FaRegHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Link from "next/link";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import { IoIosSend } from "react-icons/io";
import {
  toggleLike as handleToggleLike,
  addComment as handleAddComment,
} from "../../lib/actions/recommendations";
import { useAppSelector } from "../../store/hooks";
import { FaHeart } from "react-icons/fa6";

const RecommendationCards = ({ item }: { item: Recommendation }) => {
  const randomColor = useMemo(() => getRandomColor(), []);
  const userId = useAppSelector((state) => state.getUser.user._id);
  const [likes, setLikes] = useState(item.likes);
  const [comments, setComments] = useState(item.comments || []);
  const [newComment, setNewComment] = useState("");

  const toggleLike = async () => {
    await handleToggleLike(item._id, (updatedLikes) => {
      setLikes(updatedLikes);
    });
  };

  const isLiked = useMemo(() => likes.includes(userId), [likes, userId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    await handleAddComment(item._id, newComment, (updatedComments) => {
      setComments(updatedComments);
      setNewComment("");
    });
  };

  return (
    <Drawer>
      <div className="rounded-md h-fit bg-gray-200">
        {item.image?.trim() && (
          <div className="w-full h-[14rem] rounded-t-md overflow-hidden">
            <Image
              src={item.image}
              alt="feed image"
              height={300}
              width={300}
              className="w-full object-cover"
            />
          </div>
        )}
        <div className="px-3 py-4 space-y-2">
          <h5 className="text-sm font-bold">{item.title}</h5>
          <p className="text-xs">{item.description}</p>
          <div
            className="px-4 py-2 rounded-md text-xs w-fit"
            style={{
              backgroundColor: `${randomColor}20`,
              color: randomColor,
            }}
          >
            <p>{item.postType}</p>
          </div>
          {item.text && <p className="text-xs">{item.text}</p>}
          {item.link && (
            <Link href={item.link}>
              <button className="text-xs w-full text-white rounded-md bg-black px-4 py-2 cursor-pointer">
                View post
              </button>
            </Link>
          )}
          <p className="text-xs text-gray-500 py-2">
            Posted by {item.creator.name}
          </p>
          <hr className="text-gray-400 my-5" />
          <div className="flex items-center space-x-4">
            <div
              onClick={toggleLike}
              className="cursor-pointer flex items-center text-xs space-x-1"
            >
              {isLiked ? (
                <FaHeart className="text-xl text-red-600" />
              ) : (
                <FaRegHeart className="text-xl" />
              )}
              <span>{likes.length}</span>
            </div>
            <DrawerTrigger>
              <div className="cursor-pointer flex items-center text-xs space-x-1">
                <IoChatbubbleEllipsesOutline className="text-xl" />
                <span>{comments.length}</span>
              </div>
            </DrawerTrigger>
            <DrawerContent
              aria-describedby="comments"
              className="h-[60vh] w-[30rem] bg-white mx-auto"
            >
              <DialogTitle className="opacity-0 text-[0px]">
                Comments
              </DialogTitle>
              <div className="overflow-y-scroll h-full pb-[10rem] relative px-7 pt-5">
                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      Be the first to comment...
                    </p>
                  ) : (
                    comments.map((c, i) => (
                      <div key={i} className="text-sm text-black border-b pb-2">
                        <strong>{c.name || "User"}:</strong> {c.text}
                      </div>
                    ))
                  )}
                </div>
                <div className="fixed bottom-4 left-0 right-0 px-5">
                  <div className="flex items-center justify-between w-full border border-gray-400 rounded-lg py-1 px-3 bg-white">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="outline-none border-none w-full px-2 text-sm placeholder:text-sm"
                    />
                    <div
                      className="cursor-pointer"
                      onClick={handleCommentSubmit}
                    >
                      <IoIosSend className="text-3xl" />
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default RecommendationCards;
