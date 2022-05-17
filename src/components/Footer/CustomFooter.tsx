import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { routerPath } from '../../common/constants/routerPath';

interface CustomFooterProps {
  windowWidth: number;
}

const CustomFooter: React.FC<CustomFooterProps> = ({ windowWidth }) => {
  return (
    <footer>
      <Container sx={{ backgroundColor: '#2b2f31', paddingBlock: '3rem' }} maxWidth={false}>
        <Grid container>
          <Grid
            item
            sm={3}
            xs={12}
            display={'flex'}
            flexDirection="column"
            alignItems={`${windowWidth > 600 ? '-moz-initial' : 'center'}`}
            my={2}
          >
            <Typography variant="h5" fontWeight={600} component="div" color="#fff">
              Get started
            </Typography>
            <Box mt={1}>
              <Link to={routerPath.common.HOME}>
                <ArrowForwardIos
                  sx={{ color: '#008c7a', marginRight: '8px', display: `${windowWidth > 600 ? 'inherit' : 'none'}` }}
                  fontSize="small"
                />
                <span className="footer-text">Home</span>
              </Link>
            </Box>
            <Box mt={1}>
              <Link to={routerPath.auth.SIGN_UP}>
                <ArrowForwardIos
                  sx={{ color: '#008c7a', marginRight: '8px', display: `${windowWidth > 600 ? 'inherit' : 'none'}` }}
                  fontSize="small"
                />
                <span className="footer-text">Sign up</span>
              </Link>
            </Box>
            <Box mt={1}>
              <Link to={routerPath.common.HOME}>
                <ArrowForwardIos
                  sx={{ color: '#008c7a', marginRight: '8px', display: `${windowWidth > 600 ? 'inherit' : 'none'}` }}
                  fontSize="small"
                />
                <span className="footer-text">Workshop</span>
              </Link>
            </Box>
          </Grid>
          <Grid
            item
            sm={3}
            display={'flex'}
            flexDirection="column"
            xs={12}
            alignItems={`${windowWidth > 600 ? '-moz-initial' : 'center'}`}
            my={2}
          >
            <Typography variant="h5" fontWeight={600} component="div" color="#fff">
              About us
            </Typography>
            <Box mt={1}>
              <Link to={routerPath.common.HOME}>
                <ArrowForwardIos
                  sx={{ color: '#008c7a', marginRight: '8px', display: `${windowWidth > 600 ? 'inherit' : 'none'}` }}
                  fontSize="small"
                />
                <span className="footer-text">Develop team</span>
              </Link>
            </Box>
            <Box mt={1}>
              <Link to={routerPath.common.HOME}>
                <ArrowForwardIos
                  sx={{ color: '#008c7a', marginRight: '8px', display: `${windowWidth > 600 ? 'inherit' : 'none'}` }}
                  fontSize="small"
                />
                <span className="footer-text">Testing Team</span>
              </Link>
            </Box>
            <Box mt={1}>
              <Link to={routerPath.common.HOME}>
                <ArrowForwardIos
                  sx={{ color: '#008c7a', marginRight: '8px', display: `${windowWidth > 600 ? 'inherit' : 'none'}` }}
                  fontSize="small"
                />
                <span className="footer-text">Design Team</span>
              </Link>
            </Box>
          </Grid>
          <Grid
            item
            sm={3}
            display={'flex'}
            flexDirection="column"
            xs={12}
            alignItems={`${windowWidth > 600 ? '-moz-initial' : 'center'}`}
            my={2}
          >
            <Typography variant="h5" fontWeight={600} component="div" color="#fff">
              Support
            </Typography>
            <Box mt={1}>
              <Link to={routerPath.common.HOME}>
                <ArrowForwardIos
                  sx={{ color: '#008c7a', marginRight: '8px', display: `${windowWidth > 600 ? 'inherit' : 'none'}` }}
                  fontSize="small"
                />
                <span className="footer-text">FAQ</span>
              </Link>
            </Box>
            <Box mt={1}>
              <Link to={routerPath.common.HOME}>
                <ArrowForwardIos
                  sx={{ color: '#008c7a', marginRight: '8px', display: `${windowWidth > 600 ? 'inherit' : 'none'}` }}
                  fontSize="small"
                />
                <span className="footer-text">Help desk</span>
              </Link>
            </Box>
            <Box mt={1}>
              <Link to={routerPath.common.HOME}>
                <ArrowForwardIos
                  sx={{ color: '#008c7a', marginRight: '8px', display: `${windowWidth > 600 ? 'inherit' : 'none'}` }}
                  fontSize="small"
                />
                <span className="footer-text">Forums</span>
              </Link>
            </Box>
          </Grid>
          <Grid
            item
            sm={3}
            display={'flex'}
            flexDirection="column"
            xs={12}
            alignItems={`${windowWidth > 600 ? '-moz-initial' : 'center'}`}
            my={2}
          >
            <Typography variant="h5" fontWeight={600} component="div" color="#fff">
              Legal
            </Typography>
            <Box mt={1}>
              <Link to={routerPath.common.HOME}>
                <ArrowForwardIos
                  sx={{ color: '#008c7a', marginRight: '8px', display: `${windowWidth > 600 ? 'inherit' : 'none'}` }}
                  fontSize="small"
                />
                <span className="footer-text">Terms of services</span>
              </Link>
            </Box>
            <Box mt={1}>
              <Link to={routerPath.common.HOME}>
                <ArrowForwardIos
                  sx={{ color: '#008c7a', marginRight: '8px', display: `${windowWidth > 600 ? 'inherit' : 'none'}` }}
                  fontSize="small"
                />
                <span className="footer-text">Terms of use</span>
              </Link>
            </Box>
            <Box mt={1}>
              <Link to={routerPath.common.HOME}>
                <ArrowForwardIos
                  sx={{ color: '#008c7a', marginRight: '8px', display: `${windowWidth > 600 ? 'inherit' : 'none'}` }}
                  fontSize="small"
                />
                <span className="footer-text">Privacy Policy </span>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default CustomFooter;
