import "styled-components";

// Định nghĩa kiểu Theme của bạn
interface DefaultTheme {
  background: string;
  text: string;
  cardBackground: string;
}

// Mở rộng module styled-components
declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    cardBackground: string;
  }
}