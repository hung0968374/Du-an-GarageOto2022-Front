import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { WishList } from '../../../../reduxToolKit-Saga/types/auth';
import { ColorSchema } from '../../../../components/MuiStyling/MuiStyling';
import { useAppDispatch } from '../../../../common/hooks/ReduxHook';
import { adjustList } from '../../../../reduxToolKit-Saga/common/User/WishListSlice';

interface WishListItemProp {
  item: WishList;
  isEditing: boolean;
}

export const WishListItem: React.FC<WishListItemProp> = ({ item, isEditing }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (wishlistItem: WishList) => {
    dispatch(adjustList(wishlistItem));
  };

  const renderItem = (): JSX.Element => {
    return (
      <Grid container className="bought-card">
        <Grid item md={4} sm={12} className="bought-card-image">
          <img src={item.cars.carAppearance.imgs} alt={item.cars.brand.name} />
        </Grid>
        <Grid item md={8} sm={12} className="bought-card-info">
          <p>{item.cars.name}</p>
          <p>Price: {item.cars.price}</p>
          <p>Brand: {item.cars.brand.name}</p>
          {isEditing && (
            <p className="text-right" onClick={() => handleDelete(item)}>
              <DeleteIcon sx={{ color: ColorSchema.Red, fontSize: '1.75rem' }} />
            </p>
          )}
        </Grid>
      </Grid>
    );
  };

  return <>{isEditing ? <>{renderItem()}</> : <Link to={'/'}>{renderItem()}</Link>}</>;
};
