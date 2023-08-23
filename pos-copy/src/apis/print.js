import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// role
export const printTiket = async (dataPrint) => {
    const data = await axios.post('/print-tiket', dataPrint, headerUrl);
    return data.data;
};

export const printCanceledSale = async (dataPrint) => {
    const data = await axios.post('/print-canceled-sale', dataPrint, headerUrl);
    return data.data;
};

export const printReportCut = async (dataPrint) => {
    const data = await axios.post('/print-report-cut', dataPrint, headerUrl);
    return data.data;
};

export const printCutX = async (dataPrint) => {
    const data = await axios.post('/print-cut-x', dataPrint, headerUrl);
    return data.data;
};

export const printCutZ = async (dataPrint) => {
    const data = await axios.post('/print-cut-z', dataPrint, headerUrl);
    console.log(data);
    return data.data;
};

export const printOutputCash = async (dataPrint) => {
    const data = await axios.post('/print-output-cash', dataPrint, headerUrl);
    return data.data;
};
