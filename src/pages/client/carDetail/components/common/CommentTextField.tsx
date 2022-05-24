import React, { useRef, useEffect } from 'react';
import { TextField } from '@mui/material';

import useCarComment from '../../../../../common/hooks/useCarComment';

const CommentTextField: React.FC<any> = ({
  carInfo,
  userInfo,
  mom = '',
  setReplyingCommentIds,
  setCarComments,
  isMomComment = false,
  setUpdateComment,
  updateComment,
  isUpdateComment = false,
  commentContent = '',
  commentId = undefined,
  replyingCommentIds,
  setUpdatingComment = undefined,
  unauthorized,
  setSelfUpdate,
}) => {
  const commentRef = useRef<any>(null);
  const userReplyRef = useRef<any>(null);

  const onCommentChange = (event: any) => {
    userReplyRef.current = event.target.value;
  };
  const { sendingComment, addNewCommentUsingSocket, updateExistedCommentUsingSocket } = useCarComment({
    carInfo,
    setCarComments,
    setUpdateComment,
    userReplyRef,
    setReplyingCommentIds,
    replyingCommentIds,
    updateComment,
    mom,
    setSelfUpdate,
  });

  useEffect(() => {
    if (!isMomComment) {
      commentRef.current.focus();
    }
  }, [isMomComment]);

  const keyDown = async (e: any) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    } else if (e.key === 'Enter') {
      if (!isUpdateComment) {
        addNewCommentUsingSocket(userReplyRef, mom, userInfo);
        commentRef.current.value = '';
        commentRef.current.blur();
        userReplyRef.current = '';
      } else {
        updateExistedCommentUsingSocket(commentId, userReplyRef, userInfo, setUpdatingComment);
      }
    }
  };

  return (
    <>
      {!isMomComment ? (
        <TextField
          multiline
          onChange={onCommentChange}
          onKeyDown={keyDown}
          inputRef={commentRef}
          id="filled-basic"
          fullWidth
          defaultValue={isUpdateComment ? commentContent : ''}
          label={!isUpdateComment ? 'Phản hồi' : 'Chỉnh sửa'}
          variant="filled"
          disabled={sendingComment}
        />
      ) : (
        <TextField
          label={unauthorized ? 'Please log in to comment' : 'Binh luan'}
          multiline
          rows={4}
          fullWidth
          InputLabelProps={{ style: { fontSize: 18 } }}
          onChange={onCommentChange}
          onKeyDown={keyDown}
          className="writing-comment-area"
          inputRef={commentRef}
          disabled={unauthorized}
        />
      )}
    </>
  );
};

export default CommentTextField;
