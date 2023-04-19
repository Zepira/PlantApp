import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.quicksandRegular};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colours.ashGrey};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const title = (theme) => `
    font-family:${theme.fonts.quicksandSemiBold};
    font-size: ${theme.fontSizes.title};
  
`;

const button = (theme) => `
    font-family:${theme.fonts.quicksandSemiBold};
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

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
    font-family: ${theme.fonts.quicksandMedium};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
    color: ${theme.colours.grey};
`;

const variants = {
    title,
    button,
    body,
    label,
    caption,
    error,
    hint,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
    variant: "body",
};