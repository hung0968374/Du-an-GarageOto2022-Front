import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Box, Container, Grid, Typography, TextField, Avatar, Divider, IconButton, Button } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { toggleShowSubComment } from '../../../common/helper/comment';

import './CarDetail.scss';
import Comment from './Comment';

const RenderOneComment = ({
  comment,
  likeComment,
  dislikeComment,
  replyingCommentIds,
  setReplyingCommentIds,
  userStatus,
  userInfo,
  carInfo,
  setCarComments,
  carComments,
  toggleComment,
  updateComment,
}: any) => {
  return (
    <Box className="comment-rep-wrapper">
      <Box className={`comment-wrapper`}>
        <Box className="user-avatar">
          <Avatar src={comment?.userInfo?.info?.avatar} alt="" sx={{ width: 56, height: 56 }} />
        </Box>
        <Box className="user-comment">
          <Box className="user-name">
            {comment?.userInfo?.info?.firstName} {comment?.userInfo?.info?.lastName}
          </Box>
          <Box className="comment">{comment?.comment}</Box>
          <Box className="user-action-area">
            <Box className="like-area" onClick={() => likeComment(comment.id)}>
              {comment.status === 'like' ? (
                <>
                  <IconButton>
                    <ThumbUpIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton>
                    <ThumbUpOutlinedIcon />
                  </IconButton>
                </>
              )}
              {comment.like}
            </Box>
            <Box className="dislike-area" onClick={() => dislikeComment(comment.id)}>
              {comment.status === 'dislike' ? (
                <>
                  <IconButton>
                    <ThumbDownIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton>
                    <ThumbDownOutlinedIcon />
                  </IconButton>
                </>
              )}
              {comment.dislike}
            </Box>
            <Button
              variant="text"
              className="user-rep"
              onClick={() => {
                if (userStatus === 'Authorized') {
                  setReplyingCommentIds([...replyingCommentIds, comment.id]);
                }
              }}
            >
              Phản hồi
            </Button>
          </Box>
        </Box>
        {comment.child && (
          <Box className={`${comment.showSubComment ? 'subComment-line' : 'hide-subcomment-line'}`}></Box>
        )}
      </Box>

      {Array.isArray(replyingCommentIds) && replyingCommentIds.indexOf(comment.id) !== -1 && (
        <>
          <Box className="reply-area">
            <Box>
              <Avatar alt="" src={userInfo?.avatar}></Avatar>
            </Box>
            <Box className="reply-text">
              <Comment
                carInfo={carInfo}
                userInfo={userInfo}
                mom={comment.id}
                setCarComments={setCarComments}
                setReplyingCommentIds={setReplyingCommentIds}
                carComments={carComments}
              />
            </Box>
          </Box>
          <Box
            className="cancel-reply"
            onClick={() => {
              setReplyingCommentIds((repIds: Array<number>) => {
                const newArr = repIds.filter((id) => {
                  return id !== comment.id;
                });
                return newArr;
              });
            }}
          >
            <Button variant="text">HỦY</Button>
          </Box>
        </>
      )}

      {comment?.child?.length > 0 && (
        <Box className="child" sx={{ marginLeft: '100px' }}>
          {!comment.showSubComment ? (
            <Box className="see-more-wrapper">
              <Box onClick={() => toggleComment(true, comment.id)} className="open-hide-action">
                Xem {comment.child.length} phản hồi
              </Box>
              <Box className={`curly-line  cut-curly-line`}></Box>
            </Box>
          ) : (
            <>
              <Box className="see-more-wrapper">
                <Box onClick={() => toggleComment(false, comment.id)}>Ẩn {comment.child.length} phản hồi</Box>
              </Box>
              {comment.child.map((commentChild: any, idx: number) => {
                return (
                  <Box key={idx} className="child-wrapper">
                    {idx !== comment.child.length - 1 && <Box className={`line`}></Box>}
                    {(idx === comment.child.length - 1 || commentChild.mom !== '') && (
                      <Box className={`curly-line`}></Box>
                    )}
                    <Box key={comment.id}>
                      {RenderOneComment({
                        comment: commentChild,
                        likeComment,
                        dislikeComment,
                        replyingCommentIds,
                        setReplyingCommentIds,
                        userStatus,
                        userInfo,
                        carInfo,
                        setCarComments,
                        carComments,
                        toggleComment,
                        updateComment,
                      })}
                    </Box>
                  </Box>
                );
              })}
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

const RenderComents = ({
  carComments,
  likeComment,
  dislikeComment,
  replyingCommentIds,
  setReplyingCommentIds,
  userStatus,
  userInfo,
  carInfo,
  setCarComments,
  toggleComment,
  updateComment,
}: any) => {
  console.log('carComments', carComments);
  return (
    <>
      {carComments?.map((comment: any) => {
        return (
          <Box key={comment.id} sx={{ marginTop: '2rem' }}>
            {RenderOneComment({
              comment: comment,
              likeComment,
              dislikeComment,
              replyingCommentIds,
              setReplyingCommentIds,
              userStatus,
              userInfo,
              carInfo,
              setCarComments,
              carComments,
              toggleComment,
              updateComment,
            })}
          </Box>
        );
      })}
    </>
  );
};

export default RenderComents;
