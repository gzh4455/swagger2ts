const axios = require('axios').default
import {Definition} from './types/interface'
import Template from './Template'

class SwaggerApi {

    public cacheControllers: any

    public definitions:  Definition

    constructor() {
        this.run()
        this.cacheControllers = {};
        //接口参数的类型定义
        this.definitions = {}
    }

    async run() {
        //获取swagger配置的json
        const {data} = await axios.get('http://172.26.8.82:8062/v2/api-docs')
        const {definitions, info, host, paths, tags} = data;
        this.definitions = definitions
        const apiPathsArr = Reflect.ownKeys(paths);
        apiPathsArr.forEach((apiPath: string) => {
            const selfApi = paths[apiPath];

            //获取该接口下所有restful类型
            const restfuls = Reflect.ownKeys(selfApi);
            restfuls.forEach((restfulType) => {
                const selfRestful = selfApi[restfulType];
                const {tags, parameters, operationId,summary,responses} = selfRestful;
                const controllersName = selfRestful.tags[0];
                const cacheController = this.cacheControllers[controllersName];
                if (cacheController) {
                    //接口名称去最后一个
                    const pathName = apiPath.match(/\w+(?=\/{\w+})|\w+$/)[0];

                    //TODO controller中文替换
                    this.cacheControllers[controllersName][pathName] = {
                        type: restfulType,
                        summary,
                        parameters,
                        response:responses['200'].schema?.$ref,
                        operationId,
                        tags: tags[0]
                    }
                } else {
                    //第一次
                    this.cacheControllers[controllersName] = {}
                }
            })
        })

        this.getController()

    }

    // 单个controller处理
    getController(){
        const {cacheControllers , definitions} = this;
        const controllerTemp = new Template();
        Reflect.ownKeys(cacheControllers).forEach(controllerKey=>{
            const thisController = cacheControllers[controllerKey];
            controllerTemp.emitController(
                thisController,definitions
            )
        })
    }
}


new SwaggerApi(

)