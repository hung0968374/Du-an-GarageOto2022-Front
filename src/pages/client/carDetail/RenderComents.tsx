import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Box, Container, Grid, Typography, TextField, Avatar, Divider, IconButton, Button } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { styled } from '@mui/material/styles';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

import { toggleShowSubComment } from '../../../common/helper/comment';

import './CarDetail.scss';
import Comment from './Comment';
const CustomButton = styled(Button)({
  textTransform: 'none',
});

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
  setUpdateComment,
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
            <Box
              className={`${comment.child && 'reply-line'}  ${
                comment.mom !== '' && !comment.child && 'reply-line-has-mom-no-child'
              }
              ${comment.child && comment.mom && 'reply-line-has-mom-has-child'}
              ${comment.child && comment.mom && comment.showSubComment && 'reply-line-has-mom-show-child'}
              ${comment.child && !comment.mom && comment.showSubComment && 'reply-line-mom-show-child'}
              ${comment.child && !comment.mom && !comment.showSubComment && 'reply-line-mom-not-show-child'}
              `}
            ></Box>
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
                setUpdateComment={setUpdateComment}
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
                <CustomButton startIcon={<ArrowDropDownRoundedIcon />}>
                  Xem {comment.child.length} phản hồi
                </CustomButton>
              </Box>
              <Box className={`curly-line  cut-curly-line`}></Box>
            </Box>
          ) : (
            <>
              <Box className="see-more-wrapper">
                <Box className="open-hide-action" onClick={() => toggleComment(false, comment.id)}>
                  <CustomButton startIcon={<ArrowDropUpRoundedIcon />}>Ẩn {comment.child.length} phản hồi</CustomButton>
                </Box>
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
                        setUpdateComment,
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
  setUpdateComment,
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
              setUpdateComment,
            })}
          </Box>
        );
      })}
    </>
  );
};

export default RenderComents;
