import {GET, POST, PUT, DELETE} from './http';
import API from './api';

/**
 * example
 */
export const example = GET(API.GET_EXAMPLE_URL);

/**
 * how to use
 */
// const params = {
//     id: 1
// };
// example(params).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// });