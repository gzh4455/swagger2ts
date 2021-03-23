import {Definition, Controller, Method, methodType} from './types/interface'
import {capitalizedTitleCase} from './utils'

class Template {

    public methodTemps: string
    public cacheInterfaces: {
        [k: string]: Object
    }
    public definitions: Definition

    constructor() {
        //当前controller用到的ts类型
        this.cacheInterfaces = {};
        //当前controller用到的方法
        this.methodTemps = '';
    }

    //单个controller
    emitController(controller: Controller, definitions: Definition) {
        this.definitions = definitions
        Reflect.ownKeys(controller).forEach((pathKey: string) => {
            const thisMethod = controller[pathKey];
            const {type, summary, parameters, operationId, response} = thisMethod;
            const methodName = type === 'get' ? `get${capitalizedTitleCase(pathKey)}` : pathKey;

            this.emitMethods(
                {
                    methodName,
                    parameters,
                    summary,
                    response,
                    methodType: type
                }
            )
        })
        console.log(this.cacheInterfaces);
        console.log(this.methodTemps);
        debugger
    }

    //单个方法生成
    emitMethods(method: Method) {
        const {methodName, summary, parameters, methodType, response} = method;
        const paramsTemp = this.methodReqParams({methodType, parameters})
        const methodTemp = `
            /**
             * ${summary || ''}
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
        this.methodTemps += `\n${methodTemp}`
        this.transformInterface(response)
    }

    //请求的参数模版
    methodReqParams({methodType, parameters}) {
        switch (methodType) {

            case 'get': {
                return parameters?.reduce((p, param) => {
                    p += this.getSimpleTs(param)
                    return p
                }, '')
            }

            case 'post': {
                return parameters?.reduce((p, param) => {
                    p += `/*${param.description}*/\n
                    ${param.name}${param.required ? ':' : '?:'}${param.schema?.$ref ? this.transformInterface(param.schema.$ref) : param.type}`
                    return p
                }, '')
            }
        }
    }

    //类型名称转换 并缓存要生成的TS接口
    transformInterface($ref: string) {
        console.log($ref);
        const thisRef = this.getDefinitionKey($ref);
        const thisRefDefinition = this.definitions[thisRef];
        this.recurseTsInterface(thisRefDefinition)
        return thisRef
    }


    //递归缓存TS接口
    recurseTsInterface(definition) {
        if (definition.properties) {
            const properties = definition.properties;
            const simpleKey = definition.title;
            let isSimple = true;
            let simpleStr = ''
            Reflect.ownKeys(properties).map((properKey: string) => {
                const thisProperty = properties[properKey];
                const $ref = thisProperty.items?.$ref || thisProperty.$ref;
                if ($ref !== undefined) {
                    //递归去读ref
                    this.recurseTsInterface($ref)
                    simpleStr += `${properKey}:${this.getDefinitionKey($ref)}`
                    isSimple = false;
                }else{
                    simpleStr += this.getSimpleTs({name:properKey,...thisProperty})
                }
            })
            if(isSimple){
                this.cacheInterfaces[simpleKey] = simpleStr
            }
        } else {
            const definitionKey = this.getDefinitionKey(definition)
            if (!this.cacheInterfaces[definitionKey]) {
                const properties = this.definitions[definitionKey].properties;
                this.cacheInterfaces[definitionKey] =
                    Reflect.ownKeys(properties).reduce((p: string, paramKey) => {
                        const param = properties[paramKey];
                        param.name = paramKey
                        p += this.getSimpleTs(param)
                        return p
                    }, '')

            }
        }
    }

    //返回的参数模版
    methodResParams() {

    }

    //单个类型定义
    emitInterfaces() {

    }

    getDefinitionKey($ref): string {
        const lastRefKey =  $ref.split('/').slice(-1)[0];
        //TODO
        const matched = lastRefKey?.match(/«.+»/);
        return lastRefKey;
    }

    getSimpleTs(param) {
        return `/*${param?.description || ''}*/
                ${param.name}${param.required ? ':' : '?:'}${param.type}`
    }

    getQuoteTs(param, temp) {
        return `/*${param.description || ''}*/
                ${param.name}${param.required ? ':' : '?:'}${temp}`
    }


}

export default Template