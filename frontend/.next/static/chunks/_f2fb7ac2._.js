(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletMultiButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletMultiButton.js [app-client] (ecmascript)");
"use client";
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletMultiButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletMultiButton"], {}, void 0, false, {
            fileName: "[project]/frontend/app/page.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/app/page.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/@solana/wallet-adapter-base-ui/lib/esm/useWalletMultiButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWalletMultiButton",
    ()=>useWalletMultiButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function useWalletMultiButton(param) {
    let { onSelectWallet } = param;
    const { connect, connected, connecting, disconnect, disconnecting, publicKey, select, wallet, wallets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"])();
    let buttonState;
    if (connecting) {
        buttonState = 'connecting';
    } else if (connected) {
        buttonState = 'connected';
    } else if (disconnecting) {
        buttonState = 'disconnecting';
    } else if (wallet) {
        buttonState = 'has-wallet';
    } else {
        buttonState = 'no-wallet';
    }
    const handleConnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWalletMultiButton.useCallback[handleConnect]": ()=>{
            connect().catch({
                "useWalletMultiButton.useCallback[handleConnect]": ()=>{
                // Silently catch because any errors are caught by the context `onError` handler
                }
            }["useWalletMultiButton.useCallback[handleConnect]"]);
        }
    }["useWalletMultiButton.useCallback[handleConnect]"], [
        connect
    ]);
    const handleDisconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWalletMultiButton.useCallback[handleDisconnect]": ()=>{
            disconnect().catch({
                "useWalletMultiButton.useCallback[handleDisconnect]": ()=>{
                // Silently catch because any errors are caught by the context `onError` handler
                }
            }["useWalletMultiButton.useCallback[handleDisconnect]"]);
        }
    }["useWalletMultiButton.useCallback[handleDisconnect]"], [
        disconnect
    ]);
    const handleSelectWallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWalletMultiButton.useCallback[handleSelectWallet]": ()=>{
            onSelectWallet({
                onSelectWallet: select,
                wallets
            });
        }
    }["useWalletMultiButton.useCallback[handleSelectWallet]"], [
        onSelectWallet,
        select,
        wallets
    ]);
    return {
        buttonState,
        onConnect: buttonState === 'has-wallet' ? handleConnect : undefined,
        onDisconnect: buttonState !== 'disconnecting' && buttonState !== 'no-wallet' ? handleDisconnect : undefined,
        onSelectWallet: handleSelectWallet,
        publicKey: publicKey !== null && publicKey !== void 0 ? publicKey : undefined,
        walletIcon: wallet === null || wallet === void 0 ? void 0 : wallet.adapter.icon,
        walletName: wallet === null || wallet === void 0 ? void 0 : wallet.adapter.name
    };
} //# sourceMappingURL=useWalletMultiButton.js.map
}),
"[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletConnectionButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseWalletConnectionButton",
    ()=>BaseWalletConnectionButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletIcon.js [app-client] (ecmascript)");
;
;
;
function BaseWalletConnectionButton(param) {
    let { walletIcon, walletName, ...props } = param;
    return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        ...props,
        className: "wallet-adapter-button-trigger",
        startIcon: walletIcon && walletName ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletIcon"], {
            wallet: {
                adapter: {
                    icon: walletIcon,
                    name: walletName
                }
            }
        }) : undefined
    });
} //# sourceMappingURL=BaseWalletConnectionButton.js.map
}),
"[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletMultiButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseWalletMultiButton",
    ()=>BaseWalletMultiButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$base$2d$ui$2f$lib$2f$esm$2f$useWalletMultiButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-base-ui/lib/esm/useWalletMultiButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$BaseWalletConnectionButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletConnectionButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$useWalletModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/useWalletModal.js [app-client] (ecmascript)");
;
;
;
;
function BaseWalletMultiButton(param) {
    let { children, labels, ...props } = param;
    const { setVisible: setModalVisible } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$useWalletModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletModal"])();
    const { buttonState, onConnect, onDisconnect, publicKey, walletIcon, walletName } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$base$2d$ui$2f$lib$2f$esm$2f$useWalletMultiButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletMultiButton"])({
        onSelectWallet () {
            setModalVisible(true);
        }
    });
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BaseWalletMultiButton.useEffect": ()=>{
            const listener = {
                "BaseWalletMultiButton.useEffect.listener": (event)=>{
                    const node = ref.current;
                    // Do nothing if clicking dropdown or its descendants
                    if (!node || node.contains(event.target)) return;
                    setMenuOpen(false);
                }
            }["BaseWalletMultiButton.useEffect.listener"];
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
            return ({
                "BaseWalletMultiButton.useEffect": ()=>{
                    document.removeEventListener('mousedown', listener);
                    document.removeEventListener('touchstart', listener);
                }
            })["BaseWalletMultiButton.useEffect"];
        }
    }["BaseWalletMultiButton.useEffect"], []);
    const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BaseWalletMultiButton.useMemo[content]": ()=>{
            if (children) {
                return children;
            } else if (publicKey) {
                const base58 = publicKey.toBase58();
                return base58.slice(0, 4) + '..' + base58.slice(-4);
            } else if (buttonState === 'connecting' || buttonState === 'has-wallet') {
                return labels[buttonState];
            } else {
                return labels['no-wallet'];
            }
        }
    }["BaseWalletMultiButton.useMemo[content]"], [
        buttonState,
        children,
        labels,
        publicKey
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        className: "wallet-adapter-dropdown"
    }, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$BaseWalletConnectionButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseWalletConnectionButton"], {
        ...props,
        "aria-expanded": menuOpen,
        style: {
            pointerEvents: menuOpen ? 'none' : 'auto',
            ...props.style
        },
        onClick: ()=>{
            switch(buttonState){
                case 'no-wallet':
                    setModalVisible(true);
                    break;
                case 'has-wallet':
                    if (onConnect) {
                        onConnect();
                    }
                    break;
                case 'connected':
                    setMenuOpen(true);
                    break;
            }
        },
        walletIcon: walletIcon,
        walletName: walletName
    }, content), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("ul", {
        "aria-label": "dropdown-list",
        className: "wallet-adapter-dropdown-list ".concat(menuOpen && 'wallet-adapter-dropdown-list-active'),
        ref: ref,
        role: "menu"
    }, publicKey ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("li", {
        className: "wallet-adapter-dropdown-list-item",
        onClick: async ()=>{
            await navigator.clipboard.writeText(publicKey.toBase58());
            setCopied(true);
            setTimeout(()=>setCopied(false), 400);
        },
        role: "menuitem"
    }, copied ? labels['copied'] : labels['copy-address']) : null, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("li", {
        className: "wallet-adapter-dropdown-list-item",
        onClick: ()=>{
            setModalVisible(true);
            setMenuOpen(false);
        },
        role: "menuitem"
    }, labels['change-wallet']), onDisconnect ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("li", {
        className: "wallet-adapter-dropdown-list-item",
        onClick: ()=>{
            onDisconnect();
            setMenuOpen(false);
        },
        role: "menuitem"
    }, labels['disconnect']) : null));
} //# sourceMappingURL=BaseWalletMultiButton.js.map
}),
"[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletMultiButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletMultiButton",
    ()=>WalletMultiButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$BaseWalletMultiButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletMultiButton.js [app-client] (ecmascript)");
;
;
const LABELS = {
    'change-wallet': 'Change wallet',
    connecting: 'Connecting ...',
    'copy-address': 'Copy address',
    copied: 'Copied',
    disconnect: 'Disconnect',
    'has-wallet': 'Connect',
    'no-wallet': 'Select Wallet'
};
function WalletMultiButton(props) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$BaseWalletMultiButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseWalletMultiButton"], {
        ...props,
        labels: LABELS
    });
} //# sourceMappingURL=WalletMultiButton.js.map
}),
]);

//# sourceMappingURL=_f2fb7ac2._.js.map