import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.quicksandRegular};
  color: ${theme.colours.ashGrey};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const title = (theme) => `
    font-family:${theme.fonts.quicksandBold};
    font-size: ${theme.fontSizes.title};
`;



const button = (theme) => `
    font-size: ${theme.fontSizes.button};
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colours.ui.error};
    font-size: ${theme.fontSizes.caption};
`;

const label = (theme) => `
    font-family: ${theme.fonts.quicksandMedium};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
    color: ${theme.colours.grey};
`;

const h1 = (theme) => `
    font-family:${theme.fonts.quicksandBold};
    font-size: ${theme.fontSizes.h1};
    color:${theme.colours.plantKeeperDarkestGreen};
`;

const h2 = (theme) => `
    font-size: ${theme.fontSizes.h2};
    color:${theme.colours.plantKeeperDarkestGreen};
    font-family: ${theme.fonts.quicksandBold}
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    color:${theme.colours.plantKeeperCaption}
`;

const variants = {
    title,
    button,
    body,
    label,
    caption,
    error,
    hint,
    h2,
    h1
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
    variant: "body",
};