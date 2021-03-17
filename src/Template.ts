import {Definition, Controller, Method, methodType} from './types/interface'
import {capitalizedTitleCase }from './utils'
class Template {

    public interfaceTemp: string
    public methodTemp: string

    constructor() {
        this.interfaceTemp = ``;
        this.methodTemp = ``;
    }

    //单个controller
    emitController(controller: Controller, definitions: Definition) {
        Reflect.ownKeys(controller).forEach((pathKey: string) => {
            const thisMethod = controller[pathKey];
            const {type, summary, parameters, operationId,response} = thisMethod;
            const methodName = type === 'get' ? `get${capitalizedTitleCase(pathKey)}` : pathKey;
            debugger
            this.emitMethods(
                {
                    methodName,
                    parameters,
                    summary,
                    response,
                    methodType:type
                }
            )
        })
    }

    //单个方法生成
    emitMethods(method: Method) {
        const {methodName, summary, parameters, methodType,response} = method;
        const paramsTemp = this.methodReqParams({methodType,parameters})

        const methodTemp = `
            /**
             * ${summary}
             */
            export async function ${methodName}(){
                ${paramsTemp || ''} 
            }):Promise<${response}Res>{
                const result = await sdk.${methodType}<${response}Res>(
                    /list,
                    {},
                    {},
                    {}
                )
                return result.result
            }         
        `
        return methodTemp
    }

    //请求的参数模版
    methodReqParams({methodType,parameters}){
        switch (methodType){

            case 'get':{
                return parameters?.reduce((p,param)=>{
                    p += `/*${param.description}*/\r
                     ${param.name}${param.required?':':'?:'}${param.type}Req`
                    return p
                },'')
            }

            case 'post':{
                return parameters?.reduce((p,param)=>{
                    p +=  `/*${param.description}*/\n
                    ${param.name}${param.required?':':'?:'}${capitalizedTitleCase(param.name)}Req`
                    return p
                },'')
            }
        }
    }

    //返回的参数模版
    methodResParams(){

    }

    //单个类型定义
    emitInterfaces() {

    }




}

export default Template