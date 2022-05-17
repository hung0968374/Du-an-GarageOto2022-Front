export const removeTagsFromString = (strInput:string)=>{
    const cleanText = strInput.replace(/<\/?[^>]+(>|$)/g, "");
    return cleanText
}