"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import ModulesService from "@/services/modules-service";
import classes from "./modules.module.css";
import SearchBar from "./components/search-bar";
import ModuleTileProps, { ModuleTile } from "./modelItem";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, getModules } from "@/store/action/transaction.record.action";
import SelectOptionComponent from "./dropdown";
import { Modal } from "antd";
import Loading from "./spin";
import { distances } from "@/config";
import Distances from "./distance";
import ResultComponent from "./ResultItem";

export default function () {

	const [searchString, setSearchString] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	const [loadedModules, setLoadedModules] = useState<any[]>([]);
	const [displayedModules, setDisplayedModules] = useState<any[]>([]);
	const [filteredModules, setFilteredModules] = useState<any[]>([]);
	const [selectedOptionValue, setSelectedOptionValue] = useState<string>()
	const [showSelectedOptionValues, setShowSelectedOptionValues] = useState<any[]>([]);
	const [isShowEmbeddingModule, setIsShowEmbeddingModule] = useState<boolean>(false);
	const [isCalculating, setIsCalculating] = useState<boolean>(false)
	const [showDiv, setShowDiv] = useState(false);
	const [isShowResult, setIsShowResult] = useState(false)

	const dispatch = useDispatch<any>()

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

	useEffect(() => {
		dispatch(getModules())
	}, [])

	const models = useSelector(({ transactionRecord: { models } }) => models)

	const convertedData = models.map((model: any) => {
		return {
			data: [
				{ owner: 'Alan', date: '21/02/2024' },
				{ type: 'text', content: model.text_data },
				{ type: 'image', url: `${API_URL}/${model.image_filename.replace(/\\/g, '/')}`, name: 'Image 1', attributes: { width: 600, height: 400 } },
				{ type: 'video', url: `${API_URL}/${model.video_filename.replace(/\\/g, '/')}`, name: 'Video 1', attributes: { duration: '3:45', resolution: '1280x720' } },
				{ type: 'audio', url: `${API_URL}/${model.audio_filename.replace(/\\/g, '/')}`, name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } }
			]
		};
	});

	const modelList = [
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024', reward: '/img/reward/golden.png' },
				{ type: 'text', content: 'Learn how to create an account and manage your keys.' },
				{ type: 'image', url: 'https://platform.stability.ai/TSgRPCImageToImageResult.png', name: 'Image 1', attributes: { width: 600, height: 400 } },
				{ type: 'video', url: '/video/auto-1.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1280x720' } },
				{ type: 'audio', url: '/public/audio/mix.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024', reward: '/img/reward/golden1.png' },
				{ type: 'text', content: 'Try it out live by clicking the link below to open' },
				{ type: 'image', url: 'https://platform.stability.ai/Inpainting-C4.png', name: 'Image 1', attributes: { width: 600, height: 400 } },
				{ type: 'video', url: 'https://assets-global.website-files.com/64e7e7a96943ac108730fe86/64f121301d6331a3af814d1a_-f071-4683-a316-7e8eedfe14b3-transcode.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: ' 1280x720' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024', reward: '/img/reward/golden3.png' },
				{ type: 'text', content: 'Install the Stability SDK package..' },
				{ type: 'image', url: 'https://platform.stability.ai/BasicPrompt.png', name: 'Image 1', attributes: { width: 600, height: 400 } },
				{ type: 'video', url: '/video/auto-2.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1280x720' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024', reward: '/img/reward/silver1.png' },
				{ type: 'text', content: 'This is not representative of all of the parameters available.' },
				{ type: 'image', url: 'https://platform.stability.ai/CLIPGuidance-C1.png', name: 'Image 1', attributes: { width: 600, height: 400 } },
				{ type: 'video', url: '/video/computer_vision.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1280x720' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024', reward: '/img/reward/silver2.png' },
				{ type: 'text', content: 'Learn how to create variants of generated images.' },
				{ type: 'image', url: 'https://platform.stability.ai/CLIPGuidance-C2.png', name: 'Image 1', attributes: { width: 600, height: 400 } },
				{ type: 'video', url: '/video/generic.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1280x720' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024', reward: '/img/reward/silver.png' },
				{ type: 'text', content: 'Learn how to use multi-prompting and prompt weighting.' },
				{ type: 'image', url: 'https://platform.stability.ai/python-sdk-dochead.png', name: 'Image 1', attributes: { width: 600, height: 400 } },
				{ type: 'video', url: '/video/01.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1280x720' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024', reward: '/img/reward/brozen.png' },
				{ type: 'text', content: 'Learn how to upscale your images with our API.' },
				{ type: 'image', url: 'https://platform.stability.ai/clip-guidance-dochead.png', name: 'Image 1', attributes: { width: 600, height: 400 } },
				{ type: 'video', url: '/video/02.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1280x720' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024', reward: '/img/reward/brozen1.png' },
				{ type: 'text', content: 'Learn how to create animations with our API.' },
				{ type: 'image', url: 'https://platform.stability.ai/variants-dochead.png', name: 'Image 1', attributes: { width: 600, height: 400 } },
				{ type: 'video', url: '/video/03.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1280x720' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},
		{
			data: [
				{ owner: 'Alan', date: '21/02/2024', reward: '/img/reward/brozen2.png' },
				{ type: 'text', content: 'Learn how to use CLIP to guide image generation.' },
				{ type: 'image', url: 'https://platform.stability.ai/animation-dochead.png', name: 'Image 1', attributes: { width: 600, height: 400 } },
				{ type: 'video', url: '/video/04.mp4', name: 'Video 1', attributes: { duration: '3:45', resolution: '1280x720' } },
				{ type: 'audio', url: 'https://example.com/audio1.mp3', name: 'Audio 1', attributes: { duration: '2:30', bitrate: '128 kbps' } },
			],
		},

	];

	useEffect(() => {
		if (selectedOptionValue) {
			const selectedAssests = modelList.flatMap(model => model.data.filter(item => item.type === selectedOptionValue));
			setShowSelectedOptionValues(selectedAssests);
		}
	}, [selectedOptionValue])

	const ModuleComponent = modelList && modelList.length > 0 ? (
		<ul className={classes.modulesList}>
			{
				modelList.map((module: any, i: number) => (
					<div className="module-container w-[30%] rounded-lg border-solid dark:bg-[#1e2022] relative p-4 hover:scale-102" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 6px 4px" }} key={i}>
						<ModuleTileProps data={module.data} key={i} />
					</div>
				))
			}
		</ul>
	) : (
		<span>There is no data to display</span>
	)


	const FilteredComponent = showSelectedOptionValues && showSelectedOptionValues.length > 0 ? (
		<ul className={classes.modulesList}>
			{
				showSelectedOptionValues.map((module: any, i: number) => (
					<div className="module-container w-[30%] rounded-lg border-solid dark:bg-[#1e2022] relative p-4 hover:scale-102" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 6px 4px" }} key={i}>
						<ModuleTile item={module} />
					</div>
				))
			}
		</ul>
	) : (
		<span>There is no data to display</span>
	)

	const handleShowEnhance = () => {
		setIsShowEmbeddingModule(true)
	}

	const handleCancel = () => {
		setIsShowEmbeddingModule(false)
	}

	const handleOk = () => {
		setIsCalculating(true)
		setShowDiv(true)
		setIsShowEmbeddingModule(false)
	}

	useEffect(() => {
		// Set a timeout to hide the Loading component after 30 seconds
		const timeout = setTimeout(() => {
			setIsCalculating(false);
		}, 5000); // 30 seconds

		return () => clearTimeout(timeout);
	}, []);

	// useEffect(() => {
	// 	if (!isCalculating) {
	// 		setShowDiv(true);
	// 	}
	// }, [isCalculating]);

	const handleShowResultCancel = () => {
		setShowDiv(false)
	}

	const handleShowResultOk = () => {
		setIsShowResult(true)
	}

	const videoDistances = distances.videos.map(video => ({
		id: video.id,
		distance: video.distances.reduce((acc, val) => acc + val, 0)
	}));

	const sortedModelList = modelList.sort((a, b) => {
		const sumDistanceA = a.data
			.filter(item => item.type === 'video' && item.url)
			.reduce((acc, video) => {
				const id = parseInt(video.url?.split('/').pop()?.split('.')[0] ?? '');
				const distance = videoDistances.find(item => item.id === id)?.distance ?? 0;
				return acc + distance;
			}, 0);

		const sumDistanceB = b.data
			.filter(item => item.type === 'video' && item.url)
			.reduce((acc, video) => {
				const id = parseInt(video.url?.split('/').pop()?.split('.')[0] ?? '');
				const distance = videoDistances.find(item => item.id === id)?.distance ?? 0;
				return acc + distance;
			}, 0);

		return sumDistanceA - sumDistanceB;
	});

	const ShowResultComponent = sortedModelList && sortedModelList.length > 0 ? (
		<ul className={classes.modulesList}>
			{
				sortedModelList.map((module: any, i: number) => (
					<div className="module-container w-[30%] rounded-lg border-solid dark:bg-[#1e2022] relative p-4 hover:scale-102" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 6px 4px" }} key={i}>
						<ResultComponent data={module.data} key={i} />
					</div>
				))
			}
		</ul>
	) : (
		<span>There is no data to display</span>
	)

	useEffect(() => {

		if (isShowResult) {

		}

	}, [isShowResult])

	return (
		<>
			<main
				className={classNames(
					classes.content,
					"flex flex-col items-start justify-start my-auto "
				)}
			>
				<div className="flex items-center justify-center w-[92%] mx-auto">
					<SelectOptionComponent setValue={setSelectedOptionValue} />
					<SearchBar
						setSearchString={setSearchString}
						searchString={searchString}
					/>
					{
						selectedOptionValue && <button className="ml-4 dark:text-white border-[1px] rounded-md dark:border-white" onClick={handleShowEnhance}>Embrace your individuality</button>
					}


				</div>

				{
					isShowResult ? ShowResultComponent : (selectedOptionValue ? FilteredComponent : ModuleComponent)
				}

				{
					isShowEmbeddingModule &&
					<Modal title="Calculate video embeddings" open={isShowEmbeddingModule} onOk={handleOk} onCancel={handleCancel} footer={null}>
						Are you really want to Calculate video embeddings?
						<br />
						It might take some times.

						<div className="flex">
							<div className='mr-2 ml-auto rounded-lg shadow-lg hover:shadow-2xl text-center duration-200 justify-center px-2 py-2 border-blue-500 border-[1px] cursor-pointer' onClick={handleCancel}>
								Cancel
							</div>
							<div className='bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white justify-center px-2 py-2 hover:border-blue-300 cursor-pointer' onClick={handleOk}>
								OK
							</div>
						</div>

					</Modal>
				}

				{
					showDiv &&
					<Modal title="Video embeddings" open={showDiv} onOk={handleShowResultOk} onCancel={handleShowResultCancel} footer={null}>

						<Distances videos={distances.videos} />

						<div className="flex">
							<div className='mr-2 ml-auto rounded-lg shadow-lg hover:shadow-2xl text-center duration-200 justify-center px-2 py-2 border-blue-500 border-[1px] cursor-pointer' onClick={handleCancel}>
								Cancel
							</div>
							<div className='bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white justify-center px-2 py-2 hover:border-blue-300 cursor-pointer' onClick={handleShowResultOk}>
								OK
							</div>
						</div>
					</Modal>
				}

			</main>
		</>
	);
}
