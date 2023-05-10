import React from 'react';
import styled from 'styled-components/native';


const sizeVariant = {
	small: '4px',
	medium: '8px',
	large: '16px',
	xl: '32px',
	xxl: '64px',
};


const positionVariant = {
	top: 'marginTop',
	left: 'marginLeft',
	right: 'marginRight',
	bottom: 'marginBottom',
};

const getVariant = (position, size) => {
	const property = positionVariant[position];
	const value = sizeVariant[size];

	return `${property}:${value}`;
};

const SpacerView = styled.View`
  ${({ variant }) => variant};
`;

export const Spacer = ({ position, size, children }) => {
	const variant = getVariant(position, size);
	return <SpacerView variant={variant}>{children}</SpacerView>;
};

Spacer.defaultProps = {
	position: 'top',
	size: 'small',
};