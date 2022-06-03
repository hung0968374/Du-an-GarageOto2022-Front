import { useEffect, useState, useRef, useCallback } from 'react';

import { socket, addComment, updateExistedCommentHelperFunc, deleteCommentHelperFunc } from '../helper/comment';

const useCarComment = ({
  carInfo,
  setCarComments,
  setUpdateComment,
  userReplyRef = undefined,
  setReplyingCommentIds,
  replyingCommentIds,
  updateComment,
  mom = undefined,
  setSelfUpdate,
}: any) => {
  const timeOutRef = useRef<any>(null);
  const [sendingComment, setSendingComment] = useState(false);

  ///// listen to all socket io events
  useEffect(() => {
    //// add comment using socket io
    const addCommentCallback = (newCreatedComment: any) => {
      if (replyingCommentIds.length > 0){
        setSendingComment(false);
        const momId = newCreatedComment.mom;
        const newArr = replyingCommentIds.filter((id: number) => {
          return id !== momId;
        });
        setReplyingCommentIds(newArr);
        setTimeout(() => {
          setUpdateComment(!updateComment);
        }, 100);
      }

      const commentCreated = { ...newCreatedComment, like: 0, dislike: 0 };
      setCarComments((carComments: any) => {
        return addComment(carComments, commentCreated);
      });
      timeOutRef.current = setTimeout(() => {
        setUpdateComment(!updateComment);
      }, 100);
    };

    //// update comment using socket io
    const updateCommentCallback = (editedCommentInfo: any) => {
      setCarComments((carComments: any) => {
        return updateExistedCommentHelperFunc(carComments, editedCommentInfo);
      });
      setTimeout(() => {
        setSelfUpdate((bool: boolean) => !bool);
      }, 100);
    };

    ///// delete comment
    const deleteCommentCallback = (momDeletedCommentId: Array<number>) => {
      setCarComments((carComments: Array<any>) => {
        return deleteCommentHelperFunc(carComments, { id: momDeletedCommentId });
      });
    };

    //// socket liten to events
    socket.off(`comment message ${carInfo?.id}`).on(`comment message ${carInfo?.id}`, addCommentCallback);
    socket.off(`edit comment ${carInfo?.id}`).on(`edit comment ${carInfo?.id}`, updateCommentCallback);
    socket.off(`delete comment ${carInfo?.id}`).on(`delete comment ${carInfo?.id}`, deleteCommentCallback);

    return () => {
      clearTimeout(timeOutRef.current);
    };
  }, [
    setCarComments,
    setUpdateComment,
    mom,
    replyingCommentIds,
    updateComment,
    setReplyingCommentIds,
    userReplyRef,
    carInfo?.id,
    setSelfUpdate,
  ]);

  //////////////////////////////////
  const addNewCommentUsingSocket = useCallback(
    (userReplyRef, mom, userInfo) => {
      setSendingComment(true);
      if (userReplyRef?.current?.length > 0) {
        socket.emit('comment message', { carId: carInfo.id, comment: userReplyRef.current, mom, userId: userInfo.id });
      }
    },
    [carInfo?.id],
  );

  //////////////////////////////////
  const updateExistedCommentUsingSocket = useCallback(
    (commentId, userReplyRef, userInfo, setUpdatingComment) => {
      if (carInfo) {
        socket.emit('edit comment', {
          id: commentId,
          carId: carInfo.id,
          comment: userReplyRef.current,
          userId: userInfo.id,
        });
        setUpdatingComment((bool: boolean) => !bool);
      }
    },
    [carInfo],
  );

  const deleteCommentUsingSocket = useCallback(
    ({ idsOfDeletedComments, userInfo, momDeletedCommentId }) => {
      socket.emit('delete comment', {
        carId: carInfo.id,
        commentIds: idsOfDeletedComments,
        userId: userInfo.id,
        momDeletedCommentId,
      });
      return;
    },
    [carInfo?.id],
  );

  return { sendingComment, addNewCommentUsingSocket, deleteCommentUsingSocket, updateExistedCommentUsingSocket };
};

export default useCarComment;
