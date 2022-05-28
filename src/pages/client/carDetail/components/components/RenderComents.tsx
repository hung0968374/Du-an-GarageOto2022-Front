import React from 'react';
import { Box, Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

import '../../CarDetail.scss';
import Comment from '../common/CommentTextField';

import MainCommentContent from './MainCommentContent';

const CustomButton = styled(Button)({
  textTransform: 'none',
});

const RenderOneComment = ({
  comment,
  likeComment,
  dislikeComment,
  replyingCommentIds,
  setReplyingCommentIds,
  unauthorized,
  userInfo,
  carInfo,
  setCarComments,
  carComments,
  toggleComment,
  updateComment,
  setUpdateComment,
  navigate,
}: any) => {
  return (
    <Box>
      <MainCommentContent
        comment={comment}
        likeComment={likeComment}
        replyingCommentIds={replyingCommentIds}
        unauthorized={unauthorized}
        userInfo={userInfo}
        dislikeComment={dislikeComment}
        setReplyingCommentIds={setReplyingCommentIds}
        setCarComments={setCarComments}
        carInfo={carInfo}
        carComments={carComments}
        setUpdateComment={setUpdateComment}
        updateComment={updateComment}
      />

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
                replyingCommentIds={replyingCommentIds}
                updateComment={updateComment}
              />
            </Box>
          </Box>
          <Box className="cancel-reply">
            <Button
              variant="text"
              onClick={() => {
                setReplyingCommentIds((repIds: Array<number>) => {
                  const newArr = repIds.filter((id) => {
                    return id !== comment.id;
                  });
                  return newArr;
                });
              }}
            >
              HỦY
            </Button>
          </Box>
        </>
      )}

      {comment?.child?.length > 0 && (
        <Box className="child" sx={{ marginLeft: '100px' }}>
          {!comment.showSubComment ? (
            <Box className="see-more-wrapper">
              <Box className="open-hide-action">
                <CustomButton onClick={() => toggleComment(true, comment.id)} startIcon={<ArrowDropDownRoundedIcon />}>
                  Xem {comment.child.length} phản hồi
                </CustomButton>
              </Box>
              <Box className={`curly-line  cut-curly-line`}></Box>
            </Box>
          ) : (
            <>
              <Box className="see-more-wrapper">
                <Box className="open-hide-action">
                  <CustomButton onClick={() => toggleComment(false, comment.id)} startIcon={<ArrowDropUpRoundedIcon />}>
                    Ẩn {comment.child.length} phản hồi
                  </CustomButton>
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
                        unauthorized,
                        userInfo,
                        carInfo,
                        setCarComments,
                        carComments,
                        toggleComment,
                        updateComment,
                        setUpdateComment,
                        navigate,
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
  unauthorized,
  userInfo,
  carInfo,
  setCarComments,
  toggleComment,
  updateComment,
  setUpdateComment,
  navigate,
}: any) => {
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
              unauthorized,
              userInfo,
              carInfo,
              setCarComments,
              carComments,
              toggleComment,
              updateComment,
              setUpdateComment,
              navigate,
            })}
          </Box>
        );
      })}
    </>
  );
};

export default RenderComents;
