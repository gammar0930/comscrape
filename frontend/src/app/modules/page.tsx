"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ModulesService from "@/services/modules-service";
import classes from "./modules.module.css";
import SearchBar from "./components/search-bar";
import ModuleTileProps from "./modelItem";

export default function () {
	const [searchString, setSearchString] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	const [loadedModules, setLoadedModules] = useState<any[]>([]);
	const [displayedModules, setDisplayedModules] = useState<any[]>([]);
	const [filteredModules, setFilteredModules] = useState<any[]>([]);


	useEffect(() => {
		const filtered = searchString
			? loadedModules.filter((module) =>
				module.name.toLowerCase().includes(searchString.toLowerCase())
			)
			: loadedModules;
		setFilteredModules(filtered);
		if (searchString) {
			setCurrentPage(1);
			updateDisplayedModules(filtered, 1);
		} else {
			updateDisplayedModules(filtered, currentPage);
		}
	}, [searchString, loadedModules]);

	const pageCount = Math.ceil(filteredModules.length / itemsPerPage);

	useEffect(() => {
		async function fetchModules() {
			const modules = await ModulesService.getModulesList();
			setLoadedModules(modules);
			updateDisplayedModules(modules, currentPage);
		}

		fetchModules();
	}, []);

	const handlePageChange = (selectedItem: any) => {
		setCurrentPage(selectedItem.selected + 1);
		updateDisplayedModules(filteredModules, selectedItem.selected + 1);
	};

	const handleModulesFetched = (modules: string[]) => {
		const formattedModules = modules.map((moduleName: string) => ({
			name: moduleName,
		}));
		setLoadedModules(formattedModules);
		updateDisplayedModules(formattedModules, currentPage);
	};

	const updateDisplayedModules = (modules: any[], page: number) => {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setDisplayedModules(modules.slice(startIndex, endIndex));
	};

	const modelList = [
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024' },
				{ type: 'text', content: 'Learn how to create an account and manage your keys.' },
				{ type: 'image', url: 'https://platform.stability.ai/TSgRPCImageToImageResult.png', name: 'Image 1', attributes: { width: 800, height: 600 } },
				{ type: 'video', url: '/video/auto-1.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1920x1080' } },
				{ type: 'audio', url: '/public/audio/mix.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024' },
				{ type: 'text', content: 'Try it out live by clicking the link below to open' },
				{ type: 'image', url: 'https://platform.stability.ai/Inpainting-C4.png', name: 'Image 1', attributes: { width: 800, height: 600 } },
				{ type: 'video', url: 'https://assets-global.website-files.com/64e7e7a96943ac108730fe86/64f121301d6331a3af814d1a_-f071-4683-a316-7e8eedfe14b3-transcode.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1920x1080' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024' },
				{ type: 'text', content: 'Install the Stability SDK package..' },
				{ type: 'image', url: 'https://platform.stability.ai/BasicPrompt.png', name: 'Image 1', attributes: { width: 800, height: 600 } },
				{ type: 'video', url: '/video/auto-2.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1920x1080' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024' },
				{ type: 'text', content: 'This is not representative of all of the parameters available.' },
				{ type: 'image', url: 'https://platform.stability.ai/CLIPGuidance-C1.png', name: 'Image 1', attributes: { width: 800, height: 600 } },
				{ type: 'video', url: '/video/computer_vision.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1920x1080' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024' },
				{ type: 'text', content: 'Learn how to create variants of generated images.' },
				{ type: 'image', url: 'https://platform.stability.ai/CLIPGuidance-C2.png', name: 'Image 1', attributes: { width: 800, height: 600 } },
				{ type: 'video', url: '/video/generic.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1920x1080' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024' },
				{ type: 'text', content: 'Learn how to use multi-prompting and prompt weighting.' },
				{ type: 'image', url: 'https://platform.stability.ai/python-sdk-dochead.png', name: 'Image 1', attributes: { width: 600, height: 400 } },
				{ type: 'video', url: 'https://example.com/video1.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1920x1080' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024' },
				{ type: 'text', content: 'Learn how to upscale your images with our API.' },
				{ type: 'image', url: 'https://platform.stability.ai/clip-guidance-dochead.png', name: 'Image 1', attributes: { width: 800, height: 600 } },
				{ type: 'video', url: 'https://example.com/video1.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1920x1080' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024' },
				{ type: 'text', content: 'Learn how to create animations with our API.' },
				{ type: 'image', url: 'https://platform.stability.ai/variants-dochead.png', name: 'Image 1', attributes: { width: 800, height: 600 } },
				{ type: 'video', url: 'https://example.com/video1.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1920x1080' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024' },
				{ type: 'text', content: 'Learn how to use CLIP to guide image generation.' },
				{ type: 'image', url: 'https://platform.stability.ai/animation-dochead.png', name: 'Image 1', attributes: { width: 800, height: 600 } },
				{ type: 'video', url: 'https://example.com/video1.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1920x1080' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},

		// ... other elements in modelList
	];

	return (
		<>
			<main
				className={classNames(
					classes.content,
					"flex flex-col items-center justify-center my-auto "
				)}
			>
				{/* <PolkadotWallet onModulesFetched={handleModulesFetched} /> */}
				<SearchBar
					setSearchString={setSearchString}
					searchString={searchString}
				/>
				{modelList && modelList.length > 0 ? (
					<ul className={classes.modulesList}>
						{
							modelList.map((module, i) => (
								<div className="module-container w-[30%] rounded-lg border-solid dark:bg-[#1e2022] relative p-4 hover:scale-102" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 6px 4px" }}>
									<ModuleTileProps data={module.data} key={i} />
								</div>
								// <ModuleTile key={module.data[0].owner} {...module.data} />
							))
						}
					</ul>
				) : (
					<span>There is no data to display</span>
				)}
			</main>
			{/* {filteredModules.length > 8 && (
				<Pagination
					pageCount={pageCount}
					onPageChange={handlePageChange}
					forcePage={currentPage - 1}
					containerClassName="flex justify-center items-center space-x-3 my-4 text-lg dark:text-white"
					pageLinkClassName="px-5 text-lg border rounded hover:bg-gray-200 transition-colors duration-200 py-3"
					activeClassName="bg-blue-500 text-white py-3 rounded"
					previousLabel={"previous"}
					nextLabel={"next"}
					breakLabel={"..."}
					previousClassName={`mr-2 ${currentPage === 1
						? "text-gray-500"
						: "text-blue-500 hover:text-blue-700"
						}`}
					nextClassName={`${currentPage === pageCount
						? "text-gray-500"
						: "text-blue-500 hover:text-blue-700"
						}`}
				/>
			)} */}
		</>
	);
}
