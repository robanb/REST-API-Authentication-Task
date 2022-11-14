import React from "react";
import * as Flowbite from "flowbite-react";

export default function Footer() {
	return (
		<Flowbite.Footer container={true} className="">
			<Flowbite.Footer.Copyright href="#" by="web3 conscortium" year={2022} />
			<Flowbite.Footer.LinkGroup>
				<Flowbite.Footer.Link href="#">About</Flowbite.Footer.Link>
				<Flowbite.Footer.Link href="#">Privacy Policy</Flowbite.Footer.Link>
				<Flowbite.Footer.Link href="#">Licensing</Flowbite.Footer.Link>
				<Flowbite.Footer.Link href="#">Contact</Flowbite.Footer.Link>
			</Flowbite.Footer.LinkGroup>
		</Flowbite.Footer>
	);
}
