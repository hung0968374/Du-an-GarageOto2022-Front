import React, { useState, useEffect } from 'react';
import { Box, Avatar, IconButton, Button, Menu, MenuItem } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

import { getAllCommentIdChildrenOfDeletedComment } from '../../../../../common/helper/comment';
import TimeHelper from '../../../../../common/helper/time';
import CustomDialog from '../../../../../components/Dialog/CustomDialog';
import useCarComment from '../../../../../common/hooks/useCarComment';
import Comment from '../common/CommentTextField';

const MainCommentContent: React.FC<any> = ({
  comment,
  likeComment,
  unauthorized,
  userInfo,
  dislikeComment,
  setReplyingCommentIds,
  replyingCommentIds,
  setCarComments,
  fetchingCarInfos,
  carInfo,
  carComments,
  setUpdateComment,
  updateComment,
}) => {
  const navigate = useNavigate();
  const [updatingComment, setUpdatingComment] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDeleteCommentDialog, setOpenDeleteCommentDialog] = useState(false);
  const [selfUpdate, setSelfUpdate] = useState(false);
  const { deleteCommentUsingSocket } = useCarComment({
    carInfo,
    setCarComments,
    setUpdateComment,
    setReplyingCommentIds,
    replyingCommentIds,
    updateComment,
  });

  useEffect(() => {
    setTimeout(() => {
      setSelfUpdate(!selfUpdate);
    }, 100);
  }, [fetchingCarInfos]);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteComment = () => {
    setOpenDeleteCommentDialog(true);
    setAnchorEl(null);
  };

  const handleOnclickUpdate = () => {
    setUpdatingComment(true);
    setAnchorEl(null);
  };

  const calculateTimeDuration = (startTime: any) => {
    const timeDiff = new Date().getTime() - new Date(startTime).getTime();
    return TimeHelper.calDayHourMinutes(timeDiff);
  };

  const onDeleteComent = async () => {
    const idsOfDeletedComments = getAllCommentIdChildrenOfDeletedComment(carComments, comment);
    deleteCommentUsingSocket({ idsOfDeletedComments, userInfo, momDeletedCommentId: comment.id });
  };

  return (
    <>
      <Box className={`comment-wrapper`}>
        {!updatingComment && !unauthorized && comment.userId === userInfo.id && (
          <>
            <Box className="more-action">
              <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon fontSize="large" />
              </IconButton>
              <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleOnclickUpdate}>Chỉnh sửa</MenuItem>
                <MenuItem onClick={handleDeleteComment}>Xóa</MenuItem>
              </Menu>
            </Box>
          </>
        )}
        <Box className="user-avatar">
          <Avatar src={comment?.userInfo?.info?.avatar} alt="" sx={{ width: 56, height: 56 }} />
        </Box>
        <Box className="user-main-comment-and-actions">
          {updatingComment ? (
            <>
              <Comment
                carInfo={carInfo}
                userInfo={userInfo}
                mom={comment.id}
                setCarComments={setCarComments}
                setReplyingCommentIds={setReplyingCommentIds}
                carComments={carComments}
                setUpdateComment={setUpdateComment}
                fetchingCarInfos={fetchingCarInfos}
                isUpdateComment={true}
                commentContent={comment?.comment}
                commentId={comment?.id}
                setUpdatingComment={setUpdatingComment}
                replyingCommentIds={replyingCommentIds}
                setSelfUpdate={setSelfUpdate}
              />
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button onClick={() => setUpdatingComment(false)}>Hủy</Button>
              </Box>
            </>
          ) : (
            <>
              <Box className="user-name-time-container">
                <Box className="user-name">
                  {comment?.userInfo?.info?.firstName} {comment?.userInfo?.info?.lastName}
                </Box>
                <Box className="time-diff">{calculateTimeDuration(comment.createdAt)}</Box>
              </Box>
              <Box className="comment">
                <div
                  dangerouslySetInnerHTML={{
                    __html: comment?.comment.replaceAll(' ', '&nbsp;').replaceAll('\n', '<br>'),
                  }}
                ></div>
              </Box>
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
                    if (!unauthorized) {
                      setReplyingCommentIds([...replyingCommentIds, comment.id]);
                    } else {
                      navigate('/auth/user/log-in');
                      return;
                    }
                  }}
                >
                  Phản hồi
                </Button>
              </Box>
            </>
          )}
        </Box>
        {comment.child && (
          <Box className={`${comment.showSubComment ? 'subComment-line' : 'hide-subcomment-line'}`}></Box>
        )}
      </Box>
      <CustomDialog
        open={openDeleteCommentDialog}
        setOpen={setOpenDeleteCommentDialog}
        title={<span style={{ color: 'red' }}>Xóa bình luận</span>}
        content={<span>Bạn có chắc muốn xóa bình luận này?</span>}
        agreeText="OK"
        disagreeText="Cancel"
        onAgree={onDeleteComent}
      />
    </>
  );
};

export default MainCommentContent;
