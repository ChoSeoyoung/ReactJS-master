// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    subBgColor: string;
    primaryColor: string;
    secondaryColor: string;
    successColor: string;
    infoColor: string;
    dangerColor: string;
  }
}