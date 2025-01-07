let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


function isLikeNone(x) {
    return x === undefined || x === null;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_1.set(idx, obj);
    return idx;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

let cachedFloat32ArrayMemory0 = null;

function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedInt32ArrayMemory0 = null;

function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_6.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_6.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
/**
 * @returns {Promise<void>}
 */
export function run() {
    wasm.run();
}

function __wbg_adapter_32(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h488b8e598f3d671c(arg0, arg1);
}

function __wbg_adapter_35(arg0, arg1, arg2) {
    wasm.closure8_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_40(arg0, arg1, arg2, arg3) {
    wasm.closure13_externref_shim(arg0, arg1, arg2, arg3);
}

function __wbg_adapter_49(arg0, arg1, arg2) {
    wasm.closure618_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_54(arg0, arg1, arg2) {
    wasm.closure2338_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_57(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0c49767a930557f3(arg0, arg1);
}

function __wbg_adapter_70(arg0, arg1, arg2) {
    wasm.closure2423_externref_shim(arg0, arg1, arg2);
}

const __wbindgen_enum_GpuCompilationMessageType = ["error", "warning", "info"];

const __wbindgen_enum_GpuDeviceLostReason = ["unknown", "destroyed"];

const __wbindgen_enum_GpuErrorFilter = ["validation", "out-of-memory", "internal"];

const __wbindgen_enum_GpuIndexFormat = ["uint16", "uint32"];

const __wbindgen_enum_GpuTextureFormat = ["r8unorm", "r8snorm", "r8uint", "r8sint", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32uint", "r32sint", "r32float", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb9e5ufloat", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rg32uint", "rg32sint", "rg32float", "rgba16uint", "rgba16sint", "rgba16float", "rgba32uint", "rgba32sint", "rgba32float", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"];

const __wbindgen_enum_ResizeObserverBoxOptions = ["border-box", "content-box", "device-pixel-content-box"];

const __wbindgen_enum_VisibilityState = ["hidden", "visible"];

export function __wbg_Window_781446b33bfaba10(arg0) {
    const ret = arg0.Window;
    return ret;
};

export function __wbg_Window_b27d9723d5e637c1(arg0) {
    const ret = arg0.Window;
    return ret;
};

export function __wbg_WorkerGlobalScope_2a9376a44447f368(arg0) {
    const ret = arg0.WorkerGlobalScope;
    return ret;
};

export function __wbg_abort_05026c983d86824c(arg0) {
    arg0.abort();
};

export function __wbg_activeElement_ea31ecc5423c6046(arg0) {
    const ret = arg0.activeElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_activeTexture_446c979476d36a40(arg0, arg1) {
    arg0.activeTexture(arg1 >>> 0);
};

export function __wbg_activeTexture_aec8c249ceb838d2(arg0, arg1) {
    arg0.activeTexture(arg1 >>> 0);
};

export function __wbg_addEventListener_b9481c2c2cab6047() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments) };

export function __wbg_addListener_16cb1f9da98d0a95() { return handleError(function (arg0, arg1) {
    arg0.addListener(arg1);
}, arguments) };

export function __wbg_altKey_d5409f5ddaa29593(arg0) {
    const ret = arg0.altKey;
    return ret;
};

export function __wbg_altKey_d54599b3b6b6cf22(arg0) {
    const ret = arg0.altKey;
    return ret;
};

export function __wbg_appendChild_d22bc7af6b96b3f1() { return handleError(function (arg0, arg1) {
    const ret = arg0.appendChild(arg1);
    return ret;
}, arguments) };

export function __wbg_attachShader_4dc5977795b5d865(arg0, arg1, arg2) {
    arg0.attachShader(arg1, arg2);
};

export function __wbg_attachShader_9b79a4896fee779d(arg0, arg1, arg2) {
    arg0.attachShader(arg1, arg2);
};

export function __wbg_beginComputePass_709dc6cea061b6c7(arg0, arg1) {
    const ret = arg0.beginComputePass(arg1);
    return ret;
};

export function __wbg_beginQuery_a36d8be48a41efd1(arg0, arg1, arg2) {
    arg0.beginQuery(arg1 >>> 0, arg2);
};

export function __wbg_beginRenderPass_2c6c0ec6686fd08b(arg0, arg1) {
    const ret = arg0.beginRenderPass(arg1);
    return ret;
};

export function __wbg_bindAttribLocation_1bb7778a77cc9600(arg0, arg1, arg2, arg3, arg4) {
    arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
};

export function __wbg_bindAttribLocation_c29bf37210232571(arg0, arg1, arg2, arg3, arg4) {
    arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
};

export function __wbg_bindBufferRange_8c066df50b7f2079(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.bindBufferRange(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_bindBuffer_e9412cc77f8130d6(arg0, arg1, arg2) {
    arg0.bindBuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindBuffer_ff7c55f1062014bc(arg0, arg1, arg2) {
    arg0.bindBuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindFramebuffer_c89f5adcd05acda2(arg0, arg1, arg2) {
    arg0.bindFramebuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindFramebuffer_fbd7ce3580c64aab(arg0, arg1, arg2) {
    arg0.bindFramebuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindRenderbuffer_99e33f6e6bbbf495(arg0, arg1, arg2) {
    arg0.bindRenderbuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindRenderbuffer_b2ae77395abc8841(arg0, arg1, arg2) {
    arg0.bindRenderbuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindSampler_643fcc252494b69e(arg0, arg1, arg2) {
    arg0.bindSampler(arg1 >>> 0, arg2);
};

export function __wbg_bindTexture_8b97cf7511a725d0(arg0, arg1, arg2) {
    arg0.bindTexture(arg1 >>> 0, arg2);
};

export function __wbg_bindTexture_f65d2e377e3de352(arg0, arg1, arg2) {
    arg0.bindTexture(arg1 >>> 0, arg2);
};

export function __wbg_bindVertexArrayOES_19ed43bbe1241f7a(arg0, arg1) {
    arg0.bindVertexArrayOES(arg1);
};

export function __wbg_bindVertexArray_67a807a1cd64976a(arg0, arg1) {
    arg0.bindVertexArray(arg1);
};

export function __wbg_blendColor_18e368a25ef98e20(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendColor(arg1, arg2, arg3, arg4);
};

export function __wbg_blendColor_e6dc90d8b0f2859d(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendColor(arg1, arg2, arg3, arg4);
};

export function __wbg_blendEquationSeparate_26681d98390d0057(arg0, arg1, arg2) {
    arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendEquationSeparate_e81d45aebb0a6f22(arg0, arg1, arg2) {
    arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendEquation_9f73e32730d0c986(arg0, arg1) {
    arg0.blendEquation(arg1 >>> 0);
};

export function __wbg_blendEquation_c46279e50291dd42(arg0, arg1) {
    arg0.blendEquation(arg1 >>> 0);
};

export function __wbg_blendFuncSeparate_0031130a17fd5eb8(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_blendFuncSeparate_4d5cc402dcf7389f(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_blendFunc_3fa0c1671c2d6442(arg0, arg1, arg2) {
    arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendFunc_57545f7f7240fd88(arg0, arg1, arg2) {
    arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blitFramebuffer_b2732a9904aa5f9a(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.blitFramebuffer(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
};

export function __wbg_blockSize_6464e214800294a9(arg0) {
    const ret = arg0.blockSize;
    return ret;
};

export function __wbg_body_8d7d8c4aa91dcad8(arg0) {
    const ret = arg0.body;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_bufferData_0643498950a2292f(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_618f2917f283ed2d(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_7e2b6059c35c9291(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_be9f114b6d1ce00b(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferSubData_72cb32e32d111392(arg0, arg1, arg2, arg3) {
    arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
};

export function __wbg_bufferSubData_fac15d2090589d38(arg0, arg1, arg2, arg3) {
    arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
};

export function __wbg_buffer_61b7ce01341d7f88(arg0) {
    const ret = arg0.buffer;
    return ret;
};

export function __wbg_buffer_dc5dbfa8d5fb28cf(arg0) {
    const ret = arg0.buffer;
    return ret;
};

export function __wbg_button_12b22015f2d5993d(arg0) {
    const ret = arg0.button;
    return ret;
};

export function __wbg_buttons_e83cec0abc6f937f(arg0) {
    const ret = arg0.buttons;
    return ret;
};

export function __wbg_call_b0d8e36992d9900d() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments) };

export function __wbg_cancelAnimationFrame_5f7904867f6ab804() { return handleError(function (arg0, arg1) {
    arg0.cancelAnimationFrame(arg1);
}, arguments) };

export function __wbg_cancelIdleCallback_511311272bf3c490(arg0, arg1) {
    arg0.cancelIdleCallback(arg1 >>> 0);
};

export function __wbg_catch_d0fc80129c999ab3(arg0, arg1) {
    const ret = arg0.catch(arg1);
    return ret;
};

export function __wbg_clearBuffer_4a2a1267126c9b1e(arg0, arg1, arg2, arg3) {
    arg0.clearBuffer(arg1, arg2, arg3);
};

export function __wbg_clearBuffer_b81a2d5d14c0c1cc(arg0, arg1, arg2) {
    arg0.clearBuffer(arg1, arg2);
};

export function __wbg_clearBufferfv_0afa4ff128410673(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferfv(arg1 >>> 0, arg2, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_clearBufferiv_0606fb1b2d1a2a23(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferiv(arg1 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
};

export function __wbg_clearBufferuiv_a10c437649deef29(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferuiv(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4));
};

export function __wbg_clearDepth_09770ed9850b53ca(arg0, arg1) {
    arg0.clearDepth(arg1);
};

export function __wbg_clearDepth_2634fb35e857706d(arg0, arg1) {
    arg0.clearDepth(arg1);
};

export function __wbg_clearStencil_1569884ab4ec561a(arg0, arg1) {
    arg0.clearStencil(arg1);
};

export function __wbg_clearStencil_55dcc514b986536b(arg0, arg1) {
    arg0.clearStencil(arg1);
};

export function __wbg_clearTimeout_af66bc7e0dd9b02b(arg0, arg1) {
    arg0.clearTimeout(arg1);
};

export function __wbg_clear_16ffdcc1a1d6f0c9(arg0, arg1) {
    arg0.clear(arg1 >>> 0);
};

export function __wbg_clear_c182acb53176ea8b(arg0, arg1) {
    arg0.clear(arg1 >>> 0);
};

export function __wbg_clientWaitSync_43e929bdfdac99d0(arg0, arg1, arg2, arg3) {
    const ret = arg0.clientWaitSync(arg1, arg2 >>> 0, arg3 >>> 0);
    return ret;
};

export function __wbg_close_b102ec699b1075d4(arg0) {
    arg0.close();
};

export function __wbg_code_878e1961e18ba92f(arg0, arg1) {
    const ret = arg1.code;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_colorMask_04bc7392c9d1b568(arg0, arg1, arg2, arg3, arg4) {
    arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export function __wbg_colorMask_401f99e62155b996(arg0, arg1, arg2, arg3, arg4) {
    arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export function __wbg_compileShader_afcc43901f14a922(arg0, arg1) {
    arg0.compileShader(arg1);
};

export function __wbg_compileShader_fab2df50ae89c5e1(arg0, arg1) {
    arg0.compileShader(arg1);
};

export function __wbg_compressedTexSubImage2D_918f2367c157fd0c(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
};

export function __wbg_compressedTexSubImage2D_b35753ef6ad8770a(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8, arg9);
};

export function __wbg_compressedTexSubImage2D_d6f7b105748dbad9(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
};

export function __wbg_compressedTexSubImage3D_95d6e6c886d07077(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10, arg11);
};

export function __wbg_compressedTexSubImage3D_d0a241ff5f026316(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10);
};

export function __wbg_configure_885d066191982c0c(arg0, arg1) {
    arg0.configure(arg1);
};

export function __wbg_contains_12e954301a3dcdc7(arg0, arg1) {
    const ret = arg0.contains(arg1);
    return ret;
};

export function __wbg_contentRect_6fadfee6731ac5df(arg0) {
    const ret = arg0.contentRect;
    return ret;
};

export function __wbg_copyBufferSubData_649b323af0d7bed7(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.copyBufferSubData(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_copyBufferToBuffer_69dd2d62630147ce(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4, arg5);
};

export function __wbg_copyBufferToTexture_e666874e5ca1fde0(arg0, arg1, arg2, arg3) {
    arg0.copyBufferToTexture(arg1, arg2, arg3);
};

export function __wbg_copyExternalImageToTexture_7cd0fc3ebe18d8de(arg0, arg1, arg2, arg3) {
    arg0.copyExternalImageToTexture(arg1, arg2, arg3);
};

export function __wbg_copyTexSubImage2D_1bfee3392d4647ed(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
};

export function __wbg_copyTexSubImage2D_359aaa61913ab963(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
};

export function __wbg_copyTexSubImage3D_9b7dbe58ee71c6ee(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.copyTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
};

export function __wbg_copyTextureToBuffer_5b256e2e7af81464(arg0, arg1, arg2, arg3) {
    arg0.copyTextureToBuffer(arg1, arg2, arg3);
};

export function __wbg_copyTextureToTexture_7b03c851103fa1c3(arg0, arg1, arg2, arg3) {
    arg0.copyTextureToTexture(arg1, arg2, arg3);
};

export function __wbg_createBindGroupLayout_3fa1f991799a9b32(arg0, arg1) {
    const ret = arg0.createBindGroupLayout(arg1);
    return ret;
};

export function __wbg_createBindGroup_7330123c360d14c6(arg0, arg1) {
    const ret = arg0.createBindGroup(arg1);
    return ret;
};

export function __wbg_createBuffer_406ac423927f222d(arg0, arg1) {
    const ret = arg0.createBuffer(arg1);
    return ret;
};

export function __wbg_createBuffer_567b536a03db30d2(arg0) {
    const ret = arg0.createBuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createBuffer_8692729b8ac9caaf(arg0) {
    const ret = arg0.createBuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createCommandEncoder_ed1b789900d13422(arg0, arg1) {
    const ret = arg0.createCommandEncoder(arg1);
    return ret;
};

export function __wbg_createComputePipeline_e7fc1ba416e1f5e4(arg0, arg1) {
    const ret = arg0.createComputePipeline(arg1);
    return ret;
};

export function __wbg_createElement_89923fcb809656b7() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments) };

export function __wbg_createFramebuffer_346cd4e0b98b15c4(arg0) {
    const ret = arg0.createFramebuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createFramebuffer_a3361909a5a3c966(arg0) {
    const ret = arg0.createFramebuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createPipelineLayout_20710f4f4edf1bd0(arg0, arg1) {
    const ret = arg0.createPipelineLayout(arg1);
    return ret;
};

export function __wbg_createProgram_b8f69529220fb50b(arg0) {
    const ret = arg0.createProgram();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createProgram_e2141127012594b0(arg0) {
    const ret = arg0.createProgram();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createQuerySet_432cdc636a1fbbfd(arg0, arg1) {
    const ret = arg0.createQuerySet(arg1);
    return ret;
};

export function __wbg_createQuery_31dfa91163ee063b(arg0) {
    const ret = arg0.createQuery();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createRenderBundleEncoder_ef0ffb531dea861a(arg0, arg1) {
    const ret = arg0.createRenderBundleEncoder(arg1);
    return ret;
};

export function __wbg_createRenderPipeline_779eaab40d3d339d(arg0, arg1) {
    const ret = arg0.createRenderPipeline(arg1);
    return ret;
};

export function __wbg_createRenderbuffer_82b325966b1c6114(arg0) {
    const ret = arg0.createRenderbuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createRenderbuffer_b00f90e7450a2820(arg0) {
    const ret = arg0.createRenderbuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createSampler_79b0a9898fb95edf(arg0) {
    const ret = arg0.createSampler();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createSampler_d34eca20c88a051b(arg0, arg1) {
    const ret = arg0.createSampler(arg1);
    return ret;
};

export function __wbg_createShaderModule_5c5f5762f338d57a(arg0, arg1) {
    const ret = arg0.createShaderModule(arg1);
    return ret;
};

export function __wbg_createShader_442f69b8f536a786(arg0, arg1) {
    const ret = arg0.createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createShader_809bd3abe629ad7a(arg0, arg1) {
    const ret = arg0.createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createTexture_3c9e731e954515fa(arg0) {
    const ret = arg0.createTexture();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createTexture_677a150f3f985ce0(arg0) {
    const ret = arg0.createTexture();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createTexture_ddaa163dac15c571(arg0, arg1) {
    const ret = arg0.createTexture(arg1);
    return ret;
};

export function __wbg_createVertexArrayOES_950dd712f273bb06(arg0) {
    const ret = arg0.createVertexArrayOES();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createVertexArray_68ae270682fc14aa(arg0) {
    const ret = arg0.createVertexArray();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createView_81fea709eb3e22f0(arg0, arg1) {
    const ret = arg0.createView(arg1);
    return ret;
};

export function __wbg_ctrlKey_5a324c8556fbce1c(arg0) {
    const ret = arg0.ctrlKey;
    return ret;
};

export function __wbg_ctrlKey_5c308955b0d5492d(arg0) {
    const ret = arg0.ctrlKey;
    return ret;
};

export function __wbg_cullFace_d68398a8ce2f6fe3(arg0, arg1) {
    arg0.cullFace(arg1 >>> 0);
};

export function __wbg_cullFace_dbad3db56721e436(arg0, arg1) {
    arg0.cullFace(arg1 >>> 0);
};

export function __wbg_debug_156ca727dbc3150f(arg0) {
    console.debug(arg0);
};

export function __wbg_deleteBuffer_783d60e842697847(arg0, arg1) {
    arg0.deleteBuffer(arg1);
};

export function __wbg_deleteBuffer_bf5a34580654a42a(arg0, arg1) {
    arg0.deleteBuffer(arg1);
};

export function __wbg_deleteFramebuffer_73b3cd0be3d68d24(arg0, arg1) {
    arg0.deleteFramebuffer(arg1);
};

export function __wbg_deleteFramebuffer_f91ceb4755e7bed3(arg0, arg1) {
    arg0.deleteFramebuffer(arg1);
};

export function __wbg_deleteProgram_3ca13ed49ca24a48(arg0, arg1) {
    arg0.deleteProgram(arg1);
};

export function __wbg_deleteProgram_47e8c8c7f0923d3d(arg0, arg1) {
    arg0.deleteProgram(arg1);
};

export function __wbg_deleteQuery_4d8b5ae45694bf79(arg0, arg1) {
    arg0.deleteQuery(arg1);
};

export function __wbg_deleteRenderbuffer_36ac432b5656c10f(arg0, arg1) {
    arg0.deleteRenderbuffer(arg1);
};

export function __wbg_deleteRenderbuffer_867d9aaec2e09190(arg0, arg1) {
    arg0.deleteRenderbuffer(arg1);
};

export function __wbg_deleteSampler_e3b7bb05c49ac425(arg0, arg1) {
    arg0.deleteSampler(arg1);
};

export function __wbg_deleteShader_e1f71043508b6951(arg0, arg1) {
    arg0.deleteShader(arg1);
};

export function __wbg_deleteShader_e4fe2574d9c3afab(arg0, arg1) {
    arg0.deleteShader(arg1);
};

export function __wbg_deleteSync_925fececf3795207(arg0, arg1) {
    arg0.deleteSync(arg1);
};

export function __wbg_deleteTexture_36653aa53d4a29e9(arg0, arg1) {
    arg0.deleteTexture(arg1);
};

export function __wbg_deleteTexture_eaf729f97b59aaf4(arg0, arg1) {
    arg0.deleteTexture(arg1);
};

export function __wbg_deleteVertexArrayOES_0de32bd8adddeecb(arg0, arg1) {
    arg0.deleteVertexArrayOES(arg1);
};

export function __wbg_deleteVertexArray_cff2c6ab55f2c8b6(arg0, arg1) {
    arg0.deleteVertexArray(arg1);
};

export function __wbg_deltaMode_b2e9bb0dca5cf196(arg0) {
    const ret = arg0.deltaMode;
    return ret;
};

export function __wbg_deltaX_5c26d3b55d406732(arg0) {
    const ret = arg0.deltaX;
    return ret;
};

export function __wbg_deltaY_1683a859ce933add(arg0) {
    const ret = arg0.deltaY;
    return ret;
};

export function __wbg_depthFunc_351a7bf1596d4061(arg0, arg1) {
    arg0.depthFunc(arg1 >>> 0);
};

export function __wbg_depthFunc_70ac0cb861c8a03b(arg0, arg1) {
    arg0.depthFunc(arg1 >>> 0);
};

export function __wbg_depthMask_0ff63f0d4501072b(arg0, arg1) {
    arg0.depthMask(arg1 !== 0);
};

export function __wbg_depthMask_3daac0e40564953e(arg0, arg1) {
    arg0.depthMask(arg1 !== 0);
};

export function __wbg_depthRange_872f6de9705a826c(arg0, arg1, arg2) {
    arg0.depthRange(arg1, arg2);
};

export function __wbg_depthRange_febb5e8bd978fe0e(arg0, arg1, arg2) {
    arg0.depthRange(arg1, arg2);
};

export function __wbg_destroy_071d29ca29291f0b(arg0) {
    arg0.destroy();
};

export function __wbg_destroy_09e1c001eb89d587(arg0) {
    arg0.destroy();
};

export function __wbg_destroy_55468878864fb284(arg0) {
    arg0.destroy();
};

export function __wbg_devicePixelContentBoxSize_f91b326c21f7e3d5(arg0) {
    const ret = arg0.devicePixelContentBoxSize;
    return ret;
};

export function __wbg_devicePixelRatio_973abafaa5e8254b(arg0) {
    const ret = arg0.devicePixelRatio;
    return ret;
};

export function __wbg_disableVertexAttribArray_1bf5b473f133c8ab(arg0, arg1) {
    arg0.disableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_disableVertexAttribArray_f49780d5b42e6b0d(arg0, arg1) {
    arg0.disableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_disable_2f09f593bf0f5573(arg0, arg1) {
    arg0.disable(arg1 >>> 0);
};

export function __wbg_disable_302597eacd491d44(arg0, arg1) {
    arg0.disable(arg1 >>> 0);
};

export function __wbg_disconnect_6e7f07912b7a73c6(arg0) {
    arg0.disconnect();
};

export function __wbg_disconnect_c350961ad9f8057a(arg0) {
    arg0.disconnect();
};

export function __wbg_dispatchWorkgroupsIndirect_248a40eb421e602f(arg0, arg1, arg2) {
    arg0.dispatchWorkgroupsIndirect(arg1, arg2);
};

export function __wbg_dispatchWorkgroups_d4225f09bdb1a2b8(arg0, arg1, arg2, arg3) {
    arg0.dispatchWorkgroups(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
};

export function __wbg_document_f11bc4f7c03e1745(arg0) {
    const ret = arg0.document;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_drawArraysInstancedANGLE_966863941d85fceb(arg0, arg1, arg2, arg3, arg4) {
    arg0.drawArraysInstancedANGLE(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_drawArraysInstanced_fae83959489569b9(arg0, arg1, arg2, arg3, arg4) {
    arg0.drawArraysInstanced(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_drawArrays_01e26acf05821932(arg0, arg1, arg2, arg3) {
    arg0.drawArrays(arg1 >>> 0, arg2, arg3);
};

export function __wbg_drawArrays_32d97bfaf282c738(arg0, arg1, arg2, arg3) {
    arg0.drawArrays(arg1 >>> 0, arg2, arg3);
};

export function __wbg_drawBuffersWEBGL_f5eea4913dbb3ac0(arg0, arg1) {
    arg0.drawBuffersWEBGL(arg1);
};

export function __wbg_drawBuffers_5a72890eb9a6161d(arg0, arg1) {
    arg0.drawBuffers(arg1);
};

export function __wbg_drawElementsInstancedANGLE_68db220ea0b974d4(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawElementsInstancedANGLE(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_drawElementsInstanced_31cba585f87c4481(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawElementsInstanced(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_drawIndexedIndirect_31a886924e4d91c5(arg0, arg1, arg2) {
    arg0.drawIndexedIndirect(arg1, arg2);
};

export function __wbg_drawIndexedIndirect_a91341ca1697732b(arg0, arg1, arg2) {
    arg0.drawIndexedIndirect(arg1, arg2);
};

export function __wbg_drawIndexed_16f192623e504221(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
};

export function __wbg_drawIndexed_9863c3fc3b88662b(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
};

export function __wbg_drawIndirect_d11fd341fbe1d252(arg0, arg1, arg2) {
    arg0.drawIndirect(arg1, arg2);
};

export function __wbg_drawIndirect_f310f950fb697939(arg0, arg1, arg2) {
    arg0.drawIndirect(arg1, arg2);
};

export function __wbg_draw_378476fab6ddcb8a(arg0, arg1, arg2, arg3, arg4) {
    arg0.draw(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_draw_b09be351500cf4b3(arg0, arg1, arg2, arg3, arg4) {
    arg0.draw(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_enableVertexAttribArray_211547224fc25327(arg0, arg1) {
    arg0.enableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_enableVertexAttribArray_60827f2a43782639(arg0, arg1) {
    arg0.enableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_enable_2bacfac56e802b11(arg0, arg1) {
    arg0.enable(arg1 >>> 0);
};

export function __wbg_enable_a7767e03f7973ca8(arg0, arg1) {
    arg0.enable(arg1 >>> 0);
};

export function __wbg_endQuery_b8c16bf6865f8274(arg0, arg1) {
    arg0.endQuery(arg1 >>> 0);
};

export function __wbg_end_0b60345473910d78(arg0) {
    arg0.end();
};

export function __wbg_end_625d1f0f7a69f3a8(arg0) {
    arg0.end();
};

export function __wbg_error_7534b8e9a36f1ab4(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

export function __wbg_error_bbab955d384cda8a(arg0) {
    const ret = arg0.error;
    return ret;
};

export function __wbg_error_bc396fc38839dd25(arg0, arg1) {
    console.error(arg0, arg1);
};

export function __wbg_error_fab41a42d22bf2bc(arg0) {
    console.error(arg0);
};

export function __wbg_executeBundles_81c717eea5bb2637(arg0, arg1) {
    arg0.executeBundles(arg1);
};

export function __wbg_features_52a947d3e610abdd(arg0) {
    const ret = arg0.features;
    return ret;
};

export function __wbg_features_c00b0bf2b04ccd63(arg0) {
    const ret = arg0.features;
    return ret;
};

export function __wbg_fenceSync_a11f4721fc400f2d(arg0, arg1, arg2) {
    const ret = arg0.fenceSync(arg1 >>> 0, arg2 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_finish_63fc7fb280e47102(arg0, arg1) {
    const ret = arg0.finish(arg1);
    return ret;
};

export function __wbg_finish_9efeb3f241fdae3b(arg0) {
    const ret = arg0.finish();
    return ret;
};

export function __wbg_finish_b7dfeb96aa58bbe4(arg0) {
    const ret = arg0.finish();
    return ret;
};

export function __wbg_finish_d888aab5410bcf28(arg0, arg1) {
    const ret = arg0.finish(arg1);
    return ret;
};

export function __wbg_focus_35fe945f7268dd62() { return handleError(function (arg0) {
    arg0.focus();
}, arguments) };

export function __wbg_framebufferRenderbuffer_a51d38203e558ea9(arg0, arg1, arg2, arg3, arg4) {
    arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
};

export function __wbg_framebufferRenderbuffer_d198a03c2c5c7581(arg0, arg1, arg2, arg3, arg4) {
    arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
};

export function __wbg_framebufferTexture2D_86a2063326486ec7(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
};

export function __wbg_framebufferTexture2D_a1a6486dde56610f(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
};

export function __wbg_framebufferTextureLayer_12c11d57e6a4c64f(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTextureLayer(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_framebufferTextureMultiviewOVR_31a4fd0718dbe567(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.framebufferTextureMultiviewOVR(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5, arg6);
};

export function __wbg_frontFace_f05d4ebc9795b232(arg0, arg1) {
    arg0.frontFace(arg1 >>> 0);
};

export function __wbg_frontFace_fd41ceb920a4949d(arg0, arg1) {
    arg0.frontFace(arg1 >>> 0);
};

export function __wbg_fullscreenElement_d6cbbb5d5f0362c4(arg0) {
    const ret = arg0.fullscreenElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getBindGroupLayout_a82945570028441f(arg0, arg1) {
    const ret = arg0.getBindGroupLayout(arg1 >>> 0);
    return ret;
};

export function __wbg_getBindGroupLayout_bc5678195dcb5d1a(arg0, arg1) {
    const ret = arg0.getBindGroupLayout(arg1 >>> 0);
    return ret;
};

export function __wbg_getBufferSubData_af1f61d38b0f3066(arg0, arg1, arg2, arg3) {
    arg0.getBufferSubData(arg1 >>> 0, arg2, arg3);
};

export function __wbg_getCoalescedEvents_c7e4ef019798f464(arg0) {
    const ret = arg0.getCoalescedEvents;
    return ret;
};

export function __wbg_getCoalescedEvents_f51eabe0483efd6f(arg0) {
    const ret = arg0.getCoalescedEvents();
    return ret;
};

export function __wbg_getCompilationInfo_329492eb7e573334(arg0) {
    const ret = arg0.getCompilationInfo();
    return ret;
};

export function __wbg_getComputedStyle_8e58bbd76370e2b1() { return handleError(function (arg0, arg1) {
    const ret = arg0.getComputedStyle(arg1);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_0ceb5ecb5266d11f() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_0d352527e1372866() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_5eaf5645cd6acb46() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_76b028baa6dafdeb() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getCurrentTexture_f6f2d0e9fb9756aa(arg0) {
    const ret = arg0.getCurrentTexture();
    return ret;
};

export function __wbg_getElementById_dcc9f1f3cfdca0bc(arg0, arg1, arg2) {
    const ret = arg0.getElementById(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getExtension_f31653ddc3f1cef9() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getIndexedParameter_b15a32a9e355913b() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getIndexedParameter(arg1 >>> 0, arg2 >>> 0);
    return ret;
}, arguments) };

export function __wbg_getMappedRange_477801193e0d896e(arg0, arg1, arg2) {
    const ret = arg0.getMappedRange(arg1, arg2);
    return ret;
};

export function __wbg_getOwnPropertyDescriptor_da0bd3d3d60cf5c1(arg0, arg1) {
    const ret = Object.getOwnPropertyDescriptor(arg0, arg1);
    return ret;
};

export function __wbg_getParameter_6f7bc820485dbae4() { return handleError(function (arg0, arg1) {
    const ret = arg0.getParameter(arg1 >>> 0);
    return ret;
}, arguments) };

export function __wbg_getParameter_fc177c1d22da930b() { return handleError(function (arg0, arg1) {
    const ret = arg0.getParameter(arg1 >>> 0);
    return ret;
}, arguments) };

export function __wbg_getPreferredCanvasFormat_891f31d328e2adc3(arg0) {
    const ret = arg0.getPreferredCanvasFormat();
    return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1;
};

export function __wbg_getProgramInfoLog_70d114345e15d2c1(arg0, arg1, arg2) {
    const ret = arg1.getProgramInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getProgramInfoLog_760af7d6753bc699(arg0, arg1, arg2) {
    const ret = arg1.getProgramInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getProgramParameter_8a6b724d42d813b3(arg0, arg1, arg2) {
    const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getProgramParameter_d328869400b82698(arg0, arg1, arg2) {
    const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getPropertyValue_66c16bac362c6d90() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1.getPropertyValue(getStringFromWasm0(arg2, arg3));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_getQueryParameter_85a1d61cc4ccdb26(arg0, arg1, arg2) {
    const ret = arg0.getQueryParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getShaderInfoLog_23dd787b504d5f4e(arg0, arg1, arg2) {
    const ret = arg1.getShaderInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getShaderInfoLog_da62e75d61fbf8a8(arg0, arg1, arg2) {
    const ret = arg1.getShaderInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getShaderParameter_e9098a633e6cf618(arg0, arg1, arg2) {
    const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getShaderParameter_f9c66f7ac8114c69(arg0, arg1, arg2) {
    const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getSupportedExtensions_3ce4548166177471(arg0) {
    const ret = arg0.getSupportedExtensions();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getSupportedProfiles_89666dd28eef1d6b(arg0) {
    const ret = arg0.getSupportedProfiles();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getSyncParameter_7747b0ea559e006f(arg0, arg1, arg2) {
    const ret = arg0.getSyncParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getUniformBlockIndex_9811be246a537d1b(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformBlockIndex(arg1, getStringFromWasm0(arg2, arg3));
    return ret;
};

export function __wbg_getUniformLocation_95f3933486db473c(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getUniformLocation_b9be4fbca76ab9a4(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_get_9901e5f7f90821fc(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_get_9aa3dff3f0266054(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
};

export function __wbg_gpu_2185e4b2191bed1b(arg0) {
    const ret = arg0.gpu;
    return ret;
};

export function __wbg_has_b65a327271986d3e(arg0, arg1, arg2) {
    const ret = arg0.has(getStringFromWasm0(arg1, arg2));
    return ret;
};

export function __wbg_height_08fd44318e18021d(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_height_6e1c5b8f51135ee0(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_height_f36c36e27347cf38(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_height_f63e673a1de30884(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_includes_48df4cb918d24687(arg0, arg1, arg2) {
    const ret = arg0.includes(arg1, arg2);
    return ret;
};

export function __wbg_info_c3044c86ae29faab(arg0) {
    console.info(arg0);
};

export function __wbg_inlineSize_60da5bea0a6275d2(arg0) {
    const ret = arg0.inlineSize;
    return ret;
};

export function __wbg_instanceof_GpuAdapter_8825bf3533b2dc81(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUAdapter;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_GpuCanvasContext_8867fd6a49dfb80b(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUCanvasContext;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_GpuDeviceLostInfo_9385c1b1d1700172(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUDeviceLostInfo;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_GpuOutOfMemoryError_ad32cc08223bf570(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUOutOfMemoryError;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_GpuValidationError_2828a9f6f4ea2c0b(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUValidationError;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_HtmlCanvasElement_f764441ef5ddb63f(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLCanvasElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Object_0d0cec232ff037c4(arg0) {
    let result;
    try {
        result = arg0 instanceof Object;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_WebGl2RenderingContext_ed03a40cd6d9a6c5(arg0) {
    let result;
    try {
        result = arg0 instanceof WebGL2RenderingContext;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Window_d2514c6a7ee7ba60(arg0) {
    let result;
    try {
        result = arg0 instanceof Window;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_invalidateFramebuffer_63b70d9324ec8998() { return handleError(function (arg0, arg1, arg2) {
    arg0.invalidateFramebuffer(arg1 >>> 0, arg2);
}, arguments) };

export function __wbg_isIntersecting_03f2dfd4beb70720(arg0) {
    const ret = arg0.isIntersecting;
    return ret;
};

export function __wbg_is_e442492d1fb7967b(arg0, arg1) {
    const ret = Object.is(arg0, arg1);
    return ret;
};

export function __wbg_key_9a40d4f6defa675b(arg0, arg1) {
    const ret = arg1.key;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_label_89028e7138bc55d8(arg0, arg1) {
    const ret = arg1.label;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_length_65d1cd11729ced11(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_length_d65cf0786bfc5739(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_length_fb41d6fe7c522cee(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_limits_4827e3a9c9f74ac7(arg0) {
    const ret = arg0.limits;
    return ret;
};

export function __wbg_limits_705c3a1e50353132(arg0) {
    const ret = arg0.limits;
    return ret;
};

export function __wbg_lineNum_21558dfbe709a12e(arg0) {
    const ret = arg0.lineNum;
    return ret;
};

export function __wbg_linkProgram_9b1029885a37b70d(arg0, arg1) {
    arg0.linkProgram(arg1);
};

export function __wbg_linkProgram_bcf6286423b25b5c(arg0, arg1) {
    arg0.linkProgram(arg1);
};

export function __wbg_location_0d3ce589878cba8a(arg0) {
    const ret = arg0.location;
    return ret;
};

export function __wbg_log_464d1b2190ca1e04(arg0) {
    console.log(arg0);
};

export function __wbg_lost_9321a8d07347e4ac(arg0) {
    const ret = arg0.lost;
    return ret;
};

export function __wbg_mapAsync_743ed3aee3a10c75(arg0, arg1, arg2, arg3) {
    const ret = arg0.mapAsync(arg1 >>> 0, arg2, arg3);
    return ret;
};

export function __wbg_matchMedia_4adca948756a5784() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.matchMedia(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_matches_a69a36077c4f07ad(arg0) {
    const ret = arg0.matches;
    return ret;
};

export function __wbg_maxBindGroups_a08c9acede444407(arg0) {
    const ret = arg0.maxBindGroups;
    return ret;
};

export function __wbg_maxBindingsPerBindGroup_1708a7e853ce028d(arg0) {
    const ret = arg0.maxBindingsPerBindGroup;
    return ret;
};

export function __wbg_maxBufferSize_e809d5a62c0e55a6(arg0) {
    const ret = arg0.maxBufferSize;
    return ret;
};

export function __wbg_maxColorAttachmentBytesPerSample_314dcbb8e93dc786(arg0) {
    const ret = arg0.maxColorAttachmentBytesPerSample;
    return ret;
};

export function __wbg_maxColorAttachments_8cd3db8af3af3fa5(arg0) {
    const ret = arg0.maxColorAttachments;
    return ret;
};

export function __wbg_maxComputeInvocationsPerWorkgroup_12d4f7aa8dfa572c(arg0) {
    const ret = arg0.maxComputeInvocationsPerWorkgroup;
    return ret;
};

export function __wbg_maxComputeWorkgroupSizeX_4568514c886f6dfa(arg0) {
    const ret = arg0.maxComputeWorkgroupSizeX;
    return ret;
};

export function __wbg_maxComputeWorkgroupSizeY_123105c484c5dccf(arg0) {
    const ret = arg0.maxComputeWorkgroupSizeY;
    return ret;
};

export function __wbg_maxComputeWorkgroupSizeZ_de7c4c7fc8af6336(arg0) {
    const ret = arg0.maxComputeWorkgroupSizeZ;
    return ret;
};

export function __wbg_maxComputeWorkgroupStorageSize_9d8b86acd9c4456e(arg0) {
    const ret = arg0.maxComputeWorkgroupStorageSize;
    return ret;
};

export function __wbg_maxComputeWorkgroupsPerDimension_ea72668334d1f4bc(arg0) {
    const ret = arg0.maxComputeWorkgroupsPerDimension;
    return ret;
};

export function __wbg_maxDynamicStorageBuffersPerPipelineLayout_944a4b9f549f1889(arg0) {
    const ret = arg0.maxDynamicStorageBuffersPerPipelineLayout;
    return ret;
};

export function __wbg_maxDynamicUniformBuffersPerPipelineLayout_c13f3c953fb93de1(arg0) {
    const ret = arg0.maxDynamicUniformBuffersPerPipelineLayout;
    return ret;
};

export function __wbg_maxInterStageShaderComponents_bc57064d5977c3b2(arg0) {
    const ret = arg0.maxInterStageShaderComponents;
    return ret;
};

export function __wbg_maxSampledTexturesPerShaderStage_fab2ca30fcd613d8(arg0) {
    const ret = arg0.maxSampledTexturesPerShaderStage;
    return ret;
};

export function __wbg_maxSamplersPerShaderStage_f072be553a8cf1a4(arg0) {
    const ret = arg0.maxSamplersPerShaderStage;
    return ret;
};

export function __wbg_maxStorageBufferBindingSize_fdfa45c12339bddb(arg0) {
    const ret = arg0.maxStorageBufferBindingSize;
    return ret;
};

export function __wbg_maxStorageBuffersPerShaderStage_d0eda562e20d8b03(arg0) {
    const ret = arg0.maxStorageBuffersPerShaderStage;
    return ret;
};

export function __wbg_maxStorageTexturesPerShaderStage_4cabd4f57624129e(arg0) {
    const ret = arg0.maxStorageTexturesPerShaderStage;
    return ret;
};

export function __wbg_maxTextureArrayLayers_f7181891dff8a73b(arg0) {
    const ret = arg0.maxTextureArrayLayers;
    return ret;
};

export function __wbg_maxTextureDimension1D_cfdb8d7e4f0b5cfb(arg0) {
    const ret = arg0.maxTextureDimension1D;
    return ret;
};

export function __wbg_maxTextureDimension2D_53fa334236b8c471(arg0) {
    const ret = arg0.maxTextureDimension2D;
    return ret;
};

export function __wbg_maxTextureDimension3D_9d4e3a4020f8e905(arg0) {
    const ret = arg0.maxTextureDimension3D;
    return ret;
};

export function __wbg_maxUniformBufferBindingSize_b915154aa9e7ab90(arg0) {
    const ret = arg0.maxUniformBufferBindingSize;
    return ret;
};

export function __wbg_maxUniformBuffersPerShaderStage_d6a12c4a5d55e28f(arg0) {
    const ret = arg0.maxUniformBuffersPerShaderStage;
    return ret;
};

export function __wbg_maxVertexAttributes_e9bfc805badbff13(arg0) {
    const ret = arg0.maxVertexAttributes;
    return ret;
};

export function __wbg_maxVertexBufferArrayStride_5a6903326b277b63(arg0) {
    const ret = arg0.maxVertexBufferArrayStride;
    return ret;
};

export function __wbg_maxVertexBuffers_36ad3e2f2c671d1d(arg0) {
    const ret = arg0.maxVertexBuffers;
    return ret;
};

export function __wbg_media_276296e08383c7dc(arg0, arg1) {
    const ret = arg1.media;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_message_3d49aad63d33e324(arg0, arg1) {
    const ret = arg1.message;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_message_8b4d86f21b314abd(arg0, arg1) {
    const ret = arg1.message;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_message_b9c472af06c991ff(arg0, arg1) {
    const ret = arg1.message;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_messages_dfffacffb9aa49d4(arg0) {
    const ret = arg0.messages;
    return ret;
};

export function __wbg_metaKey_90fbd812345a7e0c(arg0) {
    const ret = arg0.metaKey;
    return ret;
};

export function __wbg_metaKey_de1f08a4d1e84bd1(arg0) {
    const ret = arg0.metaKey;
    return ret;
};

export function __wbg_minStorageBufferOffsetAlignment_06cd221e6b4b3ced(arg0) {
    const ret = arg0.minStorageBufferOffsetAlignment;
    return ret;
};

export function __wbg_minUniformBufferOffsetAlignment_089fef843f8a491d(arg0) {
    const ret = arg0.minUniformBufferOffsetAlignment;
    return ret;
};

export function __wbg_movementX_2e17c283b7c8114b(arg0) {
    const ret = arg0.movementX;
    return ret;
};

export function __wbg_movementY_311d0d64dcbbb4a1(arg0) {
    const ret = arg0.movementY;
    return ret;
};

export function __wbg_navigator_0fe968937104eaa7(arg0) {
    const ret = arg0.navigator;
    return ret;
};

export function __wbg_navigator_d6db0fcbd7865e08(arg0) {
    const ret = arg0.navigator;
    return ret;
};

export function __wbg_new_0565c3001775c60a() { return handleError(function (arg0) {
    const ret = new ResizeObserver(arg0);
    return ret;
}, arguments) };

export function __wbg_new_254fa9eac11932ae() {
    const ret = new Array();
    return ret;
};

export function __wbg_new_3ff5b33b1ce712df(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
};

export function __wbg_new_463f1efab237d7e0() { return handleError(function (arg0) {
    const ret = new IntersectionObserver(arg0);
    return ret;
}, arguments) };

export function __wbg_new_5f48f21d4be11586() { return handleError(function () {
    const ret = new AbortController();
    return ret;
}, arguments) };

export function __wbg_new_688846f374351c92() {
    const ret = new Object();
    return ret;
};

export function __wbg_new_8a6f238a6ece86ea() {
    const ret = new Error();
    return ret;
};

export function __wbg_new_f099e287c6799c7c() { return handleError(function () {
    const ret = new MessageChannel();
    return ret;
}, arguments) };

export function __wbg_newnoargs_fd9e4bf8be2bc16d(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_4b01f207bed23fc0(arg0, arg1, arg2) {
    const ret = new Int8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_5910bdf845a168eb(arg0, arg1, arg2) {
    const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_6991ab0478cc4a43(arg0, arg1, arg2) {
    const ret = new Int32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_69ec77b20853ae02(arg0, arg1, arg2) {
    const ret = new Uint16Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_b0192e1adfca2df1(arg0, arg1, arg2) {
    const ret = new Int16Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_ba35896968751d91(arg0, arg1, arg2) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_f113a96374814bb2(arg0, arg1, arg2) {
    const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_now_6f91d421b96ea22a(arg0) {
    const ret = arg0.now();
    return ret;
};

export function __wbg_observe_4312463ceec4f579(arg0, arg1) {
    arg0.observe(arg1);
};

export function __wbg_observe_5777bdcf09e4bdde(arg0, arg1) {
    arg0.observe(arg1);
};

export function __wbg_observe_71a44d88a2880088(arg0, arg1, arg2) {
    arg0.observe(arg1, arg2);
};

export function __wbg_of_924412d32367b13d(arg0) {
    const ret = Array.of(arg0);
    return ret;
};

export function __wbg_offsetX_cca22992ada210f2(arg0) {
    const ret = arg0.offsetX;
    return ret;
};

export function __wbg_offsetY_5e3fcf9de68b3a1e(arg0) {
    const ret = arg0.offsetY;
    return ret;
};

export function __wbg_offset_07114c6c8713bfa1(arg0) {
    const ret = arg0.offset;
    return ret;
};

export function __wbg_onpointerrawupdate_d7e65c280dee45ba(arg0) {
    const ret = arg0.onpointerrawupdate;
    return ret;
};

export function __wbg_performance_f71bd4abe0370171(arg0) {
    const ret = arg0.performance;
    return ret;
};

export function __wbg_persisted_fa8c29c59197f243(arg0) {
    const ret = arg0.persisted;
    return ret;
};

export function __wbg_pixelStorei_7c93ee0ad7bf0763(arg0, arg1, arg2) {
    arg0.pixelStorei(arg1 >>> 0, arg2);
};

export function __wbg_pixelStorei_7dc331e4d85de1a3(arg0, arg1, arg2) {
    arg0.pixelStorei(arg1 >>> 0, arg2);
};

export function __wbg_pointerId_85845d98372f1198(arg0) {
    const ret = arg0.pointerId;
    return ret;
};

export function __wbg_pointerType_4d6a147d076e7aae(arg0, arg1) {
    const ret = arg1.pointerType;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_polygonOffset_c1f6f426b41cadfa(arg0, arg1, arg2) {
    arg0.polygonOffset(arg1, arg2);
};

export function __wbg_polygonOffset_f5ca18abb10c57c1(arg0, arg1, arg2) {
    arg0.polygonOffset(arg1, arg2);
};

export function __wbg_popErrorScope_73ca275d36475299(arg0) {
    const ret = arg0.popErrorScope();
    return ret;
};

export function __wbg_port1_bda6bd389f4cc28a(arg0) {
    const ret = arg0.port1;
    return ret;
};

export function __wbg_port2_b250432baff0d94d(arg0) {
    const ret = arg0.port2;
    return ret;
};

export function __wbg_postMessage_73c83cb8c6103c58() { return handleError(function (arg0, arg1) {
    arg0.postMessage(arg1);
}, arguments) };

export function __wbg_postTask_076eee2dd6ca2f6c(arg0, arg1, arg2) {
    const ret = arg0.postTask(arg1, arg2);
    return ret;
};

export function __wbg_pressure_c345c07c94ad38cf(arg0) {
    const ret = arg0.pressure;
    return ret;
};

export function __wbg_preventDefault_3c86e59772d015e6(arg0) {
    arg0.preventDefault();
};

export function __wbg_prototype_cd41f5789d244756() {
    const ret = ResizeObserverEntry.prototype;
    return ret;
};

export function __wbg_pushErrorScope_94f47ed40de21724(arg0, arg1) {
    arg0.pushErrorScope(__wbindgen_enum_GpuErrorFilter[arg1]);
};

export function __wbg_push_6edad0df4b546b2c(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
};

export function __wbg_querySelectorAll_2d037c571f099149() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelectorAll(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments) };

export function __wbg_querySelector_7b4362006fdeda68() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_queueMicrotask_2181040e064c0dc8(arg0) {
    queueMicrotask(arg0);
};

export function __wbg_queueMicrotask_ef9ac43769cbcc4f(arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
};

export function __wbg_queue_aef896f8a9f54054(arg0) {
    const ret = arg0.queue;
    return ret;
};

export function __wbg_readBuffer_653369542808a3f9(arg0, arg1) {
    arg0.readBuffer(arg1 >>> 0);
};

export function __wbg_readPixels_33f7af7601585ec6() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_readPixels_bc526324b691316a() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_readPixels_ca434c18552fc5bc() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_reason_7d921985e4bed38d(arg0) {
    const ret = arg0.reason;
    return (__wbindgen_enum_GpuDeviceLostReason.indexOf(ret) + 1 || 3) - 1;
};

export function __wbg_removeEventListener_a9ca9f05245321f0() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments) };

export function __wbg_removeListener_00f6b4d348de1d99() { return handleError(function (arg0, arg1) {
    arg0.removeListener(arg1);
}, arguments) };

export function __wbg_removeProperty_ac500eb39cba5510() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1.removeProperty(getStringFromWasm0(arg2, arg3));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_renderbufferStorageMultisample_91b450830ec884b1(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.renderbufferStorageMultisample(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_renderbufferStorage_b430ea871e926e62(arg0, arg1, arg2, arg3, arg4) {
    arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export function __wbg_renderbufferStorage_c27160e39f974d56(arg0, arg1, arg2, arg3, arg4) {
    arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export function __wbg_repeat_621b3806d8c52204(arg0) {
    const ret = arg0.repeat;
    return ret;
};

export function __wbg_requestAdapter_99bb298ffa971710(arg0, arg1) {
    const ret = arg0.requestAdapter(arg1);
    return ret;
};

export function __wbg_requestAnimationFrame_169cbbda5861d9ca() { return handleError(function (arg0, arg1) {
    const ret = arg0.requestAnimationFrame(arg1);
    return ret;
}, arguments) };

export function __wbg_requestDevice_25da66256442f99f(arg0, arg1) {
    const ret = arg0.requestDevice(arg1);
    return ret;
};

export function __wbg_requestFullscreen_1c019906e2b813ce(arg0) {
    const ret = arg0.requestFullscreen;
    return ret;
};

export function __wbg_requestFullscreen_84eb00d7fc5c44f7(arg0) {
    const ret = arg0.requestFullscreen();
    return ret;
};

export function __wbg_requestIdleCallback_2d7168fc01a73f5c(arg0) {
    const ret = arg0.requestIdleCallback;
    return ret;
};

export function __wbg_requestIdleCallback_6520e3e96167e941() { return handleError(function (arg0, arg1) {
    const ret = arg0.requestIdleCallback(arg1);
    return ret;
}, arguments) };

export function __wbg_resolveQuerySet_518efaed400765ec(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.resolveQuerySet(arg1, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
};

export function __wbg_resolve_0bf7c44d641804f9(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
};

export function __wbg_samplerParameterf_f3b6e5ca86890729(arg0, arg1, arg2, arg3) {
    arg0.samplerParameterf(arg1, arg2 >>> 0, arg3);
};

export function __wbg_samplerParameteri_d83a25b6c51618f2(arg0, arg1, arg2, arg3) {
    arg0.samplerParameteri(arg1, arg2 >>> 0, arg3);
};

export function __wbg_scheduler_344ff4a7a89e57fa(arg0) {
    const ret = arg0.scheduler;
    return ret;
};

export function __wbg_scheduler_dfc2a492974786a1(arg0) {
    const ret = arg0.scheduler;
    return ret;
};

export function __wbg_scissor_63c22bd552b53b16(arg0, arg1, arg2, arg3, arg4) {
    arg0.scissor(arg1, arg2, arg3, arg4);
};

export function __wbg_scissor_eebb3b755c95ca32(arg0, arg1, arg2, arg3, arg4) {
    arg0.scissor(arg1, arg2, arg3, arg4);
};

export function __wbg_setAttribute_148e0e65e20e5f27() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_setBindGroup_2ac6450315781d1e(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
};

export function __wbg_setBindGroup_4aaf752e483a5891(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
};

export function __wbg_setBindGroup_9592f36aa0d95492(arg0, arg1, arg2) {
    arg0.setBindGroup(arg1 >>> 0, arg2);
};

export function __wbg_setBindGroup_bd02dbf57606b68a(arg0, arg1, arg2) {
    arg0.setBindGroup(arg1 >>> 0, arg2);
};

export function __wbg_setBindGroup_d29535317ac43833(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
};

export function __wbg_setBindGroup_df9a3d37c79492bc(arg0, arg1, arg2) {
    arg0.setBindGroup(arg1 >>> 0, arg2);
};

export function __wbg_setBlendConstant_d0046b392cfa3d75(arg0, arg1) {
    arg0.setBlendConstant(arg1);
};

export function __wbg_setIndexBuffer_58ea997f53ad4c11(arg0, arg1, arg2, arg3, arg4) {
    arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4);
};

export function __wbg_setIndexBuffer_be70babd64ba4937(arg0, arg1, arg2, arg3) {
    arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3);
};

export function __wbg_setIndexBuffer_d4026378f61556e0(arg0, arg1, arg2, arg3) {
    arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3);
};

export function __wbg_setIndexBuffer_eee9f6350e2c4ddf(arg0, arg1, arg2, arg3, arg4) {
    arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4);
};

export function __wbg_setPipeline_260aa2ad6d0ca84a(arg0, arg1) {
    arg0.setPipeline(arg1);
};

export function __wbg_setPipeline_7eebf7b7235cafc5(arg0, arg1) {
    arg0.setPipeline(arg1);
};

export function __wbg_setPipeline_c13848e677f3f5b8(arg0, arg1) {
    arg0.setPipeline(arg1);
};

export function __wbg_setPointerCapture_e566a9828fac9a43() { return handleError(function (arg0, arg1) {
    arg0.setPointerCapture(arg1);
}, arguments) };

export function __wbg_setProperty_0eb9705cf1b05650() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_setScissorRect_a1f6486215fdc474(arg0, arg1, arg2, arg3, arg4) {
    arg0.setScissorRect(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_setStencilReference_cdff4b392f555b3a(arg0, arg1) {
    arg0.setStencilReference(arg1 >>> 0);
};

export function __wbg_setTimeout_8d2afdcdb34b4e5a() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.setTimeout(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_setTimeout_e60aa33ae1e92d5a() { return handleError(function (arg0, arg1) {
    const ret = arg0.setTimeout(arg1);
    return ret;
}, arguments) };

export function __wbg_setVertexBuffer_95a2944ddfaf9d39(arg0, arg1, arg2, arg3, arg4) {
    arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_setVertexBuffer_b3ea5739c5f1cc3f(arg0, arg1, arg2, arg3) {
    arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3);
};

export function __wbg_setVertexBuffer_e762011452750daa(arg0, arg1, arg2, arg3) {
    arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3);
};

export function __wbg_setVertexBuffer_ef1966897a59ed53(arg0, arg1, arg2, arg3, arg4) {
    arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_setViewport_6b44c0f6f85a14ea(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.setViewport(arg1, arg2, arg3, arg4, arg5, arg6);
};

export function __wbg_set_23d69db4e5c66a6e(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
};

export function __wbg_set_4e647025551483bd() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(arg0, arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_setbox_2c55cd020a2888a8(arg0, arg1) {
    arg0.box = __wbindgen_enum_ResizeObserverBoxOptions[arg1];
};

export function __wbg_setheight_16d76e7fa9d506ea(arg0, arg1) {
    arg0.height = arg1 >>> 0;
};

export function __wbg_setheight_9805cc527c3e4d65(arg0, arg1) {
    arg0.height = arg1 >>> 0;
};

export function __wbg_setonmessage_4e389f08c5e3d852(arg0, arg1) {
    arg0.onmessage = arg1;
};

export function __wbg_setonuncapturederror_4bf21b80e7093f48(arg0, arg1) {
    arg0.onuncapturederror = arg1;
};

export function __wbg_setwidth_4afeb01eae9784dd(arg0, arg1) {
    arg0.width = arg1 >>> 0;
};

export function __wbg_setwidth_c588fe07a7982aca(arg0, arg1) {
    arg0.width = arg1 >>> 0;
};

export function __wbg_shaderSource_3bbf44221529c149(arg0, arg1, arg2, arg3) {
    arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
};

export function __wbg_shaderSource_6a657afd48edb05a(arg0, arg1, arg2, arg3) {
    arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
};

export function __wbg_shiftKey_0d6625838238aee8(arg0) {
    const ret = arg0.shiftKey;
    return ret;
};

export function __wbg_shiftKey_4b30f68655b97001(arg0) {
    const ret = arg0.shiftKey;
    return ret;
};

export function __wbg_signal_1fdadeba2d04660e(arg0) {
    const ret = arg0.signal;
    return ret;
};

export function __wbg_size_01a91593882ba94c(arg0) {
    const ret = arg0.size;
    return ret;
};

export function __wbg_stack_0ed75d68575b0f3c(arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_start_4c1bf0eed2ea2a6c(arg0) {
    arg0.start();
};

export function __wbg_static_accessor_GLOBAL_0be7472e492ad3e3() {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_GLOBAL_THIS_1a6eb482d12c9bfb() {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_SELF_1dc398a895c82351() {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_WINDOW_ae1c80c7eea8d64a() {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_stencilFuncSeparate_0e2669752fe61623(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
};

export function __wbg_stencilFuncSeparate_8a3cf59c6b451cdb(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
};

export function __wbg_stencilMaskSeparate_944fdaf4c6c085dd(arg0, arg1, arg2) {
    arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_stencilMaskSeparate_b32b2d3f4d6dd883(arg0, arg1, arg2) {
    arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_stencilMask_2d4c5cbf29531171(arg0, arg1) {
    arg0.stencilMask(arg1 >>> 0);
};

export function __wbg_stencilMask_b4a3bc52ac8b45a2(arg0, arg1) {
    arg0.stencilMask(arg1 >>> 0);
};

export function __wbg_stencilOpSeparate_461b7b63a06d8eab(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_stencilOpSeparate_fb97013a4a7e676b(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_style_53bb2d762dd1c030(arg0) {
    const ret = arg0.style;
    return ret;
};

export function __wbg_submit_d08bb5a654750f32(arg0, arg1) {
    arg0.submit(arg1);
};

export function __wbg_texImage2D_488bd0838560f2fd() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texImage2D_d83566263a20c144() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texImage3D_435fd88660b60b3b() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.texImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
}, arguments) };

export function __wbg_texParameteri_45603287be57d25e(arg0, arg1, arg2, arg3) {
    arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export function __wbg_texParameteri_d550886a76f21258(arg0, arg1, arg2, arg3) {
    arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export function __wbg_texStorage2D_cde5cb7abf420f39(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.texStorage2D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_texStorage3D_fc26ec90a9bea55a(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.texStorage3D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5, arg6);
};

export function __wbg_texSubImage2D_0eeb9856a37cc769() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_355ed8d7c2b07c22() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_4a61cebe672fb075() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_728af2502d3d5705() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_7af37da149ecfb8e() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_e7625a06d35850ee() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage3D_5f69a7b6a6cfee4d() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_bbfb28b10d74c5fb() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_d877836539c045af() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_e99dc83a4bef4f03() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_f04486ebbf40ab5e() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_then_0438fad860fe38e1(arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
};

export function __wbg_then_0ffafeddf0e182a4(arg0, arg1, arg2) {
    const ret = arg0.then(arg1, arg2);
    return ret;
};

export function __wbg_type_7a829b34832137ac(arg0) {
    const ret = arg0.type;
    return (__wbindgen_enum_GpuCompilationMessageType.indexOf(ret) + 1 || 4) - 1;
};

export function __wbg_uniform1f_355e1f6a61fccb63(arg0, arg1, arg2) {
    arg0.uniform1f(arg1, arg2);
};

export function __wbg_uniform1f_a8765c5b2bedff99(arg0, arg1, arg2) {
    arg0.uniform1f(arg1, arg2);
};

export function __wbg_uniform1i_33a6ced29e8c7297(arg0, arg1, arg2) {
    arg0.uniform1i(arg1, arg2);
};

export function __wbg_uniform1i_fd66f39a37e6a753(arg0, arg1, arg2) {
    arg0.uniform1i(arg1, arg2);
};

export function __wbg_uniform1ui_70fbafc7c7c2a824(arg0, arg1, arg2) {
    arg0.uniform1ui(arg1, arg2 >>> 0);
};

export function __wbg_uniform2fv_4656b178cf5fa4c1(arg0, arg1, arg2, arg3) {
    arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2fv_f9d9552b515ed3b7(arg0, arg1, arg2, arg3) {
    arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2iv_5da94d37b60378ae(arg0, arg1, arg2, arg3) {
    arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2iv_8d2d21a55cd6e1b5(arg0, arg1, arg2, arg3) {
    arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2uiv_d656dde7098ac0e9(arg0, arg1, arg2, arg3) {
    arg0.uniform2uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3fv_2e8d4216dfb82f6d(arg0, arg1, arg2, arg3) {
    arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3fv_bab07e5c9f85179f(arg0, arg1, arg2, arg3) {
    arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3iv_63910fa250afb050(arg0, arg1, arg2, arg3) {
    arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3iv_c163b334e2241b48(arg0, arg1, arg2, arg3) {
    arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3uiv_7dd00d5c57f02ec4(arg0, arg1, arg2, arg3) {
    arg0.uniform3uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4f_35db89edde01f72e(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
};

export function __wbg_uniform4f_c748f87d2c53a566(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
};

export function __wbg_uniform4fv_be28454f5049854f(arg0, arg1, arg2, arg3) {
    arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4fv_f7d3df09330a128e(arg0, arg1, arg2, arg3) {
    arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4iv_e811f1e4f059bdc7(arg0, arg1, arg2, arg3) {
    arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4iv_f8579ce3b0f415b3(arg0, arg1, arg2, arg3) {
    arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4uiv_4acafe46bc76dbec(arg0, arg1, arg2, arg3) {
    arg0.uniform4uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
};

export function __wbg_uniformBlockBinding_34be9be50f7c2465(arg0, arg1, arg2, arg3) {
    arg0.uniformBlockBinding(arg1, arg2 >>> 0, arg3 >>> 0);
};

export function __wbg_uniformMatrix2fv_17cab4f6d3030e4a(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix2fv_89b5eee6863a8da9(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix2x3fv_fa3097acf0ddbdf3(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix2x4fv_28e0d621c4df6e38(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3fv_072dfda2d6a0e388(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3fv_c4d861a040ef1853(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3x2fv_32accfd656e00e8b(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3x4fv_31763ee28bb4b383(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4fv_b684a40949b2ff0b(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4fv_fa5c91b7cee9bfd5(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4x2fv_3f1b922cbbe99848(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4x3fv_e40b09ea2f26c973(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_unmap_c9f759d16734073e(arg0) {
    arg0.unmap();
};

export function __wbg_unobserve_811e068c4afdf7d8(arg0, arg1) {
    arg0.unobserve(arg1);
};

export function __wbg_usage_ed81c0a67549dac8(arg0) {
    const ret = arg0.usage;
    return ret;
};

export function __wbg_useProgram_1a5a4be134db012a(arg0, arg1) {
    arg0.useProgram(arg1);
};

export function __wbg_useProgram_88e7787408765ccf(arg0, arg1) {
    arg0.useProgram(arg1);
};

export function __wbg_valueOf_5b6f2438fbd02962(arg0) {
    const ret = arg0.valueOf();
    return ret;
};

export function __wbg_vertexAttribDivisorANGLE_2712e437f242895b(arg0, arg1, arg2) {
    arg0.vertexAttribDivisorANGLE(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_vertexAttribDivisor_615c5c0ab239e1af(arg0, arg1, arg2) {
    arg0.vertexAttribDivisor(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_vertexAttribIPointer_60e25126e1fa4c07(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.vertexAttribIPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_vertexAttribPointer_1f280ac2d8994592(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export function __wbg_vertexAttribPointer_c6b1ccfa43bbca96(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export function __wbg_videoHeight_0ccee284b2d0142d(arg0) {
    const ret = arg0.videoHeight;
    return ret;
};

export function __wbg_videoWidth_ddf0b3a73292d990(arg0) {
    const ret = arg0.videoWidth;
    return ret;
};

export function __wbg_viewport_1ca83fff581a8f22(arg0, arg1, arg2, arg3, arg4) {
    arg0.viewport(arg1, arg2, arg3, arg4);
};

export function __wbg_viewport_770469a07e2d9772(arg0, arg1, arg2, arg3, arg4) {
    arg0.viewport(arg1, arg2, arg3, arg4);
};

export function __wbg_visibilityState_77ef9c00e56d5fb4(arg0) {
    const ret = arg0.visibilityState;
    return (__wbindgen_enum_VisibilityState.indexOf(ret) + 1 || 3) - 1;
};

export function __wbg_warn_123db6aa8948382e(arg0) {
    console.warn(arg0);
};

export function __wbg_webkitFullscreenElement_987e215aab12de46(arg0) {
    const ret = arg0.webkitFullscreenElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_webkitRequestFullscreen_cdba2299c3040b25(arg0) {
    arg0.webkitRequestFullscreen();
};

export function __wbg_width_03690ab2d2e48459(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_width_0d7b0b5ad3c2009f(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_width_7fe68601c524fd1e(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_width_9927e6a7adb23d6d(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_writeBuffer_152812595dea1205(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.writeBuffer(arg1, arg2, arg3, arg4, arg5);
};

export function __wbg_writeTexture_3f23b69900a195b2(arg0, arg1, arg2, arg3, arg4) {
    arg0.writeTexture(arg1, arg2, arg3, arg4);
};

export function __wbindgen_boolean_get(arg0) {
    const v = arg0;
    const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

export function __wbindgen_cb_drop(arg0) {
    const obj = arg0.original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

export function __wbindgen_closure_wrapper2168(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 619, __wbg_adapter_49);
    return ret;
};

export function __wbindgen_closure_wrapper2170(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 619, __wbg_adapter_49);
    return ret;
};

export function __wbindgen_closure_wrapper566(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 9, __wbg_adapter_32);
    return ret;
};

export function __wbindgen_closure_wrapper567(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 9, __wbg_adapter_35);
    return ret;
};

export function __wbindgen_closure_wrapper568(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 9, __wbg_adapter_35);
    return ret;
};

export function __wbindgen_closure_wrapper569(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 9, __wbg_adapter_40);
    return ret;
};

export function __wbindgen_closure_wrapper570(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 9, __wbg_adapter_35);
    return ret;
};

export function __wbindgen_closure_wrapper571(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 9, __wbg_adapter_35);
    return ret;
};

export function __wbindgen_closure_wrapper572(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 9, __wbg_adapter_35);
    return ret;
};

export function __wbindgen_closure_wrapper6020(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2339, __wbg_adapter_54);
    return ret;
};

export function __wbindgen_closure_wrapper6021(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2339, __wbg_adapter_57);
    return ret;
};

export function __wbindgen_closure_wrapper6022(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2339, __wbg_adapter_54);
    return ret;
};

export function __wbindgen_closure_wrapper6023(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2339, __wbg_adapter_54);
    return ret;
};

export function __wbindgen_closure_wrapper6024(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2339, __wbg_adapter_54);
    return ret;
};

export function __wbindgen_closure_wrapper6025(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2339, __wbg_adapter_54);
    return ret;
};

export function __wbindgen_closure_wrapper6026(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2339, __wbg_adapter_54);
    return ret;
};

export function __wbindgen_closure_wrapper6249(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2424, __wbg_adapter_70);
    return ret;
};

export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_export_1;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

export function __wbindgen_is_function(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
};

export function __wbindgen_is_object(arg0) {
    const val = arg0;
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

export function __wbindgen_is_undefined(arg0) {
    const ret = arg0 === undefined;
    return ret;
};

export function __wbindgen_memory() {
    const ret = wasm.memory;
    return ret;
};

export function __wbindgen_number_get(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

export function __wbindgen_number_new(arg0) {
    const ret = arg0;
    return ret;
};

export function __wbindgen_string_get(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

