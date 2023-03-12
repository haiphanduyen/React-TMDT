import {lang} from "../assets/lang"

const language = localStorage.getItem("lang");




export const L = (value) => {
    if(lang?.[value] && language ==="vn") return lang[value];
    return value;
}