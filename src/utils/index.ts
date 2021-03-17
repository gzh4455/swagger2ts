
/**
 * 首字母大写
 */
export const capitalizedTitleCase = (letter:string)=>{
    return letter.replace(/^\\S/, s => s.toUpperCase())
}