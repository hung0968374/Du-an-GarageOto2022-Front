import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { ShoppingCart, Book, Forum, Category, FacebookOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import './Home.scss';
import { ColorSchema, ContainerGrey, ContainerWhite } from '../../../common/components/MuiStyling/MuiStyling';
import { OUR_TEAMS, TeamAttributes } from '../../../common/constants/fakeData';
import MessengerComponent from '../../../common/components/MessengerChat/MessengerComponent';
import KhaiAvatar from '../../../../src/assets/imgs/members/Khai.png';
import HungAvatar from '../../../../src/assets/imgs/members/Hung.jpg';
import HungwAvatar from '../../../../src/assets/imgs/members/Hungw.jpg';
import LongAvatar from '../../../../src/assets/imgs/members/Long.jpg';
import HieuAvatar from '../../../../src/assets/imgs/members/Hieu.jpg';

const avatar: any = {
  Hung: HungAvatar,
  Hungw: HungwAvatar,
  Long: LongAvatar,
  Khai: KhaiAvatar,
  Hieu: HieuAvatar,
};
export const Home = () => {
  return (
    <Container maxWidth={false} className="home-container">
      <Box sx={{ minHeight: '100vh' }} className="home-background">
        <Box
          sx={{
            paddingTop: '28vh',
            paddingLeft: '4vw',
          }}
        ></Box>
      </Box>

      <ContainerGrey maxWidth={false}>
        <Typography variant="h4" sx={{ textAlign: 'center', color: ColorSchema.LightGreen }}>
          Why are Gara-auto
        </Typography>
        <p className="home-paragraph-center">
          First of all, this website int&apos;t for commercial purpose, we made this website to improve our skill.
          Seconds, our product here int&apos;t 100% true about the price or many thing concern. Hope you have a
          wonderful time here with us. For further information contact us through Email
        </p>
        <Grid container sx={{ marginTop: '4rem' }}>
          <Grid item md={6} sm={12} sx={{ padding: '2rem' }}>
            <img src="/imgs/ferrari-background.jpg" alt="Logo" className="home-image" />
          </Grid>
          <Grid item md={6} sm={12}>
            <h2 className="h2-text">Get full experience</h2>
            <p>
              First to get your experience with us here, you ought to have an account. This account will help your many
              things with us. If any bug occur when you using ur web, please fill the box, we will fix it as soon as
              possible. Sign up with button below!
            </p>
          </Grid>
        </Grid>
      </ContainerGrey>

      <ContainerWhite maxWidth={false}>
        <Typography variant="h4" sx={{ textAlign: 'center', color: ColorSchema.LightGreen }}>
          What we can provide
        </Typography>
        <p className="home-paragraph-center">
          In here Gara-Auto can provide user with: search for a specific car, enjoy our community through blog, read and
          feel the &quot;Ride&quot; through comment on each product. And finally to get a desire car!
        </p>
        <Grid container sx={{ paddingInline: '5rem', paddingBlock: '2rem' }}>
          <Grid item md={6} sm={12} sx={{ padding: '2rem', display: 'flex' }}>
            <ShoppingCart sx={{ fontSize: '2rem', color: ColorSchema.LightGreen, marginRight: '2rem' }} />
            <Box>
              <h2 className="h3-text text-black-import font-semibold">Buying</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ipsam sint cumque illo molestias harum
                sed quam. Voluptate, sed inventore.
              </p>
            </Box>
          </Grid>
          <Grid item md={6} sm={12} sx={{ padding: '2rem', display: 'flex' }}>
            <Book sx={{ fontSize: '2rem', color: ColorSchema.LightGreen, marginRight: '2rem' }} />
            <Box>
              <h2 className="h3-text text-black-import font-semibold">Comment</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ipsam sint cumque illo molestias harum
                sed quam. Voluptate, sed inventore.
              </p>
            </Box>
          </Grid>
          <Grid item md={6} sm={12} sx={{ padding: '2rem', display: 'flex' }}>
            <Forum sx={{ fontSize: '2rem', color: ColorSchema.LightGreen, marginRight: '2rem' }} />
            <Box>
              <h2 className="h3-text text-black-import font-semibold">Forums</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ipsam sint cumque illo molestias harum
                sed quam. Voluptate, sed inventore.
              </p>
            </Box>
          </Grid>
          <Grid item md={6} sm={12} sx={{ padding: '2rem', display: 'flex' }}>
            <Category sx={{ fontSize: '2rem', color: ColorSchema.LightGreen, marginRight: '2rem' }} />
            <Box>
              <h2 className="h3-text text-black-import font-semibold">Brand</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ipsam sint cumque illo molestias harum
                sed quam. Voluptate, sed inventore.
              </p>
            </Box>
          </Grid>
        </Grid>
      </ContainerWhite>

      <ContainerWhite>
        <Typography variant="h4" sx={{ textAlign: 'center', color: ColorSchema.LightGreen }}>
          Our teams
        </Typography>
        <p className="home-paragraph-center">This is our team behind the scene where all the web work</p>

        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {OUR_TEAMS.map((member: TeamAttributes, index: number) => {
            return (
              <Grid sm={12} md={4} sx={{ padding: '2rem' }} key={index}>
                <Box className="shadow-md ">
                  <div className={`avatar-image-holder avatar-image-${member.shortHand}`}>
                    {/* <img src={require(member.imgLink)} alt={member.name} /> */}
                    <img src={avatar[member.shortHand]} />
                  </div>
                  <div className="p-11">
                    <p className="h3-text text-center-import h-14 flex-center-horizontal-vertical text-black-import">
                      {member.name}
                    </p>
                    <div className="flex-center-horizontal-vertical mt-6">
                      <Link to={member.facebookLink} className="text-center">
                        <FacebookOutlined fontSize="medium" sx={{ color: ColorSchema.LightGreen }} />
                      </Link>
                    </div>
                  </div>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </ContainerWhite>
      <MessengerComponent />
    </Container>
  );
};
