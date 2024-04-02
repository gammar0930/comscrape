import React from "react";
import Link from "next/link";
import ThemeToggler from "./theme-toggler";
import { ApiPromise, WsProvider } from '@polkadot/api';

import classes from './navigation-bar.module.css';
import classNames from "classnames";
import ActiveLink from "./active-link";
import { Dropdown, Modal, Space, Select } from 'antd';
import Image from "next/image";
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from "../../../public/svg/commune.svg";
import PolkadotWallet from "@/components/modal/polkadot-login-button";

export default function NavigationBar() {

    const [isShowWalletPaymentModal, setIsShowWalletPaymentModal] = React.useState(false)
    const [destinationAddress, setDestinationAddress] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [tokenType, setTokenType] = React.useState('')
    const [selectedChain, setSelectedChain] = React.useState('')
    const [isPolkadotWalletOpen, setIsShowPolkadotWalletModalOpen] = React.useState<boolean>(false)


    const handleWalletPaymentModalOpen = () => {
        setIsShowWalletPaymentModal(false)
    }

    const handleChange = (value: string) => {
        setTokenType(value)
    };

    const [api, setApi] = React.useState<ApiPromise | null>(null);
    const [chainInfo, setChainInfo] = React.useState('');
    const [nodeName, setNodeName] = React.useState('');

    React.useEffect(() => {
        const connectToSubstrate = async () => {
            const provider = new WsProvider('wss://rpc.polkadot.io');
            const substrateApi = await ApiPromise.create({ provider });
            setApi(substrateApi);
        };

        connectToSubstrate();
    }, []);

    const getChainInfo = async () => {
        if (api) {
            const chain = await api.rpc.system.chain();
            setChainInfo(chain.toString())
            const nodeName = await api.rpc.system.name();
            setNodeName(nodeName.toString())
            console.log(`Connected to chain ${chain} using ${nodeName}`);
        }
    };

    const handleComwalletLogin = () => {
        setIsShowPolkadotWalletModalOpen(true)
    }

    const handleLoginWalletCancel = () => {
        setIsShowPolkadotWalletModalOpen(false)
    }

    return (
        <nav aria-label="Main" className={classes.navbar}>
            <div className={classes.items}>
                <Link className={classes.brand} href="/">
                    <div className={classes.logo}>
                        <Image style={{ width: "auto", height: "3.7rem", marginRight: "-0.25rem" }} src={Logo} alt="My Site Logo" width={20} height={50} />
                    </div>
                    <b className="dark:text-white dark:hover:text-[#25c2a0]">commune</b>
                </Link>
                <ActiveLink activeClassName={classes.activeModules} className={classNames(classes.item, classes.modules)} href="/modules">🚀 Models</ActiveLink>
                {/* <Link className={classNames(classes.item, classes.whitepaper, 'dark:text-white dark:hover:text-[#25c2a0]')} href="https://ai-secure.github.io/DMLW2022/assets/papers/7.pdf" target="_blank" rel="noopener noreferrer">📄 Whitepaper</Link>
                <ActiveLink activeClassName={classes.active} className={classes.item} href="/telemetry"><Image src={'http://telemetry.communeai.net/favicon.svg'} alt="image" width={20} height={20}></Image> &nbsp;Telemetry</ActiveLink>
                <ActiveLink activeClassName={classes.active} className={classes.item} href="https://comwallet.io/">💱 ComWallet</ActiveLink>

                <Dropdown menu={{ items, onClick }}>
                    <Space>
                        <span style={{ fontWeight: '600', marginLeft: '0.25rem' }} className="hover:text-[#25c2a0] dark:text-white dark:hover:text-[#25c2a0]">💰 Payment</span>
                        <DownOutlined />
                    </Space>
                </Dropdown>
                <ActiveLink activeClassName={classes.active} className={classes.item} href="https://comchat.io/">🥂 ComChat</ActiveLink> */}

            </div>
            <div className={classNames(classes.items, classes.itemsRight)}>
                {/* <Link className={classNames(classes.link, 'dark:text-white dark:hover:text-[#25c2a0]')} href="/docs/introduction">🚀 v0.0.0</Link>
                <div className={classes.dropdown}>
                    <Link className={classNames(classes.link, 'dark:text-white dark:hover:text-[#25c2a0]')} href="#" aria-haspopup="true" aria-expanded="false" role="button" >🔗 Community</Link>
                    <ul className={classes.dropdownMenu}>
                        <li>
                            <Link
                                className={classes.dropdownLink}
                                href="https://discord.gg/communeai"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div style={{ display: "flex", alignItems: "center", }}>
                                    <span>Discord</span>
                                    <DiscordIcon />
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={classes.dropdownLink}
                                href="https://twitter.com/communeaidotorg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <span>Twitter</span>
                                    <TwitterIcon />
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={classes.dropdownLink}
                                href="https://github.com/commune-ai"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <span>Github</span>
                                    <GitHubIcon />
                                    <span className="nx-sr-only"></span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>

                <ActiveLink activeClassName={classes.activeDocs} className={classNames(classes.item, classes.docs)} href="/docs/introduction">📚 Docs</ActiveLink> */}
                <div className=' mr-2 bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white p-2 hover:text-white font-sans justify-center px-1 py-1 hover:border-blue-300 hover:border-solid cursor-pointer' onClick={handleComwalletLogin}>
                    Login with Comwallet
                </div>

                <div className={classes.themeTogglerWrapper}>
                    <ThemeToggler />
                </div>
            </div>

            {
                isShowWalletPaymentModal
                &&
                <Modal open={isShowWalletPaymentModal} onCancel={handleWalletPaymentModalOpen} footer={null} >

                    <div className="flex flex-col">
                        <label className="mt-2">Receiver:</label>
                        <input value={destinationAddress} onChange={({ target: { value } }) => setDestinationAddress(value)} style={{ padding: '0.3rem' }} className="mt-2" placeholder="Please input wallet address" />
                        <div className="flex items-center mt-4">
                            <label style={{ marginRight: '0.3rem' }}>PayType:</label>
                            <Space wrap>
                                <Select
                                    defaultValue="ETH"
                                    style={{ width: 120 }}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'eth', label: 'ETH' },
                                        { value: 'matic', label: 'MATIC' },
                                        { value: 'usdt', label: 'USDT' },
                                        { value: 'usdc', label: 'USDC' },
                                    ]}
                                />
                            </Space>
                            <label className="ml-auto mr-2">Amount:</label>
                            <input type="number" value={amount} onChange={({ target: { value } }) => setAmount(value)} style={{ padding: '0.3rem' }} />
                        </div>

                    </div>
                </Modal>
            }

            {
                isPolkadotWalletOpen && <Modal open={isPolkadotWalletOpen} onCancel={handleLoginWalletCancel} footer={null} >
                    <PolkadotWallet />
                </Modal>
            }

        </nav>
    );
}
