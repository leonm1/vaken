import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import STRINGS from '../../assets/strings.json';

interface Props {
	option1: string;
	option2: string;
	option3: string;
	large?: boolean;
	onChange?: (input: string) => void;
	initialState: string;
	disable?: boolean;
}

interface SelectorProps {
    width: string;
    left: string;
	color: string;
}

interface WrapperProps {
	large: boolean;
	disable: boolean;
}

const Wrapper = styled('div')`
	margin: auto;
	height: ${(props: WrapperProps) => props.large ? '3.0rem' : '1.5rem'};
	line-height: ${(props: WrapperProps) => props.large ? '3.0rem' : '1.5rem'};
	border-radius: 0.25rem;
	background: ${(props: WrapperProps) => !props.disable ? '#ccc;' : '#B0B0B0'};
	position: relative;
	display: block;
	float: left;
`;

const Switch = styled('div')`
	cursor: pointer;
	position: relative;
	display: block;
	float: left;
	transition: 300ms ease-out;
	padding: 0 0.75rem;
`;

const Selector = styled('div')`
    left: ${(props: SelectorProps) => `${props.left};`}
	text-align: center;
	position: absolute;
	width: ${(props: SelectorProps) => `${props.width};`}
	box-sizing: border-box;
	transition: 300ms ease-out;
	border-radius: 0.225rem;
	color: white;
    box-shadow: 0px 0.125rem 0.625rem 0px #9b9b9b;
    background-color: ${(props: SelectorProps) => `${props.color};`};
`;

const disabledColor = '#696969';

export const RadioSlider: FunctionComponent<Props> = (props: Props): JSX.Element => {
	const option1Ref = useRef<HTMLDivElement>(null);
	const option2Ref = useRef<HTMLDivElement>(null);
	const option3Ref = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState(props.option2);
    const [width, setWidth] = useState(0);
    const [left, setLeft] = useState(0);
    const [color, setColor] = useState(!props.disable ? STRINGS.ACCENT_COLOR : disabledColor);
    const [isLoaded, setIsLoaded] = useState(false);

	const toggle = (input: string) => {
		switch(input) {
            case props.option1:
                if (option1Ref.current != null) {
                    setWidth(option1Ref.current.clientWidth);
                    setLeft(0);
                    setColor(!props.disable ? '#00C48C' : disabledColor);
                }
                break;
            case props.option2:
                if (option2Ref.current != null && option1Ref.current != null) {
                    setWidth(option2Ref.current.clientWidth);
                    setLeft(option1Ref.current.clientWidth);
                    setColor(!props.disable ? STRINGS.ACCENT_COLOR : disabledColor);
                }
                break;
            case props.option3:
                if (option1Ref.current != null && option2Ref.current != null && option3Ref.current != null) {
                    setWidth(option3Ref.current.clientWidth);
                    setLeft(option1Ref.current.clientWidth + option2Ref.current.clientWidth);
                    setColor(!props.disable ? '#FF647C' : disabledColor);
                }
                break;
		}
		setSelected(input);
	};
	
	useEffect(() => {
        if (option2Ref.current != null) {
            setWidth(option2Ref.current.clientWidth);
        }
        if (option1Ref.current != null) {
            setLeft(option1Ref.current.clientWidth);
		}
		toggle(props.initialState);
        setIsLoaded(true);
    }, []);

	const onClick = (event: any) => {
		if (!props.disable) {
			toggle(event.target.id);
			if (typeof props.onChange === 'function') {
				props.onChange(event.target.id);
			}
		}
	};

	return (
		<Wrapper large={props.large || false} disable={props.disable || false}>
			<Switch id={props.option1} onClick={onClick} ref={option1Ref}>
				{props.option1}
			</Switch>
			<Switch id={props.option2} onClick={onClick} ref={option2Ref}>
				{props.option2}
			</Switch>
			<Switch id={props.option3} onClick={onClick} ref={option3Ref}>
				{props.option3}
			</Switch>
            {isLoaded && <Selector left={`${left}px`} width={`${width}px`} color={color}>{selected}</Selector>}
		</Wrapper>
	);
};

export default RadioSlider;
