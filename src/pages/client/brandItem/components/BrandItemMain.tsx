import React, { forwardRef } from 'react';
import {
  Autocomplete,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Skeleton,
  Rating,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { Loading } from '../../../../common/components/loading/Loading';
import {
  ColorSchema,
  ContainerGrey,
  MuiBrandButton,
  SubmitButtonStyle,
} from '../../../../common/components/MuiStyling/MuiStyling';
import { allPrice } from '../../../../common/constants/fakeData';
import { getAverageStarPoint } from '../../../../common/helper/starRating';
import { handleBrandName } from '../../../../common/helper/brand';
import CustomImage from '../../../../common/components/Image/CustomImage';
import { CarAttributes, SeatAttributes } from '../brand';

import { ProductEmpty } from './ProductEmpty';

interface BrandItemMainProps {
  brandName?: string;
  carsImgsFromFirebase: any[];
  availableSeats: SeatAttributes[];
  priceInForm: string | null;
  seatInForm: string | null;
  radioASC: string;
  setPriceInForm: React.Dispatch<React.SetStateAction<string | null>>;
  setSeatInForm: React.Dispatch<React.SetStateAction<string | null>>;
  setRadioASC: React.Dispatch<React.SetStateAction<string>>;
  filterCarAPI: CarAttributes[];
  loadingFirebaseImg: boolean;
  filteringCars: boolean;
  notTriggerFilteringCondition: boolean;
}

export const BrandItemMain = (
  {
    brandName,
    carsImgsFromFirebase,
    availableSeats,
    priceInForm,
    seatInForm,
    radioASC,
    setPriceInForm,
    setSeatInForm,
    setRadioASC,
    filterCarAPI,
    loadingFirebaseImg,
    filteringCars,
    notTriggerFilteringCondition,
  }: BrandItemMainProps,
  brandCarsRef: any,
) => {
  //convert data to seat asc
  const seatFormDB = availableSeats.map((item) => parseInt(item.seats));
  const sortSeatFromDB = seatFormDB.sort();
  const allSeat = sortSeatFromDB.map(String);

  return (
    <ContainerGrey maxWidth={false}>
      <div className="brand_item-main">
        <Typography
          variant="h3"
          sx={{ textAlign: 'left', color: ColorSchema.Black, marginBottom: '2rem' }}
          fontFamily="ui-serif"
        >
          {handleBrandName(brandName)}
        </Typography>

        <Grid container>
          <Grid item lg={12} xl={12 / 5} className="filer-responsive">
            <div className="filer-select">
              <Autocomplete
                value={priceInForm}
                onChange={(event: any, newValue: string | null) => {
                  if (newValue === null) newValue = '';
                  setPriceInForm(newValue);
                }}
                sx={{ paddingRight: '2rem', maxWidth: '20rem', marginBottom: '1rem' }}
                options={allPrice}
                renderInput={(params) => <TextField {...params} label="Price" />}
                blurOnSelect={true}
              />
              <Autocomplete
                value={seatInForm}
                onChange={(event: any, newValue: string | null) => {
                  if (newValue === null) newValue = '';
                  setSeatInForm(newValue);
                }}
                sx={{ paddingRight: '2rem', maxWidth: '20rem', marginBottom: '2rem' }}
                options={allSeat}
                renderInput={(params) => <TextField {...params} label="Seat" />}
                blurOnSelect={true}
              />
            </div>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Order by</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="asc"
                name="radio-buttons-group"
                value={radioASC}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadioASC((e.target as HTMLInputElement).value)}
              >
                <FormControlLabel value="asc" control={<Radio />} label="ASC" />
                <Stack direction="row" spacing={1} className="flex-wrap">
                  <Chip label="Car name" variant="outlined" />
                  <Chip label="Price" variant="outlined" />
                </Stack>
                <FormControlLabel value="desc" control={<Radio />} label="DESC" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid ref={brandCarsRef} container lg={12} xl={(12 / 5) * 4}>
            {filterCarAPI.length === 0 && !filteringCars ? (
              <ProductEmpty />
            ) : (
              filterCarAPI.map((item, index) => {
                const cutBrandName = item.name.split(' ')[0].toLowerCase();
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={3} sx={{ padding: '0.5rem' }} key={index}>
                    <Card>
                      {filteringCars && !notTriggerFilteringCondition ? (
                        <>
                          <Skeleton variant="rectangular" width={'100%'} height={'350px'} />
                        </>
                      ) : (
                        <>
                          <CardActionArea>
                            {loadingFirebaseImg ? (
                              <Skeleton variant="rectangular" width={'100%'} height={'9rem'} />
                            ) : (
                              <CustomImage
                                source={carsImgsFromFirebase[index]}
                                alt={item.name}
                                style={{ width: '100%', height: '144px', objectFit: 'cover' }}
                              />
                            )}
                            <CardContent sx={{ paddingInline: '1.5rem', minHeight: '8rem' }}>
                              <Typography gutterBottom variant="h6" component="div">
                                {item.name}
                              </Typography>
                              <Typography fontSize="0.875rem" color="text.secondary">
                                {`From: ${item.price}`}
                              </Typography>
                              <Rating
                                name="simple-controlled"
                                value={+getAverageStarPoint(item.ratingPoints)}
                                precision={0.5}
                                readOnly
                              />
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Link
                              to={`/brand/${cutBrandName}/${item.name.toLocaleLowerCase()}/${item.id}`}
                              className="flex w-full"
                            >
                              <MuiBrandButton variant="contained" type="button" style={SubmitButtonStyle}>
                                Discover more
                              </MuiBrandButton>
                            </Link>
                          </CardActions>
                        </>
                      )}
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Grid>
      </div>
    </ContainerGrey>
  );
};

export default forwardRef(BrandItemMain);
