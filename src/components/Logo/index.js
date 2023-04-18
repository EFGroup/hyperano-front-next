import PropTypes from 'prop-types';
import Link from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  const logo = <Box component="img" src="/logo.svg" sx={{ width: 80, height: 80, mx: 'auto', objectFit: 'contain', ...sx }} />

  // const logo = (
  //   <Box sx={{ width: 80, height: 80, ...sx }}>
  //     <svg width="80" height="80" viewBox="0 0 195 116" fill={PRIMARY_MAIN} xmlns="http://www.w3.org/2000/svg">
  //       <defs>
  //         <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
  //           <stop offset="0%" stopColor={PRIMARY_DARK} />
  //           <stop offset="100%" stopColor={PRIMARY_MAIN} />
  //         </linearGradient>
  //         <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
  //           <stop offset="0%" stopColor={PRIMARY_LIGHT} />
  //           <stop offset="100%" stopColor={PRIMARY_MAIN} />
  //         </linearGradient>
  //         <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
  //           <stop offset="0%" stopColor={PRIMARY_LIGHT} />
  //           <stop offset="100%" stopColor={PRIMARY_MAIN} />
  //         </linearGradient>
  //       </defs>
  //       <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
  //       <path d="M175 56.7368C175 51.214 179.477 46.7368 185 46.7368C190.523 46.7368 195 51.214 195 56.7368V76.7368C195 82.2597 190.523 86.7368 185 86.7368C179.477 86.7368 175 82.2597 175 76.7368V56.7368Z" fill="url(#BG2)"/>
  //       <rect y="46.7368" width="20" height="40" rx="10" fill="url(#BG2)"/>
  //       <rect x="150" y="46.7368" width="20" height="40" rx="10" fill="url(#BG2)"/>
  //       <rect x="25" y="46.7368" width="20" height="40" rx="10" fill="url(#BG2)"/>
  //       <rect x="89" y="0.736816" width="17" height="16" rx="8" fill="url(#BG3)"/>
  //       <rect x="50" y="31.7368" width="20" height="55" rx="10" fill="url(#BG3)"/>
  //       <rect x="100" y="16.7368" width="20" height="70" rx="10" fill="url(#BG3)"/>
  //       <rect x="75" y="16.7368" width="20" height="70" rx="10" fill="url(#BG3)"/>
  //       <rect x="125" y="31.7368" width="20" height="55" rx="10" fill="url(#BG3)"/>
  //       <path d="M19.7216 91.9419C20.2739 91.9419 20.7216 92.3896 20.7216 92.9419V114.942C20.7216 115.494 20.2739 115.942 19.7216 115.942H18.2768C17.7246 115.942 17.2768 115.494 17.2768 114.942V106.666C17.2768 106.113 16.8291 105.666 16.2768 105.666H4.48091C3.92863 105.666 3.48091 106.113 3.48091 106.666V114.942C3.48091 115.494 3.0332 115.942 2.48091 115.942H1.03613C0.483849 115.942 0.0361328 115.494 0.0361328 114.942V92.9419C0.0361328 92.3896 0.483848 91.9419 1.03613 91.9419H2.48091C3.0332 91.9419 3.48091 92.3896 3.48091 92.9419V101.235C3.48091 101.787 3.92863 102.235 4.48091 102.235H16.2768C16.8291 102.235 17.2768 101.787 17.2768 101.235V92.9419C17.2768 92.3896 17.7246 91.9419 18.2768 91.9419H19.7216Z" fill={PRIMARY_DARK}/>
  //       <path d="M27.9643 91.9419C28.3091 91.9419 28.6296 92.1195 28.8123 92.412L34.6788 101.8C35.0702 102.426 35.9822 102.427 36.3743 101.801L42.2559 92.411C42.4387 92.1192 42.7589 91.9419 43.1034 91.9419H44.7189C45.5098 91.9419 45.9877 92.8165 45.5605 93.4821L37.415 106.172C37.3116 106.333 37.2566 106.521 37.2566 106.712V114.942C37.2566 115.494 36.8089 115.942 36.2566 115.942H34.8118C34.2595 115.942 33.8118 115.494 33.8118 114.942V106.712C33.8118 106.521 33.7568 106.333 33.6533 106.172L25.5079 93.4821C25.0807 92.8165 25.5586 91.9419 26.3494 91.9419H27.9643Z" fill={PRIMARY_DARK}/>
  //       <path d="M51.3467 115.942C50.7945 115.942 50.3467 115.494 50.3467 114.942V92.9419C50.3467 92.3896 50.7945 91.9419 51.3467 91.9419H63.5377C67.4362 91.9419 69.3855 93.8889 69.3855 97.7829V101.197C69.3855 105.091 67.4362 107.038 63.5377 107.038H54.7915C54.2392 107.038 53.7915 107.486 53.7915 108.038V114.942C53.7915 115.494 53.3438 115.942 52.7915 115.942H51.3467ZM53.7915 102.607C53.7915 103.159 54.2392 103.607 54.7915 103.607H63.3529C64.2715 103.607 64.9324 103.406 65.3357 103.005C65.739 102.603 65.9407 101.945 65.9407 101.03V97.9503C65.9407 97.0353 65.739 96.377 65.3357 95.9754C64.9324 95.5737 64.2715 95.3729 63.3529 95.3729H54.7915C54.2392 95.3729 53.7915 95.8206 53.7915 96.3729V102.607Z" fill={PRIMARY_DARK}/>
  //       <path d="M74.2082 92.9419C74.2082 92.3896 74.6559 91.9419 75.2082 91.9419H90.7681C91.3204 91.9419 91.7681 92.3896 91.7681 92.9419V94.3729C91.7681 94.9251 91.3204 95.3729 90.7681 95.3729H78.6529C78.1006 95.3729 77.6529 95.8206 77.6529 96.3729V101.235C77.6529 101.787 78.1006 102.235 78.6529 102.235H88.7013C89.2535 102.235 89.7013 102.682 89.7013 103.235V104.666C89.7013 105.218 89.2535 105.666 88.7013 105.666H78.6529C78.1006 105.666 77.6529 106.113 77.6529 106.666V111.511C77.6529 112.063 78.1006 112.511 78.6529 112.511H90.7681C91.3204 112.511 91.7681 112.959 91.7681 113.511V114.942C91.7681 115.494 91.3204 115.942 90.7681 115.942H75.2082C74.6559 115.942 74.2082 115.494 74.2082 114.942V92.9419Z" fill={PRIMARY_DARK}/>
  //       <path d="M115.966 100.511C115.966 103.319 114.957 105.114 112.939 105.896C112.321 106.136 111.943 106.831 112.223 107.432L115.536 114.518C115.845 115.181 115.362 115.942 114.63 115.942H113.024C112.635 115.942 112.281 115.717 112.117 115.364L108.186 106.929C108.022 106.577 107.668 106.352 107.279 106.352H101.372C100.819 106.352 100.372 106.8 100.372 107.352V114.942C100.372 115.494 99.924 115.942 99.3717 115.942H97.9269C97.3746 115.942 96.9269 115.494 96.9269 114.942V92.9419C96.9269 92.3896 97.3746 91.9419 97.9269 91.9419H110.118C114.016 91.9419 115.966 93.8889 115.966 97.7829V100.511ZM100.372 101.921C100.372 102.473 100.819 102.921 101.372 102.921H109.933C110.852 102.921 111.513 102.72 111.916 102.318C112.319 101.917 112.521 101.258 112.521 100.344V97.9503C112.521 97.0353 112.319 96.377 111.916 95.9754C111.513 95.5737 110.852 95.3729 109.933 95.3729H101.372C100.819 95.3729 100.372 95.8206 100.372 96.3729V101.921Z" fill={PRIMARY_DARK}/>
  //       <path d="M131.715 91.9419C132.128 91.9419 132.498 92.1957 132.647 92.5808L141.165 114.581C141.419 115.236 140.935 115.942 140.233 115.942H138.933C138.52 115.942 138.149 115.688 138 115.302L136.361 111.058C136.212 110.673 135.841 110.419 135.428 110.419H125.927C125.514 110.419 125.143 110.673 124.994 111.058L123.354 115.302C123.205 115.688 122.835 115.942 122.422 115.942H121.122C120.419 115.942 119.936 115.236 120.189 114.581L128.708 92.5808C128.857 92.1957 129.227 91.9419 129.64 91.9419H131.715ZM127.085 105.624C126.829 106.28 127.312 106.988 128.016 106.988H133.326C134.029 106.988 134.512 106.282 134.258 105.626L131.614 98.8061C131.285 97.9559 130.082 97.9543 129.751 98.8035L127.085 105.624Z" fill={PRIMARY_DARK}/>
  //       <path d="M149.271 114.942C149.271 115.494 148.823 115.942 148.271 115.942H146.826C146.274 115.942 145.826 115.494 145.826 114.942V92.9419C145.826 92.3896 146.274 91.9419 146.826 91.9419H148.782C149.09 91.9419 149.382 92.0843 149.571 92.3277L161.967 108.254C162.551 109.005 163.756 108.592 163.756 107.64V92.9419C163.756 92.3896 164.203 91.9419 164.756 91.9419H166.2C166.753 91.9419 167.2 92.3896 167.2 92.9419V114.942C167.2 115.494 166.753 115.942 166.2 115.942H164.245C163.936 115.942 163.645 115.8 163.455 115.556L151.06 99.6298C150.475 98.8785 149.271 99.292 149.271 100.244V114.942Z" fill={PRIMARY_DARK}/>
  //       <path d="M194.036 112.511C194.036 112.98 193.947 113.426 193.767 113.85C193.588 114.263 193.342 114.625 193.028 114.938C192.714 115.25 192.345 115.496 191.919 115.674C191.504 115.853 191.062 115.942 190.591 115.942H176.829C176.359 115.942 175.91 115.853 175.485 115.674C175.07 115.496 174.706 115.25 174.392 114.938C174.079 114.625 173.832 114.263 173.653 113.85C173.474 113.426 173.384 112.98 173.384 112.511V95.3729C173.384 94.9042 173.474 94.4635 173.653 94.0507C173.832 93.6267 174.079 93.2641 174.392 92.9628C174.706 92.6504 175.07 92.4049 175.485 92.2264C175.91 92.0367 176.359 91.9419 176.829 91.9419H190.591C191.062 91.9419 191.504 92.0367 191.919 92.2264C192.345 92.4049 192.714 92.6504 193.028 92.9628C193.342 93.2641 193.588 93.6267 193.767 94.0507C193.947 94.4635 194.036 94.9042 194.036 95.3729V112.511ZM177.829 95.3729C177.277 95.3729 176.829 95.8206 176.829 96.3729V111.511C176.829 112.063 177.277 112.511 177.829 112.511H189.591C190.144 112.511 190.591 112.063 190.591 111.511V96.3729C190.591 95.8206 190.144 95.3729 189.591 95.3729H177.829Z" fill={PRIMARY_DARK}/>
  //       </g>      
  //     </svg>
  //   </Box>
  // );

  // if (disabledLink) {
  //   return <>{logo}</>;
  // }

  return <Link href="/">{logo}</Link>;
}