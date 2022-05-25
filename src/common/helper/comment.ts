import { io } from 'socket.io-client';

export const socket = io('https://garage-oto-back.herokuapp.com');

const assignCommentToMom = (comment: any, value: any) => {
  if (+comment.id === +value.mom) {
    if (!comment.child) {
      comment.child = [];
    }
    comment.child = [value, ...comment.child];
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
  return result.reverse();
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

const updateCommentValue = (carComment: any, comment: any) => {
  if (carComment.id === comment.id) {
    carComment.comment = comment.comment;
    return;
  } else if (carComment?.child?.length > 0) {
    checkAllElementForUpdateComment(carComment.child, comment);
  } else {
    return;
  }
};

const checkAllElementForUpdateComment = (carComments: Array<any>, comment: any) => {
  for (const carComment of carComments) {
    updateCommentValue(carComment, comment);
  }
};

export const updateExistedCommentHelperFunc = (carComments: Array<any>, comment: any) => {
  if (comment.mom === '') {
    for (const carComment of carComments) {
      if (carComment.id === comment.id) {
        carComment.comment = comment.comment;
      }
    }
  } else {
    checkAllElementForUpdateComment(carComments, comment);
  }
  return carComments;
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
    return newComments;
  });
};

export const deleteCommentHelperFunc = (carComments: Array<any>, comment: any) => {
  const initialArrayLength = carComments.length;
  carComments = carComments.filter((carComment) => {
    return carComment.id !== comment.id;
  });
  const laterArrayLength = carComments.length;
  if (initialArrayLength !== laterArrayLength) {
    if (laterArrayLength > 0) {
      return carComments;
    } else {
      return undefined;
    }
  } else {
    for (const carComment of carComments) {
      if (carComment?.child?.length > 0) {
        carComment.child = deleteCommentHelperFunc(carComment.child, comment);
      }
    }
    return carComments;
  }
};

export const getAllCommentIdChildrenOfDeletedComment = (
  carComments: Array<any>,
  comment: any,
  foundDeletedComment = false,
) => {
  let idsOfChildrenOfDeletedComment: Array<any> = [];
  if (!carComments) return [];
  for (const carComment of carComments) {
    if (foundDeletedComment) {
      idsOfChildrenOfDeletedComment = [...idsOfChildrenOfDeletedComment, carComment.id];
      const ids = getAllCommentIdChildrenOfDeletedComment(carComment.child, comment, true);
      idsOfChildrenOfDeletedComment = [...ids, ...idsOfChildrenOfDeletedComment];
    } else {
      if (carComment.id === comment.id) {
        idsOfChildrenOfDeletedComment = [...idsOfChildrenOfDeletedComment, comment.id];
        const ids = getAllCommentIdChildrenOfDeletedComment(carComment.child, comment, true);
        idsOfChildrenOfDeletedComment = [...ids, ...idsOfChildrenOfDeletedComment];
      } else if (carComment?.child?.length > 0) {
        const ids = getAllCommentIdChildrenOfDeletedComment(carComment.child, comment, false);
        idsOfChildrenOfDeletedComment = [...ids, ...idsOfChildrenOfDeletedComment];
      }
    }
  }
  return idsOfChildrenOfDeletedComment;
};
