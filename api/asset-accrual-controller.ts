/**
 * 获取环境配置
 */
export async function getenv(params: {}): Promise<AjaxResult> {
    const result = await sdk.get<AjaxResult>("/list", {}, {}, {});
    return result.result;
}

/**
 * 发票清单汇总信息
 */
export async function getinvoice(params: {
    /*会计年度*/
    kjnd?: number;
    /*会计期间*/
    kjqj?: number;
    /*企业ID*/
    qyid?: number;
    /*账套代码*/
    ztdm?: number;
}): Promise<InvoiceHzVO> {
    const result = await sdk.get<InvoiceHzVO>("/list", {}, {}, {});
    return result.result;
}

/**
 * 获取经营指标数据
 */
export async function getjxzb(params: {
    /*会计年度*/
    kjnd?: number;
    /*会计期间*/
    kjqj?: number;
    /*账套代码*/
    ztdm?: number;
}): Promise<IndexKmyeVO> {
    const result = await sdk.get<IndexKmyeVO>("/list", {}, {}, {});
    return result.result;
}

/**
 * 保存/删除用户常用功能
 */
export async function postmenu(params: {
    /*batchSaveMenuReqVO*/

    batchSaveMenuReqVO: BatchSaveMenuReqVO;
}): Promise<AjaxResult> {
    const result = await sdk.post<AjaxResult>("/list", {}, {}, {});
    return result.result;
}

/**
 * getIndex
 */
export async function getindex(params: {
    /*qyid*/
    qyid: number;
}): Promise<IndexVO> {
    const result = await sdk.get<IndexVO>("/list", {}, {}, {});
    return result.result;
}

/**
 * getIndexOther
 */
export async function getother(params: {
    /*qyid*/
    qyid: number;
}): Promise<IndexVO> {
    const result = await sdk.get<IndexVO>("/list", {}, {}, {});
    return result.result;
}

/**
 * 意见反馈
 */
export async function postadd(params: {
    /*feedBackVO*/

    feedBackVO: FeedBackVO;
}): Promise<AjaxResult> {
    const result = await sdk.post<AjaxResult>("/list", {}, {}, {});
    return result.result;
}

/**
 * 获取用户信息 代账公司信息 及token信息
 */
export async function postinfo(params: {}): Promise<LoginInfoVO> {
    const result = await sdk.post<LoginInfoVO>("/list", {}, {}, {});
    return result.result;
}

export interface AjaxResult {
    /**/
    cause?: string;
    /**/
    code?: string;
    /**/
    message?: string;
    /**/
    result?: object;
}

export interface InvoiceHzVO {
    /*汇总金额*/
    je?: number;
    /*企业id*/
    qyid?: number;
    /*数量*/
    total?: number;
    /*类型 0:进项 1:销项 2:费用*/
    type?: number;
}

export interface IndexKmyeVO {
    /*是否存在发生额*/
    hasFse?: boolean;
    /*会计年度*/
    kjnd?: number;
    /*会计期间*/
    kjqj?: number;
    /*科目编码*/
    kmbm?: string;
    /*科目名称*/
    kmmc?: string;
    /*期末余额*/
    qmye?: number;
    /*账套代码*/
    ztdm?: number;
    /*账套科目id*/
    ztkmId?: number;
}

export interface SaveMenuReqVO {
    /*菜单code*/
    code?: string;
    /*前端路由*/
    route?: string;
    /*序号*/
    rows?: number;
}

export interface IndexVO {
    /*本位币id*/
    bwbId?: number;
    /*企业信息*/
    companyVO?: undefined;
    /*结束时间*/
    endTime?: string;
    /*历史起帐日期*/
    hisTime?: string;
    /*会计年度*/
    kjnd?: number;
    /*会计期间*/
    kjqj?: number;
    /**/
    nowTime?: string;
    /*系统时间*/
    serverTime?: number;
    /*当前系统初始时间*/
    startTime?: string;
    /*企业停用时间*/
    stopTime?: string;
    /*省级行政区划*/
    xzqh?: string;
    /**/
    ztVO?: undefined;
    /*账套代码*/
    ztdm?: number;
}

export interface FeedBackVO {
    /*反馈内容*/
    feedback?: string;
    /*称谓*/
    nickname?: string;
    /*电话*/
    phone?: string;
}

export interface LoginInfoVO {
    /**/
    access_token?: string;
    /*客服标志*/
    kefu?: string;
    /**/
    refresh_token?: string;
    /*是否财税分离*/
    sfcsfl?: boolean;
    /*代账公司信息*/
    sysDzgsVO?: undefined;
    /*系统时间*/
    systemTime?: number;
    /*用户信息*/
    userInfoVO?: undefined;
}

export interface AjaxResult {
    /**/
    cause?: string;
    /**/
    code?: string;
    /**/
    message?: string;
    /**/
    result?: object;
}

export interface InvoiceHzVO {
    /*汇总金额*/
    je?: number;
    /*企业id*/
    qyid?: number;
    /*数量*/
    total?: number;
    /*类型 0:进项 1:销项 2:费用*/
    type?: number;
}

export interface IndexKmyeVO {
    /*是否存在发生额*/
    hasFse?: boolean;
    /*会计年度*/
    kjnd?: number;
    /*会计期间*/
    kjqj?: number;
    /*科目编码*/
    kmbm?: string;
    /*科目名称*/
    kmmc?: string;
    /*期末余额*/
    qmye?: number;
    /*账套代码*/
    ztdm?: number;
    /*账套科目id*/
    ztkmId?: number;
}

export interface SaveMenuReqVO {
    /*菜单code*/
    code?: string;
    /*前端路由*/
    route?: string;
    /*序号*/
    rows?: number;
}

export interface IndexVO {
    /*本位币id*/
    bwbId?: number;
    /*企业信息*/
    companyVO?: undefined;
    /*结束时间*/
    endTime?: string;
    /*历史起帐日期*/
    hisTime?: string;
    /*会计年度*/
    kjnd?: number;
    /*会计期间*/
    kjqj?: number;
    /**/
    nowTime?: string;
    /*系统时间*/
    serverTime?: number;
    /*当前系统初始时间*/
    startTime?: string;
    /*企业停用时间*/
    stopTime?: string;
    /*省级行政区划*/
    xzqh?: string;
    /**/
    ztVO?: undefined;
    /*账套代码*/
    ztdm?: number;
}

export interface FeedBackVO {
    /*反馈内容*/
    feedback?: string;
    /*称谓*/
    nickname?: string;
    /*电话*/
    phone?: string;
}

export interface LoginInfoVO {
    /**/
    access_token?: string;
    /*客服标志*/
    kefu?: string;
    /**/
    refresh_token?: string;
    /*是否财税分离*/
    sfcsfl?: boolean;
    /*代账公司信息*/
    sysDzgsVO?: undefined;
    /*系统时间*/
    systemTime?: number;
    /*用户信息*/
    userInfoVO?: undefined;
}

/**
 * 列表
 */
export async function getlist(params: {
    /*会计年度*/
    kjnd?: number;
    /*会计期间*/
    kjqj?: number;
    /*资产名称*/
    name?: string;
    /*企业id*/
    qyid?: string;
    /*资产类型(0:固定资产1:无形资产,2:长摊资产)*/
    type?: number;
    /*资产类别*/
    zclb?: number;
    /*账套代码*/
    ztdm?: string;
}): Promise<AssetAccrualVO> {
    const result = await sdk.get<AssetAccrualVO>("/list", {}, {}, {});
    return result.result;
}

/**
 * 更新计提金额
 */
export async function getupadteJtJe(params: {
    /*id*/
    id?: string;
    /*修改的计提金额*/
    jtje?: number;
    /*会计年度*/
    kjnd?: number;
    /*会计期间*/
    kjqj?: number;
    /*企业id*/
    qyid?: string;
    /*资产类型*/
    type?: number;
}): Promise<object> {
    const result = await sdk.get<object>("/list", {}, {}, {});
    return result.result;
}

export interface AjaxResult {
    /**/
    cause?: string
    /**/
    code?: string
    /**/
    message?: string
    /**/
    result?: object

}

export interface InvoiceHzVO {
    /*汇总金额*/
    je?: number
    /*企业id*/
    qyid?: number
    /*数量*/
    total?: number
    /*类型 0:进项 1:销项 2:费用*/
    type?: number

}

export interface IndexKmyeVO {
    /*是否存在发生额*/
    hasFse?: boolean
    /*会计年度*/
    kjnd?: number
    /*会计期间*/
    kjqj?: number
    /*科目编码*/
    kmbm?: string
    /*科目名称*/
    kmmc?: string
    /*期末余额*/
    qmye?: number
    /*账套代码*/
    ztdm?: number
    /*账套科目id*/
    ztkmId?: number

}

export interface SaveMenuReqVO {
    /*菜单code*/
    code?: string
    /*前端路由*/
    route?: string
    /*序号*/
    rows?: number

}

export interface IndexVO {
    /*本位币id*/
    bwbId?: number
    /*企业信息*/
    companyVO?: undefined
    /*结束时间*/
    endTime?: string
    /*历史起帐日期*/
    hisTime?: string
    /*会计年度*/
    kjnd?: number
    /*会计期间*/
    kjqj?: number
    /**/
    nowTime?: string
    /*系统时间*/
    serverTime?: number
    /*当前系统初始时间*/
    startTime?: string
    /*企业停用时间*/
    stopTime?: string
    /*省级行政区划*/
    xzqh?: string
    /**/
    ztVO?: undefined
    /*账套代码*/
    ztdm?: number

}

export interface FeedBackVO {
    /*反馈内容*/
    feedback?: string
    /*称谓*/
    nickname?: string
    /*电话*/
    phone?: string

}

export interface LoginInfoVO {
    /**/
    access_token?: string
    /*客服标志*/
    kefu?: string
    /**/
    refresh_token?: string
    /*是否财税分离*/
    sfcsfl?: boolean
    /*代账公司信息*/
    sysDzgsVO?: undefined
    /*系统时间*/
    systemTime?: number
    /*用户信息*/
    userInfoVO?: undefined

}

export interface AssetAccrualVO {
    /*本年折旧额*/
    bnjtje?: number
    /*id*/
    id?: number
    /*本月折旧额*/
    jtje?: number
    /*净值*/
    jz?: number
    /*资产名称*/
    name?: string
    /*数量*/
    num?: number
    /*凭证id*/
    pzid?: number
    /*凭证号码*/
    pzz?: string
    /*入账日期*/
    rzrq?: string
    /*折旧算法名称*/
    sfName?: string
    /*折旧算法*/
    sfid?: string
    /*累计折旧额*/
    totalJtje?: number
    /*资产类型*/
    type?: number
    /*原值*/
    yz?: number
    /*资产id*/
    zcid?: number
    /*资产类别*/
    zclb?: number

}

export interface AjaxResult«object»{
    /**/
    cause ? : string
    /**/
    code ? : string
    /**/
    message ? : string
    /**/
    result ? : object

}