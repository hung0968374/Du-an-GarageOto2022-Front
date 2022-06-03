import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

import { WishList } from '../../../../redux/types/auth';
import CustomImage from '../../../../common/components/Image/CustomImage';
import { mapBrandIdToName } from '../../../../common/helper/brand';

interface WishListItemProp {
  item: WishList;
}

export const WishListItem: React.FC<WishListItemProp> = ({ item }) => {
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
            <p>Brand: {item.cars.brand?.id ? mapBrandIdToName(item.cars.brand?.id) : 'Updating'}</p>
          </Grid>
        </Grid>
      );
    }
    return <></>;
  };

  return (
    <>
      <Link
        to={`/brand/${mapBrandIdToName(item?.cars?.brand?.id)}/${item.cars.name.toLocaleLowerCase()}/${item.carId}`}
      >
        {renderItem()}
      </Link>
    </>
  );
};
