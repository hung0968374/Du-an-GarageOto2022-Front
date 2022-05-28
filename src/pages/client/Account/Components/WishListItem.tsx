import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { WishList } from '../../../../redux/types/auth';
import { ColorSchema } from '../../../../common/components/MuiStyling/MuiStyling';
import { useAppDispatch } from '../../../../common/hooks/ReduxHook';
import { setSafeDeleteList } from '../../../../redux/common/User/ClientSlice';
import CustomImage from '../../../../common/components/Image/CustomImage';
import { mapBrandIdToName } from '../../../../common/helper/brand';

interface WishListItemProp {
  item: WishList;
  isEditing: boolean;
}

export const WishListItem: React.FC<WishListItemProp> = ({ item, isEditing }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (wishlistItem: WishList) => {
    dispatch(setSafeDeleteList(wishlistItem));
  };

  const renderItem = (): JSX.Element => {
    if (typeof item === 'object' && Object.keys(item)?.length > 0) {
      return (
        <Grid container className="bought-card">
          <Grid item md={4} sm={12} className="bought-card-image">
            <CustomImage source={item?.cars?.carAppearance?.imgs} />
          </Grid>
          <Grid item md={8} sm={12} className="bought-card-info">
            <p>{item.cars.name}</p>
            <p>Price: {item.cars.price}</p>
            <p>Brand: {!item.cars.brand.id ? mapBrandIdToName(item.cars.brand.id) : 'Updating'}</p>
            {isEditing && (
              <p className="text-right" onClick={() => handleDelete(item)}>
                <DeleteIcon sx={{ color: ColorSchema.Red, fontSize: '1.75rem' }} />
              </p>
            )}
          </Grid>
        </Grid>
      );
    }
    return <></>;
  };

  console.log('item.cars.brand.id', item.cars.brand.id);
  console.log('mapBrandIdToName(item.cars.brand.id)', mapBrandIdToName(item.cars.brand.id));
  return (
    <>
      {isEditing ? (
        <>{renderItem()}</>
      ) : (
        <Link to={`/brand/${mapBrandIdToName(item.cars.brand.id)}/${item.cars.name.toLocaleLowerCase()}/${item.carId}`}>
          {renderItem()}
        </Link>
      )}
    </>
  );
};
