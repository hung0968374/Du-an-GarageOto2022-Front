import React, { useState, useRef, useEffect } from 'react';
import { TextField } from '@mui/material';

import clientService from '../../../services/clientService';
import { addComment } from '../../../common/helper/comment';

const Comment: React.FC<any> = ({ carInfo, userInfo, mom, setReplyingCommentIds, setCarComments, carComments }) => {
  const commentRef = useRef<any>(null);
  const userReplyRef = useRef<any>(null);
  const [sendingComment, setSendingComment] = useState(false);

  const onCommentChange = (event: any) => {
    userReplyRef.current = event.target.value;
  };

  useEffect(() => {
    commentRef.current.focus();
  }, []);

  const keyDown = async (e: any) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    } else if (e.key === 'Enter') {
      if (userReplyRef.current.length > 0) {
        setSendingComment(true);
        const { data } = await clientService.postComment({
          carId: carInfo.id,
          comment: userReplyRef.current,
          mom,
          userId: userInfo.id,
        });
        setSendingComment(true);
        const commentCreated = { ...data.newCreatedComment, like: 0, dislike: 0 };
        setCarComments((carComments: any) => {
          return addComment(carComments, commentCreated);
        });

        setReplyingCommentIds((repIds: Array<number>) => {
          const newArr = repIds.filter((id) => {
            return id !== mom;
          });
          return newArr;
        });
      }
    }
  };

  return (
    <>
      <TextField
        multiline
        onChange={onCommentChange}
        onKeyDown={keyDown}
        inputRef={commentRef}
        id="filled-basic"
        fullWidth
        label="Phản hồi"
        variant="filled"
        disabled={sendingComment}
      />
    </>
  );
};

export default Comment;
