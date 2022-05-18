import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, TextField } from '@mui/material';

import clientService from '../../../services/clientService';
import { calculateCommentLikeDislike, toggleShowSubComment } from '../../../common/helper/comment';

import './CarDetail.scss';
import RenderComents from './RenderComents';
import Comment from './Comment';

export type CommentReaction = {
  carId: number;
  commentId: number;
  dislike: number;
  id: number | string;
  like: number;
  userId: number;
};

export function broofa() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const CarDetailComment: React.FC<{
  userStatus: string;
  carInfo: any;
  userInfo: any;
  carComments: any;
  setCarComments: any;
  commentReactions: Array<CommentReaction>;
  setCommentReactions: any;
  params: any;
}> = ({
  userStatus,
  carInfo,
  userInfo,
  carComments,
  setCarComments,
  commentReactions,
  setCommentReactions,
  params,
}) => {
  const [replyingCommentIds, setReplyingCommentIds] = useState<any>([]);
  const [updateComment, setUpdateComment] = useState(false);

  const findCurrUserReactedComment = (commentId: number) => {
    let comment;
    const reactedComment = commentReactions.filter((reaction: CommentReaction) => {
      return reaction.commentId === commentId && reaction.userId === userInfo.id;
    });
    if (reactedComment.length > 0) {
      comment = reactedComment[0];
      return comment;
    } else {
      return undefined;
    }
  };

  const resetReactionComments = (reactedComment: CommentReaction) => {
    setCommentReactions((reactions: Array<CommentReaction>) => {
      reactions = reactions.map((reaction: CommentReaction) => {
        if (reaction.commentId === reactedComment?.commentId && reaction.userId === reactedComment.userId) {
          return reactedComment;
        } else {
          return reaction;
        }
      });

      return reactions;
    });
  };

  const addReactions = (reactedComment: CommentReaction) => {
    setCommentReactions((reactions: Array<CommentReaction>) => {
      return [...reactions, reactedComment] as Array<CommentReaction>;
    });
  };

  const likeComment = async (commentId: number) => {
    setTimeout(() => {
      setUpdateComment(!updateComment);
    }, 100);
    if (userStatus === 'Unauthorized') {
      return;
    }

    let reactedComment: CommentReaction | undefined = findCurrUserReactedComment(commentId);
    if (reactedComment) {
      if (reactedComment.like === 1) {
        reactedComment.like = 0;
      } else {
        reactedComment.like = 1;
        reactedComment.dislike = 0;
      }
      resetReactionComments(reactedComment);
      await clientService.updateCommentReaction(reactedComment);
    } else {
      reactedComment = {
        carId: params.id,
        commentId: commentId,
        dislike: 0,
        id: broofa(),
        like: 1,
        userId: userInfo.id,
      };
      addReactions(reactedComment);
      await clientService.reactToComment(reactedComment);
    }
  };

  const dislikeComment = async (commentId: number) => {
    setTimeout(() => {
      setUpdateComment(!updateComment);
    }, 100);
    if (userStatus === 'Unauthorized') {
      return;
    }

    let reactedComment: CommentReaction | undefined = findCurrUserReactedComment(commentId);
    if (reactedComment) {
      if (reactedComment.dislike === 1) {
        reactedComment.dislike = 0;
      } else {
        reactedComment.like = 0;
        reactedComment.dislike = 1;
      }
      resetReactionComments(reactedComment);
      await clientService.updateCommentReaction(reactedComment);
    } else {
      reactedComment = {
        carId: params.id,
        commentId: commentId,
        dislike: 1,
        id: broofa(),
        like: 0,
        userId: userInfo.id,
      };
      addReactions(reactedComment);
      await clientService.reactToComment(reactedComment);
    }
  };

  useEffect(() => {
    const resetComment = () => {
      const countCommentLike: any = {};
      const countCommentDislike: any = {};
      const currUserReaction: any = {};

      if (commentReactions.length > 0) {
        commentReactions.forEach((element: CommentReaction) => {
          if (!countCommentLike[element.commentId] && element.like === 1) {
            countCommentLike[element.commentId] = 1;
          } else if (element.like === 1) {
            countCommentLike[element.commentId]++;
          }
        });
      }
      if (commentReactions.length > 0) {
        commentReactions.forEach((element: CommentReaction) => {
          if (!countCommentDislike[element.commentId] && element.dislike === 1) {
            countCommentDislike[element.commentId] = 1;
          } else if (element.dislike === 1) {
            countCommentDislike[element.commentId]++;
          }
        });
      }

      const currUserReactions = commentReactions.filter((comment: CommentReaction) => {
        return comment.userId === userInfo.id;
      });

      currUserReactions.forEach((reaction: CommentReaction) => {
        if (reaction.like === 1) {
          currUserReaction[reaction.commentId] = 'like';
        } else if (reaction.dislike === 1) {
          currUserReaction[reaction.commentId] = 'dislike';
        } else {
          currUserReaction[reaction.commentId] = 'none';
        }
      });

      setCarComments((comments: any) => {
        const newComments = calculateCommentLikeDislike(
          comments,
          countCommentLike,
          countCommentDislike,
          currUserReaction,
        );
        return newComments;
      });
    };
    resetComment();
  }, [commentReactions, setCarComments, userInfo.id]);

  const toggleComment = (bool: boolean, commentId: number) => {
    setTimeout(() => {
      setUpdateComment(!updateComment);
    }, 100);
    toggleShowSubComment(bool, commentId, setCarComments);
  };

  return (
    <>
      <Container maxWidth="lg" className="car-comments">
        <Comment
          carInfo={carInfo}
          userInfo={userInfo}
          mom=""
          setCarComments={setCarComments}
          setReplyingCommentIds={setReplyingCommentIds}
          carComments={carComments}
          isMomComment={true}
          userStatus={userStatus}
        />
        <Box className="comments-area">
          <RenderComents
            carComments={carComments}
            likeComment={likeComment}
            dislikeComment={dislikeComment}
            replyingCommentIds={replyingCommentIds}
            setReplyingCommentIds={setReplyingCommentIds}
            userStatus={userStatus}
            userInfo={userInfo}
            carInfo={carInfo}
            setCarComments={setCarComments}
            toggleComment={toggleComment}
            updateComment={updateComment}
            setUpdateComment={setUpdateComment}
          />
        </Box>
      </Container>
    </>
  );
};

export default CarDetailComment;
