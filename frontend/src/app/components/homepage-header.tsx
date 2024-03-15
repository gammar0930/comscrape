import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ApiPromise, WsProvider } from "@polkadot/api";
import MetaMaskImage from "../../../public/svg/metamask.svg";
import Modal from "antd/es/modal/Modal";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { saveMetaMaskAddress } from "@/store/action/transaction.record.action";
import AudioUpload from "@/components/modal/mp3Upload";
import VideoUpload from "@/components/modal/VideoUpload";
import ImageUpload from "@/components/modal/_imageUpload";
import { UploadData } from "@/store/action/uploadMoule.action";
import { useDispatch, useSelector } from 'react-redux'
import CubesShufflingGIF from '../../../public/gif/logo/CubesShufflingGIF.gif'

const words: string[] = [
  "developers.",
  "designers.",
  "creators.",
  "everyone.",
  "<END>",
];
const colour: string[] = [
  "text-[#00000]",
  "text-[#ffb4ed] dark:text-[#FFD6F5]",
  "text-[#FF8F8F]  dark:text-[#FF8F8F]",
  "text-[#ffef40] dark:text-[#FFF7A1]",
];

const TITLE = "Comscrape";
const TAGLINE = "World's largest AI model";

export default function HomepageHeader() {

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [isShowAuthModalOpen, setIsShowAuthModalOpen] = useState(false)
  const [isShowModelMintModalOpen, setIsShowModelMintModalOpen] = useState(false)
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);

  //mint video, image and audio,
  const [text, setText] = useState('')

  const [formData, setFormData] = useState(new FormData());

  //user login
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isShowSubstrateAuth, setIsShowSubstrateAuth] = useState(false)
  const [metamaskAddress, setMetamaskAddress] = useState<string | undefined>('')

  // state of the scroll position and header height
  const [scrollPosition, setScrollPosition] = useState(0);
  const headerRef = useRef<any>(null);
  const [headerHeight, setHeaderHeight] = useState(20);

  const [api, setApi] = useState<ApiPromise | null>(null);
  const [chainInfo, setChainInfo] = useState('');
  const [nodeName, setNodeName] = useState('');

  const dispatch = useDispatch<any>()
  // typeWriter effect
  // give me the context of this whole useEffect

  // const loginStatus = useSelector(({ transactionRecord: { loginStatus } }) => loginStatus)
  const loginStatus = true
  //getting user address
  useEffect(() => {
    if (index === words.length) return; // if end of words, return
    // if subIndex is equal to the length of the word + 1 and index is not the last word and not reverse
    if (subIndex === words[index].length + 1 && index !== words.length - 1 && !reverse) {
      setReverse(true);
      return;
    }
    // if subIndex is equal to 0 and reverse is true
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }
    // if reverse is true, subIndex is not 0 and index is not the last word
    if (index === words.length - 1)
      setIndex(() => 0)
    // if reverse is true, subIndex is not 0 and index is not the last word
    // if reverse is false, subIndex is not the length of the word and index is not the last word
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 :
      75, 25));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);


  // blinker effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 250);
    if (index === words.length) return;

    return () => clearTimeout(timeout2);
  }, [blink]);

  // Handle scroll position
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  // Add scroll event listener to window
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get header height on mount and when window is resized
  // This is to offset the scroll position so that the header
  useEffect(() => {
    if (headerRef?.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef.current]);

  const handleShowAuthModalCancel: () => void = () => {
    setIsShowAuthModalOpen(false);
  };

  const handleShowMintModalCancel = () => {
    setIsShowModelMintModalOpen(false)
  }

  const connectToSubstrate = async () => {
    const provider = new WsProvider('wss://rpc.polkadot.io');
    const substrateApi = await ApiPromise.create({ provider });
    setApi(substrateApi);
  }

  const getChainInfo = async () => {
    if (api) {
      const chain = await api.rpc.system.chain();
      setChainInfo(chain.toString())
      const nodeName = await api.rpc.system.name();
      setNodeName(nodeName.toString())
      console.log(`Connected to chain ${chain} using ${nodeName}`);
    }
  };

  useEffect(() => {
    getChainInfo()
  }, [api])

  const getAccountBalance = async () => {
    try {
      const accountInfo = await api?.query.system.account(address);

      // if (accountInfo?.isSome) {
      //   const { nonce, data: balance } = accountInfo.unwrap();

      //   console.log('Account Nonce:', nonce.toNumber());
      //   console.log('Account Balance:', balance.free.toString());

      //   setBalance(balance.free.toString());
      // } else {
      //   console.error('Account information not available for the provided address');
      // }
    } catch (error) {
      console.error('Error getting account balance:', error);
    }
  };

  const handleLogin = async () => {
    // Perform login logic here
    // For example, check if the entered address is valid and proceed accordingly
    console.log('--------this is the status---------', api)
    if (!api || !address) {
      window.alert('Substrate API not connected or address not provided')
      console.error('Substrate API not connected or address not provided');
      return;
    }

    // Fetch account balance as an example
    getAccountBalance();
  };

  const handleGetStartedButton = () => {
    // setIsShowModelMintModalOpen(true)
    setIsShowAuthModalOpen(true)
  }

  const handleMintModalButton = () => {
    setIsShowModelMintModalOpen(true)
  }

  const handleAudioUpload = (file: File) => {
    // Handle the uploaded audio file here
    formData.append('audio', file)
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      formData.append('image', file)
    }
  }

  const handleUploadButton = () => {
    formData.append('text', text);
    if (metamaskAddress) {
      formData.append('address', metamaskAddress)
    }
    dispatch(UploadData(formData))
    formData.delete('text');
    formData.delete('image');
    formData.delete('audio');
    formData.delete('video');
    formData.delete('address')
    setText('');
  }

  const handleFormDataUpdate = (updatedFormData: FormData) => {
    setFormData(updatedFormData);
  };

  useEffect(() => {
    if (isLoggedIn && metamaskAddress) {
      dispatch(saveMetaMaskAddress(metamaskAddress))
    }
  }, [isLoggedIn, metamaskAddress])

  return (

    <header ref={headerRef} className={` dark:bg-[#161616] p-[4rem] py-32 text-center overflow-hidden ${getHeaderClasses(scrollPosition, headerHeight)} duration-500`} >

      <Image src={CubesShufflingGIF} alt="Commune Logo" className='block sm:hidden' width={20} height={20} />
      <div className="px-10 py-5">
        <div className='flex lg:flex-row flex-col h-1/2'>
          <div className='w-full lg:w-1/2 flex flex-col items-center justify-center'>

            <div className=' w-auto sm:w-[710px] sm:h-[250px] '>
              <h1 className=" text-4xl sm:text-6xl sm:pb-3 dark:text-white">{TITLE}</h1>
              <div className='hidden sm:block'>
                <p className="hero__subtitle text-xl sm:text-4xl dark:text-white">{TAGLINE}
                  <br />
                  <span className={`hero__subtitle text-4xl ${colour[index]} font-semibold mb-5`}>{`${words[index].substring(0, subIndex)}${blink ? "|" : ""}`}</span></p>
              </div>
            </div>

            <div className='w-30 h-10'>

              {/* {
                loginStatus ?
                  <div className=' bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans font-semibold justify-center px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer' onClick={handleMintModalButton}>
                    Mint your topic
                  </div>
                  :
                  <div className=' bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans font-semibold justify-center px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer' onClick={handleGetStartedButton}>
                    Get Started
                  </div>
              } */}

              <div className=' bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans font-semibold justify-center px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer' onClick={handleMintModalButton}>
                Mint your topic
              </div>
            </div>

          </div>

          <div className='hidden sm:block w-full lg:w-1/2 h-full lg:-mr-44 '>
            <img src="https://raw.githubusercontent.com/luxejs/comhub-app/main/public/images/comai-webp.webp" alt="Commune Logo" className='' />
          </div>

        </div>
      </div>
      {
        isShowModelMintModalOpen &&
        <Modal open={isShowModelMintModalOpen} onCancel={handleShowMintModalCancel} footer={null} width={500}>
          <div className="flex flex-col">
            <h2 className="text-center">
              Mint Your Model
            </h2>

            <label>Text:</label>
            <input value={text} onChange={({ target: { value } }) => setText(value)} className="p-2 mb-2" />

            <label>Video:</label>
            <VideoUpload formData={formData} onFormDataUpdate={handleFormDataUpdate} />

            <div className="flex items-center mt-5">
              <div className="flex flex-col">
                <label>Image:</label>
                <ImageUpload onImageSelect={handleImageUpload} />
              </div>

              <div className="flex flex-col">
                <label>Audio:</label>
                <AudioUpload onUpload={handleAudioUpload} />
              </div>

            </div>

            <div className=' mt-5 bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans font-semibold justify-center px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer' onClick={handleUploadButton}>
              Mint
            </div>

          </div>
        </Modal>
      }
      {/* {
        isShowAuthModalOpen &&
        <Modal open={isShowAuthModalOpen} onCancel={handleShowAuthModalCancel} footer={null} width={500}>
          <div className='flex items-center justify-center'>
            <span style={{ fontWeight: '500', alignItems: 'center', display: 'flex', fontSize: '2rem' }}>
              Connect to Comscrape
            </span>
          </div>
          <div className="flex items-center justify-center mt-2 cursor-pointer">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                ready && account && chain && setIsLoggedIn(true);
                setMetamaskAddress(account?.address)
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');
                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <div className='flex items-center justify-center hover:bg-gray-300 p-2 w-[180.77px] h-[105.77px] rounded-md' style={{ flexDirection: 'column', border: '1px solid gray' }} onClick={openConnectModal}>
                            <Image src={MetaMaskImage} alt='login with Metamask' width={50} height={50} className='cursor-pointer mb-1' />
                            <button type="button">
                              Metamask
                            </button>
                          </div>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button" style={{ boxShadow: 'rgb(0 0 0 / 98%) 3px 3px 3px 3px' }}>
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div style={{ display: 'flex', gap: 12 }} className='flex items-center flex-col justify-center'>
                          <button
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <button type="button" style={{ color: 'darkcyan' }}>
                            Connected
                          </button>

                          <button onClick={openAccountModal} type="button">
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </button>

                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>

        </Modal>
      } */}
    </header>
  );
}

export const getHeaderClasses = (position: number, height: number) => {
  if (position > height / 2) {
    return "rounded-b-lg shadow-lg mx-5";
  }
  return "";
};
