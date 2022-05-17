import { Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { routerPath } from '../../../common/constants/routerPath';
import { Loading } from '../../../components/loading/Loading';
import {
  ColorSchema,
  ContainerGrey,
  MuiBrandButton,
  SubmitButtonStyle,
  TransparentButton,
} from '../../../components/MuiStyling/MuiStyling';
import clientService from '../../../services/clientService';
import './Brand.scss';

interface BrandAttributes {
  id: string;
  name: string;
  brandImg: string;
  shortDescriptions: string;
}

export const Brand: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [allBrandAPI, setAllBrandAPI] = React.useState<BrandAttributes[]>([]);

  React.useEffect(() => {
    const fetchBrandFromAPI = async () => {
      try {
        const response = await clientService.getAllBrand();
        setAllBrandAPI(response.allBrand);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchBrandFromAPI();
  }, []);

  const handleBrandInURL = (brandName: string) => {
    const numberOfString = brandName.split(' ');
    if (numberOfString.length === 1) {
      return `${routerPath.common.BRAND}/${brandName}`;
    }

    const handleBrandName = numberOfString.reduce(
      (previousValue, currentValue) => previousValue + currentValue + '-',
      '',
    );
    const newBrandName = handleBrandName.slice(0, handleBrandName.length - 1); //xoá phần tử cuối của string
    return `${routerPath.common.BRAND}/${newBrandName}`;
  };

  return (
    <Container maxWidth={false} className="brand-container">
      <Box sx={{ minHeight: '100vh' }} className="brand-background">
        <Box
          sx={{
            paddingTop: '28vh',
            paddingLeft: '4vw',
          }}
        >
          <Typography variant="h2" color={'#ffffff'} mb={3} fontFamily="ui-serif">
            The new S-Brand
          </Typography>
          <Typography sx={{ opacity: '0.8' }} variant="h6" color={'#ffffff'} mb={10}>
            Cares for what matters.
          </Typography>
          <TransparentButton variant="outlined" onClick={() => divRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            Discover
          </TransparentButton>
        </Box>
      </Box>

      <ContainerGrey maxWidth={false} ref={divRef}>
        <Typography
          variant="h3"
          sx={{ textAlign: 'left', color: ColorSchema.LightGreen, marginBottom: '2rem', marginTop: '1rem' }}
          fontFamily="ui-serif"
        >
          Our brands
        </Typography>

        {allBrandAPI.length === 0 ? (
          <Loading />
        ) : (
          <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
            {allBrandAPI?.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={12 / 5} sx={{ padding: '0.5rem' }} key={index}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      className="px-6 py-4 object-fill"
                      component="img"
                      image={item.brandImg}
                      alt="green iguana"
                    />
                    <CardContent sx={{ paddingInline: '1.5rem', minHeight: '10rem' }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {item.name}
                      </Typography>
                      <Typography fontSize="0.875rem" color="text.secondary">
                        {item.shortDescriptions}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to={handleBrandInURL(item.name.toLocaleLowerCase())} className="flex w-full">
                      <MuiBrandButton variant="contained" type="button" style={SubmitButtonStyle}>
                        Discover more
                      </MuiBrandButton>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </ContainerGrey>
    </Container>
  );
};
