import { io } from 'socket.io-client';

export const socket = io('http://localhost:5001');

const assignCommentToMom = (comment: any, value: any) => {
  if (+comment.id === +value.mom) {
    if (!comment.child) {
      comment.child = [];
    }
    comment.child = [...comment.child, value];
    return;
  } else if (comment.child) {
    checkAllElement(comment.child, value);
  } else {
    return;
  }
};

const checkAllElement = (comments: any, value: any) => {
  for (const comment of comments) {
    assignCommentToMom(comment, value);
  }
};

export const restructureCarComments = (carComments: Array<any>) => {
  const result = [];
  const comments = carComments.reverse(); /// initial comments
  for (const comment of comments) {
    if (comment.mom === '') {
      result.push(comment);
    } else {
      checkAllElement(result, comment);
    }
  }
  return result;
};

export const addComment = (carComments: Array<any>, comment: any) => {
  // carComments: initial array
  //comment: comment will be added to array

  if (comment.mom === '') {
    carComments = [comment, ...carComments];
    return carComments;
  } else {
    checkAllElement(carComments, comment);
    return carComments;
  }
};

const assignCountLike = (comment: any, countCommentLike: any, countCommentDislike: any, currUserReaction: any) => {
  comment.like = 0;
  comment.dislike = 0;
  comment.status = 'none';
  if (countCommentDislike[comment.id]) {
    comment.dislike = countCommentDislike[comment.id];
  }
  if (countCommentLike[comment.id]) {
    comment.like = countCommentLike[comment.id];
  }
  if (currUserReaction[comment.id]) {
    comment.status = currUserReaction[comment.id];
  }

  if (comment?.child?.length > 0) {
    checkAllElementForCountingLikeDislike(comment?.child, countCommentLike, countCommentDislike, currUserReaction);
  }
};

const checkAllElementForCountingLikeDislike = (
  carComments: any,
  countCommentLike: any,
  countCommentDislike: any,
  currUserReaction: any,
) => {
  for (const comment of carComments) {
    assignCountLike(comment, countCommentLike, countCommentDislike, currUserReaction);
  }
};

export const calculateCommentLikeDislike = (
  carComments: any,
  countCommentLike: any,
  countCommentDislike: any,
  currUserReaction: any,
) => {
  // this function assigns number of like and dislike times to input comments
  checkAllElementForCountingLikeDislike(carComments, countCommentLike, countCommentDislike, currUserReaction);

  return carComments;
};

const toggleComment = (show: any, commentId: any, comment: any) => {
  if (comment.id === commentId) {
    comment.showSubComment = show;
    return;
  } else {
    if (comment?.child?.length > 0) {
      checkAllCommentsForToggling(show, commentId, comment.child);
    }
  }
};

const checkAllCommentsForToggling = (show: boolean, commentId: number, comments: Array<any>) => {
  for (const comment of comments) {
    toggleComment(show, commentId, comment);
  }
};

export const toggleShowSubComment = (show: boolean, commentId: number, setCarComments: any) => {
  setCarComments((comments: any) => {
    const newComments = comments;
    checkAllCommentsForToggling(show, commentId, newComments);
    console.log('newComments', newComments);
    return newComments;
  });
};
