import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
type ContextProps = {
	user: null | boolean;
	session: Session | null;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
	children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
	// user null = loading
	const [user, setUser] = useState<null | boolean>(null);
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({data}) => {
			setSession(data?.session);
			setUser(data?.session ? true : false);
		});

		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event: string, session: Session | null) => {
				console.log(`Supabase auth event: ${event}, session: ${JSON.stringify(session)}`);
				setSession(session);
				setUser(session ? true : false);
			}
		);

		return () => {
			authListener!.subscription.unsubscribe();
		};
	}, [user]);

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
