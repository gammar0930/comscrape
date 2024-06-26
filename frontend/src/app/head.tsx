import React from 'react';
import { useSearchParams } from 'next/navigation';
import Logo from "../../public/svg/commune.svg";

const Head = () => {

	const searchparms = useSearchParams();
	const name = searchparms.get("titlename");
	const dynamicTitle = name ? `${name} | Comscrape` : "Comscrape";

	return (
		<>
			<title>
				{dynamicTitle.charAt(0).toUpperCase() + dynamicTitle.slice(1)}
			</title>
			<meta content="width=device-width, initial-scale=1" name="viewport" />
			<meta name="description" content="Renovating the way we build software for developers" />
			<link rel="icon" href={Logo.src} />
		</>
	);
};

export default Head;
