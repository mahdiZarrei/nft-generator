import copy from "copy-to-clipboard";
import { toast } from "react-toastify";


export const copyToClipboard = (e) => {
    let isCopy = copy(e);
    if (isCopy) {
        toast.success("Copied to Clipboard");
    }
};

export const shortAddress = (str) => {
    if (str.length < 20) {
        return str;
    }
    const firstFive = str.substring(0, 5);
    const lastFive = str.substring(str.length - 5);
    return `${firstFive}...${lastFive}`;
};
