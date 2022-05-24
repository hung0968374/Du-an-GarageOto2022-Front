import React from 'react';
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

import { Loading } from '../../../../components/loading/Loading';
import {
  ColorSchema,
  ContainerGrey,
  MuiBrandButton,
  SubmitButtonStyle,
} from '../../../../components/MuiStyling/MuiStyling';
import { CarAttributes, SeatAttributes } from '../BrandItem';
import { allPrice } from '../../../../common/constants/fakeData';
import { getAverageStarPoint } from '../../../../common/helper/starRating';

import { ProductEmpty } from './ProductEmpty';

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface BrandItemMainProps {
  brandName?: string;
  carInfoAPI: CarAttributes[];
  imgFromFirebase: any[];
  seatFromAPI: SeatAttributes[];
  priceInForm: string | null;
  seatInForm: string | null;
  radioASC: string;
  setPriceInForm: React.Dispatch<React.SetStateAction<string | null>>;
  setSeatInForm: React.Dispatch<React.SetStateAction<string | null>>;
  setRadioASC: React.Dispatch<React.SetStateAction<string>>;
  filterCarAPI: CarAttributes[];
  loadingFirebaseImg: boolean;
}

export const BrandItemMain: React.FC<BrandItemMainProps> = ({
  brandName,
  carInfoAPI,
  imgFromFirebase,
  seatFromAPI,
  priceInForm,
  seatInForm,
  radioASC,
  setPriceInForm,
  setSeatInForm,
  setRadioASC,
  filterCarAPI,
  loadingFirebaseImg,
}) => {
  //convert data to seat asc
  const seatFormDB = seatFromAPI.map((item) => parseInt(item.seats));
  const sortSeatFromDB = seatFormDB.sort();
  const allSeat = sortSeatFromDB.map(String);

  const handleBrandName = () => {
    if (brandName === 'bmw') return 'BMW';
    if (brandName === 'rolls-royce') return 'Rolls Royce';
    return capitalizeFirstLetter(brandName as string);
  };

  return (
    <ContainerGrey maxWidth={false}>
      <div className="brand_item-main">
        <Typography
          variant="h3"
          sx={{ textAlign: 'left', color: ColorSchema.Black, marginBottom: '2rem' }}
          fontFamily="ui-serif"
        >
          {handleBrandName()}
        </Typography>

        {carInfoAPI.length === 0 ? (
          <Loading />
        ) : (
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
                />
              </div>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Order by</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="asc"
                  name="radio-buttons-group"
                  value={radioASC}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRadioASC((e.target as HTMLInputElement).value)
                  }
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

            <Grid container lg={12} xl={(12 / 5) * 4}>
              {filterCarAPI.length === 0 ? (
                <ProductEmpty />
              ) : (
                filterCarAPI.map((item, index) => {
                  const cutBrandName = item.name.split(' ')[0].toLowerCase();
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} sx={{ padding: '0.5rem' }} key={index}>
                      <Card>
                        <CardActionArea>
                          {loadingFirebaseImg ? (
                            <Skeleton variant="rectangular" width={'100%'} height={'9rem'} />
                          ) : (
                            <>
                              <CardMedia
                                className="h-36 "
                                component="img"
                                image={imgFromFirebase[index]}
                                alt={item.name}
                              />
                            </>
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
                      </Card>
                    </Grid>
                  );
                })
              )}
            </Grid>
          </Grid>
        )}
      </div>
    </ContainerGrey>
  );
};
