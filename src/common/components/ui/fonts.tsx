import { Global } from "@emotion/react";

const montserratFont = `
  @font-face {
    font-display: swap;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 100;
    src: url('/fonts/montserrat/montserrat-v31-latin-100.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 200;
    src: url('/fonts/montserrat/montserrat-v31-latin-200.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 300;
    src: url('/fonts/montserrat/montserrat-v31-latin-300.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/montserrat/montserrat-v31-latin-regular.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    src: url('/fonts/montserrat/montserrat-v31-latin-500.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    src: url('/fonts/montserrat/montserrat-v31-latin-600.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/montserrat/montserrat-v31-latin-700.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    src: url('/fonts/montserrat/montserrat-v31-latin-800.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 900;
    src: url('/fonts/montserrat/montserrat-v31-latin-900.woff2') format('woff2');
  }
`;

const dmSansFont = `
  @font-face {
    font-display: swap;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 100;
    src: url('/fonts/dm-sans/dm-sans-v17-latin-100.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 200;
    src: url('/fonts/dm-sans/dm-sans-v17-latin-200.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 300;
    src: url('/fonts/dm-sans/dm-sans-v17-latin-300.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/dm-sans/dm-sans-v17-latin-regular.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 500;
    src: url('/fonts/dm-sans/dm-sans-v17-latin-500.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 600;
    src: url('/fonts/dm-sans/dm-sans-v17-latin-600.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/dm-sans/dm-sans-v17-latin-700.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 800;
    src: url('/fonts/dm-sans/dm-sans-v17-latin-800.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 900;
    src: url('/fonts/dm-sans/dm-sans-v17-latin-900.woff2') format('woff2');
  }
`;

export const Fonts = () => (
  <Global
    styles={`
      ${montserratFont}
      ${dmSansFont}
    `}
  />
);
