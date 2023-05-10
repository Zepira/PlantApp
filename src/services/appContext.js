
import React, { useState, createContext, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc, query, setDoc } from "firebase/firestore";


export const AppContext = createContext();

export const AppContextProvider = ({ db, storage, children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [plantData, setPlantData] = useState(null);


	//https://firebase.google.com/docs/reference/js/v8/firebase.firestore.FirestoreDataConverter
	useEffect(() => {
		const docRef = query(collection(db, 'plants'));
		getDocs(docRef)
			.then((something) => {
				const docs = something.docs.map((f) => f.data());
				console.log(docs);
				setPlantData(docs);
			}
			);

	}, [db]);




	return (
		<AppContext.Provider
			value={{
				setIsLoading,
				isLoading,
				db,
				storage,
				plantData
			}}>
			{children}
		</AppContext.Provider>
	);
};
