import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {
    colors: {
      pointBeige: "#fef6d4";
      pointGreen: "#5DA487";
    };
  }
}
