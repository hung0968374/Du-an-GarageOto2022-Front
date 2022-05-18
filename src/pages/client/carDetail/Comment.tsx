import React, { useState, useRef, useEffect } from 'react';
import { TextField } from '@mui/material';

import { addComment, socket } from '../../../common/helper/comment';
import clientService from '../../../services/clientService';

const Comment: React.FC<any> = ({
  carInfo,
  userInfo,
  mom = '',
  setReplyingCommentIds,
  setCarComments,
  carComments,
  isMomComment = false,
  userStatus = '',
  setUpdateComment,
}) => {
  const commentRef = useRef<any>(null);
  const userReplyRef = useRef<any>(null);
  const timeOutRef = useRef<any>(null);
  const [sendingComment, setSendingComment] = useState(false);
  const onCommentChange = (event: any) => {
    userReplyRef.current = event.target.value;
  };

  useEffect(() => {
    if (!isMomComment) {
      commentRef.current.focus();
    }
  }, [isMomComment]);

  useEffect(() => {
    const callback = (newCreatedComment: any) => {
      const commentCreated = { ...newCreatedComment, like: 0, dislike: 0 };
      setCarComments((carComments: any) => {
        return addComment(carComments, commentCreated);
      });
      timeOutRef.current = setTimeout(() => {
        setUpdateComment((bool: boolean) => !bool);
      }, 100);
    };
    socket.off(`comment message ${carInfo?.id}`).on(`comment message ${carInfo?.id}`, callback);
    return () => {
      clearTimeout(timeOutRef.current);
    };
  }, [setCarComments, setUpdateComment, carInfo?.id]);

  const keyDown = async (e: any) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    } else if (e.key === 'Enter') {
      if (userReplyRef.current.length > 0) {
        setSendingComment(true);
        setSendingComment(false);

        setReplyingCommentIds((repIds: Array<number>) => {
          const newArr = repIds.filter((id) => {
            return id !== mom;
          });
          return newArr;
        });
      }

      socket.emit('comment message', { carId: carInfo.id, comment: userReplyRef.current, mom, userId: userInfo.id });

      if (isMomComment) {
        commentRef.current.value = '';
        commentRef.current.blur();
        userReplyRef.current = '';
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
          label="Phản hồi"
          variant="filled"
          disabled={sendingComment}
        />
      ) : (
        <TextField
          label={userStatus === 'Unauthorized' ? 'Please log in to comment' : 'Binh luan'}
          multiline
          rows={4}
          fullWidth
          InputLabelProps={{ style: { fontSize: 18 } }}
          onChange={onCommentChange}
          onKeyDown={keyDown}
          className="writing-comment-area"
          inputRef={commentRef}
          disabled={sendingComment || userStatus === 'Unauthorized'}
        />
      )}
    </>
  );
};

export default Comment;
