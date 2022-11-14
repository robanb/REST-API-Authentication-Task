import React from "react";
import Navigation from "./Navigation";
import * as Flowbite from "flowbite-react";

export default function Services() {
	return (
		<div className="bg-gray-800 h-screen w-screen relative overflow-hidden flex justify-center items-center ">
			<div className="h-40-r w-40-r bg-gradient-to-r  from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse brightness-50"></div>
			<div className="h-35-r w-35-r bg-gradient-to-r  from-purple-400 via-orange-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse brightness-50	"></div>
			<div className="h-screen w-screen bg-opacity-0 backdrop-blur-sm  ">
				<Navigation />
				<div className="grid grid-cols gap-4 place-items-center mt-2 mb-16">
					<div className="mx-auto">
						<div className=" h-100 w-full bg-opacity-0 bg-gray-900 rounded-2xl shadow-5xl shadow-violet-900 ">
							<div className="max-w-sm">
								<Flowbite.Card
									imgAlt="NFT minting services"
									imgSrc="https://mfnd.org/wp-content/uploads/2021/06/Snapshot-11-06-2021-1446-e1623466186730-1536x1259.png"
								>
									<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
										NFT Minting
									</h5>
									<p className="font-normal text-gray-700 dark:text-gray-400">
										We provide NFT minting services for your NFTs. We have a
										team of developers who can help you mint your NFTs.
									</p>
								</Flowbite.Card>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
