import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import {
  Box,
  Stack,
  Slide,
  AppBar,
  Avatar,
  Toolbar,
  useTheme,
  IconButton,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  Chip,
  LinearProgress,
} from '@mui/material';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';

import { signOut } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import { Menu, Cart, Coupon } from './components';
import { convertEnToFa } from 'helpers/persianTools';
import { SignIn, Search, ChangeShop } from 'components';
import { addCommas, digitsEnToFa } from '@persian-tools/persian-tools';
import Link from 'next/link';
import { useRouter } from 'next/router';

const categories = [
  {
    id: "3",
    title: "پروتئینی ها",
    image: "/images/categories/Cat00001.png",
  },
  {
    id: "81",
    title: "چیپس، پفک و پاپ کورن",
    image: "/images/categories/Cat00002.png"
  },
  {
    id: "102",
    title: "بهداشتی و ضد عفونی",
    image: "/images/categories/Cat00003.png"
  },
  {
    id: "34",
    title: "لبنیات",
    image: "/images/categories/Cat00004.png"
  },
  {
    id: "42",
    title: "میوه و سبزی",
    image: "/images/categories/Cat00005.png"
  },
  {
    id: "17",
    title: "انواع نان",
    image: "/images/categories/Cat00006.png"
  },
  {
    id: "149",
    title: "سرگرمی و آموزش",
    image: "/images/categories/Cat00007.png"
  },
  {
    id: "123",
    title: "لوازم التحریر",
    image: "/images/categories/Cat00008.png"
  },
  {
    id: "85",
    title: "انواع دسر",
    image: "/images/categories/Cat00009.png"
  },
  {
    id: "95",
    title: "کودک و بانوان",
    image: "/images/categories/Cat00010.png"
  },
  {
    id: "72",
    title: "آجیل و خشکبار",
    image: "/images/categories/Cat00011.png"
  },
  {
    id: "113",
    title: "مواد شوینده",
    image: "/images/categories/Cat00012.png"
  },
  {
    id: "55",
    title: "کنسرو و غذای آماده",
    image: "/images/categories/Cat00013.png"
  },
  {
    id: "114",
    title: "صابون و پودر لباسشویی",
    image: "/images/categories/Cat00014.png"
  },
  {
    id: "10",
    title: "چاشنی ها",
    image: "/images/categories/Cat00015.png"
  },
  {
    id: "59",
    title: "سوپ و آش",
    image: "/images/categories/Cat00016.png"
  },
  {
    id: "41",
    title: "نوشیدنی ها",
    image: "/images/categories/Cat00017.png"
  },
]

// ----------------------------------------------------------------------

const HideOnScroll = ({ window, children, fullscreen }) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 300,
  });
  if(fullscreen) return children;
  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  );
}

const MegaMenu = ({ data }) => {
  return (
    <>
      {
        data.map( (menu, i) => (
          <Box key={i} borderBottom="2px solid" borderColor="primary.main" sx={{
            '&:hover': {
              borderColor: 'red',
            },
            '&:hover > .child': {
              display: 'block'
            }
          }}>
              <Typography color="error" mx={4}>{menu.title}</Typography>
              { menu.child.length > 0 &&
                <Box bgcolor="#fff" sx={{
                  display: 'none',
                  position: 'absolute',
                  pt: 2,
                  top: '100%',
                  right: 0,
                  left: 0,
                  width: '100%',
                  zIndex: 10000,
                  boxShadow: '0px 200px 200px 0px #00000030',
                }} className='child'>
                  <Stack direction="row" columnGap={2} alignItems="flex-start" position="relative">
                    <MegaMenu data={menu.child} />
                  </Stack>
                </Box>
              }
          </Box>
        ))
      }
    </>
  )
}

export default function Topbar({ menus, isLanding = false }) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true
  });

  const {
    title,
    id: shopId,
    support_info,
  } = useSelector(state => state.shop);
  const { userData } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const aniStart = () => {
    setLoading(true);
  };
  const aniEnd = () => {
    setLoading(false);
  };
  useEffect(() => {
    router.events.on("routeChangeStart", aniStart);
    router.events.on("routeChangeComplete", aniEnd);
    router.events.on("routeChangeError", aniEnd);

    return () => {
      router.events.off("routeChangeStart", aniStart);
      router.events.off("routeChangeComplete", aniEnd);
      router.events.off("routeChangeError", aniEnd);
    };
  }, [router]);

  return (
    <>
      {loading && <LinearProgress color="primary" />}

      <HideOnScroll fullscreen={isMobile}>
        <AppBar sx={{ bgcolor: "background.default" }}>
          <Toolbar
            sx={{ minHeight: { xs: 64, sm: 64, md: 92 }, px: "0 !important" }}
          >
            <Stack sx={{ width: "100%" }}>
              {loading && <LinearProgress color="primary" />}
              <Stack
                columnGap={1}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                px={{ xs: 1, sm: 2, md: 4, lg: 6, xl: 8 }}
              >
                <Link href={"/"}>
                  <Image
                    width={56}
                    height={48}
                    alt="Hyperano"
                    src="/logo.svg"
                    style={{ objectFit: "contain" }}
                  />
                </Link>
                <Box flex={{ xs: 1, sm: 0 }} />
                {!isMobile && <Search />}
                <Box flex={{ xs: 0, sm: 1 }} />
                {!isMobile && (
                  <>
                    <Cart />
                    <SignIn icon />
                  </>
                )}
                <Coupon />
                {userData?.wallet && (
                  <Chip
                    sx={{ bgcolor: "warning.lighter" }}
                    icon={
                      <AccountBalanceWalletRoundedIcon
                        sx={{ mx: "8px !important" }}
                        color="warning"
                        fontSize="small"
                      />
                    }
                    label={`${digitsEnToFa(
                      addCommas(userData?.wallet?.balance)
                    )} تومان`}
                  />
                )}
                {/* <IconButton onClick={()=> dispatch(signOut())} sx={{bgcolor: 'error.lighter'}} color='error' size='small'>
                <PowerSettingsNewRoundedIcon color='error' fontSize='small' />
              </IconButton> */}
              </Stack>
              <Menu menus={menus} />
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Stack
        minHeight="30vh"
        pt={{ xs: 8, sm: 8, md: 2 }}
        pb={9}
        px={{ xs: 1, sm: 2, md: 4, lg: 6, xl: 8 }}
        justifyContent="space-between"
        sx={{
          backgroundImage: 'url("/assets/svg/discount.svg")',
          backgroundSize: "cover",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          display={{ xs: "none", sm: "none", md: "flex" }}
        >
          <Stack
            columnGap={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Link href={"/"}>
              <Image
                src="/logo.svg"
                alt="Hyperano"
                width={48}
                height={48}
                style={{
                  filter: "drop-shadow(0px 1px 3px #4285f4a3)",
                  padding: 0,
                }}
              />
            </Link>
            {isLanding ? (
              <Stack direction="row" columnGap={2} px={2}>
                <Link href="shops">
                  <Typography
                    bgcolor="#ffffff55"
                    color="#4285f4"
                    borderRadius={2}
                    px={1}
                    fontSize={16}
                    variant="subtitle1"
                  >
                    درباره ما
                  </Typography>
                </Link>
                <Link href="help">
                  <Typography
                    bgcolor="#ffffff55"
                    color="#4285f4"
                    borderRadius={2}
                    px={1}
                    fontSize={16}
                    variant="subtitle1"
                  >
                    قوانین
                  </Typography>
                </Link>
                <Link href="contact">
                  <Typography
                    bgcolor="#ffffff55"
                    color="#4285f4"
                    borderRadius={2}
                    px={1}
                    fontSize={16}
                    variant="subtitle1"
                  >
                    تماس با ما
                  </Typography>
                </Link>
              </Stack>
            ) : (
              <Search />
            )}
          </Stack>
          <Stack
            columnGap={1}
            direction="row-reverse"
            justifyContent="space-between"
            alignItems="center"
          >
            {userData?.wallet && (
              <Chip
                sx={{ bgcolor: "warning.lighter" }}
                icon={
                  <AccountBalanceWalletRoundedIcon
                    sx={{ mx: "8px !important" }}
                    color="warning"
                    fontSize="small"
                  />
                }
                label={`${digitsEnToFa(
                  addCommas(userData?.wallet?.balance)
                )} تومان`}
              />
            )}
            <Cart />
            <Coupon />
            <SignIn icon />
          </Stack>
        </Stack>

        <Stack
          width="100%"
          justifyContent="center"
          alignItems="center"
          rowGap={2}
        >
          {isLanding && (
            <>
              <Image
                src="/logo.svg"
                alt="Hyperano"
                width={180}
                height={180}
                style={{
                  filter: "drop-shadow(0px 1px 3px #4285f4a3)",
                  padding: 0,
                }}
              />
              <Typography
                textAlign="center"
                sx={{ textShadow: "0px 1px 3px #4285f4a3" }}
                color="#4285f4"
                variant="h2"
                component="h1"
              >
                هایپرانو ؛ تجربه خریدی نو
              </Typography>
              <Search
                isLanding
                sx={{
                  p: 2,
                  borderRadius: 3,
                  color: "text.secondary",
                  bgcolor: "#f9f9f999",
                }}
              />
            </>
          )}

          <Stack
            py={2}
            columnGap={5}
            direction="row"
            alignItems="flex-start"
            justifyContent="center"
            width="100%"
            sx={{
              overflowY: "hidden",
              overflowX: "scroll !important",
              scrollPadding: 24,
              scrollBehavior: "smooth",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {categories.map((item, i) => (
              <Link href={`/search?subcategory=${item.id}`}>
                <Stack
                  key={i}
                  sx={{ scrollSnapAlign: "center" }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    sx={{ width: 80, height: 80, bgcolor: "#ffffff30" }}
                    alt={item.title}
                    src={item.image}
                  />
                  <Typography
                    noWrap
                    color="text.primary"
                    align="center"
                    variant="subtitle2"
                    fontSize={14}
                    borderRadius={2}
                    mt={0.5}
                  >
                    {item.title}
                  </Typography>
                </Stack>
              </Link>
            ))}
          </Stack>
        </Stack>

        <Stack
          width="100%"
          alignItems="flex-start"
          columnGap={1}
          p={2}
          sx={{
            color: "#a3a3a3",
            backgroundColor: "warning.lighter",
            borderTopLeftRadius: "32px",
            borderTopRightRadius: "32px",
          }}
        >
          {shopId ? (
            <>
              <Stack
                width="100%"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="caption">فروشگاه انتخابی شما:</Typography>
                <ChangeShop />
              </Stack>
              <Stack
                width="100%"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontSize={18} variant="subtitle1">
                  {title}
                </Typography>
                <Typography
                  width={{ xs: 96, sm: 116 }}
                  fontSize={14}
                  textAlign="center"
                  variant="subtitle2"
                  color="#fff"
                  bgcolor="warning.main"
                  px={1}
                  borderRadius={2}
                >
                  {convertEnToFa(support_info?.tellphone)}
                </Typography>
              </Stack>
            </>
          ) : (
            <Stack
              width="100%"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="caption">
                ابتدا یک فروشگاه انتخاب کنید
              </Typography>
              <ChangeShop />
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
}
