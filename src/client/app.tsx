import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import reset from 'styled-reset';
import LoginPage from './routes/login/Login';
import Frame from './routes/dashboard/Frame';
import { AuthContext } from './contexts/AuthContext';
import { useMeQuery } from './generated/graphql';

const GlobalStyle = createGlobalStyle`
	body {
		@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,500|Roboto:300,400,500,700');
		font-family: 'Roboto', sans-serif;

		${reset}
		user-select: none;
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
		font-size: 12px;
	}
`;

const Vaken: React.FunctionComponent = (): JSX.Element => {
	const [ready, setReady] = useState();
	const { data, error, loading } = useMeQuery();

	const StateMachine: React.FunctionComponent = (): JSX.Element | null => {
		if (!ready) return null;
		return data && data.me ? (
			<AuthContext.Provider value={data.me}>
				<Frame />
			</AuthContext.Provider>
		) : (
			<LoginPage />
		);
	};

	useEffect(() => {
		if (loading && ready) {
			setReady(false);
		} else if (error && !ready) {
			setReady(true);
		} else if (data && data.me && !ready) {
			setReady(true);
		}
	}, [loading, ready, error, data]);

	return (
		<BrowserRouter>
			<GlobalStyle />
			<StateMachine />
		</BrowserRouter>
	);
};

export default Vaken;
