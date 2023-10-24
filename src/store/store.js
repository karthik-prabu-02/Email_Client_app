import {configureStore} from '@reduxjs/toolkit';
import emailing from './emailing/emailing';
export const store =configureStore({
    reducer : {
        email: emailing,
    },
});