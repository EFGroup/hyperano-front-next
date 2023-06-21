import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

export function currency(data) {
    return `${digitsEnToFa(addCommas(Number(data)))}` || "-";
}

export function productImgUrl(data) {
    const baseUrl = 'https://hyperano.ir/api/uploads/images/products/';
    return data
    ? `${baseUrl}${JSON.parse(data).medium[0]}`
    : '/logo.svg';
}

export function convertEnToFa(data) {
    return digitsEnToFa(data || "");
}